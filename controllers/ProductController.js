const db = require("../orm/models/index");
const ProductController = {
  getAllProduct: async (req, res) => {
    const limit = req.query.limit;
    const categoryId = req.query.categoryId;
    const page = req.query.page;
    try {
      if (limit && page) {
        let offset = (parseInt(page) - 1) * parseInt(limit);
        const {count,rows} = await db.Product.findAndCountAll(
          {
            attributes: [
              "id",
              "title",
              "description",
              "image",
              "price",
              "inStock",
              "categoryId",
            ],
            include: [{ model: db.Category, attributes: ["id", "name"] }],
            limit: parseInt(limit),
            offset: offset,
            where: categoryId && { categoryId: parseInt(categoryId) },
            order: [["id", "DESC"]],
          }
        )
        const data = {
          totalRows: count,
          totalPages: Math.ceil(count / limit),
          product: rows
        }
        res.status(200).json(data);
      } else {
        const product = await db.Product.findAll({
          attributes: [
            "id",
            "title",
            "description",
            "image",
            "price",
            "inStock",
            "categoryId",
          ],
          include: [{ model: db.Category, attributes: ["id", "name"] }],
          limit: limit ? parseInt(limit) : 10,
          where: categoryId && { categoryId: parseInt(categoryId) },
          order: [["id", "DESC"]],
        });
        res.status(200).json(product);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOneProduct: async (req, res) => {
    const id = req.params.id;
    try {
      const product = await db.Product.findByPk(id, {
        include: [
          {
            model: db.Category,
            attributes: ["id", "name"],
          },
        ],
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createProduct: async(req,res)=>{
    const {title,description,image,price,inStock,categoryId} = req.body
    try {
      const product = await db.Product.create({
        title,
        description,
        image,
        price,
        inStock,
        categoryId
      })
      res.status(201).json(product)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  },
  deleteProduct: async(req,res)=>{
    const {productId} = req.params
    try {
      await db.Product.destroy({
        where:{id:productId}
      })
      res.status(200).json({message:'Xóa sản phẩm thành công'})
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  },
  getProductByIdAdmin: async(req,res)=>{
    const {productId} = req.params
    try {
      const product = await db.Product.findByPk(productId)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  },
};

module.exports = ProductController;
