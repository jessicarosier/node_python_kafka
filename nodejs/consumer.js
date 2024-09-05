/* A consumer reads messages from multiple topics. */

console.log("consumer...");

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: "kafka",
    brokers: ["localhost:9092"],
});

// Define the topics to subscribe to
const topics = ["test", "test1"];

const consumer = kafka.consumer({groupId: "test-group"});

async function run() {
    await consumer.connect();

    // Subscribe to multiple topics
    await consumer.subscribe({
        topics: topics,
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message: ${message.value} from topic: ${topic}`)
        },
    });
}

run().catch(console.error);
