import { Navigate, useLocation, useParams } from "react-router-dom"
import {  useQuery }  from '@tanstack/react-query'
import { getTaskById } from "@/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {

   const params = useParams()
   const projectId = params.projectId!
   
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('editTask')!

  const { data, isError} = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false //no reintentar si hay error
   
  })
  if(isError) return <Navigate to={'/404'}/>

  if(data)  return <EditTaskModal data={data} taskId={taskId}/>
}





//enabled

/**
 *
 * ese lo que hace , es que ne base a una 
 * condición esa consulta se ejecuta o no y solo 
 * acepta boleanos
 */

//!!hola
// Entonces esto lo que hace es convertir esa variable de hola
//  a un boolean y si tiene algo pues retorna
//  true y sino tiene pus false