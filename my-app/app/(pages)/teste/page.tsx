'use client'

import { Button } from "@/components/ui/button";
import { useActionState, useState, useEffect } from "react"; // Estudando
import { Textarea } from "@/components/ui/textarea";
import { estados, buscaDadosPromptDoBOt } from "@/app/actions/testeAction";
import { Switch } from "@/components/ui/switch"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const prompts = [
  {
    id: "1",
    nome: "Default",
    prompt: " voce e o bo1",
    dataCriacao: "01/02/1237",
    status: false
  },
  {
    id: "2",
    nome: "Prompt 1",
    prompt: " voce e o bot2",
    dataCriacao: "01/02/1237",
    status: true
  },
  {
    id: "3",
    nome: "Prompt Recuperação",
    prompt: " voce e o bo3",
    dataCriacao: "01/02/1237",
    status: false
  },
];

export default function Page() {

  //const [dadosBot, setDadosBot] = useState<string | "">("");

  const [dadosBot, setDadosBot] = useState<typeof prompts>(prompts);

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);



  // Usando useEffect para buscar os dados de forma assíncrona
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const retornoBot = await buscaDadosPromptDoBOt();
  //     setDadosBot(retornoBot); // Atualiza o estado com os dados retornados
  //   };
  //   fetchData(); // Chama a função de buscar os dados quando o componente for montado
  // }, []);

  // async function chamaFuncaoIn(formData: FormData) {
  //   await estados(null, formData); // Passando o estado anterior (prevState) e o formData
  //   const retornoBot = await buscaDadosPromptDoBOt();
  //   setDadosBot(retornoBot); // Atualiza o estado com os dados retornados    
  // }

  return (
    <section>
      <div className="flex h-100 content-center space-x-18 gap-8 px-120 py-12  ">
        <div className="w-full">
          <div className="border-amber-400 items-end text-end gap-2 w-full h-15 ">         
              <Switch id="ativarBot" className="gap-2 mt-2"
                checked={isEnabled}
                onCheckedChange={toggleSwitch}
              /><label className="ml-3">Ativar/Desativar Robô</label>
          </div>
          {
            dadosBot.map((item) => {
              return (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">

                    <AccordionTrigger>{item.nome}</AccordionTrigger>
                    <AccordionContent>

                      <Textarea className="gap-2"
                        name="textAreaInput"
                        placeholder="Sua mensagem aqui"
                        // onChange={event => setDadosBot(event.target.value)}
                        // value={dadosBot1.find(Item => Item.status == true)?.prompt}
                        value={item.prompt}
                      />
                      <Switch className="gap-2 mt-2"
                        checked={item.status}
                      //onCheckedChange={n}                    
                      /><label className="ml-3">Ativar/Desativar Prompt</label>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            })}
        </div>
      </div>

    </section>
  );
}
