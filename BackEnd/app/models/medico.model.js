module.exports = (sequelize, Sequelize) => {

    const Medico = sequelize.define("Medico", {

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

        especialidad: {

            type: Sequelize.STRING

        },

        username: {

            type: Sequelize.STRING,
            unique: true

        },

        password: {

            type: Sequelize.STRING

        },

        id: {

            type: Sequelize.BIGINT,

            primaryKey: true,

            autoIncrement: true

        }

    });

    return Medico;

};