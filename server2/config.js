'use strict';

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://megidda:rfhfvtkm123@clothit-shard-00-00-7ltax.mongodb.net:27017,clothit-shard-00-01-7ltax.mongodb.net:27017,clothit-shard-00-02-7ltax.mongodb.net:27017/test?ssl=true&replicaSet=ClothIt-shard-0&authSource=admin',
  port: process.env.PORT || 8081,
};

module.exports = config;
