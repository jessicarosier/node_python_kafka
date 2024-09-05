/* A producer writes messages to a topic. */

console.log('producer...');

import { Kafka } from 'kafkajs';
// const { Kafka } = require('kafkajs')


const kafka = new Kafka({
    clientId: 'kafka',
    brokers: ['localhost:9092'],
})

const producer = kafka.producer()

await producer.connect()

const message = {
    value : 'Hello World from producer'
}

async function testProducer(message) {
    try {
        await producer.send({
            topic: 'test',
            messages: [
                { value: JSON.stringify(message) },
            ],
        })
        console.log(`Sent message: ${message.value}`)
    } catch (error) {
        console.error(error)
    }
}

//call the function every 5 seconds forever
setInterval(() => {
    testProducer(message)
} , 5000)


