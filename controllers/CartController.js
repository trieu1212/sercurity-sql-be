const db = require("../orm/models/index");

const CartController = {
  createCart: async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    
    console.log(req.body);
    if (!productId || !quantity) {
      const rawData = Object.keys(req.body)[0];
      const parsedData = JSON.parse(rawData);
      const newProductId = parsedData.productId;
      const newQuantity = parsedData.quantity;
      try {
        const alreadyProduct = await db.Cart.findOne({
          where: { userId: userId, productId: newProductId },
        });
        if (!alreadyProduct) {
          const cart = await db.Cart.create({
            userId: userId,
            productId: newProductId,
            quantity: newQuantity,
          });
          res.status(201).json({ message: 'Created cart successfully' });
        }
        else {
          await db.Cart.update(
            { quantity: alreadyProduct.quantity + newQuantity },
            {
              where: {
                userId: userId,
                productId: newProductId
              }
            }
          )
          res.status(200).json({ message: 'Updated cart successfully' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
    else {
      try {
        const alreadyProduct = await db.Cart.findOne({
          where: { userId: userId, productId: productId },
        });
        if (!alreadyProduct) {
          const cart = await db.Cart.create({
            userId: userId,
            productId: +productId,
            quantity: quantity,
          });
          res.status(201).json({ message: 'Created cart successfully' });
        }
        else {
          await db.Cart.update(
            { quantity: alreadyProduct.quantity + quantity },
            {
              where: {
                userId: userId,
                productId: +productId
              }
            }
          )
          res.status(200).json({ message: 'Updated cart successfully' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  },
  getUserCart: async (req, res) => {
    const { userId } = req.params
    try {
      const cart = await db.Cart.findAll({
        where: { userId: userId },
        include: [
          {
            model: db.Product,
            attributes: ['title', 'description', 'price', 'image']
          },
        ]
      })
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateUserCart: async (req, res) => {
    const { userId } = req.params
    const { productId, quantity } = req.body
    try {
      await db.Cart.update(
        { quantity: quantity },
        {
          where: {
            userId: userId,
            productId: productId
          }
        }
      )
      res.status(200).json({ message: "update cart success" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  deleteProductFromCart: async (req, res) => {
    const { productId } = req.params
    const userId = req.user.id
    try {
      const deleteProduct = await db.Cart.destroy({
        where: { userId: userId, productId: productId }
      })
      res.status(200).json({ message: 'Deleted product from cart successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
};

module.exports = CartController;
