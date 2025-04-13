import ServerUserTable from "@/components/my-components/server-user-table"
import { getAllUserServerAction } from "@/app/actions/userActions"

export default async function Page(){
  const all= await getAllUserServerAction()
        
  return (
    <section className="p-6 space-y-6 w-full">
      <h1 className="text-2xl font-bold ">Dashboard do Servidor</h1>
      <div className="grid grid-cols-1 gap-4">           
        <ServerUserTable userData={all}/>
      </div>
    </section>
  )
}