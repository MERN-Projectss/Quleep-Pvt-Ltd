const productModel = require("../models/productModel")
const { uploadFile } = require("../AWS S3/uploadFileController")
const { isValidName, isValidValue, isValidReqBody, isValidEmail, isValidUrlImg, isvalidIndian, isValidPL, isValidCity,
    isValidPin, isValidImg } = require("../validators/validators")



//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createProduct = async (req, res) => {

    try {

        const data = req.body

        const { name, description, price, date } = data
        const image = req.files
        //name = name.toLowerCase()
        //===============================================VALIDATIONS=====================================================================================

        if (!isValidImg(image)) {
            return res.status(400).send({ status: false, message: "Please Provide Product Image" })
        }

        // if (!isValidReqBody(data)) {

        //     return res.status(400).send({ status: false, message: "Please Provide DATA" })
        // }

        //================================================NAME VALIDATION====================================================================================

        if (!isValidName(name)) {

            return res.status(400).send({ status: false, message: "Provde name field" })
        }
        //================================================DESCRIPTION VALIDATION====================================================================================


        if (!isValidName(description)) {

            return res.status(400).send({ status: false, message: "Provide Description field" })
        }


        //================================================PRICE VALIDATION====================================================================================


        if (!isValidValue(price)) {

            return res.status(400).send({ status: false, message: "Provide price field" })
        }

        //================================================CUR FORMAT VALIDATION====================================================================================


        // if (!isValidField(currencyFormat)) {

        //     return res.status(400).send({ status: false, message: "Provide currencyFormat field" })
        // }

        // //================================================CUR-ID VALIDATION====================================================================================



        // if (!(currencyId == "INR")) {

        //     return res.status(400).send({ status: false, message: "Currency should be INR" })
        // }

        //================================================UNIQUE name VALIDATION====================================================================================

        const isNamePresent = await productModel.find({ name: name });


        if (isNamePresent.name) {

            return res.status(400).send({ status: false, message: `${isNamePresent.name} is already present` })

        }

        // //================================================SIZE VALIDATION====================================================================================


        // if (availableSizes) {
        //     if (availableSizes.length == 0) {
        //         return res.status(400).send({ status: false, message: "Provide Required Size" })
        //     }
        // }

        // let newAvailableSizes = []

        // for (let i = 0; i < availableSizes.length; i++) {
        //     newAvailableSizes.push(availableSizes[i].toUpperCase().split(","))
        //     if (!["S", "XS", "M", "X", "L", "XXL", "XL"].includes(availableSizes[i])) {
        //         return res.status(400).send({ status: false, message: `Please provide size details in this form ${newAvailableSizes}` })
        //     }
        // }

        //================================================SET DATA====================================================================================


        const productImage = await uploadFile(image[0])

        const productData = {
            image: productImage,
            name,
            description,
            price,
            date


        }
        console.log(productData.image.length)
        //================================================CREATE DATA====================================================================================


        const newProductData = await productModel.create(productData)

        return res.status(201).send({
            status: true,
            message: "Product created",
            data: newProductData
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




/////////////////////////////////////////////////////GET-PRODUCT-BY-ID-////////////////////////////////////////////////

const getProduct = async (req, res) => {
    try {
        let name = req.body.name
        //name = name.toLowerCase()
        if (!name || name.trim().length === 0) {
            return res.status(400).send({ status: false, message: "Please enter name to find product " })
        }


        let findProduct = await productModel.findOne({ name: name })

        if (!findProduct) {
            return res.status(404).send({ status: false, message: `${name} not found` })
        }

        if (findProduct.isDeleted) {
            return res.status(404).send({ status: false, message: "This product does not exists anymore" })
        } else {
            return res.status(200).send({ status: true, message: "success", data: findProduct })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


/////////////////////////////////////////////////////Upload images////////////////////////////////////////////////

const uploadImg = async (req,res) => {
    try {
        const name = req.body.name,
            image = req.files

        if (!name || name.trim().length === 0) {
            return res.status(400).send({ status: false, message: "Please enter name to find product " })
        }


        let findProduct = await productModel.findOne({ name: name })

        if (!findProduct) {
            return res.status(404).send({ status: false, message: `${name} not found` })
        }

    for (let i = 0; i < findProduct.image.length; i++) {
            if (image.includes(findProduct.image[i])) {
                return res.status(400).send({ status: false, message: `Please provide size details in this form ${findProduct.image}` })
            }
        }

        const productImage = await uploadFile(image[0])

        const addImages = await productModel.findByIdAndUpdate({_id :findProduct._id},{$push:{image :productImage}})

        return res.status(200).send({ status: true, message: "success", data: addImages })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createProduct, getProduct,uploadImg }