'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


type modalBase64Type= {
    base64:string
}


export default function ModalQrCode({base64}:modalBase64Type){
    return (
        <section>
            <Dialog>
                <DialogTrigger asChild>
                    {true}
                    {/* <Button variant="outline">Edit Profile</Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Escanei o QrCode</DialogTitle>
                    <DialogDescription>
                       Você tem 30 segundos para escanear
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    
                    {
                        base64 && (
                            <div className=" self-start">
                                <div className="">
                                    <p className="font-bold text-center mb-1">30s para Escaneie o QrCode</p>
                                    <img src={base64} alt="Image" className=" w-full h-full rounded-md  object-cover" />
                                </div>
                            </div>
                        )
                    }  
                    </div>
                    <DialogFooter>
                    <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>

        </section>
    )
}