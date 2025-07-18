// MongoDB Model for Headings
// This file shows the schema structure for the Headings collection

const mongoose = require('mongoose');

const headingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    section: {
        type: String,
        required: true,
        enum: ['service', 'portfolio', 'pricing', 'testimonial', 'hero', 'about', 'contact'],
        default: 'service'
    },
    heading: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: ''
    },
    item_ShowOnWebsite: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for efficient queries
headingSchema.index({ userId: 1, section: 1 }, { unique: true });

// Pre-save middleware to ensure unique section per user
headingSchema.pre('save', function(next) {
    // This ensures only one heading per section per user
    next();
});

// Method to update heading data
headingSchema.methods.updateHeading = function(updateData) {
    Object.assign(this, updateData);
    return this.save();
};

// Method to toggle visibility
headingSchema.methods.toggleVisibility = function() {
    this.item_ShowOnWebsite = !this.item_ShowOnWebsite;
    return this.save();
};

// Static method to get heading by user and section
headingSchema.statics.getHeadingByUserAndSection = function(userId, section) {
    return this.findOne({ userId, section });
};

// Static method to get all headings for a user
headingSchema.statics.getAllHeadingsByUser = function(userId) {
    return this.find({ userId }).sort({ section: 1 });
};

// Static method to get active headings for a user
headingSchema.statics.getActiveHeadingsByUser = function(userId) {
    return this.find({ 
        userId, 
        item_ShowOnWebsite: true,
        isActive: true 
    }).sort({ section: 1 });
};

// Static method to create or update heading
headingSchema.statics.createOrUpdateHeading = function(userId, section, headingData) {
    return this.findOneAndUpdate(
        { userId, section },
        {
            ...headingData,
            userId,
            section
        },
        { 
            new: true, 
            upsert: true,
            setDefaultsOnInsert: true
        }
    );
};

// Static method to delete heading by user and section
headingSchema.statics.deleteHeadingByUserAndSection = function(userId, section) {
    return this.findOneAndDelete({ userId, section });
};

// Virtual for formatted heading
headingSchema.virtual('formattedHeading').get(function() {
    return this.heading.charAt(0).toUpperCase() + this.heading.slice(1);
});

// Virtual for short description
headingSchema.virtual('shortDescription').get(function() {
    if (this.description.length <= 100) {
        return this.description;
    }
    return this.description.substring(0, 100) + '...';
});

// Ensure virtuals are included in JSON output
headingSchema.set('toJSON', { virtuals: true });
headingSchema.set('toObject', { virtuals: true });

const HeadingModel = mongoose.model('Heading', headingSchema);

module.exports = HeadingModel; 