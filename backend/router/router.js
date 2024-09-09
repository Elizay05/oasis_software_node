const express = require("express");
const router = express.Router();

const controladorProductos = require('../controller/producto.controller');
const controladorCategorias = require('../controller/categoria.controller');


// INDEX
router.get('/index', async (req, res) => {
    res.render('pages/index');
});


// PRODUCTOS
router.get('/productos', async (req, res) => {
    const productos = await controladorProductos.verProductos(req, res)
    const categorias = await controladorCategorias.verCategorias(req, res)
    res.render('pages/productos/listarProductos', {productos, categorias});
});

router.post('/productos', async (req, res) => {
    controladorProductos.crearProducto(req, res, '/api/productos');
});

router.post('/productos/:id', async (req, res) => {
    controladorProductos.editarProducto(req, res, '/api/productos');
});

router.delete('/productos/:id', async (req, res) => {
    controladorProductos.eliminarProducto(req, res, '/api/productos');
});

// CATEGORIAS

router.get('/categorias', async (req, res) => {
    const categorias = await controladorCategorias.verCategorias(req, res)
    res.render('pages/categorias/listarCategorias', {categorias});
});

router.post('/categorias', async (req, res) => {
    controladorCategorias.crearCategoria(req, res, '/api/categorias');
});

router.post('/categorias/:id', async (req, res) => {
    controladorCategorias.editarCategoria(req, res, '/api/categorias');
});

router.delete('/categorias/:id', async (req, res) => {
    controladorCategorias.eliminarCategoria(req, res, '/api/categorias');
});



module.exports = router;