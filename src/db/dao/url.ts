import { blake3 } from "../../util/hash.ts";
import { Collection } from "../../deps.ts";
import db from "../db.ts";

interface UrlSchema {
  key: string;
  url: string;
}

class UrlDao {
  #collection: Collection<UrlSchema>;

  constructor(collection: Collection<UrlSchema>) {
    this.#collection = collection;
  }

  async get(key: string) {
    const doc = await this.#collection.findOne({ key });
    return doc ? doc.url : undefined;
  }

  async add(url: string) {
    let salt = "";
    while (true) {
      const key = await blake3(url + salt, 4);
      const possibleUrl = await this.get(key);
      if (!possibleUrl) {
        this.#collection.insertOne({ key, url });
        return key;
      } else if (possibleUrl === url) {
        return key;
      }
      salt = key;
    }
  }
}

const urlCollection = db.collection<UrlSchema>("url");
const urlDao = new UrlDao(urlCollection);

export default urlDao;
