import Profile from "../models/profile.model";
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
Profile.initModel(sequelize);
User.initModel(sequelize);

// Define relationships
School.hasOne(Profile, { foreignKey: "schoolId", as: "profile" });
Profile.belongsTo(School, { foreignKey: "schoolId" });

School.hasMany(User, { foreignKey: "schoolId", as: "users" });
User.belongsTo(School, { foreignKey: "schoolId" });

export { sequelize, School, Profile, User };
