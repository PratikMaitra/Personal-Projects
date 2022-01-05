const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.userAccessCode = require("../models/user_access_codes.model.js")(sequelize, Sequelize);

db.person = require("../models/person.model.js")(sequelize, Sequelize);

db.gender = require("../models/gender.model.js")(sequelize, Sequelize);
db.pronoun = require("../models/pronoun.model.js")(sequelize, Sequelize);
db.sexAtBirth = require("../models/sex_at_birth.model.js")(sequelize, Sequelize);
db.state = require("../models/state.model.js")(sequelize, Sequelize);

// users and access codes
db.user.hasMany(db.userAccessCode, {
  foreignKey: 'username'
});
db.userAccessCode.belongsTo(db.user, {
  foreignKey: 'username'
});

// users and people
db.person.hasOne(db.user, {
  foreignKey: 'person_id'
});
db.user.belongsTo(db.person, {
  foreignKey: 'person_id'
});

// people and genders
db.gender.hasMany(db.person, {
  foreignKey: 'gender_id'
});
db.person.belongsTo(db.gender, {
  foreignKey: 'gender_id'
});

// people and pronouns
db.pronoun.hasMany(db.person, {
  foreignKey: 'pronoun_id'
});
db.person.belongsTo(db.pronoun, {
  foreignKey: 'pronoun_id'
});

// people and sex at birth
db.sexAtBirth.hasMany(db.person, {
  foreignKey: 'sex_at_birth_id'
});
db.person.belongsTo(db.sexAtBirth, {
  foreignKey: 'sex_at_birth_id'
});

// people and states
db.state.hasMany(db.person, {
  foreignKey: 'state_id'
});
db.person.belongsTo(db.state, {
  foreignKey: 'state_id'
});

// user and roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "username"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "username",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
