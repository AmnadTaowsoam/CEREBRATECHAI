require('dotenv').config({ path: '../.env' }); // ระบุเส้นทางของไฟล์ .env ที่อยู่ใน root project
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('../config/db.config');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// เพิ่ม CORS
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// เพิ่มการจำกัดอัตราการเรียก API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // จำกัด 100 คำขอต่อ IP ต่อ 15 นาที
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// เพิ่ม Helmet สำหรับความปลอดภัย HTTP headers
app.use(helmet());

// เพิ่ม Logging
app.use(morgan('combined'));

// จำกัดขนาด body ในคำขอ
app.use(express.json({ limit: '10kb' }));

// เส้นทาง API
app.use('/api/v1/auth', authRoutes);

// การเชื่อมต่อกับฐานข้อมูล
sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error('Unable to sync database:', err));

// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
