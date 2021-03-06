'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i
        }
      }, 
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i
        }
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDate: true 
        }
      },
      country_of_residence: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i
        }
      },
      elo_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 100,
          max: 3000   
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          isAlphanumeric: true,
          len: [6,20]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true
        }
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: true
        }
      },
      moderator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: true
        }
      },
      player: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
          notNull: true
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Users');
  }
};