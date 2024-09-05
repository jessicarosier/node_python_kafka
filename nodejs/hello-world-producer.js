/* A helloWorldProducer writes messages to a topic. */

console.log('helloWorldProducer...');

import { Kafka } from 'kafkajs';
// const { Kafka } = require('kafkajs')


const kafka = new Kafka({
    clientId: 'kafka',
    brokers: ['localhost:9092'],
})

const helloWorldProducer = kafka.producer()

await helloWorldProducer.connect()

const message = {
    value : 'Hello World from helloWorldProducer'
}

async function testProducer(message) {
    try {
        await helloWorldProducer.send({
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


