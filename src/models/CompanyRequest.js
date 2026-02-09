const mongoose = require('mongoose');
const Company = require('./Company');

const companyRequestSchema = new mongoose.Schema(
    {
        companyId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          index: true
        },
    
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          index: true
        },
    
        requestedRole: {
          type: String,
          required: true,
          trim: true
        },

        message: {
          type: String,
          trim: true,
          maxlength: 500
        }

      },
      {
        timestamps: true // creates createdAt & updatedAt automatically
      }
    );

module.exports = mongoose.model("CompanyRequest", companyRequestSchema);