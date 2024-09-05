import {Kafka} from "kafkajs";

class KafkaProducer {
    constructor(clientId = "kafka", brokers = ["localhost:9092"]) {
        this.kafka = new Kafka({
            clientId: clientId,
            brokers: brokers,
        });
        this.producer = this.kafka.producer();
    }

    async connect() {
        await this.producer.connect();
        console.log("Producer connected");
    }

    async disconnect() {
        await this.producer.disconnect();
        console.log("Producer disconnected");
    }

    getTestMessage(topic) {
        const topicMessages = {
            "hello-world": {
                message: "Hello, world!"
            },
            "goodbye-world": {
                message: "Goodbye, world!"
            },
        };

        return topicMessages[topic].message;
    }

    async sendKafkaMessage(topic) {
        try {

            const message = this.getTestMessage(topic);

            await this.producer.send({
                topic: topic,
                messages: [{value: JSON.stringify(message)}],
            });

            console.log(`Sent message to topic ${topic}: ${JSON.stringify(message)}`);
        } catch (error) {
            console.error(`Error sending message to topic ${topic}:`, error);
        }
    }


    // Test the producer
    async startProducing(interval = 5000) {
        const topics = ["hello-world", "goodbye-world"];
        setInterval(() => {
            topics.forEach(topic => this.sendKafkaMessage(topic));
        }, interval);
    }
}


// Main function for testing
async function main() {
    const producer = new KafkaProducer();

    try {
        await producer.connect();
        await producer.startProducing();
    } catch (error) {
        console.error("Error:", error);
        await producer.disconnect();
    }
}

main().catch(console.error);
