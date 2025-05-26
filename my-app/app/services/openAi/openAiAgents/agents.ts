// https://openai.github.io/openai-agents-python/
//https://github.com/openai/openai-node
// src/agent.ts

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Defina no .env
   //maxRetries: 0, // Erros retornados da OPenIa o padrão é 2
});
export type ChatMessage = {
  role: 'system' | 'user' | 'assistant',
  content: string
};

async function runAgent() {
  // 1. Crie ou recupere um assistente
  const assistant = await openai.beta.assistants.create({
    name: 'Agente Exemplo',
    instructions: 'Você é um assistente útil que responde perguntas sobre programação.',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4-turbo',
  });

  // 2. Crie uma thread de conversa
  const thread = await openai.beta.threads.create();

  // 3. Adicione uma mensagem à thread
  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: 'Como faço uma requisição HTTP em TypeScript?',
  });

  // 4. Execute o assistant na thread
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  // 5. Aguarde a conclusão do run
  let completedRun;
  while (true) {
    const checkRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    if (checkRun.status === 'completed') {
      completedRun = checkRun;
      break;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  // 6. Recupere as mensagens da thread
  const messages = await openai.beta.threads.messages.list(thread.id);

  // 7. Exibir a última resposta
  for (const msg of messages.data.reverse()) {
    if (msg.role === 'assistant') {

      console.log('Resposta do agente:', msg.content[0]);      
      break;
    }
  }
}
/*
//Prompt base de conversas
export async function iaConversation(prompt: string, mensagem: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: mensagem }
      ],
    });

    const resposta = response.choices?.[0]?.message?.content || '';
    return resposta.trim();
  } catch (error) {
    console.error('Erro ao conversar com a IA:', error);
    return 'Desculpe, ocorreu um erro ao processar sua solicitação.';
  }
}
*/
export async function iaConversation(
  prompt: string,
  historico: ChatMessage[],
  novaMensagem: string
): Promise<{ resposta: string, historicoAtualizado: ChatMessage[] }> {
  try {
    const mensagens: ChatMessage[] = [
      { role: 'system', content: prompt },
      ...historico,
      { role: 'user', content: novaMensagem }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',//'gpt-4o',
      messages: mensagens,
    });

    const resposta = response.choices?.[0]?.message?.content ?? '';
    const historicoAtualizado: ChatMessage[] = [
      ...historico,
      { role: 'user', content: novaMensagem },
      { role: 'assistant', content: resposta }
    ];

    return { resposta: resposta.trim(), historicoAtualizado };
  } catch (error) {
    console.error('Erro ao conversar com a IA:', error);
    return {
      resposta: 'Desculpe, ocorreu um erro ao processar sua solicitação.',
      historicoAtualizado: historico
    };
  }
}
//runAgent().catch(console.error);