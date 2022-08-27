const express = require("express");
const Joi = require("@hapi/joi");
const app = express();

const API_PREFIX = "/api";
const products = [
    {
        id: 1,
        name: "Orange Juice",
        brand: "Fanta",
        price: 20.00,
        quantity: 2
    },
    {
        id: 2,
        name: "iPhone",
        brand: "Apple",
        price: 200.00,
        quantity: 2
    },
    {
        id: 3,
        name: "iPhone 13 Pro",
        brand: "Apple",
        price: 200.00,
        quantity: 2
    }
];

// Validation Schema
const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().integer().required(),
    brand: Joi.string().min(3).required(),
    quantity: Joi.number().integer().required()
});

const idValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
});

const nameValidationSchema = Joi.object({
    name: Joi.string().required(),
});

const priceValidationSchema = Joi.object({
    price: Joi.number().integer().required(),
});

const brandValidationSchema = Joi.object({
    brand: Joi.string().required(),
});

// Create
app.use(express.json());
app.post(`${API_PREFIX}/product`, (req, res) => {
    const validationRes = productSchema.validate(req.body);

    if (validationRes.error) {
        const errMessage = validationRes.error.details[0].message;
        console.log("errMessage :- ", errMessage);
        res.status(400).send({ "message": errMessage });
        return;
    }

    let newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        quantity: req.body.quantity
    }
    products.push(newProduct);
    res.status(200).send({ "message": `New product '${req.body.name}' added.` });
});

// Retrieve
// All
app.get(`${API_PREFIX}/product`, (req, res) => {
    res.send(products);
});

// By ID
app.get(`${API_PREFIX}/product/id/:id`, (req, res) => {
    const idValidationResult = idValidationSchema.validate(req.params);
    if (idValidationResult.error) {
        const errMessage = idValidationResult.error.details[0].message;
        console.log("errMessage :- ", errMessage);
        res.status(400).send({ "message": errMessage });
        return;
    }

    // Find product by id
    let product = products.find((m) => m.id === parseInt(req.params.id));  //if not return with suitable message
    if (!product) {
        res.status(404).send({ "message": `Product with id '${req.params.id}' not found.` });
    }

    res.send(product);
});

// By Name
app.get(`${API_PREFIX}/product/name/:name`, (req, res) => {
    console.log(req.params);
    const nameValidationResult = nameValidationSchema.validate(req.params);
    if (nameValidationResult.error) {
        const errMessage = nameValidationResult.error.details[0].message;
        console.log("errMessage :- ", errMessage);
        res.status(400).send({ "message": errMessage });
        return;
    }

    // Find product by name
    let foundProducts = products.filter((m) => m.name === req.params.name);  //if not return with suitable message
    res.send(foundProducts);
});

// By Price
app.get(`${API_PREFIX}/product/price/:price`, (req, res) => {
    const priceValidationResult = priceValidationSchema.validate(req.params);
    if (priceValidationResult.error) {
        const errMessage = priceValidationResult.error.details[0].message;
        console.log("errMessage :- ", errMessage);
        res.status(400).send({ "message": errMessage });
        return;
    }

    // Find product by price
    let foundProducts = products.filter((m) => m.price === parseInt(req.params.price));  //if not return with suitable message
    res.send(foundProducts);
});

// By Brand
app.get(`${API_PREFIX}/product/brand/:brand`, (req, res) => {
    const brandvalidationResult = brandValidationSchema.validate(req.params);
    if (brandvalidationResult.error) {
        const errMessage = brandvalidationResult.error.details[0].message;
        console.log("errMessage :- ", errMessage);
        res.status(400).send({ "message": errMessage });
        return;
    }

    // Find product by brand
    let foundProducts = products.filter((m) => m.brand === req.params.brand);  //if not return with suitable message
    res.send(foundProducts);
});



// Update
app.use(express.json());
app.put(`${API_PREFIX}/product/:id`, (req, res) => {
    // Validate ID
    const idValidationResult = idValidationSchema.validate(req.params);
    if (idValidationResult.error) {
        const errMessage = idValidationResult.error.details[0].message;
        console.log("errMessage :- ", errMessage);
        res.status(400).send({ "message": errMessage });
        return;
    }
    console.log(req.params)

    //Find the product, if exists or not
    let product = products.find((m) => m.id === parseInt(req.params.id));
    //if not return with suitable message
    if (!product) {
        res.status(404).send({ "message": `Product with id '${req.params.id}' not found.` });
    }

    // Validate Post Body
    const validationRes = productSchema.validate(req.body);
    if (validationRes.error) {
        const errMessage = validationRes.error.details[0].message;
        console.log("errMessage :- ", errMessage);
        res.status(400).send({ "message": errMessage });
        return;
    }

    // Modify product data
    product.name = req.body.name;
    product.price = req.body.price;
    product.brand = req.body.brand;
    product.quantity = req.body.quantity;

    res.send({ "product": product, "message": "Success updated product information." });
});


// Delete
app.delete(`${API_PREFIX}/product/:id`, (req, res) => {
    // Validate ID
    const idValidationResult = idValidationSchema.validate(req.params);
    if (idValidationResult.error) {
        const errMessage = idValidationResult.error.details[0].message;
        console.log("errMessage :- ", errMessage);
        res.status(400).send({ "message": errMessage });
        return;
    }

    // Find product
    //Find the product, if exists or not
    let product = products.find((m) => m.id === parseInt(req.params.id));
    //if not return with suitable message
    if (!product) {
        res.status(404).send({ "message": `Product with id '${req.params.id}' not found.` });
    }

    // Get product index
    const index = products.indexOf(product);
    if (index != -1) {
        products.splice(index, 1);
    }
    res.send({ "message": `Product with id '${req.params.id}' has been deleted.` });
});




const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening to port ${port}`));
