module.exports = (sequelize, Sequelize) => {

    const Ficha = sequelize.define("Ficha", {

        medicoId: {

            type: Sequelize.BIGINT,
            
            allowNull: false

        },

        pacienteId: {

            type: Sequelize.BIGINT,

            allowNull: false

        },

        fecha: {

            type: Sequelize.DATEONLY,
            
            allowNull: false

        },

        id: {

            type: Sequelize.BIGINT,

            primaryKey: true,

            autoIncrement: true

        }

    });

    return Ficha;

};