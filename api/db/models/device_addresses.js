const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device_addresses', {
    device_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'devices',
        key: 'id'
      }
    },
    address_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'addresses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'device_addresses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "device_addresses_pkey",
        unique: true,
        fields: [
          { name: "device_id" },
          { name: "address_id" },
        ]
      },
    ]
  });
};
