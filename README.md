# API de Passos - Instruções

Esta é uma API REST em Node.js com Express que fornece endpoints para consultar passos de instruções para diferentes ações na plataforma. **Otimizada para máxima performance na Vercel**.

## 🚀 Deploy na Vercel

### Método 1: Deploy Automático via Git
1. Faça push do projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte sua conta GitHub
4. Importe o repositório
5. A Vercel detectará automaticamente as configurações

### Método 2: Deploy via Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## 🎯 Performance Otimizada

Esta API foi otimizada para:
- ⚡ **Cache em memória**: Arquivos JSON são carregados uma única vez
- 🌐 **CORS otimizado**: Configurado especificamente para máxima compatibilidade
- 📦 **Headers de cache**: Respostas são cacheadas por 5 minutos
- 🚀 **Serverless**: Otimizada para funções Vercel
- 💾 **Pré-carregamento**: Todos os arquivos são carregados no startup

## 🌍 Exemplo de URL Pública

Após o deploy na Vercel, sua API estará disponível em:
```
https://seu-projeto.vercel.app/passos/criar-conta
https://seu-projeto.vercel.app/passos/login
https://seu-projeto.vercel.app/passos/pagar-assinatura
https://seu-projeto.vercel.app/passos/trocar-assinatura
```

## 📚 Endpoints Disponíveis

### GET /passos/criar-conta
Retorna os passos para criar uma conta na plataforma.

**Exemplo de resposta:**
```json
{
  "steps": [
    {
      "title": "1️⃣ Clique em 'Criar sua Conta'",
      "text": "Na tela inicial, clique no botão **Criar sua Conta**.",
      "image_url": "https://storage.cloud.google.com/e-saude-assist/imagens/criar_sua_conta_com_seta.png",
      "alt_text": "Botão Criar Conta com seta"
    }
  ]
}
```

### GET /passos/login
Retorna os passos para fazer login na plataforma.

### GET /passos/pagar-assinatura
Retorna os passos para pagar/renovar a assinatura.

### GET /passos/trocar-assinatura
Retorna os passos para trocar de plano (usa o mesmo arquivo que pagar-assinatura).

### GET /health
Endpoint de verificação de saúde da API.

### GET /
Retorna a lista de todos os endpoints disponíveis.

## 🔧 Configuração

### Variáveis de Ambiente
- `PORT`: Porta onde a API será executada (padrão: 3000)

### Arquivos JSON
A API lê os seguintes arquivos JSON da pasta `data/` para servir os dados:
- `data/criar_conta.json` - Passos para criar conta
- `data/login.json` - Passos para fazer login
- `data/pagar_assinatura_trocar.json` - Passos para pagar/trocar assinatura

## 🌐 CORS

A API está configurada com CORS habilitado para permitir requisições de qualquer origem, facilitando a integração com aplicações externas como o Dialogflow.

## 📝 Formato de Resposta

Todas as respostas seguem o formato:
```json
{
  "steps": [
    {
      "title": "string",
      "text": "string", 
      "image_url": "string",
      "alt_text": "string"
    }
  ]
}
```

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- CORS
- File System (fs) para leitura de arquivos JSON

## 📋 Scripts Disponíveis

- `npm start` - Executa a aplicação em modo de produção
- `npm run dev` - Executa a aplicação em modo de desenvolvimento com nodemon
