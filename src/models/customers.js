"use strict";
//@ts-nocheck
const mongoose = require('mongoose');
const { Schema } = mongoose;
const customerSchema = new Schema({
    name: { type: String, required: true },
    industry: String,
    orders: [{ description: String, amount: Number }]
});
module.exports = mongoose.model('Customer', customerSchema);
