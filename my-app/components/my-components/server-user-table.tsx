'use client'
import {user} from "@/app/database/db-model/user-model"
import { Checkbox } from "@/components/ui/checkbox"
import { setUserUpdateAction } from "@/app/actions/userActions"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
   
const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
]

const headers:string[]=[
    'name',
    'email',
    'telefone',
    'imagem',
    'role',
    'action'
]


const center=['role','action']
type roleType= 'USER' | 'ADMIN' | 'SUPER_ADMIN'

type ServerUserTableProps = {
    userData: user[];
};


export default function ServerUserTable({ userData }: ServerUserTableProps){

    const handlerChange= async(userId:string, input:roleType)=>{
        await setUserUpdateAction(userId,{role:input})
    }
    
    return <section>
        <h1 className="font-extrabold italic mb-2">Usuários</h1>
        <div className="border rounded-sm">
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                
                <TableHeader>
                    <TableRow>
                        <TableHead className={``}>
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="terms2" 
                                    disabled={false} 
                                />                            
                            </div>
                        </TableHead>
                        {headers.map((item, index)=>{
                            return <TableHead className={`${center.includes(item)?'text-center':''} capitalize`}>{item}</TableHead>
                        })}
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    {userData.map((usuario) => (
                        <TableRow key={usuario.id}>
                            <TableCell className={``}>
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="terms2" 
                                        disabled={false}
                                    />                            
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">{usuario.name?? '---'}</TableCell>
                            <TableCell>{usuario.email?? '---'}</TableCell>
                            <TableCell>{usuario.telefone?? '---'}</TableCell>
                            <TableCell>{usuario.image?? '---'}</TableCell>
                            <TableCell className="text-center">
                                <Select onValueChange={(e)=>{                                    
                                    handlerChange(usuario.id, e as roleType)
                                }} defaultValue={usuario.role}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={usuario.role} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="USER">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell className="text-center">
                            <DropdownMenu>
                            <DropdownMenuTrigger className="">...</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{usuario.email}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Deletar</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                {/* <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
        </div>
    </section>
}