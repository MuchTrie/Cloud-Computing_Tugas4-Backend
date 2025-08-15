// BMI Calculation and Analysis Utils

// Calculate BMI
function calculateBMI(weight, height) {
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10; // Round to 1 decimal place
}

// BMI Categories configuration
const bmiCategories = {
    underweight: {
        min: 0,
        max: 18.5,
        name: 'Berat Badan Kurang',
        color: '#3498db',
        advice: 'Berat badan Anda tergolong kurang. Disarankan untuk meningkatkan asupan nutrisi seimbang dan berkonsultasi dengan ahli gizi untuk program penambahan berat badan yang sehat.'
    },
    normal: {
        min: 18.5,
        max: 25,
        name: 'Normal',
        color: '#27ae60',
        advice: 'Selamat! Berat badan Anda ideal. Pertahankan pola makan sehat dan rutin berolahraga untuk menjaga kesehatan optimal.'
    },
    overweight: {
        min: 25,
        max: 30,
        name: 'Berat Badan Berlebih',
        color: '#f39c12',
        advice: 'Berat badan Anda sedikit berlebih. Disarankan untuk mengurangi asupan kalori, meningkatkan aktivitas fisik, dan berkonsultasi dengan dokter jika perlu.'
    },
    obese: {
        min: 30,
        max: 999,
        name: 'Obesitas',
        color: '#e74c3c',
        advice: 'Berat badan Anda tergolong obesitas. Sangat disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk program penurunan berat badan yang aman dan efektif.'
    }
};

// Get BMI category based on BMI value
function getBMICategory(bmi) {
    for (let categoryKey in bmiCategories) {
        const category = bmiCategories[categoryKey];
        if (bmi >= category.min && bmi < category.max) {
            return {
                category: categoryKey,
                name: category.name,
                color: category.color,
                advice: category.advice,
                range: `${category.min} - ${category.max === 999 ? '∞' : category.max}`
            };
        }
    }
    // Default to normal if no category found
    return {
        category: 'normal',
        name: bmiCategories.normal.name,
        color: bmiCategories.normal.color,
        advice: bmiCategories.normal.advice,
        range: `${bmiCategories.normal.min} - ${bmiCategories.normal.max}`
    };
}

// Validate health data
function validateHealthData(data) {
    const errors = [];
    const { name, age, gender, height, weight } = data;

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Nama lengkap harus diisi');
    } else if (name.trim().length > 100) {
        errors.push('Nama terlalu panjang (maksimal 100 karakter)');
    }

    // Validate age
    if (!age || typeof age !== 'number' || age < 1 || age > 120) {
        errors.push('Usia harus antara 1-120 tahun');
    }

    // Validate gender
    if (!gender || !['male', 'female'].includes(gender)) {
        errors.push('Jenis kelamin harus dipilih (male/female)');
    }

    // Validate height
    if (!height || typeof height !== 'number' || height < 50 || height > 250) {
        errors.push('Tinggi badan harus antara 50-250 cm');
    }

    // Validate weight
    if (!weight || typeof weight !== 'number' || weight < 10 || weight > 300) {
        errors.push('Berat badan harus antara 10-300 kg');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Calculate ideal weight range based on height and gender
function calculateIdealWeightRange(height, gender) {
    const heightInMeters = height / 100;
    
    // Using BMI range 18.5 - 24.9 for normal weight
    const minWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxWeight = 24.9 * (heightInMeters * heightInMeters);
    
    return {
        min: Math.round(minWeight * 10) / 10,
        max: Math.round(maxWeight * 10) / 10
    };
}

// Get health recommendations based on BMI category and other factors
function getHealthRecommendations(bmi, age, gender, category) {
    const recommendations = {
        general: category.advice,
        specific: []
    };

    // Age-specific recommendations
    if (age < 18) {
        recommendations.specific.push('Konsultasi dengan dokter anak untuk panduan nutrisi yang tepat');
    } else if (age > 65) {
        recommendations.specific.push('Pertimbangkan kebutuhan nutrisi khusus untuk usia lanjut');
    }

    // Gender-specific recommendations
    if (gender === 'female') {
        recommendations.specific.push('Pastikan asupan kalsium dan zat besi yang cukup');
    } else {
        recommendations.specific.push('Perhatikan asupan protein untuk menjaga massa otot');
    }

    // BMI-specific recommendations
    if (category.category === 'underweight') {
        recommendations.specific.push('Tingkatkan frekuensi makan dengan porsi kecil tapi sering');
        recommendations.specific.push('Konsumsi makanan bergizi tinggi kalori');
    } else if (category.category === 'overweight' || category.category === 'obese') {
        recommendations.specific.push('Lakukan olahraga kardio minimal 150 menit per minggu');
        recommendations.specific.push('Kurangi makanan tinggi gula dan lemak jenuh');
    } else {
        recommendations.specific.push('Lanjutkan pola hidup sehat yang sudah Anda jalani');
    }

    return recommendations;
}

// Format response data
function formatHealthAnalysis(healthData) {
    const { name, age, gender, height, weight } = healthData;
    
    // Calculate BMI
    const bmi = calculateBMI(weight, height);
    
    // Get BMI category
    const category = getBMICategory(bmi);
    
    // Calculate ideal weight range
    const idealWeight = calculateIdealWeightRange(height, gender);
    
    // Get recommendations
    const recommendations = getHealthRecommendations(bmi, age, gender, category);
    
    return {
        userInfo: {
            name: name.trim(),
            age,
            gender,
            height,
            weight
        },
        analysis: {
            bmi: bmi,
            category: category.name,
            categoryKey: category.category,
            color: category.color,
            range: category.range
        },
        idealWeight,
        recommendations,
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    calculateBMI,
    getBMICategory,
    validateHealthData,
    calculateIdealWeightRange,
    getHealthRecommendations,
    formatHealthAnalysis,
    bmiCategories
};
