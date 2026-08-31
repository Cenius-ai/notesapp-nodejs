const { spawn } = require('child_process');

const port = process.env.PORT || '8081';

console.log(`Notes — starting Expo web on 0.0.0.0:${port}`);

const child = spawn('npx', [
  'expo', 'start', '--web',
  '--port', port,
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    REACT_NATIVE_PACKAGER_HOSTNAME: '0.0.0.0',
    BROWSER: 'none',
  },
});

child.on('exit', (code) => process.exit(code || 0));
