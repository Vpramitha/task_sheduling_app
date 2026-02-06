const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // one profile per user
    },

    title: {
      type: String,
      trim: true,
      maxlength: 100
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 1000
    },

    skills: [
      {
        type: String,
        trim: true
      }
    ],

    experienceYears: {
      type: Number,
      min: 0,
      max: 60
    },

    currentCompany: {
      type: String,
      trim: true
    },

    location: {
      country: String,
      city: String
    },

    education: [
      {
        degree: String,
        institution: String,
        year: Number
      }
    ],

    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String
    },

    availability: {
      type: String,
      enum: ["AVAILABLE", "BUSY", "NOT_AVAILABLE"],
      default: "AVAILABLE"
    },

    companyList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
      }
    ],

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Profile", ProfileSchema);
