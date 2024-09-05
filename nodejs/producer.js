/* A helloWorldProducer writes messages to a topic. */

console.log('helloWorldProducer...');

import { Kafka } from 'kafkajs';


const kafka = new Kafka({
    clientId: 'kafka',
    brokers: ['localhost:9092'],
})

const producer = kafka.producer()

// Define topics to test the producer
const topicConfigs = {
    'hello-world': () => ({
        value: 'Hello World from helloWorldProducer',
    }),
    'goodbye-world': () => ({
        value: 'Goodbye World from producer',
    }),
    // Add more topics and their message generators as needed
};

async function sendKafkaMessage(topic) {
    try {
        const message = topicConfigs[topic] ? topicConfigs[topic]() : generateDefaultMessage(topic);

        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(message) }],
        });

        console.log(`Sent message to topic ${topic}: ${JSON.stringify(message)}`);
    } catch (error) {
        console.error(`Error sending message to topic ${topic}:`, error);
    }
}

function generateDefaultMessage(topic) {
    return {
        value: `${topic}`,
    };
}

async function startProducer() {
    await producer.connect();

    const topics = Object.keys(topicConfigs);

    setInterval(() => {
        topics.forEach(topic => sendKafkaMessage(topic));
    }, 5000);
}

startProducer().catch(console.error);