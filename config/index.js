var convict = require('convict');
var config = convict(require('./schema'));
var CONFIG_PATH = process.env.CONFIG_PATH;

if (CONFIG_PATH) {
    //Load a custom configuration path.
    config.loadFile(CONFIG_PATH);
}

config.validate();

module.exports = config.get();
