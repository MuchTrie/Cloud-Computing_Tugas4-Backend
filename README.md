# T4-Backend - Simple Health API

Backend API sederhana untuk aplikasi kesehatan dengan perhitungan BMI.

## ✨ Features

- Perhitungan BMI otomatis
- Simpan data ke database MySQL
- REST API sederhana
- Docker ready

## �️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Docker** - Deployment

## � Installation

### 1. Clone & Install
```bash
git clone https://github.com/MuchTrie/Cloud-Computing_Tugas4-Backend.git
cd Cloud-Computing_Tugas4-Backend
npm install
```

### 2. Environment Setup
```bash
# Copy and edit environment file
cp .env.production .env

# Edit database credentials
DB_HOST=your-database-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database
```

### 3. Run Application
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Health Check
```http
GET /health
```

### Analyze BMI
```http
POST /api/v1/health/analyze

{
  "name": "John Doe",
  "age": 25,
  "gender": "male",
  "height": 175,
  "weight": 70
}
```

### Response
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
      "advice": "Berat badan Anda ideal..."
    }
  }
}
```

## � Docker Deployment

```bash
# Build image
docker build -t t4-backend .

# Run container
docker run -d --name t4-backend -p 3000:3000 t4-backend

# Or use Docker Compose
docker-compose up -d
```

## 📁 Project Structure

```
backend/
├── config/database.js     # Database connection
├── routes/health.js       # API routes
├── utils/healthUtils.js   # BMI calculations
├── server.js              # Main app
├── package.json          # Dependencies
└── Dockerfile            # Docker config
```

## 🔧 Environment Variables

```env
NODE_ENV=production
PORT=3000
DB_HOST=your-database-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database
CORS_ORIGIN=http://your-frontend-url
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:3000/health

# Test BMI analysis
curl -X POST http://localhost:3000/api/v1/health/analyze \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","age":25,"gender":"male","height":175,"weight":70}'
```

---

**Simple Health BMI Calculator API**
