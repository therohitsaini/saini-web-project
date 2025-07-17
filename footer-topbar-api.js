const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/footer-topbar';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'topbar-' + uniqueSuffix + path.extname(file.originalname));
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

// Footer Top Bar Schema
const footerTopBarSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    leftSection: {
        title: {
            type: String,
            default: ""
        },
        subTitle: {
            type: String,
            default: ""
        },
        icone: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: null
        }
    },
    rightSection: {
        title: {
            type: String,
            default: ""
        },
        subTitle: {
            type: String,
            default: ""
        },
        icone: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: null
        }
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
footerTopBarSchema.index({ userId: 1 }, { unique: true });

const FooterTopBar = mongoose.model('FooterTopBar', footerTopBarSchema);

// GET - Get Footer Top Bar by User ID
router.get('/api-footer/get-footer-top-bar/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const footerTopBar = await FooterTopBar.findOne({ userId });
        
        if (!footerTopBar) {
            return res.status(404).json({
                success: false,
                message: 'Footer top bar not found for this user'
            });
        }

        res.json({
            success: true,
            message: 'Footer top bar retrieved successfully',
            data: footerTopBar
        });
    } catch (error) {
        console.error('Get footer top bar error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// POST - Create/Update Footer Top Bar with Image Upload
router.post('/api-footer/footer-top-bar/:userId', upload.fields([
    { name: 'leftImage', maxCount: 1 },
    { name: 'rightImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const { userId } = req.params;
        const files = req.files;
        const body = req.body;

        // Find existing record or create new one
        let footerTopBar = await FooterTopBar.findOne({ userId });
        
        if (!footerTopBar) {
            footerTopBar = new FooterTopBar({ userId });
        }

        // Update left section
        footerTopBar.leftSection = {
            title: body.leftTitle || "",
            subTitle: body.leftSubTitle || "",
            icone: body.leftIcone || "",
            image: footerTopBar.leftSection?.image || null // Keep existing image by default
        };

        // Update right section
        footerTopBar.rightSection = {
            title: body.rightTitle || "",
            subTitle: body.rightSubTitle || "",
            icone: body.rightIcone || "",
            image: footerTopBar.rightSection?.image || null // Keep existing image by default
        };

        // Handle left section image
        if (files && files.leftImage && files.leftImage[0]) {
            // Delete old image if exists
            if (footerTopBar.leftSection.image) {
                const oldImagePath = path.join(__dirname, '..', footerTopBar.leftSection.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            // Save new image path
            footerTopBar.leftSection.image = files.leftImage[0].path.replace(/\\/g, '/');
        } else if (body.leftExistingImage) {
            // Keep existing image path
            footerTopBar.leftSection.image = body.leftExistingImage;
        }

        // Handle right section image
        if (files && files.rightImage && files.rightImage[0]) {
            // Delete old image if exists
            if (footerTopBar.rightSection.image) {
                const oldImagePath = path.join(__dirname, '..', footerTopBar.rightSection.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            // Save new image path
            footerTopBar.rightSection.image = files.rightImage[0].path.replace(/\\/g, '/');
        } else if (body.rightExistingImage) {
            // Keep existing image path
            footerTopBar.rightSection.image = body.rightExistingImage;
        }

        footerTopBar.updatedAt = Date.now();
        const savedTopBar = await footerTopBar.save();

        res.json({
            success: true,
            message: 'Footer top bar updated successfully',
            data: savedTopBar
        });
    } catch (error) {
        console.error('Update footer top bar error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// PUT - Update Footer Top Bar (alternative method)
router.put('/api-footer/update-footer-top-bar/:userId', upload.fields([
    { name: 'leftImage', maxCount: 1 },
    { name: 'rightImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const { userId } = req.params;
        const files = req.files;
        const body = req.body;

        const footerTopBar = await FooterTopBar.findOne({ userId });
        
        if (!footerTopBar) {
            return res.status(404).json({
                success: false,
                message: 'Footer top bar not found'
            });
        }

        // Update left section
        if (body.leftTitle !== undefined) footerTopBar.leftSection.title = body.leftTitle;
        if (body.leftSubTitle !== undefined) footerTopBar.leftSection.subTitle = body.leftSubTitle;
        if (body.leftIcone !== undefined) footerTopBar.leftSection.icone = body.leftIcone;

        // Update right section
        if (body.rightTitle !== undefined) footerTopBar.rightSection.title = body.rightTitle;
        if (body.rightSubTitle !== undefined) footerTopBar.rightSection.subTitle = body.rightSubTitle;
        if (body.rightIcone !== undefined) footerTopBar.rightSection.icone = body.rightIcone;

        // Handle left section image
        if (files && files.leftImage && files.leftImage[0]) {
            // Delete old image if exists
            if (footerTopBar.leftSection.image) {
                const oldImagePath = path.join(__dirname, '..', footerTopBar.leftSection.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            // Save new image path
            footerTopBar.leftSection.image = files.leftImage[0].path.replace(/\\/g, '/');
        } else if (body.leftExistingImage) {
            // Keep existing image path
            footerTopBar.leftSection.image = body.leftExistingImage;
        }

        // Handle right section image
        if (files && files.rightImage && files.rightImage[0]) {
            // Delete old image if exists
            if (footerTopBar.rightSection.image) {
                const oldImagePath = path.join(__dirname, '..', footerTopBar.rightSection.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            // Save new image path
            footerTopBar.rightSection.image = files.rightImage[0].path.replace(/\\/g, '/');
        } else if (body.rightExistingImage) {
            // Keep existing image path
            footerTopBar.rightSection.image = body.rightExistingImage;
        }

        footerTopBar.updatedAt = Date.now();
        const updatedTopBar = await footerTopBar.save();

        res.json({
            success: true,
            message: 'Footer top bar updated successfully',
            data: updatedTopBar
        });
    } catch (error) {
        console.error('Update footer top bar error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// DELETE - Delete Footer Top Bar
router.delete('/api-footer/delete-footer-top-bar/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const footerTopBar = await FooterTopBar.findOne({ userId });
        
        if (!footerTopBar) {
            return res.status(404).json({
                success: false,
                message: 'Footer top bar not found'
            });
        }

        // Delete associated image files
        if (footerTopBar.leftSection.image) {
            const leftImagePath = path.join(__dirname, '..', footerTopBar.leftSection.image);
            if (fs.existsSync(leftImagePath)) {
                fs.unlinkSync(leftImagePath);
            }
        }

        if (footerTopBar.rightSection.image) {
            const rightImagePath = path.join(__dirname, '..', footerTopBar.rightSection.image);
            if (fs.existsSync(rightImagePath)) {
                fs.unlinkSync(rightImagePath);
            }
        }

        await FooterTopBar.findByIdAndDelete(footerTopBar._id);

        res.json({
            success: true,
            message: 'Footer top bar deleted successfully'
        });
    } catch (error) {
        console.error('Delete footer top bar error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// GET - Serve uploaded images
router.get('/uploads/footer-topbar/:filename', (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, '..', 'uploads', 'footer-topbar', filename);
    
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
// const footerTopBarRoutes = require('./routes/footer-topbar-api');
// app.use('/', footerTopBarRoutes);

// Example API calls:

// GET: /api-footer/get-footer-top-bar/user123
// POST: /api-footer/footer-top-bar/user123 (with FormData containing text fields and optional images)
// PUT: /api-footer/update-footer-top-bar/user123 (with FormData containing text fields and optional images)
// DELETE: /api-footer/delete-footer-top-bar/user123
// GET: /uploads/footer-topbar/filename.jpg (to serve images) 