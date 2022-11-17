const { Schema, mongoose, trusted } = require("mongoose")
const moment = require("moment")

const productSchema = new Schema({


    image: [{
        type: String, validate: {
            validator: function () {
                return this.image.length <= 6;
            },
            message: 'images exceeds max size.'
        }
    }],

    name: { type: String, required: true, trim: true, unique: true },

    description: { type: String, required: true, trim: true, unique: true },

    price: { type: String, enums: ["INR", "USD", "CNY"], trim: true },

    date: { type: String, default: moment().format('LLLL') }

    //uploadedBy: { type: Schema.Types.ObjectId, ref: "Seller" }

})

module.exports = mongoose.model("Product", productSchema)  //products