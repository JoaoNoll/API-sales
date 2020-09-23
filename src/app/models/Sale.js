import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        price: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        client_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'clients',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, {
      as: 'clients',
      foreignKey: 'client_uid',
    });

    this.hasMany(models.SaleProduct, {
      as: 'products',
      foreignKey: 'sale_uid',
    });
  }
}

export default Sale;
