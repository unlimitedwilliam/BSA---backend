import type { Sequelize } from "sequelize";
import { address as _address } from "./address";
import type { addressAttributes, addressCreationAttributes } from "./address";
import { authors as _authors } from "./authors";
import type { authorsAttributes, authorsCreationAttributes } from "./authors";
import { books as _books } from "./books";
import type { booksAttributes, booksCreationAttributes } from "./books";
import { books_authors as _books_authors } from "./books_authors";
import type { books_authorsAttributes, books_authorsCreationAttributes } from "./books_authors";
import { customers as _customers } from "./customers";
import type { customersAttributes, customersCreationAttributes } from "./customers";
import { customers_address as _customers_address } from "./customers_address";
import type { customers_addressAttributes, customers_addressCreationAttributes } from "./customers_address";
import { orders as _orders } from "./orders";
import type { ordersAttributes, ordersCreationAttributes } from "./orders";
import { orders_books as _orders_books } from "./orders_books";
import type { orders_booksAttributes, orders_booksCreationAttributes } from "./orders_books";

export {
  _address as address,
  _authors as authors,
  _books as books,
  _books_authors as books_authors,
  _customers as customers,
  _customers_address as customers_address,
  _orders as orders,
  _orders_books as orders_books,
};

export type {
  addressAttributes,
  addressCreationAttributes,
  authorsAttributes,
  authorsCreationAttributes,
  booksAttributes,
  booksCreationAttributes,
  books_authorsAttributes,
  books_authorsCreationAttributes,
  customersAttributes,
  customersCreationAttributes,
  customers_addressAttributes,
  customers_addressCreationAttributes,
  ordersAttributes,
  ordersCreationAttributes,
  orders_booksAttributes,
  orders_booksCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const address = _address.initModel(sequelize);
  const authors = _authors.initModel(sequelize);
  const books = _books.initModel(sequelize);
  const books_authors = _books_authors.initModel(sequelize);
  const customers = _customers.initModel(sequelize);
  const customers_address = _customers_address.initModel(sequelize);
  const orders = _orders.initModel(sequelize);
  const orders_books = _orders_books.initModel(sequelize);

  customers_address.belongsTo(address, { as: "address", foreignKey: "address_id"});
  address.hasMany(customers_address, { as: "customers_addresses", foreignKey: "address_id"});
  orders.belongsTo(address, { as: "address", foreignKey: "address_id"});
  address.hasMany(orders, { as: "orders", foreignKey: "address_id"});
  books_authors.belongsTo(authors, { as: "author", foreignKey: "author_id"});
  authors.hasMany(books_authors, { as: "books_authors", foreignKey: "author_id"});
  books_authors.belongsTo(books, { as: "book", foreignKey: "book_id"});
  books.hasMany(books_authors, { as: "books_authors", foreignKey: "book_id"});
  orders_books.belongsTo(books, { as: "book", foreignKey: "book_id"});
  books.hasMany(orders_books, { as: "orders_books", foreignKey: "book_id"});
  customers_address.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(customers_address, { as: "customers_addresses", foreignKey: "customer_id"});
  orders.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(orders, { as: "orders", foreignKey: "customer_id"});
  orders_books.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(orders_books, { as: "orders_books", foreignKey: "order_id"});

  return {
    address: address,
    authors: authors,
    books: books,
    books_authors: books_authors,
    customers: customers,
    customers_address: customers_address,
    orders: orders,
    orders_books: orders_books,
  };
}
