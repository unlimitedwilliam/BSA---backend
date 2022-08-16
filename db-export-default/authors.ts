import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { books_authors, books_authorsId } from './books_authors';

export interface authorsAttributes {
  id: number;
  name: string;
  summary?: string;
  sold?: number;
}

export type authorsPk = "id";
export type authorsId = authors[authorsPk];
export type authorsOptionalAttributes = "id" | "summary" | "sold";
export type authorsCreationAttributes = Optional<authorsAttributes, authorsOptionalAttributes>;

export class authors extends Model<authorsAttributes, authorsCreationAttributes> implements authorsAttributes {
  id!: number;
  name!: string;
  summary?: string;
  sold?: number;

  // authors hasMany books_authors via author_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof authors {
    return authors.init({
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
    sold: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'authors',
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
