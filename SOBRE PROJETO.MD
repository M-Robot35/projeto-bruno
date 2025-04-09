# 🚀 Iniciar o Projeto

### Desenvolvimento
```bash
npm run dev
```
NOME DO BANCO DE DADOS: bruno

### Produção
```bash
npm run start
```

> ⚠️ **Certifique-se de que o caminho do banco de dados esteja corretamente configurado.**

Você pode utilizar **Docker** para subir o banco de dados **PostgreSQL**, que já está configurado junto com:
- **Evolution**
- **Painel de Administração do PostgreSQL** (para visualizar e alterar dados)

---

# 📚 Documentação

### Next.js
- 📘 [Guia de Instalação](https://nextjs.org/docs/app/getting-started/installation)

### ShadCN UI
- 🛠️ [Instalação](https://ui.shadcn.com/docs/installation/next)
- 📂 [Componentes - Accordion](https://ui.shadcn.com/docs/components/accordion)
- 🌐 [Site Oficial](https://ui.shadcn.com/)

### Autenticação (OAuth)
- 🔐 [Auth.js (Atual)](https://authjs.dev/)
- 🧾 [NextAuth.js (Versão Anterior)](https://next-auth.js.org/)

---

# 🧬 Prisma ORM (PostgreSQL)

### Documentação
- 🔗 [Integração com Auth.js](https://authjs.dev/getting-started/adapters/prisma)
- 📖 [Documentação do Prisma para PostgreSQL](https://www.prisma.io/docs/postgres)

---

## 🔧 Comandos Úteis

### Criar e Executar Migração
```bash
npm exec prisma migrate dev
```

Esse comando:
1. Gera um arquivo de migração SQL.
2. Executa a migração no banco de dados.
3. Gera o cliente Prisma automaticamente.

### Gerar Cliente Prisma Manualmente
```bash
npm exec prisma generate
```

---

### 📝 Ao Alterar o Schema

Sempre que modificar o `schema.prisma`, execute novamente:

```bash
npm exec prisma migrate dev
```

Isso irá:
- Criar e aplicar as novas migrações.
- Regenerar o cliente Prisma com os tipos e métodos atualizados.

---

👨‍💻 Projeto configurado com as melhores práticas para desenvolvimento com Next.js, ShadCN, OAuth e Prisma.