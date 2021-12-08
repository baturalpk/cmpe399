var DataTypes = require("sequelize").DataTypes;
var _addresses = require("./addresses");
var _consumer_addresses = require("./consumer_addresses");
var _consumers = require("./consumers");
var _daily_consumptions = require("./daily_consumptions");
var _device_addresses = require("./device_addresses");
var _devices = require("./devices");

function initModels(sequelize) {
  var addresses = _addresses(sequelize, DataTypes);
  var consumer_addresses = _consumer_addresses(sequelize, DataTypes);
  var consumers = _consumers(sequelize, DataTypes);
  var daily_consumptions = _daily_consumptions(sequelize, DataTypes);
  var device_addresses = _device_addresses(sequelize, DataTypes);
  var devices = _devices(sequelize, DataTypes);

  addresses.belongsToMany(consumers, { as: 'consumer_id_consumers', through: consumer_addresses, foreignKey: "address_id", otherKey: "consumer_id" });
  addresses.belongsToMany(devices, { as: 'device_id_devices', through: device_addresses, foreignKey: "address_id", otherKey: "device_id" });
  consumers.belongsToMany(addresses, { as: 'address_id_addresses', through: consumer_addresses, foreignKey: "consumer_id", otherKey: "address_id" });
  devices.belongsToMany(addresses, { as: 'address_id_addresses_device_addresses', through: device_addresses, foreignKey: "device_id", otherKey: "address_id" });
  consumer_addresses.belongsTo(addresses, { as: "address", foreignKey: "address_id"});
  addresses.hasMany(consumer_addresses, { as: "consumer_addresses", foreignKey: "address_id"});
  device_addresses.belongsTo(addresses, { as: "address", foreignKey: "address_id"});
  addresses.hasMany(device_addresses, { as: "device_addresses", foreignKey: "address_id"});
  consumer_addresses.belongsTo(consumers, { as: "consumer", foreignKey: "consumer_id"});
  consumers.hasMany(consumer_addresses, { as: "consumer_addresses", foreignKey: "consumer_id"});
  devices.belongsTo(consumers, { as: "consumer", foreignKey: "consumer_id"});
  consumers.hasMany(devices, { as: "devices", foreignKey: "consumer_id"});
  daily_consumptions.belongsTo(devices, { as: "device", foreignKey: "device_id"});
  devices.hasMany(daily_consumptions, { as: "daily_consumptions", foreignKey: "device_id"});
  device_addresses.belongsTo(devices, { as: "device", foreignKey: "device_id"});
  devices.hasMany(device_addresses, { as: "device_addresses", foreignKey: "device_id"});

  return {
    addresses,
    consumer_addresses,
    consumers,
    daily_consumptions,
    device_addresses,
    devices,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
