import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'p72projectmap',
    namedPlaceholders: true,
    decimalNumbers: true,
})