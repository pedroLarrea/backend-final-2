const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }

});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Paciente = require("./paciente.model.js")(sequelize, Sequelize);
db.Medico = require("./medico.model.js")(sequelize, Sequelize);
db.Ficha = require("./ficha.model.js")(sequelize, Sequelize);
db.Detalle = require("./detalle.model.js")(sequelize, Sequelize);

// Clave foraneas para la tabla ficha
// Relacion ficha y medico
db.Medico.hasMany(db.Ficha,{foreignKey : "medicoId", onDelete: "RESTRICT", onUpdate: "RESTRICT"})
db.Ficha.belongsTo(db.Medico,{foreignKey : "medicoId"})
// Relacion ficha y paciente
db.Paciente.hasMany(db.Ficha,{foreignKey : "pacienteId", onDelete: "RESTRICT", onUpdate: "RESTRICT"})
db.Ficha.belongsTo(db.Paciente,{foreignKey : "pacienteId"})
// Relacion ficha y detalle
db.Ficha.hasMany(db.Detalle,{foreignKey : "fichaId", onDelete: "CASCADE"})
db.Detalle.belongsTo(db.Ficha,{foreignKey : "fichaId"})

module.exports = db;