const { spawn } = require('child_process');

console.log('🚀 Starting NutriAI Development Environment...');

// Start Express Backend on port 3001
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: process.env.PORT || '3001' }
});

// Start Vite Frontend on port 5173
const vite = spawn('npx', ['vite'], {
  stdio: 'inherit',
  env: process.env
});

let isCleaningUp = false;
function cleanup() {
  if (isCleaningUp) return;
  isCleaningUp = true;
  console.log('\n🛑 Shutting down NutriAI services...');
  try { server.kill('SIGINT'); } catch {}
  try { vite.kill('SIGINT'); } catch {}
  setTimeout(() => process.exit(0), 500);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

server.on('exit', (code) => {
  if (!isCleaningUp && code !== 0 && code !== null) {
    console.error(`Backend server exited with code ${code}`);
  }
});

vite.on('exit', (code) => {
  if (!isCleaningUp && code !== 0 && code !== null) {
    console.error(`Vite client exited with code ${code}`);
  }
});
