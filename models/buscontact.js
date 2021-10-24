let mongoose = require('mongoose');

// Create a model class
let buscontactModel = mongoose.Schema(
    {
        // _id: String,
        contact_name: String,
        contact_number: String,
        email_address: String,
        
    },
    {
        collection: "business_contact"
    }
);

module.exports = mongoose.model('Buscontact', buscontactModel);