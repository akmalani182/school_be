import School from "../models/school.model";
import User from "../models/user.model";

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASENAME,
});

School.initModel(sequelize);
User.initModel(sequelize);

School.hasMany(User, { foreignKey: "schoolId", as: "users" });
User.belongsTo(School, { foreignKey: "schoolId" });

export { sequelize, School, User };
