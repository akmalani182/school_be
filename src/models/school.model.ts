import { DataTypes, Model, Sequelize } from "sequelize";

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
        address: {
          type: DataTypes.STRING,
        },
        phoneNumber: {
          type: DataTypes.STRING,
        },
        logoUrl: {
          type: DataTypes.STRING,
        },
        establishedYear: {
          type: DataTypes.INTEGER,
        },
        socialLinks: {
          type: DataTypes.TEXT,
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
