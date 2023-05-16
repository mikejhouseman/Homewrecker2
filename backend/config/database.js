const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  // May update the following if needed pending PM feedback:
  // test: {
  //   storage: config.dbFile,
  //   dialect: "sqlite",
  //   seederStorage: "sequelize",
  //   logQueryParameters: true,
  //   typeValidation: true
  // },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};
