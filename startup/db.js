const moongoose = require("mongoose");

module.exports = function () {
  moongoose
    .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/typo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(`connection failed ${err}`));
};
