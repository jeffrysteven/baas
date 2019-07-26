const Hapi = require('@hapi/hapi');
const Parse = require('parse/node');
Parse.initialize('app', 'appkey');
Parse.serverURL = process.env.PARSE_SERVER_URL;
const routes = require('./routes')(Parse);

const init = async () => {
  const server = Hapi.server({
    port: 80,
    host: '0.0.0.0'
  });
  server.route(routes);
  await server.start();
  console.log(process.env);
  console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
init();
