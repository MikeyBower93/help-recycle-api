module.exports = {
  client: 'pg',
  connection: {
    database: process.env.RDS_DB_NAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/knex/migrations'
  },
  seeds: {
    directory: './src/knex/seeds'
  }
}