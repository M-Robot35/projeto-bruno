'use server'

import { Interface } from "readline";
import { whatsappInstanceByUser } from "./whatsappActions";

type EstadoPayload = {
  textoUsuario: string;
  textoBot: string;
};
let textoUsr = "";


const prompts =[
  {
    id:"",
    nome:"",
    prompt:"",
    dataCriacao:"",
    status:true
  },
  {
    id:"",
    nome:"",
    prompt:"",
    dataCriacao:"",
    status:false
  },
  {
    id:"",
    nome:"",
    prompt:"",
    dataCriacao:"",
    status:true
  },
];

export async function estados(prevState: any, formData: FormData) {
  // Pegando o que o usuário digitou no formulário
  const textoUsuario = formData.get("textAreaInput")?.toString() || "";
  const textoBot = await buscaDadosPromptDoBOt();

  if (textoUsuario !== textoBot) {
    textoUsr = textoUsuario;

  }
  // Buscando a resposta do bot
  //const textoBot = await buscaDadosPromptDoBOt();  // Busca os dados no banco ou n8n

  console.log(textoUsuario);            // Complementa com o que o usuario digitou
  // Aqui você faria a inserção no banco de dados, por exemplo
  // INSERT OU UPDATE -> Criar a função de inserir no banco
  return textoUsuario;

  //   return {
  //     textoUsuario,
  //     textoBot,
  //   };
}
export async function buscaDadosPromptDoBOt() // BUscar no banco ou na API DO N8N  o prompt do BOT
{

 // const userReturn = await whatsappInstanceByUser();
 return [
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
}