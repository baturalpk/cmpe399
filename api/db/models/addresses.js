const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addresses', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    additional_info: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'addresses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "addresses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
