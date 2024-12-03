module.exports = {
  apps: [
    {
      name: 'boilerplate-api',
      script: './bin/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
