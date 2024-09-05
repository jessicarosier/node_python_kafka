/* A consumer reads messages from a topic. */

console.log("consumer...");

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: "kafka",
    brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({groupId: "test-group"});

await consumer.connect();

await consumer.subscribe({topic: "test", fromBeginning: true});


await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message: ${message.value}`)
    },
});