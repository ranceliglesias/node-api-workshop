var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    model: String,
    os: String,
    storage: String,
    camera: String
});

// Export the schema
// var Product = mongoose.model('Product', productSchema);
// module.exports = Product;

module.exports = mongoose.model('Product', productSchema);
