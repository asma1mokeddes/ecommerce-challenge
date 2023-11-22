const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Brand = require('./brand');
const Order = require('./order');
const OrderDetails = require('./orderDetails');
const Promotion = require('./promo');
const Payment = require('./payment');
const Alert = require('./alert');

// Define relationships here
User.hasMany(Order, { foreignKey: 'userID' });
Order.belongsTo(User, { foreignKey: 'userID' });

Product.belongsTo(Category, { foreignKey: 'categoryID' });
Category.hasMany(Product, { foreignKey: 'categoryID' });

Product.belongsTo(Brand, { foreignKey: 'brandID' });
Brand.hasMany(Product, { foreignKey: 'brandID' });

Order.hasMany(OrderDetails, { foreignKey: 'orderID' });
OrderDetails.belongsTo(Order, { foreignKey: 'orderID' });

Product.hasMany(OrderDetails, { foreignKey: 'productID' });
OrderDetails.belongsTo(Product, { foreignKey: 'productID' });

User.hasMany(Alert, { foreignKey: 'userID' });
Alert.belongsTo(User, { foreignKey: 'userID' });

// Export all models
module.exports = {
    User,
    Product,
    Category,
    Brand,
    Order,
    OrderDetails,
    Promotion,
    Payment,
    Alert
  };