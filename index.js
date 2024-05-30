const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('./models/Product');
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://vichofarias:vichofariasJalvarez2001@cluster0.hwyszzq.mongodb.net/ferremas_db?retryWrites=true&w=majority');

// Endpoint para consultar todos los productos
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// endpoint pra consultar producto por ID
// endpoint para consultar producto por ID
router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Convertimos el ID a un número entero ya que estamos utilizando IDs personalizados de tipo Number
        const productId = parseInt(id);
        
        // Buscamos el producto por su ID personalizado
        const product = await Product.findOne({ _id: productId });
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint para actualizar
router.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Endpoint para actualizar un producto
router.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { producto } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { producto }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint para borrar
router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.json(deletedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Endpoint para manejar consultas de contacto
router.post('/contact', (req, res) => {
    // Código para manejar la consulta de contacto
});

// Montar las rutas en la aplicación Express
app.use(express.json());
app.use('/api', router);

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error');
});
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

module.exports = app;
