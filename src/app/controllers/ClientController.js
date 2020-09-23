import Client from '../models/Client';
import Sale from '../models/Sale';

class ClientController {
  async index(req, res) {
    try {
      const clients = await Client.findAll({
        attributes: ['uid', 'name', 'cpf'],
      });
      return res.json({ clients });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const client = await Client.findByPk(uid, {
        attributes: ['uid', 'name', 'cpf'],
      });
      return res.json({ client });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const client = await Client.create(req.body);

      return res.json({ client });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) { }

  async delete(req, res) { }
}

export default new ClientController();
