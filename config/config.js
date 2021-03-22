module.exports = {
    port: 8000,
    db: {
        production: {
            host: process.env.PROD_DB_HOST,
            port: process.env.PROD_DB_PORT,
            username: process.env.PROD_DB_USERNAME,
            password: process.env.PROD_DB_PASSWORD,
            database: process.env.PROD_DB_NAME,
            pool: {
                max: 20,
                min: 5,
            },
        },
        development: {
            host: "bnwlpkikvy8nbjhvs8m7-mysql.services.clever-cloud.com",
            username: "ufsjjyuovagi2ha8",
            password: "FKtlTSdKdfKFPQ3uAvsU",
            port: 3306,
            pool: {
                max: 5,
                min: 1,
            },
        },
    }
}
