// src/controllers/authController.js
const authService = require('../services/authService');
require('dotenv').config({ path: '../.env' }); // โหลด environment variables

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ฟังก์ชันสำหรับรีเฟรช token
exports.refresh = async (req, res) => {
  try {
    const newToken = await authService.refreshToken(req.body.token);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลโปรไฟล์
exports.getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
