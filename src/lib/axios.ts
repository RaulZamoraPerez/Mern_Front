
import axios from 'axios';

const api = axios.create({
    baseURL:  import.meta.env.VITE_API_URL
})

api.interceptors.request.use( config => {
   const token = localStorage.getItem('AUTH_TOKEN')
    if(token){
         config.headers.Authorization = `Bearer ${token}`
    }
    return config

})

export default api;








/**
 * Creamos una variable de api con axios.create  
 *  eso creara una instancia , un cliente de axios y le podemos
pasar una url base para que  todas las peticiones 
vayan a la misma url
y eso es bueno pq si cambia el server solo haremos
 un solo cambio a futuro

 */