import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/hooks/useAuth"


export default function ProfileVIew() {

    const { data, isLoading } = useAuth()

    if(isLoading) return <p>Cargando...</p>
  
  if (data)  return <ProfileForm data={data} />
}
