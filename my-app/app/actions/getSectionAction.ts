import { auth } from '@/auth'
import { Logs } from '../core/logs'

export type sessionType = {
    name: string|null,
    email: string,
    image: string|null,
    id: string,
    role: string
  }

export async function getServerAction(): Promise<sessionType | null> {
  const session = await auth()

  try {
    if (!session?.user?.id) {
      Logs.error('getServerAction', 'Não foi possível encontrar a Sessão do usuário')
      return null
    }
    return session.user
  } catch (error) {
    Logs.error('getServerAction', 'Não foi possível encontrar a Sessão do usuário')
    return null
  }
}