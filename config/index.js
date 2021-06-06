module.exports = Object.assign(
  {
    PORT: parseInt(process.env.PORT || "3000"),
    saltRounds: 6,
    cookieSecret: process.env.SECRET || "ZWh9rD6Bm5jX9CBxzYZTH7Dc4LtjALXLQwKXG75pCk6mdgNyZs3cLgPpyQdBTEXT3B9",
  },
  require(`./${process.env.NODE_ENV}.config.js`)
);
