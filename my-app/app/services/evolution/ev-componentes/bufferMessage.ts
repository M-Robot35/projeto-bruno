type BufferUsuario = {
    mensagens: string[];
    timer?: NodeJS.Timeout;
};

`
aguarda todas as mensagens serem enviadas apos um tempo e mandar todas juntas
para a IA e dar a resposta para o usuario

`
const buffers = new Map<string, BufferUsuario>();

// 30 segundos
const PAUSE_DURATION = 30 * 1000; // 30 segundos de pausa --- 5 minutos = 5×60×1000=300.000 milissegundos

export function buffReceberMensagem(
    numero: string, 
    texto: string, 
    responderIA: (texto: string, numero: string) => Promise<void>, 
    tempoEspera:number = PAUSE_DURATION) 
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