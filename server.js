const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import database and routes
const { testConnection } = require('./config/database');
const healthRoutes = require('./routes/health');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = process.env.CORS_ORIGIN ? 
            process.env.CORS_ORIGIN.split(',') : 
            ['http://localhost:3001', 'http://127.0.0.1:5500', 'http://localhost:5500'];
        
        // Add file:// protocol for local file access
        allowedOrigins.push('null'); // for file:// protocol
        
        if (allowedOrigins.indexOf(origin) !== -1 || origin === 'null') {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'T4-Backend API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// API Routes
app.use('/api/v1/health', healthRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to T4-Backend API',
        description: 'Simple Health BMI Calculator Backend',
        version: '1.0.0',
        endpoints: {
            health_check: 'GET /health',
            analyze_health: 'POST /api/v1/health/analyze'
        },
        usage: {
            description: 'Send health data to analyze BMI',
            endpoint: '/api/v1/health/analyze',
            method: 'POST',
            body: {
                name: 'string (required)',
                age: 'number (required, 1-120)', 
                gender: 'string (required, male/female)',
                height: 'number (required, 50-250 cm)',
                weight: 'number (required, 10-300 kg)'
            }
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Start server
async function startServer() {
    try {
        // Test database connection
        const dbConnected = await testConnection();
        
        if (!dbConnected) {
            console.error('❌ Failed to connect to database. Please check your database configuration.');
            process.exit(1);
        }

        // Start the server
        app.listen(PORT, () => {
            console.log(`
🚀 T4-Backend API Server Started Successfully!
            
📊 Server Info:
   • Port: ${PORT}
   • Environment: ${process.env.NODE_ENV || 'development'}
   • Database: ${process.env.DB_NAME || 't4_health_db'}
   
🌐 API Endpoints:
   • Health Check: http://localhost:${PORT}/health
   • Analyze Health: POST http://localhost:${PORT}/api/v1/health/analyze
   
   
✅ Ready to receive requests from T4-Frontend!
            `);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

// Initialize server
startServer();

module.exports = app;
