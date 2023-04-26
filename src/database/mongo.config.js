const mongoose = require("mongoose");

const connectDB = () => {
  const pathURI = process.env.DB_HOST;
  const conectionOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(pathURI, conectionOption);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Database connected successfully!');
  });
};

module.exports = connectDB;
