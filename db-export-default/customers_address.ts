import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { address, addressId } from './address';
import type { customers, customersId } from './customers';

export interface customers_addressAttributes {
  id: number;
  customer_id?: number;
  address_id?: number;
}

export type customers_addressPk = "id";
export type customers_addressId = customers_address[customers_addressPk];
export type customers_addressOptionalAttributes = "id" | "customer_id" | "address_id";
export type customers_addressCreationAttributes = Optional<customers_addressAttributes, customers_addressOptionalAttributes>;

export class customers_address extends Model<customers_addressAttributes, customers_addressCreationAttributes> implements customers_addressAttributes {
  id!: number;
  customer_id?: number;
  address_id?: number;

  // customers_address belongsTo address via address_id
  address!: address;
  getAddress!: Sequelize.BelongsToGetAssociationMixin<address>;
  setAddress!: Sequelize.BelongsToSetAssociationMixin<address, addressId>;
  createAddress!: Sequelize.BelongsToCreateAssociationMixin<address>;
  // customers_address belongsTo customers via customer_id
  customer!: customers;
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<customers>;
  setCustomer!: Sequelize.BelongsToSetAssociationMixin<customers, customersId>;
  createCustomer!: Sequelize.BelongsToCreateAssociationMixin<customers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof customers_address {
    return customers_address.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    tableName: 'customers_address',
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
