import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { customers_address, customers_addressId } from './customers_address';
import type { orders, ordersId } from './orders';

export interface customersAttributes {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phoneNum?: string;
  password?: string;
}

export type customersPk = "id";
export type customersId = customers[customersPk];
export type customersOptionalAttributes = "first_name" | "last_name" | "email" | "phoneNum" | "password";
export type customersCreationAttributes = Optional<customersAttributes, customersOptionalAttributes>;

export class customers extends Model<customersAttributes, customersCreationAttributes> implements customersAttributes {
  id!: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phoneNum?: string;
  password?: string;

  // customers hasMany customers_address via customer_id
  customers_addresses!: customers_address[];
  getCustomers_addresses!: Sequelize.HasManyGetAssociationsMixin<customers_address>;
  setCustomers_addresses!: Sequelize.HasManySetAssociationsMixin<customers_address, customers_addressId>;
  addCustomers_address!: Sequelize.HasManyAddAssociationMixin<customers_address, customers_addressId>;
  addCustomers_addresses!: Sequelize.HasManyAddAssociationsMixin<customers_address, customers_addressId>;
  createCustomers_address!: Sequelize.HasManyCreateAssociationMixin<customers_address>;
  removeCustomers_address!: Sequelize.HasManyRemoveAssociationMixin<customers_address, customers_addressId>;
  removeCustomers_addresses!: Sequelize.HasManyRemoveAssociationsMixin<customers_address, customers_addressId>;
  hasCustomers_address!: Sequelize.HasManyHasAssociationMixin<customers_address, customers_addressId>;
  hasCustomers_addresses!: Sequelize.HasManyHasAssociationsMixin<customers_address, customers_addressId>;
  countCustomers_addresses!: Sequelize.HasManyCountAssociationsMixin;
  // customers hasMany orders via customer_id
  orders!: orders[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<orders>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<orders, ordersId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<orders, ordersId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<orders, ordersId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<orders>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<orders, ordersId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<orders, ordersId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<orders, ordersId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<orders, ordersId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof customers {
    return customers.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phoneNum: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customers',
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
    ]
  });
  }
}
