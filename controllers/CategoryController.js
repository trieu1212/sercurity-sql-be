const db = require('../orm/models/index')
const CategoryController = {
    getAllCategory: async (req, res) => {
        try {
            const category = await db.Category.findAll({
                attributes:['id','name']
            })
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = CategoryController;