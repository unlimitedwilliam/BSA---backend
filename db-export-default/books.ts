import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { books_authors, books_authorsId } from './books_authors';
import type { orders_books, orders_booksId } from './orders_books';

export interface booksAttributes {
  id: number;
  name: string;
  summary?: string;
  price: number;
  sold: number;
  ava_link?: string;
  author_name?: string;
}

export type booksPk = "id";
export type booksId = books[booksPk];
export type booksOptionalAttributes = "id" | "summary" | "ava_link" | "author_name";
export type booksCreationAttributes = Optional<booksAttributes, booksOptionalAttributes>;

export class books extends Model<booksAttributes, booksCreationAttributes> implements booksAttributes {
  id!: number;
  name!: string;
  summary?: string;
  price!: number;
  sold!: number;
  ava_link?: string;
  author_name?: string;

  // books hasMany books_authors via book_id
  books_authors!: books_authors[];
  getBooks_authors!: Sequelize.HasManyGetAssociationsMixin<books_authors>;
  setBooks_authors!: Sequelize.HasManySetAssociationsMixin<books_authors, books_authorsId>;
  addBooks_author!: Sequelize.HasManyAddAssociationMixin<books_authors, books_authorsId>;
  addBooks_authors!: Sequelize.HasManyAddAssociationsMixin<books_authors, books_authorsId>;
  createBooks_author!: Sequelize.HasManyCreateAssociationMixin<books_authors>;
  removeBooks_author!: Sequelize.HasManyRemoveAssociationMixin<books_authors, books_authorsId>;
  removeBooks_authors!: Sequelize.HasManyRemoveAssociationsMixin<books_authors, books_authorsId>;
  hasBooks_author!: Sequelize.HasManyHasAssociationMixin<books_authors, books_authorsId>;
  hasBooks_authors!: Sequelize.HasManyHasAssociationsMixin<books_authors, books_authorsId>;
  countBooks_authors!: Sequelize.HasManyCountAssociationsMixin;
  // books hasMany orders_books via book_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof books {
    return books.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sold: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ava_link: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    author_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'books',
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
