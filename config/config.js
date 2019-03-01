
require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DEV_DB_USER,
    "password": process.env.DEV_DB_PASS,
    "database": process.env.DEV_DB_NAME,
    "host": process.env.DEV_DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "kanishka",
    "password": "kanishka",
    "database": "bc_ns_cms_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "kanishka",
    "password": "kanishka",
    "database": "bc_ns_cms_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}