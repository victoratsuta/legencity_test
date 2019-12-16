export const db: object = {
    user: process.env.PG_USER,
    database: process.env.PG_BASE,
    password: process.env.PG_PASS,
    port: 5432,
    host: process.env.PG_HOST,
}
