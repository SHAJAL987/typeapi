import fs from 'fs';

function getOrmConfig() {
    let appConf = fs.readFileSync('./appconfig.json', 'utf-8');

    appConf = JSON.parse(appConf);

    const nodeEnv = appConf.NODE_ENV || 'prod';

    // conf for Oracle database
    if (appConf.DB_TYPE === 'oracle') {
        let ormConf = {
            type: appConf.DB_TYPE,
            username: appConf.DB_USERNAME,
            password: appConf.DB_PASSWORD,
            connectString: appConf.CONNECT_STRING,
            entities: [__dirname + '/dist/entity/**/*.entity.js'],
            migrations: ['migration/*.js'],
            cli: {
                migrationsDir: 'migration'
            },
            logging: false,
            synchronize: false
        };

        if (nodeEnv === 'dev') {
            ormConf.entities[0] = __dirname + '/src/entity/**/*.entity.ts';
            //ormConf.logging = true;
            ormConf.synchronize = true;
        }

        return ormConf;
    }

    // conf for other database
    else {
        let ormConf = {
            type: appConf.DB_TYPE,
            host: appConf.DB_HOST,
            port: appConf.DB_PORT,
            username: appConf.DB_USERNAME,
            password: appConf.DB_PASSWORD,
            database: appConf.DB_NAME,
            entities: [__dirname + '/dist/entity/**/*.entity.js'],
            migrations: ['migration/*.js'],
            cli: {
                migrationsDir: 'migration'
            },
            logging: false,
            synchronize: false
        };

        if (nodeEnv === 'dev') {
            ormConf.entities[0] = __dirname + '/src/entity/**/*.entity.ts';
            // ormConf.logging = true;
            ormConf.synchronize = true;
        }

        return ormConf;
    }
}

module.exports = getOrmConfig();
