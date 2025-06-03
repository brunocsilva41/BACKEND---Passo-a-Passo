const fs = require('fs');
const path = require('path');

console.log('🧪 Testando configuração da API...\n');

// Verificar se todos os arquivos necessários existem
const requiredFiles = [
  'server.js',
  'package.json', 
  'vercel.json',
  'criar_conta.json',
  'login.json',
  'pagar_assinatura_trocar.json'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} - OK`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 Todos os arquivos necessários estão presentes!');
  console.log('🚀 Projeto pronto para deploy na Vercel!');
  
  console.log('\n📋 Próximos passos:');
  console.log('1. git init');
  console.log('2. git add .');
  console.log('3. git commit -m "API otimizada para Vercel"');
  console.log('4. Subir para GitHub');
  console.log('5. Deploy na Vercel');
} else {
  console.log('\n❌ Alguns arquivos estão faltando. Verifique a estrutura do projeto.');
}

// Testar leitura dos arquivos JSON
console.log('\n📂 Testando leitura dos arquivos JSON:');

const jsonFiles = ['criar_conta.json', 'login.json', 'pagar_assinatura_trocar.json'];

jsonFiles.forEach(file => {
  try {
    const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    const data = JSON.parse(content);
    console.log(`✅ ${file} - ${data.steps?.length || 0} passos`);
  } catch (error) {
    console.log(`❌ ${file} - Erro: ${error.message}`);
  }
});

console.log('\n🏁 Teste concluído!');
