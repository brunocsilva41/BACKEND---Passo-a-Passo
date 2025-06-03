# 🚀 Guia de Deploy na Vercel

## Preparação do Projeto

Seu projeto já está configurado e otimizado para deploy na Vercel com máxima performance!

## Opção 1: Deploy via Interface Web (Recomendado)

### 1. Criar repositório Git
```bash
git init
git add .
git commit -m "API de Passos otimizada para Vercel"
```

### 2. Subir para GitHub
1. Crie um repositório no GitHub
2. Conecte o repositório local:
```bash
git remote add origin https://github.com/seu-usuario/nome-do-repo.git
git branch -M main
git push -u origin main
```

### 3. Deploy na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte sua conta GitHub
4. Selecione o repositório
5. Clique em "Deploy"

**Pronto! Sua API estará no ar em segundos!**

## Opção 2: Deploy via CLI

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Login na Vercel
```bash
vercel login
```

### 3. Deploy
```bash
# Deploy de teste
vercel

# Deploy para produção
vercel --prod
```

## 🌍 Sua API Pública

Após o deploy, você receberá uma URL como:
```
https://api-passos-abcd123.vercel.app
```

### Endpoints disponíveis:
- `GET /` - Documentação da API
- `GET /health` - Status da API
- `GET /passos/criar-conta` - Passos para criar conta
- `GET /passos/login` - Passos para login
- `GET /passos/pagar-assinatura` - Passos para pagar assinatura
- `GET /passos/trocar-assinatura` - Passos para trocar assinatura

## 🎯 Recursos de Performance Implementados

✅ **Cache em memória**: Arquivos JSON carregados uma única vez
✅ **Headers de cache**: Respostas cacheadas por 5 minutos
✅ **CORS otimizado**: Acesso público sem autenticação
✅ **Compressão automática**: Vercel comprime automaticamente
✅ **CDN global**: Distribuição mundial automática
✅ **Cold start otimizado**: Inicialização rápida

## 🔧 Configurações Automáticas

O arquivo `vercel.json` configura automaticamente:
- Timeout de 10 segundos
- Cache de 5 minutos para endpoints
- CORS aberto para todas as origens
- Roteamento otimizado

## 📊 Monitoramento

Após o deploy, você pode:
1. Ver logs em tempo real no dashboard da Vercel
2. Monitorar performance e uso
3. Configurar domínio customizado
4. Ver analytics de requisições

## 🚨 Importante

- A API é **100% pública** (sem autenticação)
- Suporta **qualquer origem** (CORS aberto)
- **Cache otimizado** para máxima velocidade
- **Pronta para produção** e integração com Dialogflow
