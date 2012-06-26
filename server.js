var connect = require("connect");

var app = connect()
  .use(connect.logger())
  .use(connect.static(process.argv[2]))
  .listen(8086);
