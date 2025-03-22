import { DataTypes, Model, Sequelize } from "sequelize";
import School from "./school.model";

class Profile extends Model {
  public id!: number;
  public schoolId!: number;
  public address?: string;
  public phoneNumber?: string;
  public logoUrl?: string;
  public establishedYear?: number;
  public socialLinks?: string;

  static initModel(sequelize: Sequelize) {
    Profile.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        schoolId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: School,
            key: "id",
          },
          onDelete: "CASCADE",
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
        tableName: "profiles",
      }
    );
  }
}

export default Profile;