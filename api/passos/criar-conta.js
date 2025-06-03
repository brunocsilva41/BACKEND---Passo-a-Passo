const { readJsonFile, setCorsHeaders } = require('../../lib/utils');

module.exports = function handler(req, res) {
  // Configurar CORS
  setCorsHeaders(res);
  
  // Responder ao preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Apenas aceitar GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }
    try {
    const data = readJsonFile('criar_conta.json');
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao processar criar-conta:', error.message);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      steps: []
    });
  }
};
