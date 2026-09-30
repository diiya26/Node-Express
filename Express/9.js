const express = require("express");
const app = express();
const port = 8080;

// Middleware to read JSON data
app.use(express.json());

// -------------- Product Data---------------------
let products = [
    {
        id: 101,
        name: "Laptop",
        category: "Electronics",
        price: 55000
    },
    {
        id: 102,
        name: "Mobile",
        category: "Electronics",
        price: 25000
    },
    {
        id: 103,
        name: "Shoes",
        category: "Fashion",
        price: 3000
    }
];

// ----------------- CUSTOM MIDDLEWARE-------------------------
const logger = (req, res, next) => {
    console.log("-------------");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    next();
};

// Apply middleware to all requests
app.use(logger);

// ----------------------------- ROUTING-------------------------

// 1. Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Online Shopping API");
});

// 2. Get all products
app.get("/products", (req, res) => {
    res.status(200).json(products);
});

// 3. Search product using Query Parameter
// Example: /products/search?category=Electronics
app.get("/products/search", (req, res) => {

    const category = req.query.category;
    const result = products.filter(
        product =>
            product.category.toLowerCase() ===
            category.toLowerCase()
    );
  if (result.length > 0) {
        res.status(200).json(result);
  } else {
        res.status(404).json({
            message: "No products found"
        });
  }
});

// 4. Get product using Route Parameter
// Example: /products/101
app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = products.find(
        p => p.id == productId
    );
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// 5. Add new product

app.post("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// 6. Update product
app.put("/products/:id", (req, res) => {
    const productId = req.params.id;
    const index = products.findIndex(
        p => p.id == productId
    );
    if (index !== -1) {
        products[index] = req.body;
        res.status(200).json({
            message: "Product updated successfully",
            product: products[index]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// 7. Delete product
app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;
    const index = products.findIndex(
        p => p.id == productId
    );
    if (index !== -1) {
        const deletedProduct =  products.splice(index, 1);
        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct[0]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// ----------------404 MIDDLEWARE-----------------------
app.use((req, res) => {
    res.status(404).json({
        message: "API endpoint not found"
    });
});

// -------------- START SERVER--------------------
app.listen(port, () => {
    console.log(
        `Server running at http://localhost:${port}`
    );
});



