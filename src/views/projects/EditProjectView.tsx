import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";

import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"


export default function EditProjectView() {

    const params = useParams<{projectId: string}>()//leer los parametros de la url
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectId],
        queryFn: ()=> getProjectById(projectId),
          retry: false 
      });

  if(isLoading) return <p>Cargando...</p>
    if(isError) return <Navigate to="/404/"/> //redireccionar 

  if(data) return <EditProjectForm  data={data} projectId ={projectId}/>
}




//rety es para darle 
// un numero de veces a intentar 
// hacer la peticion si falla ,
//  pero puede tardar de acuerdo al
//  numero de veces pero con false 
// no lo intenta y da el error en la primera vez