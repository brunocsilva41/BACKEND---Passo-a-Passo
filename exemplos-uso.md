# Exemplos de uso da API

## 🌐 Testando a API na Vercel

Substitua `sua-api.vercel.app` pela URL real da sua API após o deploy.

### 1. Verificar se a API está funcionando
```bash
curl https://sua-api.vercel.app/health
```

**Resposta esperada:**
```json
{
  "status": "OK",
  "message": "API está funcionando",
  "timestamp": "2025-06-03T...",
  "cache_size": 3
}
```

### 2. Listar todos os endpoints
```bash
curl https://sua-api.vercel.app/
```

### 3. Obter passos para criar conta
```bash
curl https://sua-api.vercel.app/passos/criar-conta
```

### 4. Obter passos para login
```bash
curl https://sua-api.vercel.app/passos/login
```

### 5. Obter passos para pagar assinatura
```bash
curl https://sua-api.vercel.app/passos/pagar-assinatura
```

### 6. Obter passos para trocar assinatura
```bash
curl https://sua-api.vercel.app/passos/trocar-assinatura
```

## 🧪 Testando Performance

### Teste de velocidade
```bash
# Primeira requisição (cold start)
time curl https://sua-api.vercel.app/passos/criar-conta

# Segunda requisição (cache ativo)
time curl https://sua-api.vercel.app/passos/criar-conta
```

### Teste de cache
```bash
# Verificar headers de cache
curl -I https://sua-api.vercel.app/passos/criar-conta
```

Você deve ver:
```
Cache-Control: public, max-age=300
```

## 🌐 Testando no navegador

Abra seu navegador e acesse:
- https://sua-api.vercel.app
- https://sua-api.vercel.app/health
- https://sua-api.vercel.app/passos/criar-conta
- https://sua-api.vercel.app/passos/login
- https://sua-api.vercel.app/passos/pagar-assinatura
- https://sua-api.vercel.app/passos/trocar-assinatura

## 🤖 Para usar no Dialogflow

Configure webhooks apontando para:
- https://sua-api.vercel.app/passos/criar-conta
- https://sua-api.vercel.app/passos/login
- https://sua-api.vercel.app/passos/pagar-assinatura
- https://sua-api.vercel.app/passos/trocar-assinatura

### Exemplo de configuração no Dialogflow:

1. **Intent**: `criar.conta`
   - **Webhook URL**: `https://sua-api.vercel.app/passos/criar-conta`
   - **Method**: GET

2. **Intent**: `fazer.login`
   - **Webhook URL**: `https://sua-api.vercel.app/passos/login`
   - **Method**: GET

## 📊 Testando CORS

Para testar se o CORS está funcionando, execute no console do navegador:
```javascript
fetch('https://sua-api.vercel.app/passos/criar-conta')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

## 🔄 Testando localmente (desenvolvimento)

### Instalar dependências
```bash
npm install
```

### Executar localmente
```bash
npm run dev
```

### Testar endpoints locais
```bash
curl http://localhost:4441/health
curl http://localhost:4441/passos/criar-conta
curl http://localhost:4441/passos/login
curl http://localhost:4441/passos/pagar-assinatura
curl http://localhost:4441/passos/trocar-assinatura
```
