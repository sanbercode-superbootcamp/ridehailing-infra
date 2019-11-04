const http = require("http");

const server = http.createServer((req, res) => {
  var flood = '';
  while(flood.length < 999999) {
    flood = flood + 'x';
  }
  res.write('ok');
  res.end();
});

const PORT = 80;

server.listen(PORT, () => {
  process.stdout.write('server listen on port ' + PORT);
});
