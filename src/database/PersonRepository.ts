import { executeTransaction } from "./SQLiteDatabase";

export type Person = {
  id?: number;  
  name: string;  
};

export default class PersonRepository {
  constructor() {
    this.up();
  }

  public async up() {
    await executeTransaction(
      "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
    );
  }

  public async down() {
    await executeTransaction("DROP TABLE people;");
  }

  public async create(person: Person) {
    const result = await executeTransaction(
      "INSERT INTO people (name) values (?);",  
      [person.name]
    );
    return result.insertId;  
  }

  public async all() {
    const result = await executeTransaction("SELECT * FROM people;");
    
    return result.rows._array; 
  }
}