const db = require("../orm/models/index");

const OrderController = {
  createOrder: async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
    const { address } = req.body;
    const { products } = req.body;
    try {
      const order = await db.Order.create({
        userId: userId,
        amount: amount,
        status: "Success",
        address: address,
      });
      if (products && products.length > 0) {
        for (const product of products) {
          await db.OrderItem.create({
            orderId: order.id,
            productId: product.productId,
            quantity: product.quantity,
            size: product.size,
          });
        }
      }
      await db.Cart.destroy({ where: { userId: userId } });
      res.status(200).json({ message: "Tạo đơn hàng thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserOrder: async (req, res) => {
    const { userId } = req.params;
    try {
      const order = await db.Order.findAll({
        where: { userId: userId },
        include: [
          {
            model: db.OrderItem,
            include: [
              {
                model: db.Product,
                attributes: ["id","title", "price", "image"],
              },
            ],
          },
          { model: db.User, attributes: ["username", "email","phone","address"] },
        ],
      });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllOrder : async(req,res)=>{
    try {
      const order = await db.Order.findAll({
        include: [
          {
            model: db.OrderItem,
            include: [
              {
                model: db.Product,
                attributes: ["id","title", "price", "image"],
              },
            ],
          },
          { model: db.User, attributes: ["username", "email"] },
        ],
        order: [['createdAt', 'DESC']]
      })
      res.status(200).json(order)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = OrderController;
