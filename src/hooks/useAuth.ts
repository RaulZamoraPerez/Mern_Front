

import { getUser } from '@/api/AuthApi'
import { useQuery } from '@tanstack/react-query'


export const useAuth =()=>{


    const {data, isLoading, isError} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false, // es el numero de intentos que se hace si falla la peticion
        refetchOnWindowFocus: false, // no vuelve a hacer la peticion si la ventana vuelve a estar en foco
    })

    return { data, isLoading, isError }
}