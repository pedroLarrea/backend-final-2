module.exports = (sequelize, Sequelize) => {

    const Detalle = sequelize.define("Detalle", {

        fichaId: {

            type: Sequelize.BIGINT,
            
            allowNull: false

        },

        motivo: {

            type: Sequelize.STRING

        },

        diagnostico: {

            type: Sequelize.STRING

        },

        tratamiento: {

            type: Sequelize.STRING

        },

        id: {

            type: Sequelize.BIGINT,

            primaryKey: true,

            autoIncrement: true

        }

    });

    return Detalle;

};