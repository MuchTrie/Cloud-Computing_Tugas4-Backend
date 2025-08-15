const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'db-much.cfo8uqy0i602.ap-southeast-2.rds.amazonaws.com',
    user: process.env.DB_USER || 'muchtrie',
    password: process.env.DB_PASSWORD || 'Bravo932q',
    database: process.env.DB_NAME || 'much_t4',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000,
    ssl: {
        rejectUnauthorized: false
    }
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
}

// Execute query with error handling
async function executeQuery(query, params = []) {
    try {
        const [results] = await pool.execute(query, params);
        return { success: true, data: results };
    } catch (error) {
        console.error('Database query error:', error.message);
        return { success: false, error: error.message };
    }
}

// Save health record
async function saveHealthRecord(healthData) {
    const { name, age, gender, height, weight, bmi, bmi_category } = healthData;
    
    const query = `
        INSERT INTO health_records 
        (name, age, gender, height, weight, bmi, bmi_category) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [name, age, gender, height, weight, bmi, bmi_category];
    return await executeQuery(query, params);
}

module.exports = {
    pool,
    testConnection,
    executeQuery,
    saveHealthRecord
};
