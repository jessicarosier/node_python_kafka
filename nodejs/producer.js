
console.log('Producer...');

import { Kafka } from 'kafkajs';


const kafka = new Kafka({
    clientId: 'kafka',
    brokers: ['localhost:9092'],
})

const producer = kafka.producer()

// Test data - to define multiple topics
const topicConfigs = {
    'hello-world': () => ({
        value: 'Message from hello-world producer',
    }),
    'goodbye-world': () => ({
        value: 'Message from goodbye-world producer',
    })
};

// Sends kafka message based on the topic passed in
async function sendKafkaMessage(topic) {
    try {
        // grab the message that corresponds to the topic passed in
        const message = topicConfigs[topic];

        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(message) }],
        });

        console.log(`Sent message to topic ${topic}: ${JSON.stringify(message)}`);
    } catch (error) {
        console.error(`Error sending message to topic ${topic}:`, error);
    }
}


async function startProducer() {
    await producer.connect();

    //Define the topics to send messages to
    const topics = ['hello-world', 'goodbye-world']

    // Test sending messages to multiple topics
    setInterval(() => {
        topics.forEach(topic => sendKafkaMessage(topic));
    }, 5000);
}

startProducer().catch(console.error);