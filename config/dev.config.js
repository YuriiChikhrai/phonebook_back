module.exports = {
  mongodb: {
    uri: "mongodb://localhost:27017/phonebook",
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
