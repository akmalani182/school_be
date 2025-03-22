import { DataTypes, Model, Sequelize } from "sequelize";
import Profile from "./profile.model";
import User from "./user.model";

class School extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public contactEmail!: string;
  public subdomain!: string;

  static initModel(sequelize: Sequelize) {
    School.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        contactEmail: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        subdomain: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "schools",
      }
    );
  }
}

export default School;
