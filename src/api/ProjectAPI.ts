import api from "@/lib/axios";
import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "../types";
import { isAxiosError } from "axios";


export async function CreateProject(formData: ProjectFormData){
     try {
        const {data}= await api.post('/projects', formData)
         return data

     } catch (error) {

      if(isAxiosError(error) && error.response){ 
      
          throw new Error(error.response.data.error)//mensaje de error de la api
          
      }
      
     }
}



export async function getProjects(){
    
     try {
            const {data}= await api('/projects')
            const response = dashboardProjectSchema.safeParse(data)
            
            if( response.success ){
                return response.data
            }

            return data
     } catch (error) {
      if(isAxiosError(error) && error.response){ //
          throw new Error(error.response.data.error)
      }   
     }
}


export async function getProjectById(id: Project['_id'] ){
    try {
        const {data}= await api(`/projects/${id}`)

        console.log(data)

        const response = editProjectSchema.safeParse(data)
       if(response.success){
        return response.data
       }

    } catch (error) {
        if(isAxiosError(error) && error.response){ //
            throw new Error(error.response.data.error)
        }   
    }
}

export async function getFullProject(id: Project['_id'] ){
    try {
        const {data}= await api(`/projects/${id}`)

        console.log(data)

        const response = projectSchema.safeParse(data)
        console.log(response.data)
       if(response.success){
        return response.data
       }

    } catch (error) {
        if(isAxiosError(error) && error.response){ //
            throw new Error(error.response.data.error)
        }   
    }
}


type ProjectAPIType ={
    projectId: Project['_id']
    formData: ProjectFormData
}

export async function updatedProject({ formData, projectId }: ProjectAPIType){
    try {
       const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        return data

    } catch (error) {

     if(isAxiosError(error) && error.response){ 
     
         throw new Error(error.response.data.error)//mensaje de error de la api
         
     }
     
    }
}


export async function deleteProject(id: Project['_id'] ){
    try {
        const url=`/projects/${id}`
        const {data}= await api.delete<string>(url)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){ //
            throw new Error(error.response.data.error)
        }   
    }
}








//isAxiosError(error) - es una funcion o type que se usa para verificar si el error es de axios
//para no tener el tipado de unknown en el error.response.data.error
//ese error valida si es un 401, 404, 500, etc

//axios trata de hacer la peticion y si la api responde con
//un error de 404, 500, 401, etc, axios Axios interpreta 
// automáticamente que esto es un error y lo lanza al bloque catch.


//siempre en el cacth lanza un error para que la mutacion caiga en el onError sino no caeria en el onsuccess 