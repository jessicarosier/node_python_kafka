/* A consumer reads messages from a topic. */

console.log('consumer...');

import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

// Define the consumer.
let consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();


// This function listens for events being written to the Kafka topic.
// When an event is written to the topic, the consumer reads the event and logs it to the console.
consumer.on('ready', () => {
  console.log('consumer ready..')
    // Tell this consumer to listen to the 'test' topic.
  consumer.subscribe(['test']);
  // This consumer will consume messages from the 'test' topic.
  consumer.consume();
}).on('data', function(data) {
  console.log(`received message: ${eventType.fromBuffer(data.value)}`);
});
