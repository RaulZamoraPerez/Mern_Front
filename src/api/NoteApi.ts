
import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

interface NoteApiType{
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}

export async function CreateNote({projectId, taskId, formData}: Pick<NoteApiType, 'projectId' | 'taskId' | 'formData'>){
     try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const {data} = await api.post<string>(url, formData)
        return data

     } catch (error) {

      if(isAxiosError(error) && error.response){ 
      
          throw new Error(error.response.data.error)//mensaje de error de la api
          
      }
      
     }


}

export async function DeleteNote({projectId, taskId, noteId}: Pick<NoteApiType, 'projectId' | 'taskId' | 'noteId'>){
      try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const {data} = await api.delete<string>(url)
        return data

     } catch (error) {

      if(isAxiosError(error) && error.response){ 
      
          throw new Error(error.response.data.error)//mensaje de error de la api
          
      }
    }
}
