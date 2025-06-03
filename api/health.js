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
  
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({ 
    status: 'OK', 
    message: 'API está funcionando',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    platform: 'Vercel Serverless'
  });
};
