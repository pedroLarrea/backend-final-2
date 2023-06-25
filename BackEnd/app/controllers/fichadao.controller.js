const db = require("../models");

const Ficha = db.Ficha;
const Detalle = db.Detalle;
const Medico = db.Medico;
const Paciente = db.Paciente;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Validate request

    if (!req.body.fecha || !req.body.medicoId || !req.body.pacienteId) {

        res.status(400).send({

            message: "Fecha, Medico y Paciente son obligatorios!"

        });

        return;

    }

    // crea una medico

    const ficha = {
        medicoId: req.body.medicoId,
        pacienteId: req.body.pacienteId,
        fecha: req.body.fecha
    };

    // Guardamos a la base de datos

    Ficha.create(ficha)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Ha ocurrido un error al crear la ficha."

            });

        });

};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Ficha.findByPk(id, {
        include: [{
            model: Medico
        },
        {
            model: Paciente
        }]
    })

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: "Error al obtener ficha con id=" + id,
            });
        });
};

exports.findOneConDetalles = (req, res) => {
    const id = req.params.id;

    Ficha.findByPk(id, {
        include: {
            model: Detalle
        }
    })

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: "Error al obtener ficha con id=" + id,
            });
        });
};

exports.findAll = (req, res) => {

    Ficha.findAll({
        include: [{
            model: Medico
        },
        {
            model: Paciente
        }]
    })

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener las fichas.",
            });
        });
};

exports.findAllConDetalles = (req, res) => {

    Ficha.findAll({
        include: {
            model: Detalle
        }
    })

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener las fichas.",
            });
        });
};

exports.deleteOne = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Ficha.destroy({
            where: { id: id },
        })
            .then(function (data) {
                const res = {
                    success: true,
                    data: data,
                    message: "Eliminado con exito",
                };
                return res;
            })
            .catch((error) => {
                const res = { success: false, error: error };
                return res;
            });
        res.json(response);
    } catch (e) {
        console.log(e);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body.fecha || !req.body.medicoId || !req.body.pacienteId) {
            res.status(400).send({
                message: "Fecha, Medico y Paciente son obligatorios!",
            });

            return;
        }

        const response = await Ficha.update(
            {
                medicoId: req.body.medicoId,
                pacienteId: req.body.pacienteId,
                fecha: req.body.fecha
            },
            {
                where: { id: id },
            }
        )
            .then(function (data) {
                const res = {
                    success: true,
                    data: data,
                    message: "actualización completa",
                };
                return res;
            })
            .catch((error) => {
                const res = { success: false, error: error };
                return res;
            });
        res.json(response);
    } catch (e) {
        console.log(e);
    }
};

exports.createDetalle = (req, res) => {

    // Validate request

    if (!req.body.fichaId || !req.body.motivo || !req.body.diagnostico || !req.body.tratamiento) {

        res.status(400).send({

            message: "Ficha, Motivo, Diagnostico y tratamiento son obligatorios!"

        });

        return;

    }

    // crea una medico

    const detalle = {
        fichaId: req.body.fichaId,
        motivo: req.body.motivo,
        diagnostico: req.body.diagnostico,
        tratamiento: req.body.tratamiento
    };

    // Guardamos a la base de datos

    Detalle.create(detalle)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Ha ocurrido un error al crear el detalle."

            });

        });

};