const db = require("../orm/models/index");

const CartController = {
  createCart: async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    try {
      const cart = await db.Cart.create({
        userId: userId,
        productId: productId,
        quantity: quantity,
      });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserCart:async(req,res)=>{
    const {userId} = req.params
    try {
        const cart = await db.Cart.findAll({
            where:{userId:userId},
            include:[
                {
                    model:db.Product,
                    attributes:['title','description','price','image']
                },
            ]
        })
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
  },
  updateUserCart:async(req,res)=>{
    const {userId} = req.params
    const {productId,quantity} = req.body
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
      res.status(200).json({message:"update cart success"})
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  },
  deleteProductFromCart:async(req,res)=>{
    const {userId,productId} = req.params
    try {
      const deleteProduct = await db.Cart.destroy({
        where:{userId:userId,productId:productId}
      })
      res.status(200).json(deleteProduct)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }
};

module.exports = CartController;
