const { Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

///Course Model

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide a value for title",
          },
          notNull: {
            msg: "Title cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide a value for description",
          },
          notNull: {
            msg: "Description cannot be empty",
          },
        },
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  //Course association with modelse.User one to one
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: "Student",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };
  return Course;
};
