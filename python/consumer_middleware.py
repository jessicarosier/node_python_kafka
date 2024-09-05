from dotenv import load_dotenv
from kafka import KafkaConsumer
import json
import os


class KafkaMiddleware:
    def __init__(self, bootstrap_servers, group_id=None, topics=None):
        self.bootstrap_servers = bootstrap_servers
        self.topics = topics if topics else []
        self.group_id = group_id
        self.consumer = None

    # Official documentation for KafkaConsumer - lists all available parameters and their descriptions
    # https://kafka-python.readthedocs.io/en/master/apidoc/KafkaConsumer.html
    def initialize(self):
        self.consumer = KafkaConsumer(
            *self.topics,
            bootstrap_servers=self.bootstrap_servers,
            auto_offset_reset="earliest",
            enable_auto_commit=True,
            group_id=self.group_id,
            value_deserializer=lambda x: json.loads(x.decode("utf-8"))
        )

    # starts the consumer and listens for messages on the subscribed topics
    # will only stop if an unhandled exception occurs - prints the error message then closes the consumer
    # what exceptions should be caught and handled?
    def start(self):
        print(f"Consumer initialized for topics: {self.topics}")

        try:
            for message in self.consumer:
                print(f"Received message: {message.value}")
        except Exception as e:
            print(f"An error occurred: {str(e)}")
        finally:
            self.consumer.close()

    def run(self):
        self.initialize()
        self.start()


# Make this more dynamic by using environment variables?
# Define the Kafka topics to subscribe to in the .env file
load_dotenv()

# Main entry point
if __name__ == "__main__":
    bootstrap_servers = os.getenv('KAFKA_BOOTSTRAP_SERVERS')
    topics = os.getenv('KAFKA_TOPICS').split(',')
    group_id = os.getenv('KAFKA_GROUP_ID')

    middleware = KafkaMiddleware(bootstrap_servers, group_id, topics)
    middleware.run()
