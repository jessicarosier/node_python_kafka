/* A producer writes messages to a topic. */

console.log('producer...');

import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

/* This stream will write messages to the Kafka topic. */
const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092' // specify the Kafka broker per the yml file
}, {}, {
  topic: 'test'
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

function queueRandomMessage() {
  const category = getRandomAnimal();
  const noise = getRandomNoise(category);
  const event = { category, noise };
  // Writes to the stream Kafka topic.
  const success = stream.write(eventType.toBuffer(event));
  if (success) {
    console.log(`message queued (${JSON.stringify(event)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}

function getRandomAnimal() {
  const categories = ['CAT', 'DOG'];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomNoise(animal) {
  if (animal === 'CAT') {
    const noises = ['meow', 'purr'];
    return noises[Math.floor(Math.random() * noises.length)];
  } else if (animal === 'DOG') {
    const noises = ['bark', 'woof'];
    return noises[Math.floor(Math.random() * noises.length)];
  } else {
    return 'silence..';
  }
}


// Write a random message to the Kafka topic every 3 seconds.
setInterval(() => {
  queueRandomMessage();
}, 3000);
