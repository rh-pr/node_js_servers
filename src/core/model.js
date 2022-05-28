"use strict";

const { randomUUID } = require("crypto");

const database = require("./database");

class Model {
  getTableName = () => {
    throw new Error("Please define a property tableName");
  };

  async create(value) {
    const data = this.#getData();
    const dataItem = { id: randomUUID(), ...value };
    data.push(dataItem);

    return dataItem;
  }

  async get() {
    return this.#getData();
  }

  async getById(id) {
    const data = this.#getData();
    return data.find((item) => item.id === id) || null;
  }

  async update(id, value) {
    const dataItem = this.#getData()?.find((item) => item.id === id);
    if (!dataItem) return null;

    for (const key of Object.keys(value)) {
      if (key === "id") continue;
      dataItem[key] = value[key];
    }
    return dataItem;
  }

  #getData() {
    const tableName = this.getTableName();
    const data = database[tableName];
    if (!data)
      throw new Error(`Data for ${tableName} does not exist in database`);

    return data;
  }
}

module.exports = Model;