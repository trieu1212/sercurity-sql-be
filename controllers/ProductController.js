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
            limit: parseInt(limit),
            offset: offset,
            where: categoryId && { categoryId: parseInt(categoryId) },
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
          limit: limit ? parseInt(limit) : 10,
          where: categoryId && { categoryId: parseInt(categoryId) },
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
  // createProduct:async(req,res)=>{
  //   const newProduct = new productModel(req.body);
  //   try {
  //     const product = await newProduct.save();
  //     res.status(201).json(product);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
};

module.exports = ProductController;
