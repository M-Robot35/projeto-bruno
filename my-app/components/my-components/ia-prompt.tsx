'use client'

import { Button } from "@/components/ui/button";
import { useActionState, useState, useEffect } from "react"; // Estudando
import { Textarea } from "@/components/ui/textarea";
import { estados, buscaDadosPromptDoBOt } from "@/app/actions/testeAction";
import { Switch } from "@/components/ui/switch";
import { ModalComInput } from "./ia-modal-adiconar-prompt";

import {
  User,
  MessageCirclePlus,
  BotMessageSquare,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { it } from "node:test";

//helper
// Adicionar Item    setItems([...objeto, items])
// Excluir   Item    setItems(items.filter(item=>item.prop!=prop))
// Atualizar Item    setItems(item.map(item=>item.prop==prop?new item:item))
//const [dadosBot, setDadosBot] = useState<string | "">("");

const users = await buscaDadosPromptDoBOt();

const IAPrompt = () => {

  const [dadosBot, setDadosBot] = useState<typeof users>(users);
  const [isEnabled, setIsEnabled] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)


    setTimeout(function () {
      if (isEnabled) alert("Bot Desativado");
      else alert("Bot Ativado");
    }, 2000);

  };

  const add = (id: string, novoValor: string) => {
    setDadosBot(prev =>
      prev.map(item =>
        item.id === id ? { ...item, prompt: novoValor } : item
      )
    );
  };

  const atualizarStatus = (id: string, novoStatus: boolean) => {
    setDadosBot(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: novoStatus }
          : { ...item, status: false } // desativa os outros
      )
    );
  };

  const salvarAlteracoes = () => {
    alert("Dados Salvos--> depois alterar pra notificar com um toast");
    //Enviar pro banco as alterações
    console.log(dadosBot)
  }
  
  return (

    <section>
      <div className="">
        <div className="w-full">

          <div className="flex justify-between items-center rounded-md w-full h-15 border px-4 py-2">
            <div>

              <div className="p-4">
                <Button onClick={() => setModalAberto(true)}>Inserir um novo Prompt</Button>
                <ModalComInput open={modalAberto} onOpenChange={setModalAberto} />
              </div>            
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="ativarBot"
                checked={isEnabled}
                onCheckedChange={toggleSwitch}
              />
              <label htmlFor="ativarBot">Ativar/Desativar Robô</label>
            </div>
          </div>

          {
            dadosBot.map((item) => {
              return (
                <Accordion key={item.id} type="single" collapsible className="w-full">
                  <AccordionItem value="acordionItems">

                    <AccordionTrigger className="w-full text-left">
                      <div className="flex items-center gap-2">
                        <BotMessageSquare className={item.status ? "text-green-500" : "text-red-600"} />
                        <span>{item.nome}</span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>

                      <Textarea className="gap-2"
                        name="textAreaInput"
                        placeholder="Sua mensagem aqui"
                        onChange={event => add(item.id, event.target.value)}
                        value={item.prompt}
                      />
                      <Switch className="gap-2 mt-2"
                        checked={item.status}
                        onCheckedChange={(checked) => atualizarStatus(item.id, checked)}
                      /><label className="ml-3">Ativar/Desativar Prompt</label>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            })}
          <div className="w-full text-end"><Button onClick={salvarAlteracoes}>Salvar alterações</Button></div>
        </div>
      </div>
    </section>

  )
};

export default IAPrompt;