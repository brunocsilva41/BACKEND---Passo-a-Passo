const { setCorsHeaders } = require('../lib/utils');

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
  
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).json({
    message: 'API de Passos - Endpoints disponíveis',
    endpoints: [
      'GET /api/passos/criar-conta',
      'GET /api/passos/login',
      'GET /api/passos/pagar-assinatura',
      'GET /api/passos/trocar-assinatura',
      'GET /api/health'
    ],
    version: '1.0.0',
    platform: 'Vercel Serverless',
    documentation: 'https://github.com/seu-usuario/seu-repo#readme'
  });
};
