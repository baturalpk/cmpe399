const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('devices', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    consumer_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'consumers',
        key: 'id'
      }
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_registration: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'devices',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "devices_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
