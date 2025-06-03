const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4441;

// Cache para armazenar os dados JSON em memória
const cache = new Map();

// Middleware otimizado
app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Desabilitar middleware desnecessário para performance
app.disable('x-powered-by');
app.set('trust proxy', 1);

// Função para ler arquivo JSON de forma segura com cache
function readJsonFile(filename) {
  // Verificar se já está em cache
  if (cache.has(filename)) {
    return cache.get(filename);
  }

  try {
    const filePath = path.join(__dirname, 'data', filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Armazenar no cache
    cache.set(filename, data);
    return data;
  } catch (error) {
    console.error(`Erro ao ler o arquivo ${filename}:`, error.message);
    const errorData = { steps: [] };
    cache.set(filename, errorData);
    return errorData;
  }
}

// Pré-carregar todos os arquivos JSON no startup para máxima performance
function preloadJsonFiles() {
  const files = ['criar_conta.json', 'login.json', 'pagar_assinatura_trocar.json'];
  files.forEach(file => {
    try {
      readJsonFile(file);
      console.log(`✅ Arquivo data/${file} carregado em cache`);
    } catch (error) {
      console.error(`❌ Erro ao carregar data/${file}:`, error.message);
    }
  });
}

// Pré-carregar arquivos
preloadJsonFiles();

// Rotas da API

// GET /passos/criar-conta
app.get('/passos/criar-conta', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  const data = readJsonFile('criar_conta.json');
  res.json(data);
});

// GET /passos/login
app.get('/passos/login', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  const data = readJsonFile('login.json');
  res.json(data);
});

// GET /passos/pagar-assinatura
app.get('/passos/pagar-assinatura', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  const data = readJsonFile('pagar_assinatura_trocar.json');
  res.json(data);
});

// GET /passos/trocar-assinatura
app.get('/passos/trocar-assinatura', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  const data = readJsonFile('pagar_assinatura_trocar.json');
  res.json(data);
});

// Rota de health check
app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.json({ 
    status: 'OK', 
    message: 'API está funcionando',
    timestamp: new Date().toISOString(),
    cache_size: cache.size
  });
});

// Rota para listar todas as rotas disponíveis
app.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.json({
    message: 'API de Passos - Endpoints disponíveis',
    endpoints: [
      'GET /passos/criar-conta',
      'GET /passos/login',
      'GET /passos/pagar-assinatura',
      'GET /passos/trocar-assinatura',
      'GET /health'
    ],
    version: '1.0.0',
    deployed_on: 'Vercel'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: 'Verifique se a URL está correta',
    available_endpoints: [
      '/passos/criar-conta',
      '/passos/login', 
      '/passos/pagar-assinatura',
      '/passos/trocar-assinatura',
      '/health'
    ]
  });
});

// Iniciar o servidor (para desenvolvimento local)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📖 Documentação disponível em: http://localhost:${PORT}`);
    console.log('📍 Endpoints disponíveis:');
    console.log(`   GET http://localhost:${PORT}/passos/criar-conta`);
    console.log(`   GET http://localhost:${PORT}/passos/login`);
    console.log(`   GET http://localhost:${PORT}/passos/pagar-assinatura`);
    console.log(`   GET http://localhost:${PORT}/passos/trocar-assinatura`);
    console.log(`   GET http://localhost:${PORT}/health`);
    console.log(`📦 Cache inicializado com ${cache.size} arquivos`);
  });
}

module.exports = app;
