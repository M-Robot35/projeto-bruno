
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModalComInput({ open, onOpenChange }: ModalProps) {
  const [nome, setNome] = useState("");

  const handleSalvar = () => {
    if (!nome.trim()) return;
    console.log("Salvando:", nome);
    onOpenChange(false); // Fecha o modal
    alert("Prompt salvo:  "+nome);
    setNome("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Digite o nome do novo prompt</DialogTitle>
          <DialogDescription>Insira o prompt e clique em salvar.</DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Nome do novo prompt"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          </DialogClose>
          <Button onClick={handleSalvar}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
