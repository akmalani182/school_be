import { DataTypes, Model, Sequelize } from "sequelize";
import School from "./school.model";

class User extends Model {
  public id!: number;
  public schoolId!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "teacher" | "student";

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        schoolId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: School,
            key: "id",
          },
          onDelete: "CASCADE",
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("admin", "teacher", "student"),
          allowNull: false,
          defaultValue: "student",
        },
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }
}

export default User