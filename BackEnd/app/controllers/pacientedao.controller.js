const db = require("../models");

const Paciente = db.Paciente;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Validate request

    if (!req.body.cedula ||  !req.body.nombre || !req.body.apellido) {

        res.status(400).send({

            message: "Nombre, Apellido y Cedula son obligatorios!"

        });

        return;

    }

    // crea una venta

    const paciente = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        fechaNacimiento: req.body.fechaNacimiento
    };

    // Guardamos a la base de datos

    Paciente.create(paciente)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Ha ocurrido un error al crear un paciente."

            });

        });

};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Paciente.findByPk(id)

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: "Error al obtener paciente con id=" + id,
            });
        });
};


exports.findAll = (req, res) => {

    Paciente.findAll()

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener los clientes.",
            });
        });
};

exports.deleteOne = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Paciente.destroy({
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

        if (!req.body.cedula ||  !req.body.nombre || !req.body.apellido) {
            res.status(400).send({
                message: "Nombre, Apellido y Cedula son obligatorios!",
            });

            return;
        }

        const response = await Paciente.update(
            {
                cedula: req.body.cedula,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                fechaNacimiento: req.body.fechaNacimientoF
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
