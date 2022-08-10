import { config, MongoClient } from "../deps.ts";
import output from "../util/output.ts";

const client = new MongoClient();

const clusterUrl = Deno.env.get("DB_CLUSTER_URL") || config["DB_CLUSTER_URL"];
const dbName = Deno.env.get("DB_NAME") || config["DB_NAME"];
const username = Deno.env.get("DB_USERNAME") || config["DB_USERNAME"];
const password = Deno.env.get("DB_PASSWORD") || config["DB_PASSWORD"];

output.info(`Connecting to MongoDB...`);
const db = await client.connect(
  `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`,
);

export default db;
