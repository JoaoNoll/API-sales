import Client from '../models/Client';
import Sale from '../models/Sale';

class SaleController {
  async index(req, res) {
    try {
      const sales = await Sale.findAll();
      return res.json({ sales });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const sale = await Sale.findByPk(uid, {
        attributes: ['uid', 'quantity', 'price'],
        include: [
          {
            model: Client,
            as: 'clients',
            attributes: ['uid', 'name', 'cpf'],
          },
        ],
      });
      return res.json({ sale });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const sale = await Sale.create(req.body);

      return res.json({ sale });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) { }

  async delete(req, res) { }
}

export default new SaleController();
