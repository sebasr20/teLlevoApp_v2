import { Injectable } from '@angular/core';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseObj: SQLiteObject;
  tables = {
    categorias: "categorias",
    usuarios: "usuarios",
  }
  constructor(private sqlite: SQLite) { }

  async createDatabase(){
    await this.sqlite.create({
      name: "tellevo-db",
      location: "default",
    }).then((db: SQLiteObject)=>{
      this.databaseObj = db;
    }).catch((e)=>{
      alert("error al crear la base de datos " + JSON.stringify(e));
    });

    await this.createTables();
  }

  async createTables() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.categorias} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL UNIQUE)`,
      []
    )

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.usuarios} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, user VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, categoria_id INTEGER UNSIGNED NOT NULL )`,
      []
    )
  }

  async addCategory(name: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.categorias} (name) VALUES ('${name}')`,
        []
      )
      .then(() => {
        return "categoria creada";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "categoría ya existe";
        }

        return "error al crear categoría " + JSON.stringify(e);
      });
  }

  async getCategories() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.categorias} ORDER BY name ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "error al obtener categoría " + JSON.stringify(e);
      });
  }

  async deleteCategory(id: number) {
    return this.databaseObj
      .executeSql(`DELETE FROM ${this.tables.categorias} WHERE id = ${id}`, [])
      .then(() => {
        return "categoría eliminada";
      })
      .catch((e) => {
        return "error al eliminar categoría " + JSON.stringify(e);
      });
  }

  async editCategory(name: string, id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.categorias} SET name = '${name}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "categoría actualizada";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "categoría ya existe";
        }

        return "error al actualizar categoría " + JSON.stringify(e);
      });
  }
}
