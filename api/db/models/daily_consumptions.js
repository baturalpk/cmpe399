const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('daily_consumptions', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    device_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'devices',
        key: 'id'
      }
    },
    power: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'daily_consumptions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "daily_consumptions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
