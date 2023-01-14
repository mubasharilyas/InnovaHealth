


import mongoose from 'mongoose';
const contactSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contactId: String,
    contactStatus: String,
    contactGround: String,
    contactSatellite: String,
    contactEquipment: String,
    contactState: String,
    contactStep: String,
    contactDetail: String,
    contactBeginTimestamp: Number,
    contactEndTimestamp: Number,
    contactLatitude: Number,
    contactLongitude: Number,
    contactAzimuth: Number,
    contactElevation: Number,
    contactResolution: String,
    contactResolutionStatus: String,
    contactName: String,
})

export const Contact = mongoose.model('Contact',contactSchema);
