const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
"product_db",       // Database name
"root",                   // MySQL username
"",                         // MySQL password
    {
        host: "localhost",
        dialect: "mysql"
    }
);
// check database connection 
sequelize.authenticate()
    .then(() => {
        console.log("MySQL database connected successfully!");
    })
    .catch((error) => {
        console.log("Unable to connect:", error);
    });
module.exports = sequelize;

