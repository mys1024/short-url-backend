import { blake3 } from "../../util/hash.ts";
import { Collection } from "../../deps.ts";
import db from "../db.ts";

interface Url {
  key: string;
  value: string;
}

class UrlDao {
  #collection: Collection<Url>;

  constructor(collection: Collection<Url>) {
    this.#collection = collection;
  }

  async findOne(key: string) {
    return await this.#collection.findOne({ key });
  }

  async ensureOne(value: string) {
    let salt = 0;
    while (true) {
      const key = await blake3(value + salt, 4);
      const maybeUrl = await this.findOne(key);
      if (!maybeUrl) {
        this.#collection.insertOne({ key, value });
        return key;
      } else if (maybeUrl.value === value) {
        return key;
      }
      salt++;
    }
  }
}

const urlDao = new UrlDao(db.collection<Url>("url"));

export default urlDao;
