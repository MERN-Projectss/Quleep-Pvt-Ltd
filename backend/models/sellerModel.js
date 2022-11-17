const { Schema, default: mongoose } = require("mongoose")

const sellerSchema = new Schema({

    firstName: { type: String, required: true, trim: true },

    lastName: { type: String, required: true, trim: true },

    mobileNumber: { type: Number, required: true, trim: true , unique : true },

    email: { type: String, required: true, trim: true, unique : true },

    password: { type: String, required: true, trim: true },

    age: { type: Number, required: true, trim: true }

})

module.exports =mongoose.model("Seller",sellerSchema) //sellers