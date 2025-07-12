import { getFullProject } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetail";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";



import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"


export default function ProjectDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate()

    const params = useParams<{projectId: string}>()//leer los parametros de la url
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: ()=> getFullProject(projectId),
          retry: false 
      });
      
      const canEdit = useMemo(()=>  data?.manager === user?._id, [data, user])
     

  if(isLoading && authLoading) return <p>Cargando...</p>
    if(isError) return <Navigate to="/404/"/> //redireccionar 



  if(data && user) return(
    
      <>
         <h1 className="text-5xl font-black">{data.projectName}</h1>
         <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

        {isManager(data.manager, user._id)  && (

           <nav className="my-5 flex gap-3">
            <button 
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                onClick={ ()=> navigate( location.pathname + '?newTask=true')}
                >
                Agregar Tarea
            </button>

            <Link 
              to={'team'} //aregega /team a la url
              className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
           
         </nav>
        )}
        
         
          <TaskList
              tasks={ data.task  }
              canEdit ={ canEdit }
          />
         <AddTaskModal/>
         <EditTaskData/>
         <TaskModalDetails/>
      </>
  )
}


// onClick={ ()=> navigate('?newTask=true')}  aqui se le pasa el query string
//  para que se vea en la url 

//rety es para darle 
// un numero de veces a intentar 
// hacer la peticion si falla ,
//  pero puede tardar de acuerdo al
//  numero de veces pero con false 
// no lo intenta y da el error en la primera vez