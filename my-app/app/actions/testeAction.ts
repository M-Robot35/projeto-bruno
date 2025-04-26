'use server'

type EstadoPayload = {
  textoUsuario: string;
  textoBot: string;
};
let textoUsr = "";
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
  if (!textoUsr)
    return "Você é um agente de vendas. Sua função é vender produtos X, Y, Z." + textoUsr;
  else {
    return textoUsr
  }

}