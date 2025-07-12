

import { NoteFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateNote } from '@/api/NoteApi'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

export default function AddNoteForm() {

  const params = useParams()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)

  const taskId = queryParams.get('viewTask')!
const projectId = params.projectId!

    const initialValues : NoteFormData={
        content: ''
    }
    const {register, handleSubmit, formState:{errors}, reset } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
         mutationFn: CreateNote,
          onSuccess: (data) => {
              toast.success(data)
              queryClient.invalidateQueries({queryKey:['task', taskId]}) //invalida la consulta de la tarea para que se vuelva a cargar
          },
          onError: (error) => {
              toast.error(error.message)
             
          }
    })
    const handleAddNote = (data: NoteFormData) => {
         const datos ={
            projectId,
            taskId,
            formData: data
         }
         mutate(datos)
         reset()
    }
  return (
    <form
       onSubmit={handleSubmit(handleAddNote)}
       className='space-y-3'
    >
      <div className='flex flex-col gap-2'>
        <label className="font-bold " htmlFor="content" >
            crear nota
        </label>
        <input 
            type="text" 
            id="content" 
            placeholder="Escribe tu nota aquí..." 
            className="w-full p-3 border border-gray-300"
            {...register('content', {
                required: 'El contenido de la nota es obligatorio',

            })}
        />
        {errors.content && (
            <ErrorMessage >
                {errors.content.message}
            </ErrorMessage>
        )}
      </div>

      <input 
          type="submit" 
          value="Agregar Nota" 
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-black p-2 w-full rounded cursor-pointer transition-colors duration-300"
      />
    </form>
  )
}
