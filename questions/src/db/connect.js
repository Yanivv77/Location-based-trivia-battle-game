const mongoose = require("mongoose");

function connect() {
  const dbUri = "mongodb+srv://admin:admin@usercluster.lb38v.mongodb.net/questions";
  
  return mongoose
    .connect(dbUri)
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch((err) => {
      console.log("could not connect to mongoDB", err);
      process.exit(1)
    });
};

module.exports = connect;
