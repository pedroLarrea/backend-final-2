module.exports = (sequelize, Sequelize) => {

    const Paciente = sequelize.define("Paciente", {

        nombre: {

            type: Sequelize.STRING

        },

        apellido: {

            type: Sequelize.STRING

        },

        cedula: {

            type: Sequelize.STRING,
            unique: true

        },

        email: {

            type: Sequelize.STRING

        },

        telefono: {

            type: Sequelize.STRING

        },

        fechaNacimiento: {

            type: Sequelize.DATE

        },

        id: {

            type: Sequelize.BIGINT,

            primaryKey: true,

            autoIncrement: true

        }

    });

    return Paciente;

};