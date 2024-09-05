/* A producer writes messages to a topic. */

console.log('producer...');

import { Kafka } from 'kafkajs';


const kafka = new Kafka({
    clientId: 'kafka',
    brokers: ['localhost:9092'],
})

const producer = kafka.producer()

await producer.connect()

async function helloWorldProducer() {
    try {
        await producer.send({
            topic: 'test',
            messages: [
                {value: 'Hello KafkaJS user!'},
            ],
        })
        console.log('Message sent successfully')
    } catch (error) {
        console.error(error)
    }
}

//call the function every 5 seconds forever

setInterval(helloWorldProducer, 5000)


