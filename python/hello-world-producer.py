import json
import time
from kafka import KafkaProducer

print('helloWorldProducer...')

# Configure the Kafka producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Define the Kafka topic
topic_name = 'test'

message = {
    'value': 'Hello World from Python Producer',
}


# Producer function
def test_producer(message):
    try:
        sent_message = producer.send(topic_name, value=message)
        metadata = sent_message.get(timeout=10)
        print(f"Sent message: {message['value']}")
        print(f"Topic: {metadata.topic}")
    except Exception as e:
        print(f"Error sending message: {str(e)}")


# Main loop to produce messages for testing
try:
    while True:
        test_producer(message)
        time.sleep(5)
except KeyboardInterrupt:
    print("Producer stopped by user")
finally:
    producer.close()
