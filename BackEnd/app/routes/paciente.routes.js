module.exports = app => {

    const paciente = require("../controllers/pacientedao.controller.js");

    var router = require("express").Router();

    router.post("/", paciente.create);

    router.put("/:id", paciente.update);

    router.delete("/:id", paciente.deleteOne);

    router.get("/", paciente.findAll);

    router.get("/:id", paciente.findOne);

    app.use('/api/paciente', router);

};