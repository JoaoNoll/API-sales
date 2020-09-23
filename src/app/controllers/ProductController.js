import Brand from '../models/Brand';
import Product from '../models/Product';
import Sale from '../models/Sale';
import SaleProduct from '../models/SaleProduct';

class ProductController {
  async index(req, res) {
    try {
      const products = await Product.findAll({
        attributes: ['uid', 'name', 'quantity'],
        include: [
          {
            model: Brand,
            as: 'brands',
            attributes: ['name', 'uid'],
          },
        ],
      });
      return res.json({ products });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const product = await Product.findByPk(uid, {
        attributes: ['uid', 'name', 'quantity'],
        include: [
          {
            model: Brand,
            as: 'brands',
            attributes: ['name', 'uid'],
          },
          {
            model: SaleProduct,
            as: 'sales',

            include: [
              {
                model: Sale,
                as: 'sale_name',
              },
            ],
          },
        ],
      });
      return res.json({ product });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    const t = await Product.sequelize.transaction();
    try {
      const product = await Product.create(req.body);
      const { sales } = req.body;
      await Promise.all(
        sales.map(async (sale_uid) => {
          const sale = await SaleProduct.create(
            {
              product_uid: product.uid,
              sale_uid,
            },
            { transaction: t }
          );
          return sale;
        })
      );
      await t.commit();
      return res.json({ product });
    } catch (error) {
      await t.rollback();
      return res.json({ error });
    }
  }

  async update(req, res) { }

  async delete(req, res) { }
}

export default new ProductController();
