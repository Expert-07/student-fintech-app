const { Pool } = require('pg');
require('dotenv').config();

/*const pool = new Pool({
    connectionString: process.env.DATABSE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});*/
const pool = new Pool({
    user: 'gideon',
    host: 'localhost',
    database: 'studentsdb',
    password: 'gideon',
    port: 5432,
});                                                                                                         

module.exports = pool;