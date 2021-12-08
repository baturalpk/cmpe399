const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consumer_addresses', {
    consumer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'consumers',
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
    tableName: 'consumer_addresses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "consumer_addresses_pkey",
        unique: true,
        fields: [
          { name: "consumer_id" },
          { name: "address_id" },
        ]
      },
    ]
  });
};
