var connect = require('connect');
var serveStatic = require('serve-static');

const PORT=process.env.npm_package_config_port;

connect().use(serveStatic('./dist')).listen(PORT, function(){
    console.log('Server running on ' + PORT);
});
