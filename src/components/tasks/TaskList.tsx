import { Project,  taskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface TaskListProps {
  tasks: taskProject[];
  canEdit: boolean;
}

type GruupedTasks = {
  [key: string]: taskProject[];
};

const initialStatusGroups: GruupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-esmerald-500",
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const queryClient = useQueryClient();



  const params = useParams();
  const projectId = params.projectId!;

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && over.id) {
      const taskId = active.id.toString(); //id de la tarea que se arrastra
      const status = over.id as TaskStatus; // id del dropzone donde se suelta la tarea
      mutate({ projectId, taskId, status });

      //actializacion optimista  del estado de la tarea

      queryClient.setQueryData(["project", projectId], (prevData: Project) => {
        
        const updatedTasks = prevData.task.map((task) => {
          if (task._id === taskId) {
     
            return {
              ...task,
              status: status,
            };
          }
          return task;
        });

        return {
          ...prevData,
          task: updatedTasks,
        };
      });
    }
  };
  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={` capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}  `}
              >
                {statusTranslations[status]}
              </h3>

              <DropTask status={status} />

              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard canEdit={canEdit} key={task._id} task={task} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
