from kafka import KafkaConsumer
import json

print("consumer...")

# Define the Kafka topics to subscribe to
topics = ["test"]

# Configure the Kafka consumer
consumer = KafkaConsumer(
    *topics,
    bootstrap_servers=["localhost:9092"],
    auto_offset_reset="earliest",
    enable_auto_commit=True,
    group_id="test-group",
    value_deserializer=lambda x: json.loads(x.decode("utf-8"))
)

# Message consumption loop
try:
    for message in consumer:
        print(f"Received message: {message.value}")
except KeyboardInterrupt:
    print("Consumer stopped by user")
except Exception as e:
    print(f"An error occurred: {str(e)}")
finally:
    consumer.close()
