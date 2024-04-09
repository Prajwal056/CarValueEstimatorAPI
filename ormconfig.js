/**
 * Database configuration object.
 *
 * @typedef {Object} DbConfig
 * @property {boolean} synchronize - Whether to automatically synchronize the database schema on application startup.
 * @property {string[]} migrations - An array of migration file paths.
 * @property {Object} cli - Configuration options for the database CLI.
 * @property {string} cli.migrationsDir - The directory where migration files are stored.
 */

/**
 * Database configuration.
 *
 * @type {DbConfig}
 */
var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'data/db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres' || dbConfig.type,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false
      },
      synchronize: true,
    });
    break;
  default:
    console.log('Using default driver');
}

module.exports = dbConfig;
