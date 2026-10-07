const { DataTypes } =require("sequelize");
constsequelize=require("../db");
constProduct=sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull:false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    category: {
        type: DataTypes.STRING,
        allowNull:false
    }
});
module.exports=Product;

