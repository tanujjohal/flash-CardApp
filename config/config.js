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
            host: "127.0.0.1",
            username: "root",
            password: "",
            pool: {
                max: 20,
                min: 5,
            },
        },
    }
}
