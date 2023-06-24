module.exports = app => {

    const medico = require("../controllers/medicodao.controller.js");

    var router = require("express").Router();

    router.post("/", medico.create);

    router.put("/:id", medico.update);

    router.delete("/:id", medico.deleteOne);

    router.get("/", medico.findAll);

    router.get("/:id", medico.findOne);

    app.use('/api/medico', router);

};