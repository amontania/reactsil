import { createClient } from "redis";
const redisURL = {
  url: "redis://10.1.1.2:6379",
};

/// client.auth("SoUBS9tYbgW5V2RNzehslnuE5c7IoqXk");
export const authRedis = (async () => {
  try {
    // Connect to redis server
    const client = createClient(redisURL);
    // console.log(client);
    await client.connect();
    client.on("error", (err) => {
      console.log("Error " + err);
    });
    // console.log(client);
    // await client.set("key", "value3");
    // const value = await client.get("key");
    // console.log(value);
    // return client;
  } catch (err) {
    console.log(err);
  }
})();
