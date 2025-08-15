const express = require('express');
const router = express.Router();
const {
    saveHealthRecord
} = require('../config/database');
const {
    validateHealthData,
    formatHealthAnalysis
} = require('../utils/healthUtils');

// @route   POST /api/v1/health/analyze
// @desc    Analyze health data and calculate BMI
// @access  Public
router.post('/analyze', async (req, res) => {
    try {
        const healthData = req.body;
        
        // Validate input data
        const validation = validateHealthData(healthData);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Data tidak valid',
                errors: validation.errors
            });
        }

        // Format and analyze health data
        const analysis = formatHealthAnalysis(healthData);
        
        // Save to database
        const saveResult = await saveHealthRecord({
            name: analysis.userInfo.name,
            age: analysis.userInfo.age,
            gender: analysis.userInfo.gender,
            height: analysis.userInfo.height,
            weight: analysis.userInfo.weight,
            bmi: analysis.analysis.bmi,
            bmi_category: analysis.analysis.category
        });

        if (!saveResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Gagal menyimpan data ke database',
                error: saveResult.error
            });
        }

        // Return analysis result
        res.status(200).json({
            success: true,
            message: 'Analisis kesehatan berhasil',
            data: {
                ...analysis,
                recordId: saveResult.data.insertId,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Health analysis error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

module.exports = router;
