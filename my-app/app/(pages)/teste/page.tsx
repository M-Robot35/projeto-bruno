'use client'

import { Button } from "@/components/ui/button";
import { useActionState, useState, useEffect } from "react"; // Estudando
import { Textarea } from "@/components/ui/textarea";
import { estados, buscaDadosPromptDoBOt } from "@/app/actions/testeAction";
import { Switch } from "@/components/ui/switch"

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

  const [dadosBot, setDadosBot] = useState<string | "">("");

  const [dadosBot1, setDadosBot1] = useState<typeof prompts>(prompts);

  // Usando useEffect para buscar os dados de forma assíncrona
  useEffect(() => {
    const fetchData = async () => {
      const retornoBot = await buscaDadosPromptDoBOt();
      setDadosBot(retornoBot); // Atualiza o estado com os dados retornados
    };
    fetchData(); // Chama a função de buscar os dados quando o componente for montado
  }, []);

  async function chamaFuncaoIn(formData: FormData) {
    await estados(null, formData); // Passando o estado anterior (prevState) e o formData
    const retornoBot = await buscaDadosPromptDoBOt();
    setDadosBot(retornoBot); // Atualiza o estado com os dados retornados    
  }

  return (
    <section>

      <div className="flex h-100 content-center space-x-18 gap-8 px-120 py-12 ">
        <div className="w-full">

          {
            dadosBot1.map((item) => {
              return (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">

                    <AccordionTrigger>{item.nome}</AccordionTrigger>
                    <AccordionContent>

                      <Textarea
                        name="textAreaInput"
                        placeholder="Sua mensagem aqui"
                       // onChange={event => setDadosBot(event.target.value)}
                        // value={dadosBot1.find(Item => Item.status == true)?.prompt}
                        value={item.prompt}                         
                        />
                         <Switch
                      checked={item.status}
                      //onCheckedChange={n}
                    />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            })}
        </div>
      </div>
      {/* {
        dadosBot1.map((item) => {
          return (
            <div className="bg-amber-800 text-black">{item.nome}</div>
          )
        })
      } */}

{/* 
      <div className="grid h-100 content-center space-x-18 gap-8 px-120 py-12">

        <form action={chamaFuncaoIn}>

          <Button type="button">
            Enviar texto e resposta do bot
          </Button>


          <Textarea
            name="textAreaInput"
            placeholder="Sua mensagem aqui"
            // onChange={event => setDadosBot(event.target.value)}
            value={
              dadosBot1.find(Item => Item.status == true)?.prompt
            }
          // value={dadosBot || ""}
          />
          <div className="pt-5" />

          <Button type="submit">
            Enviar texto e resposta do bot
          </Button>

        </form>
        {
          dadosBot1.map((item) => {
            return (
              <div className="bg-amber-800 text-black">{item.nome}</div>
            )
          })
        }
      </div> */}
    </section>
  );
}
