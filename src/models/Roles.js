const mongoose = require('mongoose');
const { Schema } = mongoose;


const roleSchema = new Schema(
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

    roleCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },

    roleName: {
      type: String,
      required: true,
      trim: true
    },

    order: {
      type: Number,
      required: true,
      min: 1
    },

    parentId: {
      type: String,
      ref: "Role",
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true // creates createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Role", roleSchema);
