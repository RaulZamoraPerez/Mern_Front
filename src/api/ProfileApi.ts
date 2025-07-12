import { isAxiosError } from "axios";
import { UpdateCurrentPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";



export async function updateProfile(formData: UserProfileForm){
      try {

        const {data} = await api.put<string>(`/auth/profile`, formData);

        return data;
      
     } catch (error) {

      if(isAxiosError(error) && error.response){ 
      
          throw new Error(error.response.data.error)//mensaje de error de la api
          
      }
    }
}
export async function changePassword(formData: UpdateCurrentPasswordForm){
      try {

        const {data} = await api.put<string>(`/auth/update-password`, formData);

        return data;
      
     } catch (error) {

      if(isAxiosError(error) && error.response){ 
      
          throw new Error(error.response.data.error)//mensaje de error de la api
          
      }
    }
}
