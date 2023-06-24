const db = require("../models");

const Paciente = db.Paciente;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Validate request

    if (!req.body.cedula) {

        res.status(400).send({

            message: "Debe enviar numero de cedula!"

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
    //const nombre = req.query.nombre;

    //var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

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