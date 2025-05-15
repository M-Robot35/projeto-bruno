type BufferUsuario = {
    mensagens: string[];
    timer?: NodeJS.Timeout;
};

`
aguarda todas as mensagens serem enviadas apos um tempo e mandar todas juntas
para a IA e dar a resposta para o usuario

`
const buffers = new Map<string, BufferUsuario>();
  
export function receberMensagem(
    numero: string, 
    texto: string, 
    responderIA: (texto: string, numero: string) => Promise<void>, 
    tempoEspera:number = 5000) 
{
    
    let buffer = buffers.get(numero);
  
    if (!buffer) {
      buffer = { mensagens: [] };
      buffers.set(numero, buffer);
    }
  
    buffer.mensagens.push(texto);
  
    if (buffer.timer) clearTimeout(buffer.timer);
  
    buffer.timer = setTimeout(async () => {
      const tudoJunto = buffer!.mensagens.join(' ').trim();
      
      await responderIA(tudoJunto, numero);
  
      buffers.delete(numero);
    }, tempoEspera);
}