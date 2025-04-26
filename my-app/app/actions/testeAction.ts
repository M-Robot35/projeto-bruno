'use server'

type EstadoPayload = {
  textoUsuario: string;
  textoBot: string;
};

export async function estados(prevState: any, formData: FormData) {
  // Pegando o que o usuário digitou no formulário
  const textoUsuario = formData.get("textAreaInput")?.toString() || "";

  // Buscando a resposta do bot
  const textoBot = await buscaDadosPromptDoBOt();  // Busca os dados no banco ou n8n

  console.log(textoBot + textoUsuario);            // Complementa com o que o usuario digitou
                                                   // Aqui você faria a inserção no banco de dados, por exemplo
                                                   // INSERT OU UPDATE -> Criar a função de inserir no banco
  return textoBot + textoUsuario;                                                   

//   return {
//     textoUsuario,
//     textoBot,
//   };
}
export async function buscaDadosPromptDoBOt() // BUscar no banco ou na API DO N8N  o prompt do BOT
{
  return "Você é um agente de vendas. Sua função é vender produtos X, Y, Z." ;
}