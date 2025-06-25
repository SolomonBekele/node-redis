const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);

async function testAdditionalFeatures() {
  try {
    await client.connect();

    // const subscriber = client.duplicate(); //create a new client -> shares the same connection
    // await subscriber.connect(); // connect to redis server for the subscriber

    // await subscriber.subscribe("dummy-channel", (message, channel) => {
    //   console.log(`Received message from ${channel}: ${message}`);
    // });

    //publish message to the dummy channel
    // await client.publish("dummy-channel", "SOme dummy data from publiser");
    // await client.publish(
    //   "dummy-channel",
    //   "Some new message again from publiser"
    // );

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // await subscriber.unsubscribe("dummy-channel");
    // await subscriber.quit(); // close the subscriber connection
   

//   // -----------------------------
//   // 🔐 Transaction / Command Queue
//   // -----------------------------
//   const transaction = client.multi();

//   transaction.set("key-transaction1", "value1");
//   transaction.set("key-transaction2", "value2");
//   transaction.get("key-transaction1");
//   transaction.get("key-transaction2");

//   const transactionResults = await transaction.exec();
//   console.log("Transaction Results:", transactionResults);

//   // -----------------------------------------
//   // 🔁 Batch Set (simulated pipelining)
//   // -----------------------------------------
//   const batch = client.multi();

//   for (let i = 0; i < 1000; i++) {
//     batch.set(`user:${i}:action`, `Action ${i}`);
//   }

//   await batch.exec();
//   console.log("Batch Set: Done");

//   // -------------------------------------
//   // 💸 Bank Transfer (Atomic-style logic)
//   // -------------------------------------
//   const transfer = client.multi();

//   transfer.decrBy("account:1234:balance", 100);
//   transfer.incrBy("account:0000:balance", 100);

//   const transferResults = await transfer.exec();
//   console.log("Bank Transfer:", transferResults);

//   // -------------------------------------
//   // 🛒 Cart Update
//   // -------------------------------------
//   const cart = client.multi();

//   cart.hIncrBy("cart:1234", "item_count", 1);
//   cart.hIncrBy("cart:1234", "total_price", 10);

//   const cartResults = await cart.exec();
//   console.log("Cart Update:", cartResults);
console.log("Performance test");
    console.time("without pipelining");

    for (let i = 0; i < 1000; i++) {
      await client.set(`user${i}`, `user_value${i}`);
    }

    console.timeEnd("without pipelining");

    console.time("with pipelining");
    const bigPipeline = client.multi();

    for (let i = 0; i < 1000; i++) {
      bigPipeline.set(`user_pipeline_key${i}`, `user_pipeline_value${i}`);
    }

    await bigPipeline.exec();

    console.timeEnd("with pipelining");

  
  } catch (e) {
    console.error(e);
  } finally {
    client.quit();
  }
}

testAdditionalFeatures();