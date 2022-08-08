import { blake3 } from "../util/hash.ts";

class UrlDao {
  #map = new Map<string, string>();

  get(key: string) {
    return this.#map.get(key);
  }

  delete(key: string) {
    return this.#map.delete(key);
  }

  async add(url: string) {
    let salt = "";
    while (true) {
      const key = await blake3(url + salt, 4);
      const existingUrl = this.get(key);
      if (!existingUrl || existingUrl === url) {
        this.#map.set(key, url);
        return key;
      }
      salt = key;
    }
  }
}

export default new UrlDao();
