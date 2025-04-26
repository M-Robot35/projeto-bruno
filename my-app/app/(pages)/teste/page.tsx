'use client'

import { Button } from "@/components/ui/button";
import { useActionState, useState, useEffect } from "react"; // Estudando
import { Textarea } from "@/components/ui/textarea";
import { estados, buscaDadosPromptDoBOt } from "@/app/actions/testeAction";

export default function Page() {

  const [dadosBot, setDadosBot] = useState<string | "">("");

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
      <div className="grid h-100 content-center space-x-18 gap-8 px-120 py-12">
        <form action={chamaFuncaoIn}>
          <Textarea
            name="textAreaInput"
            placeholder="Sua mensagem aqui"
            onChange={event => setDadosBot(event.target.value)}
            value={dadosBot || ""}
          />
          <div className="pt-5" />
          <Button type="submit">
            Enviar texto e resposta do bot
          </Button>
        </form>
      </div>
    </section>
  );
}