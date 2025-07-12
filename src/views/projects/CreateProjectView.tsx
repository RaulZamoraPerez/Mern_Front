import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { CreateProject } from "@/api/ProjectAPI";
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'


export default function CreateProjectView() {

  const navigate = useNavigate()//redireccion

  const initialValues : ProjectFormData = {
        projectName: "",
      clientName: "",
      description: ""
  }

  const {register, handleSubmit, formState:{errors}} = useForm({defaultValues: initialValues})
   
  const {mutate} = useMutation({

      mutationFn: CreateProject,
      onError: ( error )=>{ //error de la peticion
           toast.error(error.message)// mensaje
      },
      
      onSuccess: (data)=>{
        toast.success(data)// mensaje 
        navigate('/')
      }
  })


 const  handleForm = (formData: ProjectFormData)=> mutate(formData)//la data para createProject    - se pasa aqui, no directo}
 
  return (
    <>   
    <div className="max-w-3xl mx-auto"> 
         <h1 className="text-5xl font-black">Crear Proyectos</h1>
         <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

        <nav className="my-5">
            <Link
                  to="/"
                  className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors" 
                >
                Volver a Proyectos
            </Link>

        </nav>


        <form  
            className="mt-10 bg-white shadow-lg p-10 rounded-lg"
            onSubmit={handleSubmit(handleForm)}
            noValidate
        >
         <ProjectForm
            register={register}
            errors={errors}
         />

          <input 
              type="submit"
              value={"Crear Proyecto"} 
              className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors "
          />


        </form>
    </div>
    </>
  )
}
