import Sequelize, { Model } from 'sequelize';

class SaleProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        sale_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'sales',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        product_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'products',
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
    this.belongsTo(models.Sale, {
      as: 'sale_name',
      foreignKey: 'sale_uid',
    });
  }
}

export default SaleProduct;
