import UserData from "@/components/my-components/user-data"
import { getServerAction } from "@/app/actions/getSectionAction"
import userModel from "@/app/database/db-model/user-model"


export default async function Page() {
  const user= await getServerAction()
  const usuario= await userModel.findById(user!.id)

  const safeUserData = {
    id: usuario!.id.toString()??'',
    name: usuario!.name ?? '',
    email: usuario!.email ?? '',
    telefone: usuario?.telefone ?? '',
    role: usuario?.role ?? '',
    image: usuario?.image ?? '',
  }
  
  return (    
    <div className="container flex flex-1 flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl">
      <UserData userData={safeUserData}/>
      </div>
    </div>     
  )
}