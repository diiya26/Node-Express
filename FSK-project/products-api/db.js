const { Sequelize } =require("sequelize");

constsequelize=newSequelize(
    "product_db",       // Database name
    "postgres",         // PostgreSQL username
    "1234",             // PostgreSQL password
    {
        host:"localhost",
        dialect:"postgres",
        port:5432
    }
);

// Check database connection

sequelize.authenticate()
    .then(() =>{
        console.log("PostgreSQL database connected successfully!");
    })
    .catch((error) =>{
        console.log("Unable to connect:", error);
    });

module.exports=sequelize;

