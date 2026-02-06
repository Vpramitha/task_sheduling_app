const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    legalName: {
      type: String,
      trim: true,
    },

    logo: {
      type: String, // URL or file path
    },

    tagline: {
      type: String,
      maxlength: 150,
    },

    description: {
      type: String,
    },

    contact: {
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
      phone: {
        type: String,
      },
      website: {
        type: String,
      },
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },

    socialLinks: {
      facebook: String,
      linkedin: String,
      twitter: String,
      instagram: String,
    },

    industry: {
      type: String,
    },

    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },

    foundedYear: {
      type: Number,
    },

    registrationNumber: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Company", companySchema);
