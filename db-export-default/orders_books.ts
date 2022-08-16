import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { books, booksId } from './books';
import type { orders, ordersId } from './orders';

export interface orders_booksAttributes {
  id: number;
  order_id?: number;
  book_id?: number;
}

export type orders_booksPk = "id";
export type orders_booksId = orders_books[orders_booksPk];
export type orders_booksOptionalAttributes = "id" | "order_id" | "book_id";
export type orders_booksCreationAttributes = Optional<orders_booksAttributes, orders_booksOptionalAttributes>;

export class orders_books extends Model<orders_booksAttributes, orders_booksCreationAttributes> implements orders_booksAttributes {
  id!: number;
  order_id?: number;
  book_id?: number;

  // orders_books belongsTo books via book_id
  book!: books;
  getBook!: Sequelize.BelongsToGetAssociationMixin<books>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<books, booksId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<books>;
  // orders_books belongsTo orders via order_id
  order!: orders;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<orders>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<orders, ordersId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<orders>;

  static initModel(sequelize: Sequelize.Sequelize): typeof orders_books {
    return orders_books.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'books',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders_books',
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
        name: "order_id",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "book_id",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  });
  }
}
