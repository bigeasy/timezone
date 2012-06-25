var connect = require("connect");

var app = connect()
  .use(connect.logger())
  .use(connect.static('timezone'))
  .listen(8086);
