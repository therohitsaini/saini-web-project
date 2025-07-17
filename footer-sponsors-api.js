const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/footer-sponsors';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'sponsor-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Footer Sponsors Schema
const footerSponsorsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    Image_one: {
        type: String,
        default: null
    },
    Image_two: {
        type: String,
        default: null
    },
    Image_three: {
        type: String,
        default: null
    },
    Image_four: {
        type: String,
        default: null
    },
    Image_five: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure one record per user
footerSponsorsSchema.index({ userId: 1 }, { unique: true });

const FooterSponsors = mongoose.model('FooterSponsors', footerSponsorsSchema);

// GET - Get Footer Sponsors by User ID
router.get('/api-footer/get-footer-sponsors/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const footerSponsors = await FooterSponsors.findOne({ userId });
        
        if (!footerSponsors) {
            return res.status(404).json({
                success: false,
                message: 'Footer sponsors not found for this user'
            });
        }

        res.json({
            success: true,
            message: 'Footer sponsors retrieved successfully',
            data: footerSponsors
        });
    } catch (error) {
        console.error('Get footer sponsors error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// PUT - Update Footer Sponsors with Image Upload
router.put('/api-footer/update-footer-sponsors/:userId', upload.fields([
    { name: 'Image_one', maxCount: 1 },
    { name: 'Image_two', maxCount: 1 },
    { name: 'Image_three', maxCount: 1 },
    { name: 'Image_four', maxCount: 1 },
    { name: 'Image_five', maxCount: 1 }
]), async (req, res) => {
    try {
        const { userId } = req.params;
        const files = req.files;

        // Find existing record or create new one
        let footerSponsors = await FooterSponsors.findOne({ userId });
        
        if (!footerSponsors) {
            footerSponsors = new FooterSponsors({ userId });
        }

        // Update image fields if files are uploaded
        if (files) {
            // Delete old images if new ones are uploaded
            const imageFields = ['Image_one', 'Image_two', 'Image_three', 'Image_four', 'Image_five'];
            
            imageFields.forEach(fieldName => {
                if (files[fieldName] && files[fieldName][0]) {
                    // Delete old image if exists
                    if (footerSponsors[fieldName]) {
                        const oldImagePath = path.join(__dirname, '..', footerSponsors[fieldName]);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
                    
                    // Save new image path
                    footerSponsors[fieldName] = files[fieldName][0].path.replace(/\\/g, '/');
                }
            });
        }

        footerSponsors.updatedAt = Date.now();
        const savedSponsors = await footerSponsors.save();

        res.json({
            success: true,
            message: 'Footer sponsors updated successfully',
            data: savedSponsors
        });
    } catch (error) {
        console.error('Update footer sponsors error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// POST - Create Footer Sponsors (if needed)
router.post('/api-footer/create-footer-sponsors/:userId', upload.fields([
    { name: 'Image_one', maxCount: 1 },
    { name: 'Image_two', maxCount: 1 },
    { name: 'Image_three', maxCount: 1 },
    { name: 'Image_four', maxCount: 1 },
    { name: 'Image_five', maxCount: 1 }
]), async (req, res) => {
    try {
        const { userId } = req.params;
        const files = req.files;

        // Check if record already exists
        const existingSponsors = await FooterSponsors.findOne({ userId });
        if (existingSponsors) {
            return res.status(400).json({
                success: false,
                message: 'Footer sponsors already exist for this user. Use update endpoint.'
            });
        }

        const footerSponsors = new FooterSponsors({ userId });

        // Save image paths if files are uploaded
        if (files) {
            const imageFields = ['Image_one', 'Image_two', 'Image_three', 'Image_four', 'Image_five'];
            
            imageFields.forEach(fieldName => {
                if (files[fieldName] && files[fieldName][0]) {
                    footerSponsors[fieldName] = files[fieldName][0].path.replace(/\\/g, '/');
                }
            });
        }

        const savedSponsors = await footerSponsors.save();

        res.status(201).json({
            success: true,
            message: 'Footer sponsors created successfully',
            data: savedSponsors
        });
    } catch (error) {
        console.error('Create footer sponsors error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// DELETE - Delete Footer Sponsors
router.delete('/api-footer/delete-footer-sponsors/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const footerSponsors = await FooterSponsors.findOne({ userId });
        
        if (!footerSponsors) {
            return res.status(404).json({
                success: false,
                message: 'Footer sponsors not found'
            });
        }

        // Delete associated image files
        const imageFields = ['Image_one', 'Image_two', 'Image_three', 'Image_four', 'Image_five'];
        imageFields.forEach(fieldName => {
            if (footerSponsors[fieldName]) {
                const imagePath = path.join(__dirname, '..', footerSponsors[fieldName]);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        });

        await FooterSponsors.findByIdAndDelete(footerSponsors._id);

        res.json({
            success: true,
            message: 'Footer sponsors deleted successfully'
        });
    } catch (error) {
        console.error('Delete footer sponsors error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// GET - Serve uploaded images
router.get('/uploads/footer-sponsors/:filename', (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, '..', 'uploads', 'footer-sponsors', filename);
    
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({
            success: false,
            message: 'Image not found'
        });
    }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 5MB.'
            });
        }
    }
    
    if (error.message === 'Only image files are allowed!') {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    
    next(error);
});

module.exports = router;

// Usage in main app.js or server.js:
// const footerSponsorsRoutes = require('./routes/footer-sponsors-api');
// app.use('/', footerSponsorsRoutes);

// Example API calls:

// GET: /api-footer/get-footer-sponsors/user123
// PUT: /api-footer/update-footer-sponsors/user123 (with FormData containing Image_one, Image_two, etc.)
// POST: /api-footer/create-footer-sponsors/user123 (with FormData containing Image_one, Image_two, etc.)
// DELETE: /api-footer/delete-footer-sponsors/user123
// GET: /uploads/footer-sponsors/filename.jpg (to serve images) 