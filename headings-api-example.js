const express = require('express');
const router = express.Router();
const HeadingModel = require('./headings-model-example');

// GET all headings for a user
router.get('/api-get-heading-data/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const headings = await HeadingModel.find({ userId: userId });
        
        res.status(200).json({
            success: true,
            message: "Headings retrieved successfully",
            data: headings
        });

    } catch (error) {
        console.error('Error fetching headings:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// GET heading by section for a user
router.get('/api-get-heading-by-section/:userId/:section', async (req, res) => {
    try {
        const { userId, section } = req.params;
        
        const heading = await HeadingModel.findOne({ 
            userId: userId, 
            section: section 
        });
        
        if (!heading) {
            return res.status(404).json({
                success: false,
                message: "Heading not found for this section"
            });
        }

        res.status(200).json({
            success: true,
            message: "Heading retrieved successfully",
            data: heading
        });

    } catch (error) {
        console.error('Error fetching heading by section:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// CREATE new heading
router.post('/api-create-heading/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { section, heading, description, item_ShowOnWebsite } = req.body;

        // Check if heading already exists for this section
        const existingHeading = await HeadingModel.findOne({
            userId: userId,
            section: section
        });

        if (existingHeading) {
            return res.status(400).json({
                success: false,
                message: "Heading already exists for this section. Use update instead."
            });
        }

        const newHeading = new HeadingModel({
            userId: userId,
            section: section,
            heading: heading,
            description: description,
            item_ShowOnWebsite: item_ShowOnWebsite !== false
        });

        const savedHeading = await newHeading.save();

        res.status(201).json({
            success: true,
            message: "Heading created successfully",
            data: savedHeading
        });

    } catch (error) {
        console.error('Error creating heading:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// CREATE or UPDATE heading (PUT method)
router.put('/api-create-update/headings/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { section, heading, description, item_ShowOnWebsite } = req.body;

        // Check if heading already exists for this section
        const existingHeading = await HeadingModel.findOne({
            userId: userId,
            section: section
        });

        if (existingHeading) {
            // Update existing heading
            const updatedHeading = await HeadingModel.findByIdAndUpdate(
                existingHeading._id,
                {
                    heading: heading,
                    description: description,
                    item_ShowOnWebsite: item_ShowOnWebsite !== false
                },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Heading updated successfully",
                data: updatedHeading
            });
        } else {
            // Create new heading
            const newHeading = new HeadingModel({
                userId: userId,
                section: section,
                heading: heading,
                description: description,
                item_ShowOnWebsite: item_ShowOnWebsite !== false
            });

            const savedHeading = await newHeading.save();

            res.status(201).json({
                success: true,
                message: "Heading created successfully",
                data: savedHeading
            });
        }

    } catch (error) {
        console.error('Error creating/updating heading:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// UPDATE heading by ID
router.put('/api-create-update/headings/:userId/:headingId', async (req, res) => {
    try {
        const { userId, headingId } = req.params;
        const { section, heading, description, item_ShowOnWebsite } = req.body;

        const existingHeading = await HeadingModel.findOne({
            _id: headingId,
            userId: userId
        });

        if (!existingHeading) {
            return res.status(404).json({
                success: false,
                message: "Heading not found"
            });
        }

        const updatedHeading = await HeadingModel.findByIdAndUpdate(
            headingId,
            {
                section: section,
                heading: heading,
                description: description,
                item_ShowOnWebsite: item_ShowOnWebsite !== false
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Heading updated successfully",
            data: updatedHeading
        });

    } catch (error) {
        console.error('Error updating heading:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// DELETE heading by ID
router.delete('/api-delete-heading/:userId/:headingId', async (req, res) => {
    try {
        const { userId, headingId } = req.params;

        const deletedHeading = await HeadingModel.findOneAndDelete({
            _id: headingId,
            userId: userId
        });

        if (!deletedHeading) {
            return res.status(404).json({
                success: false,
                message: "Heading not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Heading deleted successfully",
            data: deletedHeading
        });

    } catch (error) {
        console.error('Error deleting heading:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// DELETE heading by section
router.delete('/api-delete-heading-by-section/:userId/:section', async (req, res) => {
    try {
        const { userId, section } = req.params;

        const deletedHeading = await HeadingModel.findOneAndDelete({
            userId: userId,
            section: section
        });

        if (!deletedHeading) {
            return res.status(404).json({
                success: false,
                message: "Heading not found for this section"
            });
        }

        res.status(200).json({
            success: true,
            message: "Heading deleted successfully",
            data: deletedHeading
        });

    } catch (error) {
        console.error('Error deleting heading by section:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// DELETE all headings for a user
router.delete('/api-delete-all-headings/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedHeadings = await HeadingModel.deleteMany({
            userId: userId
        });

        res.status(200).json({
            success: true,
            message: "All headings deleted successfully",
            deletedCount: deletedHeadings.deletedCount
        });

    } catch (error) {
        console.error('Error deleting all headings:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

module.exports = router; 