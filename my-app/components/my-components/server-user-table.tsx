'use client'

import {user} from "@/app/database/db-model/user-model"
import { Checkbox } from "@/components/ui/checkbox"
import { setUserUpdateAction, deleteUserAction } from "@/app/actions/userActions"
import { toast } from "sonner"
import { getAllUserServerAction } from "@/app/actions/userActions"

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
import { useState, useReducer,useEffect } from "react"

const headers:string[]=[
    'name',
    'email',
    'telefone',
    'imagem',
    'role',
    'action'
]

import { useSession } from "next-auth/react"
import { Button } from "../ui/button"

const center=['role','action']
type roleType= 'USER' | 'ADMIN' | 'SUPER_ADMIN'

type ServerUserTableProps = {
    userData: user[];
};


// -------------------------use reduce START-------------------------
export enum options {
    DELETE = 'DELETE',
    CLEAR = 'CLEAR',
    // Adicione outras ações aqui
}
  
const initialState = {
    usuario: [],
    status: false,
    payload: [] as string[],
    actionPending: null as keyof typeof options | null
};
  
type ActionType = {
    type: keyof typeof options,
    status: boolean,
    payload: string[]
};
  
export const reducer = (state: typeof initialState, action: ActionType) => {
    const { type, payload, status } = action;
  
    return {
      ...state,
      usuario: state.usuario,
      actionPending: type,
      payload,
      status
    };
  };  
// -------------------------use reduce END-------------------------


export default function ServerUserTable({ userData }: ServerUserTableProps){
    const [usuarios, setUsuarios]= useState<user[]>(userData)
    const [userSelect, setUserSelect]= useState<string[]>([])
    const [state, dispatch] = useReducer(reducer, initialState);
    const { actionPending, payload } = state;
    const [typeSelect, setTypeSelect] = useState<keyof typeof options | null>(null);

    const {data}= useSession()
    

    const handlerChange= async(userId:string, input:roleType)=>{
        const setUserRole= await setUserUpdateAction(userId,{role:input})
        if(!setUserRole){
            toast.error('Error ao atualizado Usuário')
            return
        }
        toast.success('Usuário atualizado com Sucesso')
    }
    
    const handlerDeleteUser= async(userId:string)=>{
        const us= userData.find(user => user.email)
        if(!confirm(`Você tem certeza que quer Deletar ${us?.email}`)){
            return
        }
        const setUserRole= await deleteUserAction(userId)
        if(!setUserRole){
            toast.error('Error ao atualizado Usuário')
            return
        }
        toast.success('Usuário atualizado com Sucesso')
        await handleReload()
    }

    const handleReload= async ()=>{
        const reload= await getAllUserServerAction()
        setUsuarios(reload)
    }

    function inserUserSelect(status:boolean,user:user){
        if(!status){
            setUserSelect(prev => {
                if(prev.includes(user.id)){
                    return prev.filter(item => item != user.id)
                }
                return prev
            })
        }

        if(status){
            setUserSelect(prev => {
                if(!prev.includes(user.id)){
                    return [...userSelect, user.id]
                }
                return prev                
            })
        }
    }

    function inserUserSelectAll(status:boolean){
        if(status){
            const userId= userData.map(us => us.id)
            setUserSelect(userId.filter(item => item != data?.user.id))
        }
        if(!status) setUserSelect([])
    }

    // reducer -----------------------------------------------
    const actionsMap: Record<string, (ids: string[]) => Promise<void>> = {
        DELETE: async (ids:string[]) => {
            for await (const id of ids) {
                await deleteUserAction(id);
            }
            await handleReload()
            setUserSelect([])
            toast.error('Deletados com Sucesso !!!')
        },
        CLEAR: async (ids:string[]) => {
            toast.success('não foi feito nada')
        }

    };

    useEffect(() => {
        if (!state.actionPending || payload.length === 0) {
            //toast.error('Selecione algum usuário antes de Aplicar as ações')
            return
        };
      
        (async () => {
          try {
            await actionsMap[actionPending as string](payload);
            dispatch({ type: actionPending??'CLEAR', payload: [], status: true });
          } catch (e) {
            console.error(`Erro ao executar ação ${actionPending}`, e);
            dispatch({ type: actionPending??'CLEAR', payload, status: false });
          }
        })();
    }, [actionPending, payload]);

    
    const aplicarAcao = () => {
        if (!typeSelect) return;
        
        dispatch({
            type: typeSelect,
            payload: userSelect,
            status: false
        });
    };
    // reducer -----------------------------------------------


    return <section>
        <div className="flex justify-between">
            <h1 className="font-extrabold italic mb-2 self-end">Usuários</h1>
            
            {/* SELECT PARA TODOS USUARIOS */}
            <div className="flex flex-row gap-2 mb-2">
            <div className="flex flex-row gap-2 mb-2">
                <div className="w-[180px]">
                    <Select onValueChange={(e) => setTypeSelect(e as keyof typeof options)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha uma Opção" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="DELETE">Delete</SelectItem>
                        <SelectItem value="CLEAR">Clear</SelectItem>
                        {/* Adicione mais opções aqui se precisar */}
                    </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" onClick={aplicarAcao}>Aplicar</Button>
                </div>
            </div>
        </div>

        <div className="border rounded-sm">

            {/* HEADER DA TABLEA */}
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead className={``}>
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="terms2" 
                                    disabled={false} 
                                    onCheckedChange={(e)=> inserUserSelectAll(e as boolean)}
                                />                            
                            </div>
                        </TableHead>
                        {headers.map((item, index)=>{
                            return <TableHead className={`${center.includes(item)?'text-center':''} capitalize`}>{item}</TableHead>
                        })}
                    </TableRow>
                </TableHeader>
                
                <TableBody >

                    {/* USUARIOS CADASTRADOS */}
                    {usuarios.map((usuario) => (
                        <TableRow key={usuario.id} >
                            <TableCell className={``}>
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="terms2" 
                                        disabled={false}
                                        checked={ userSelect.includes(usuario.id)}
                                        onCheckedChange={(e)=>inserUserSelect(e as boolean, usuario )}
                                    />                            
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">{usuario.name?? '---'}</TableCell>
                            <TableCell className={ userSelect.includes(usuario.id)?`text-blue-400 `:''}>{usuario.email?? '---'}</TableCell>
                            <TableCell>{usuario.telefone?? '---'}</TableCell>
                            <TableCell>{usuario.image?? '---'}</TableCell>
                            <TableCell className="text-center">

                                {/* SELEÇÃO DA FUNÇÃO DOS USUARIOS */}
                                <Select onValueChange={(e)=>{                                    
                                    handlerChange(usuario.id, e as roleType)
                                }} defaultValue={usuario.role}>
                                    <SelectTrigger className="w-full">
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
                            <DropdownMenuTrigger className="hover:bg-gray-500 hover:text-black px-4 py-1 rounded-sm cursor-pointer">...</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel >{usuario.email}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={()=>{handlerDeleteUser(usuario.id)}}>Deletar</DropdownMenuItem>
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