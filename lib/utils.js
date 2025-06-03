const fs = require('fs');
const path = require('path');

// Cache para armazenar os dados JSON em memória
const cache = new Map();

// Função para ler arquivo JSON de forma segura com cache
function readJsonFile(filename) {
  // Verificar se já está em cache
  if (cache.has(filename)) {
    return cache.get(filename);
  }

  try {
    const filePath = path.join(process.cwd(), filename);
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

// Configurar CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'public, max-age=300');
}

module.exports = { readJsonFile, setCorsHeaders };
