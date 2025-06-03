const fs = require('fs');
const path = require('path');

console.log('🧪 Testando endpoints da API...\n');

// Simular req e res objects
function createMockReq(method = 'GET') {
  return { method };
}

function createMockRes() {
  const headers = {};
  const res = {
    headers,
    statusCode: 200,
    setHeader: (key, value) => { headers[key] = value; },
    status: function(code) { 
      this.statusCode = code; 
      return this; 
    },
    json: function(data) { 
      this.data = data;
      return this;
    },
    end: function() { 
      this.ended = true;
      return this;
    }
  };
  return res;
}

// Testar cada endpoint
const endpoints = [
  { name: 'Health', path: './api/health.js' },
  { name: 'Index', path: './api/index.js' },
  { name: 'Criar Conta', path: './api/passos/criar-conta.js' },
  { name: 'Login', path: './api/passos/login.js' },
  { name: 'Pagar Assinatura', path: './api/passos/pagar-assinatura.js' },
  { name: 'Trocar Assinatura', path: './api/passos/trocar-assinatura.js' }
];

endpoints.forEach(endpoint => {
  try {
    console.log(`🔍 Testando ${endpoint.name}...`);
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(endpoint.path)) {
      console.log(`❌ Arquivo não encontrado: ${endpoint.path}`);
      return;
    }
    
    // Carregar o handler
    delete require.cache[require.resolve(endpoint.path)];
    const handler = require(endpoint.path);
    
    if (typeof handler !== 'function') {
      console.log(`❌ ${endpoint.name} - Handler não é uma função`);
      return;
    }
    
    // Testar com GET request
    const req = createMockReq('GET');
    const res = createMockRes();
    
    handler(req, res);
    
    if (res.statusCode === 200) {
      console.log(`✅ ${endpoint.name} - OK (${res.statusCode})`);
      if (res.data && res.data.steps) {
        console.log(`   📝 ${res.data.steps.length} passos encontrados`);
      } else if (res.data && res.data.message) {
        console.log(`   📝 ${res.data.message}`);
      }
    } else {
      console.log(`⚠️  ${endpoint.name} - Status ${res.statusCode}`);
    }
    
    // Verificar headers CORS
    if (res.headers['Access-Control-Allow-Origin'] === '*') {
      console.log(`   ✅ CORS configurado`);
    } else {
      console.log(`   ⚠️  CORS pode estar faltando`);
    }
    
  } catch (error) {
    console.log(`❌ ${endpoint.name} - Erro: ${error.message}`);
  }
  
  console.log('');
});

console.log('🏁 Teste dos endpoints concluído!');
console.log('\n📋 Próximos passos:');
console.log('1. git add .');
console.log('2. git commit -m "Endpoints corrigidos para CommonJS"');
console.log('3. git push origin main');
console.log('4. Deploy na Vercel deve funcionar agora!');
