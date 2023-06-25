module.exports = app => {

    const ficha = require("../controllers/fichadao.controller.js");

    var router = require("express").Router();

    router.post("/", ficha.create);

    router.put("/:id", ficha.update);

    router.delete("/:id", ficha.deleteOne);

    router.get("/", ficha.findAll);

    router.get("/completo", ficha.findAllConDetalles);

    router.get("/:id", ficha.findOne);

    router.get("/completo/:id", ficha.findOneConDetalles);

    // Para los detalles

    router.post("/detalle", ficha.createDetalle);

    router.delete("/detalle/:id", ficha.deleteDetalle);

    app.use('/api/ficha', router);

};