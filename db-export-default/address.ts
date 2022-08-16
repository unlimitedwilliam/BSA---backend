import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { customers_address, customers_addressId } from './customers_address';
import type { orders, ordersId } from './orders';

export interface addressAttributes {
  id: number;
  street_number?: number;
  street_name?: string;
  city?: string;
}

export type addressPk = "id";
export type addressId = address[addressPk];
export type addressOptionalAttributes = "street_number" | "street_name" | "city";
export type addressCreationAttributes = Optional<addressAttributes, addressOptionalAttributes>;

export class address extends Model<addressAttributes, addressCreationAttributes> implements addressAttributes {
  id!: number;
  street_number?: number;
  street_name?: string;
  city?: string;

  // address hasMany customers_address via address_id
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
  // address hasMany orders via address_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof address {
    return address.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    street_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    street_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'address',
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
