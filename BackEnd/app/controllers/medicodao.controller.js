const db = require("../models");

const Medico = db.Medico;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Validate request

    if (!req.body.cedula || !req.body.nombre || !req.body.apellido
        || !req.body.especialidad || !req.body.username || !req.body.password) {

        res.status(400).send({

            message: "Nombre, Apellido, Cedula, Username y Password son obligatorios!"

        });

        return;

    }

    // crea una medico

    const medico = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        fechaNacimiento: req.body.fechaNacimiento,
        especialidad: req.body.especialidad,
        username: req.body.username,
        password: req.body.password
    };

    // Guardamos a la base de datos

    Medico.create(medico)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Ha ocurrido un error al crear un medico."

            });

        });

};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Medico.findByPk(id)

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: "Error al obtener medico con id=" + id,
            });
        });
};


exports.findAll = (req, res) => {

    Medico.findAll()

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener los medicos.",
            });
        });
};

exports.deleteOne = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Medico.destroy({
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

        if (!req.body.cedula || !req.body.nombre || !req.body.apellido
            || !req.body.especialidad || !req.body.username || !req.body.password) {
            res.status(400).send({
                message: "Nombre, Apellido, Cedula, Username y Password son obligatorios!",
            });

            return;
        }

        const response = await Medico.update(
            {
                cedula: req.body.cedula,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                fechaNacimiento: req.body.fechaNacimiento,
                especialidad: req.body.especialidad,
                username: req.body.username,
                password: req.body.password
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
