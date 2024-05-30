const mongoose = require('mongoose');

// Define un nuevo esquema para el contador
const counterSchema = new mongoose.Schema({
    _id: String,
    sequence_value: Number
});

// Modelo para el contador
const Counter = mongoose.model('Counter', counterSchema);

// Define el esquema del producto
const productSchema = new mongoose.Schema({
    _id: Number, // Utiliza un ID personalizado de tipo Number
    codigoProducto: String,
    marca: String,
    producto: {
        codigo: String,
        nombre: String,
        material: String,
        precio: [{
            fecha: Date,
            valor: Number,
            stock: Number,
        }]
    }
});

// Antes de guardar un nuevo producto, incrementa el contador y úsalo como ID
productSchema.pre('save', function(next) {
    var doc = this;
    Counter.findByIdAndUpdate({ _id: 'productId' }, { $inc: { sequence_value: 1 } }, { new: true, upsert: true }).then(function(counter) {
        doc._id = counter.sequence_value;
        next();
    }).catch(function(error) {
        return next(error);
    });
});

module.exports = mongoose.model('Product', productSchema);
