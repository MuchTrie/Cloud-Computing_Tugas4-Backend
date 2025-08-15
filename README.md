# T4-Backend - Health BMI Calculator API

Simple REST API backend untuk aplikasi analisis kesehatan dengan perhitungan BMI (Body Mass Index). API ini menerima data kesehatan user dan menyimpan ke database AWS RDS.

## 🌟 Features

- ✅ **BMI Calculation** - Perhitungan BMI otomatis
- ✅ **Database Storage** - Simpan data ke AWS RDS MySQL
- ✅ **Input Validation** - Validasi data user
- ✅ **Health Categories** - Kategorisasi BMI otomatis
- ✅ **CORS Support** - Cross-origin resource sharing
- ✅ **Docker Ready** - Container deployment ready
- ✅ **Production Ready** - Environment configuration

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **CORS** - Cross-origin middleware
- **Helmet** - Security middleware
- **Morgan** - HTTP logger
- **Docker** - Containerization

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- MySQL database (AWS RDS)
- Docker (optional)

## 🔧 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/YourUsername/t4-backend.git
cd t4-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy environment file
cp .env.production .env

# Edit .env file
DB_HOST=your-rds-endpoint
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database
CORS_ORIGIN=http://your-frontend-domain
```

### 4. Database Setup
```bash
# Run database setup (one time only)
mysql -h your-rds-endpoint -u admin -p < setup_database.sql
```

### 5. Start Application
```bash
# Development
npm run dev

# Production
npm start
```

## 🐳 Docker Deployment

### Local Docker
```bash
# Build image
docker build -t t4-backend .

# Run container
docker run -d --name t4-backend -p 3000:3000 --env-file .env.production t4-backend
```

### Docker Compose
```bash
# Update environment in docker-compose.yml
# Then start
docker-compose up -d
```

### EC2 Deployment
```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 📡 API Endpoints

### Health Check
```http
GET /health
```

### Analyze Health Data
```http
POST /api/v1/health/analyze
Content-Type: application/json

{
  "name": "John Doe",
  "age": 25,
  "gender": "male",
  "height": 175,
  "weight": 70
}
```

### Response Example
```json
{
  "success": true,
  "message": "Analisis kesehatan berhasil",
  "data": {
    "userInfo": {
      "name": "John Doe",
      "age": 25,
      "gender": "Laki-laki",
      "height": 175,
      "weight": 70
    },
    "analysis": {
      "bmi": 22.9,
      "category": "Normal",
      "color": "#27ae60",
      "advice": "Selamat! Berat badan Anda ideal..."
    },
    "recordId": 123,
    "timestamp": "2025-08-15T10:30:00.000Z"
  }
}
```

## 🗄️ Database Schema

### health_records
```sql
CREATE TABLE health_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    height DECIMAL(5,2) NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    bmi DECIMAL(4,1) NOT NULL,
    bmi_category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### bmi_categories
```sql
CREATE TABLE bmi_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL,
    min_bmi DECIMAL(4,1) NOT NULL,
    max_bmi DECIMAL(4,1) NOT NULL,
    color_code VARCHAR(7) NOT NULL,
    advice TEXT NOT NULL
);
```

## 🔒 Environment Variables

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# Database Configuration
DB_HOST=your-rds-endpoint
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database

# CORS Configuration
CORS_ORIGIN=http://your-frontend-domain

# API Configuration
API_VERSION=v1

# Logging
LOG_LEVEL=warn
```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection & queries
├── routes/
│   └── health.js            # Health API routes
├── utils/
│   └── healthUtils.js       # BMI calculation utilities
├── .env.production          # Production environment variables
├── .gitignore              # Git ignore rules
├── Dockerfile              # Docker container config
├── docker-compose.yml      # Docker compose config
├── deploy.sh               # Deployment script
├── healthcheck.js          # Container health check
├── package.json            # Dependencies & scripts
├── server.js               # Main application
└── README.md               # Documentation
```

## 🧪 Testing

### Manual API Testing
```bash
# Health check
curl http://localhost:3000/health

# Analyze health data
curl -X POST http://localhost:3000/api/v1/health/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "age": 25,
    "gender": "male",
    "height": 175,
    "weight": 70
  }'
```

### Container Testing
```bash
# Check container status
docker ps

# View logs
docker logs t4-backend

# Health check
docker exec t4-backend node healthcheck.js
```

## 🚀 Deployment

### EC2 Deployment Steps

1. **Setup EC2 Instance**
   - Launch Amazon Linux 2 instance
   - Configure Security Group (port 3000, 22)
   - Install Docker & Docker Compose

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/YourUsername/t4-backend.git
   cd t4-backend
   
   # Install dependencies
   npm install
   
   # Configure environment
   cp .env.production .env
   nano .env  # Edit database credentials
   
   # Deploy with Docker
   ./deploy.sh
   ```

3. **Verify Deployment**
   ```bash
   # Test health endpoint
   curl http://YOUR_EC2_IP:3000/health
   
   # Check container
   docker ps
   ```

## 🔗 Related Repositories

- **Frontend**: [T4-Frontend](https://github.com/MuchTrie/Cloud-Computing_Tugas4-Frontend)

## 📝 License

This project is part of Cloud Computing coursework - Tugas 4.

## 👨‍💻 Author

**MuchTrie**
- GitHub: [@MuchTrie](https://github.com/MuchTrie)

---

**T4-Backend** - Simple Health BMI Calculator API
