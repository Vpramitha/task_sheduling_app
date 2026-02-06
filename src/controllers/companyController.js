const Company = require('../models/Company');
const { default: Roles } = require('../models/Roles');

// 🏢 Register company
exports.registerCompany = async (req, res) => {
  try {
    const {
      companyName,
      legalName,
      logo,
      tagline,
      description,

      email,
      phone,
      website,

      street,
      city,
      state,
      country,
      postalCode,

      facebook,
      linkedin,
      twitter,
      instagram,

      industry,
      companySize,
      foundedYear,
      registrationNumber,
      
      isActive,
    } = req.body;

    if (!companyName || !email) {
      return res.status(400).json({
        message: "Company name and email are required",
      });
    }

    const existingCompany = await Company.findOne({ companyName });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const newCompany = new Company({
      companyName,
      legalName,
      logo,
      tagline,
      description,

      contact: { email, phone, website },

      address: { street, city, state, country, postalCode },

      socialLinks: { facebook, linkedin, twitter, instagram },

      industry,
      companySize,
      foundedYear,
      registrationNumber,
      createdBy: req.user.id,
      isActive,
    });

    await newCompany.save();

    res.status(201).json({
      message: "Company registered successfully",
      company: newCompany,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update company (ONLY creator can update)
exports.updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    // 1️⃣ Find company
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // 2️⃣ Ownership check
    if (company.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this company",
      });
    }

    // 3️⃣ Destructure allowed fields from body
    const {
      companyName,
      legalName,
      logo,
      tagline,
      description,

      email,
      phone,
      website,

      street,
      city,
      state,
      country,
      postalCode,

      facebook,
      linkedin,
      twitter,
      instagram,

      industry,
      companySize,
      foundedYear,
      registrationNumber,
      isActive,
    } = req.body;

    // 4️⃣ Update fields safely
    if (companyName !== undefined) company.companyName = companyName;
    if (legalName !== undefined) company.legalName = legalName;
    if (logo !== undefined) company.logo = logo;
    if (tagline !== undefined) company.tagline = tagline;
    if (description !== undefined) company.description = description;

    if (email !== undefined) company.contact.email = email;
    if (phone !== undefined) company.contact.phone = phone;
    if (website !== undefined) company.contact.website = website;

    if (street !== undefined) company.address.street = street;
    if (city !== undefined) company.address.city = city;
    if (state !== undefined) company.address.state = state;
    if (country !== undefined) company.address.country = country;
    if (postalCode !== undefined) company.address.postalCode = postalCode;

    if (facebook !== undefined) company.socialLinks.facebook = facebook;
    if (linkedin !== undefined) company.socialLinks.linkedin = linkedin;
    if (twitter !== undefined) company.socialLinks.twitter = twitter;
    if (instagram !== undefined) company.socialLinks.instagram = instagram;

    if (industry !== undefined) company.industry = industry;
    if (companySize !== undefined) company.companySize = companySize;
    if (foundedYear !== undefined) company.foundedYear = foundedYear;
    if (registrationNumber !== undefined)
      company.registrationNumber = registrationNumber;

    if (isActive !== undefined) company.isActive = isActive;

    // 5️⃣ Save updates
    await company.save();

    res.status(200).json({
      message: "Company updated successfully",
      company,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Get company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company list for user
exports.getCompanyList = async (req, res) => {
  try {
    // 1. Get roles for logged-in user
    const roles = await Roles.find({ userId: req.user.id })
      .select("companyId");

    // Extract unique companyIds
    const companyIds = [...new Set(
      roles.map(role => role.companyId.toString())
    )];

    // 2. Get company details
    const companies = await Company.find({
      _id: { $in: companyIds }
    }).select("name logo industry");

    res.status(200).json({
      success: true,
      data: companies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};