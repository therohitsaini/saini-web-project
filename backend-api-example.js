// Backend API Example for Footer Section Endpoints
// This is a reference for implementing the backend endpoints with section-based data

// Express.js + MongoDB example structure

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Footer Section Schema - Generic structure for all footer sections
const footerSectionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  section: {
    type: String,
    required: true,
    enum: ['FooterContact', 'ListItem', 'Sponsors', 'SocialLinks'],
    index: true
  },
  // Generic data structure that can hold different section data
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

// Compound index for userId + section to ensure uniqueness
footerSectionSchema.index({ userId: 1, section: 1 }, { unique: true });

const FooterSection = mongoose.model('FooterSection', footerSectionSchema);

// POST - Create Footer Section
router.post('/api/footer-section/create', async (req, res) => {
  try {
    const { userId, section, ...sectionData } = req.body;
    
    // Check if footer section already exists for this user and section
    const existingSection = await FooterSection.findOne({ userId, section });
    if (existingSection) {
      return res.status(400).json({
        success: false,
        message: `${section} already exists for this user. Use update endpoint.`
      });
    }

    const newFooterSection = new FooterSection({
      userId,
      section,
      data: sectionData
    });

    const savedSection = await newFooterSection.save();
    
    res.status(201).json({
      success: true,
      message: `${section} created successfully`,
      data: savedSection
    });
  } catch (error) {
    console.error('Create footer section error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// PUT - Update Footer Section
router.put('/api/footer-section/update/:section/:id', async (req, res) => {
  try {
    const { section, id } = req.params;
    const { userId, ...sectionData } = req.body;

    const updatedSection = await FooterSection.findByIdAndUpdate(
      id,
      {
        userId,
        section,
        data: sectionData,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: `${section} not found`
      });
    }

    res.json({
      success: true,
      message: `${section} updated successfully`,
      data: updatedSection
    });
  } catch (error) {
    console.error('Update footer section error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET - Get Footer Section by User ID and Section
router.get('/api/footer-section/get/:section/:userId', async (req, res) => {
  try {
    const { section, userId } = req.params;
    
    const footerSection = await FooterSection.findOne({ userId, section });
    
    if (!footerSection) {
      return res.status(404).json({
        success: false,
        message: `${section} not found for this user`
      });
    }

    res.json({
      success: true,
      message: `${section} retrieved successfully`,
      data: footerSection
    });
  } catch (error) {
    console.error('Get footer section error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET - Get All Footer Sections for a User
router.get('/api/footer-section/get-all/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const footerSections = await FooterSection.find({ userId });
    
    // Transform data to section-based object
    const sectionsData = {};
    footerSections.forEach(section => {
      sectionsData[section.section] = {
        _id: section._id,
        userId: section.userId,
        section: section.section,
        ...section.data,
        createdAt: section.createdAt,
        updatedAt: section.updatedAt
      };
    });

    res.json({
      success: true,
      message: 'All footer sections retrieved successfully',
      data: sectionsData
    });
  } catch (error) {
    console.error('Get all footer sections error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// DELETE - Delete Footer Section
router.delete('/api/footer-section/delete/:section/:id', async (req, res) => {
  try {
    const { section, id } = req.params;
    
    const deletedSection = await FooterSection.findByIdAndDelete(id);
    
    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: `${section} not found`
      });
    }

    res.json({
      success: true,
      message: `${section} deleted successfully`,
      data: deletedSection
    });
  } catch (error) {
    console.error('Delete footer section error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

module.exports = router;

// Usage in main app.js or server.js:
// const footerSectionRoutes = require('./routes/footerSection');
// app.use('/', footerSectionRoutes);

// Example data structures for different sections:

// FooterContact Section:
// {
//   userId: "user123",
//   section: "FooterContact",
//   data: {
//     footerContact: {
//       footerContact_Icone: "icon-url",
//       footerContact_Icone_Path: "path",
//       footerContact_Description: "description",
//       description: "main description"
//     },
//     iconeCenter: [
//       {
//         item_Center_Name: "Facebook",
//         item_Center_Icone: "MdFacebook",
//         item_Center_Icone_Path: "https://facebook.com"
//       }
//     ]
//   }
// }

// ListItem Section:
// {
//   userId: "user123",
//   section: "ListItem",
//   data: {
//     title: "Quick Links",
//     description: "Important links",
//     items: [
//       { name: "About Us", url: "/about" },
//       { name: "Contact", url: "/contact" }
//     ]
//   }
// }

// Sponsors Section:
// {
//   userId: "user123",
//   section: "Sponsors",
//   data: {
//     title: "Our Sponsors",
//     sponsors: [
//       { name: "Sponsor 1", logo: "logo1.png", url: "https://sponsor1.com" },
//       { name: "Sponsor 2", logo: "logo2.png", url: "https://sponsor2.com" }
//     ]
//   }
// }

// SocialLinks Section:
// {
//   userId: "user123",
//   section: "SocialLinks",
//   data: {
//     title: "Follow Us",
//     links: [
//       { platform: "Facebook", icon: "MdFacebook", url: "https://facebook.com" },
//       { platform: "Twitter", icon: "MdTwitter", url: "https://twitter.com" }
//     ]
//   }
// } 