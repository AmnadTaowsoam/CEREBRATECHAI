// src/services/authService.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' }); // โหลด environment variables

// ฟังก์ชันสำหรับการลงทะเบียน
exports.register = async (userData) => {
  try {
    // ตรวจสอบว่ารหัสผ่านมีค่า
    if (!userData.password) {
      throw new Error('Password is required');
    }

    // ทำการแฮชรหัสผ่าน
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // สร้างผู้ใช้ใหม่
    const user = await User.create({ 
      username: userData.username, 
      email: userData.email, 
      hashed_password: hashedPassword,
      role: userData.role || 'user',
    });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Unable to register user');
  }
};


// ฟังก์ชันสำหรับการล็อกอิน
exports.login = async (loginData) => {
  try {
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูลตาม email
    const user = await User.findOne({ where: { email: loginData.email } });
    
    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // ตรวจสอบรหัสผ่านที่ส่งเข้ามากับ hashed_password ในฐานข้อมูล
    const isMatch = await bcrypt.compare(loginData.password, user.hashed_password);
    
    // ถ้ารหัสผ่านไม่ตรงกัน ให้โยนข้อผิดพลาด
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // สร้าง JWT token
    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Invalid credentials');
  }
};

// ฟังก์ชันสำหรับรีเฟรช token
exports.refreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return newToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลโปรไฟล์
exports.getProfile = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
