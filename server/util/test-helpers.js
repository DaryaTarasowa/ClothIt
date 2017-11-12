import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

export function connectDB(t, done) {
  mockgoose(mongoose).then(() => {
    mongoose.createConnection('mongodb://megidda:rfhfvtkm123@clothit-shard-00-00-7ltax.mongodb.net:27017,clothit-shard-00-01-7ltax.mongodb.net:27017,clothit-shard-00-02-7ltax.mongodb.net:27017/test?ssl=true&replicaSet=ClothIt-shard-0&authSource=admin', err => {
      if (err) t.fail('Unable to connect to test database');
      done();
    });
  });
}

export function dropDB(t) {
  mockgoose.reset(err => {
    if (err) t.fail('Unable to reset test database');
  });
}
