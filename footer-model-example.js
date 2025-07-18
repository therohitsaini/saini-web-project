const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    section: {
        type: String,
        required: true,
        enum: ['copyright', 'contact', 'social', 'sponsors'],
        default: 'copyright'
    },
    copyrightText: {
        type: String,
        default: 'Copyright © 2023 Corpex | Powered By Corpex'
    },
    poweredByText: {
        type: String,
        default: 'Corpex'
    },
    paymentIcons: [{
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        url: {
            type: String,
            default: ''
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for efficient queries
footerSchema.index({ userId: 1, section: 1 });

// Pre-save middleware to ensure unique IDs for payment icons
footerSchema.pre('save', function(next) {
    if (this.paymentIcons && this.paymentIcons.length > 0) {
        // Ensure each icon has a unique ID
        const usedIds = new Set();
        this.paymentIcons.forEach(icon => {
            if (usedIds.has(icon.id)) {
                icon.id = Date.now() + Math.random();
            }
            usedIds.add(icon.id);
        });
    }
    next();
});

// Method to add a new payment icon
footerSchema.methods.addPaymentIcon = function(iconData) {
    const newId = this.paymentIcons.length > 0 
        ? Math.max(...this.paymentIcons.map(icon => icon.id)) + 1 
        : 1;
    
    this.paymentIcons.push({
        id: newId,
        name: iconData.name || `Payment ${this.paymentIcons.length + 1}`,
        icon: iconData.icon || 'CreditCard',
        url: iconData.url || '',
        isActive: iconData.isActive !== false
    });
    
    return this.save();
};

// Method to remove a payment icon by ID
footerSchema.methods.removePaymentIcon = function(iconId) {
    this.paymentIcons = this.paymentIcons.filter(icon => icon.id !== iconId);
    return this.save();
};

// Method to update a payment icon
footerSchema.methods.updatePaymentIcon = function(iconId, updateData) {
    const iconIndex = this.paymentIcons.findIndex(icon => icon.id === iconId);
    if (iconIndex !== -1) {
        this.paymentIcons[iconIndex] = { ...this.paymentIcons[iconIndex], ...updateData };
        return this.save();
    }
    throw new Error('Payment icon not found');
};

// Static method to get footer data by user and section
footerSchema.statics.getFooterByUserAndSection = function(userId, section) {
    return this.findOne({ userId, section });
};

// Static method to get all footer data for a user
footerSchema.statics.getAllFooterByUser = function(userId) {
    return this.find({ userId });
};

const FooterModel = mongoose.model('Footer', footerSchema);

module.exports = FooterModel; 