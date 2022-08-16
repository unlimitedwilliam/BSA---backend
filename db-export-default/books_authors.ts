import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { authors, authorsId } from './authors';
import type { books, booksId } from './books';

export interface books_authorsAttributes {
  book_id?: number;
  author_id?: number;
  id: number;
}

export type books_authorsPk = "id";
export type books_authorsId = books_authors[books_authorsPk];
export type books_authorsOptionalAttributes = "book_id" | "author_id";
export type books_authorsCreationAttributes = Optional<books_authorsAttributes, books_authorsOptionalAttributes>;

export class books_authors extends Model<books_authorsAttributes, books_authorsCreationAttributes> implements books_authorsAttributes {
  book_id?: number;
  author_id?: number;
  id!: number;

  // books_authors belongsTo authors via author_id
  author!: authors;
  getAuthor!: Sequelize.BelongsToGetAssociationMixin<authors>;
  setAuthor!: Sequelize.BelongsToSetAssociationMixin<authors, authorsId>;
  createAuthor!: Sequelize.BelongsToCreateAssociationMixin<authors>;
  // books_authors belongsTo books via book_id
  book!: books;
  getBook!: Sequelize.BelongsToGetAssociationMixin<books>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<books, booksId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<books>;

  static initModel(sequelize: Sequelize.Sequelize): typeof books_authors {
    return books_authors.init({
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'authors',
        key: 'id'
      }
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'books_authors',
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
        name: "book_id",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "author_id",
        using: "BTREE",
        fields: [
          { name: "author_id" },
        ]
      },
    ]
  });
  }
}
