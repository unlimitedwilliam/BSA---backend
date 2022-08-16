import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { address, addressId } from './address';
import type { customers, customersId } from './customers';
import type { orders_books, orders_booksId } from './orders_books';

export interface ordersAttributes {
  id: number;
  date?: string;
  status?: 'processing' | 'shipping' | 'delivered' | 'finished' | 'failed';
  amount?: number;
  customer_id?: number;
  address_id?: number;
}

export type ordersPk = "id";
export type ordersId = orders[ordersPk];
export type ordersOptionalAttributes = "id" | "date" | "status" | "amount" | "customer_id" | "address_id";
export type ordersCreationAttributes = Optional<ordersAttributes, ordersOptionalAttributes>;

export class orders extends Model<ordersAttributes, ordersCreationAttributes> implements ordersAttributes {
  id!: number;
  date?: string;
  status?: 'processing' | 'shipping' | 'delivered' | 'finished' | 'failed';
  amount?: number;
  customer_id?: number;
  address_id?: number;

  // orders belongsTo address via address_id
  address!: address;
  getAddress!: Sequelize.BelongsToGetAssociationMixin<address>;
  setAddress!: Sequelize.BelongsToSetAssociationMixin<address, addressId>;
  createAddress!: Sequelize.BelongsToCreateAssociationMixin<address>;
  // orders belongsTo customers via customer_id
  customer!: customers;
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<customers>;
  setCustomer!: Sequelize.BelongsToSetAssociationMixin<customers, customersId>;
  createCustomer!: Sequelize.BelongsToCreateAssociationMixin<customers>;
  // orders hasMany orders_books via order_id
  orders_books!: orders_books[];
  getOrders_books!: Sequelize.HasManyGetAssociationsMixin<orders_books>;
  setOrders_books!: Sequelize.HasManySetAssociationsMixin<orders_books, orders_booksId>;
  addOrders_book!: Sequelize.HasManyAddAssociationMixin<orders_books, orders_booksId>;
  addOrders_books!: Sequelize.HasManyAddAssociationsMixin<orders_books, orders_booksId>;
  createOrders_book!: Sequelize.HasManyCreateAssociationMixin<orders_books>;
  removeOrders_book!: Sequelize.HasManyRemoveAssociationMixin<orders_books, orders_booksId>;
  removeOrders_books!: Sequelize.HasManyRemoveAssociationsMixin<orders_books, orders_booksId>;
  hasOrders_book!: Sequelize.HasManyHasAssociationMixin<orders_books, orders_booksId>;
  hasOrders_books!: Sequelize.HasManyHasAssociationsMixin<orders_books, orders_booksId>;
  countOrders_books!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof orders {
    return orders.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('processing','shipping','delivered','finished','failed'),
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "customer_id",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "address_id",
        using: "BTREE",
        fields: [
          { name: "address_id" },
        ]
      },
    ]
  });
  }
}
