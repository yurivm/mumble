module.exports = {
  apps : [{
    name: 'mumble',
    script: 'index.js',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: '',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '256M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'pi',
      host : ['noise-pi'],
      ref  : 'origin/master',
      repo : 'git@github.com:yurivm/mumble.git',
      path : '/home/pi/mumble',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
