"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var http = require("http");
var PORT = process.env.PORT || 1337;
http.createServer(app_1.default).listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map