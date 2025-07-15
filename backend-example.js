const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/footer-sections', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
   console.log('✅ Connected to MongoDB');
});

// Footer Section Schema
const footerSectionSchema = new mongoose.Schema({
   sectionType: {
      type: String,
      required: true,
      enum: ['FooterContact', 'ListItem', 'Sponsors', 'SocialLinks']
   },
   data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
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

const FooterSection = mongoose.model('FooterSection', footerSectionSchema);

// API Routes

// 1. Create new footer section
app.post('/api/footer-section/create', async (req, res) => {
   try {
      console.log('📝 Creating footer section:', req.body);
      
      const { sectionType, data } = req.body;
      
      if (!sectionType || !data) {
         return res.status(400).json({
            success: false,
            message: 'sectionType and data are required'
         });
      }
      
      // Check if section already exists
      const existingSection = await FooterSection.findOne({ sectionType });
      
      if (existingSection) {
         return res.status(409).json({
            success: false,
            message: `Section ${sectionType} already exists. Use PUT to update.`
         });
      }
      
      const newSection = new FooterSection({
         sectionType,
         data
      });
      
      const savedSection = await newSection.save();
      
      console.log('✅ Footer section created:', savedSection);
      
      res.status(201).json({
         success: true,
         message: 'Footer section created successfully',
         data: savedSection
      });
      
   } catch (error) {
      console.error('❌ Error creating footer section:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message
      });
   }
});

// 2. Get specific footer section
app.get('/api/footer-section/get/:sectionType', async (req, res) => {
   try {
      console.log('🔍 Fetching footer section:', req.params.sectionType);
      
      const { sectionType } = req.params;
      
      const section = await FooterSection.findOne({ sectionType });
      
      if (!section) {
         return res.status(404).json({
            success: false,
            message: `Section ${sectionType} not found`
         });
      }
      
      console.log('✅ Footer section found:', section);
      
      res.json({
         success: true,
         data: section.data,
         _id: section._id,
         sectionType: section.sectionType,
         createdAt: section.createdAt,
         updatedAt: section.updatedAt
      });
      
   } catch (error) {
      console.error('❌ Error fetching footer section:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message
      });
   }
});

// 3. Update footer section
app.put('/api/footer-section/update/:id', async (req, res) => {
   try {
      console.log('🔄 Updating footer section:', req.params.id);
      
      const { id } = req.params;
      const { sectionType, data } = req.body;
      
      if (!data) {
         return res.status(400).json({
            success: false,
            message: 'data is required'
         });
      }
      
      const updatedSection = await FooterSection.findByIdAndUpdate(
         id,
         {
            data,
            updatedAt: Date.now()
         },
         { new: true, runValidators: true }
      );
      
      if (!updatedSection) {
         return res.status(404).json({
            success: false,
            message: 'Footer section not found'
         });
      }
      
      console.log('✅ Footer section updated:', updatedSection);
      
      res.json({
         success: true,
         message: 'Footer section updated successfully',
         data: updatedSection
      });
      
   } catch (error) {
      console.error('❌ Error updating footer section:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message
      });
   }
});

// 4. Get all footer sections
app.get('/api/footer-section/get-all', async (req, res) => {
   try {
      console.log('🔍 Fetching all footer sections...');
      
      const sections = await FooterSection.find().sort({ createdAt: -1 });
      
      // Organize by section type
      const organizedData = {};
      sections.forEach(section => {
         organizedData[section.sectionType] = section.data;
      });
      
      console.log('✅ All footer sections fetched:', Object.keys(organizedData));
      
      res.json({
         success: true,
         data: organizedData,
         count: sections.length
      });
      
   } catch (error) {
      console.error('❌ Error fetching all footer sections:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message
      });
   }
});

// 5. Delete footer section
app.delete('/api/footer-section/delete/:id', async (req, res) => {
   try {
      console.log('🗑️ Deleting footer section:', req.params.id);
      
      const { id } = req.params;
      
      const deletedSection = await FooterSection.findByIdAndDelete(id);
      
      if (!deletedSection) {
         return res.status(404).json({
            success: false,
            message: 'Footer section not found'
         });
      }
      
      console.log('✅ Footer section deleted:', deletedSection);
      
      res.json({
         success: true,
         message: 'Footer section deleted successfully',
         data: deletedSection
      });
      
   } catch (error) {
      console.error('❌ Error deleting footer section:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message
      });
   }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
   res.json({
      success: true,
      message: 'Footer API is running',
      timestamp: new Date().toISOString()
   });
});

// Start server
app.listen(PORT, () => {
   console.log(`🚀 Server running on port ${PORT}`);
   console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
   console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 