const express = require('express');
const router = express.Router();
const FooterModel = require('./footer-model-example');

// DELETE icon by ID (simplified version)
router.delete('/api-delete-icon-by-id/:userId/:iconId', async (req, res) => {
    try {
        const { userId, iconId } = req.params;
        
        // Find the footer document that contains this icon
        const footer = await FooterModel.findOne({
            userId: userId,
            'paymentIcons.id': parseInt(iconId)
        });

        if (!footer) {
            return res.status(404).json({
                success: false,
                message: `Icon with ID ${iconId} not found`
            });
        }

        // Remove the specific icon from paymentIcons array
        const updatedPaymentIcons = footer.paymentIcons.filter(
            icon => icon.id !== parseInt(iconId)
        );

        // Update the footer with the new paymentIcons array
        const updatedFooter = await FooterModel.findByIdAndUpdate(
            footer._id,
            { paymentIcons: updatedPaymentIcons },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: `Icon ${iconId} deleted successfully`,
            data: updatedFooter
        });

    } catch (error) {
        console.error('Error deleting icon by ID:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// DELETE entire footer section
router.delete('/api-delete-footer/:userId/:sectionId', async (req, res) => {
    try {
        const { userId, sectionId } = req.params;
        
        const deletedFooter = await FooterModel.findOneAndDelete({
            userId: userId,
            _id: sectionId
        });

        if (!deletedFooter) {
            return res.status(404).json({
                success: false,
                message: "Footer section not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Footer section deleted successfully",
            data: deletedFooter
        });

    } catch (error) {
        console.error('Error deleting footer section:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// DELETE individual payment icon from footer
router.delete('/api-delete-footer-icon/:userId/:sectionId/:iconId', async (req, res) => {
    try {
        const { userId, sectionId, iconId } = req.params;
        
        const footer = await FooterModel.findOne({
            userId: userId,
            _id: sectionId
        });

        if (!footer) {
            return res.status(404).json({
                success: false,
                message: "Footer section not found"
            });
        }

        // Remove the specific icon from paymentIcons array
        const updatedPaymentIcons = footer.paymentIcons.filter(
            icon => icon.id.toString() !== iconId
        );

        // Update the footer with the new paymentIcons array
        const updatedFooter = await FooterModel.findByIdAndUpdate(
            sectionId,
            { paymentIcons: updatedPaymentIcons },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Payment icon deleted successfully",
            data: updatedFooter
        });

    } catch (error) {
        console.error('Error deleting payment icon:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// DELETE multiple payment icons
router.delete('/api-delete-footer-icons/:userId/:sectionId', async (req, res) => {
    try {
        const { userId, sectionId } = req.params;
        const { iconIds } = req.body; // Array of icon IDs to delete

        if (!iconIds || !Array.isArray(iconIds)) {
            return res.status(400).json({
                success: false,
                message: "iconIds array is required"
            });
        }

        const footer = await FooterModel.findOne({
            userId: userId,
            _id: sectionId
        });

        if (!footer) {
            return res.status(404).json({
                success: false,
                message: "Footer section not found"
            });
        }

        // Remove multiple icons from paymentIcons array
        const updatedPaymentIcons = footer.paymentIcons.filter(
            icon => !iconIds.includes(icon.id.toString())
        );

        // Update the footer with the new paymentIcons array
        const updatedFooter = await FooterModel.findByIdAndUpdate(
            sectionId,
            { paymentIcons: updatedPaymentIcons },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: `${iconIds.length} payment icon(s) deleted successfully`,
            data: updatedFooter
        });

    } catch (error) {
        console.error('Error deleting payment icons:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// DELETE all footer data for a user
router.delete('/api-delete-all-footer/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const deletedFooters = await FooterModel.deleteMany({
            userId: userId
        });

        res.status(200).json({
            success: true,
            message: "All footer data deleted successfully",
            deletedCount: deletedFooters.deletedCount
        });

    } catch (error) {
        console.error('Error deleting all footer data:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

module.exports = router; 