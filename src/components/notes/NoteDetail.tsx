import { DeleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  note: Note;
}
export default function NoteDetail({ note }: Props) {

  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation() 
  const queryParams = new URLSearchParams(location.search) 
  const taskId = queryParams.get('viewTask')! 

    const {data, isLoading } = useAuth()


    if(isLoading) return 'Cargando..'

    //coprobar si el usuario que creo la nota es el mismo que esta logueado
    const canDelete = useMemo(()=> data?._id === note.createdBy._id,[data])

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
       mutationFn: DeleteNote,
        onSuccess: (data) => {
          toast.success(data);
          queryClient.invalidateQueries({queryKey: ['task', taskId]}) //invalida 
          
        },  
        onError: (error) => toast.error(error.message)
        

    })

  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
        {note.content} por {' '}
        <span className="font-bold">{note.createdBy.name}</span>
      </p>
      <p className="text-sm text-slate-500">
        {formatDate(note.createdAt)}
      </p>
      </div>

      {canDelete &&(
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 text-white p-2 text-xs font-bold cursor-pointer transition-colors"
          onClick={()=> mutate({projectId, taskId, noteId: note._id})}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
