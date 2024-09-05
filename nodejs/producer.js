/* A producer writes messages to a topic. */

console.log('producer...');

import Kafka from 'node-rdkafka';

/* This stream will write messages to the Kafka topic. */
const producer = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092' // specify the Kafka broker per the yml file
}, {}, {
  topic: 'test'
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

function queueMessage() {

  // Write a Hello World message to the Kafka topic.
    const event = {
        message: 'Hello World',
        timestamp: new Date().toISOString
    };
  // Writes to the stream Kafka topic.
  const success = producer.write(Buffer.from(JSON.stringify(event)));
  if (success) {
    console.log(`message queued (${JSON.stringify(event)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}




// Write a random message to the Kafka topic every 3 seconds.
setInterval(() => {
  queueMessage();
}, 3000);
