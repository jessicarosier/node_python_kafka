import json
import os
import shutil
from kafka import KafkaConsumer

# Configure the Kafka consumer
consumer = KafkaConsumer(
    'test',
    bootstrap_servers=['localhost:9092'],
    group_id='kafka',
    value_deserializer=lambda m: m.decode('utf-8'),
    auto_offset_reset='earliest'
)

DESTINATION_DIR = '/Users/jessicarosier/IdeaProjects/svelte-projects/node-kafka-producer-consumer/consumer_files'


def copy_file(file_path, destination_dir):
    try:
        shutil.copy2(file_path, destination_dir)
        print(f"File copied: {file_path} -> {destination_dir}")
    except Exception as e:
        print(f"Error copying file: {str(e)}")


def process_message(message):
    if isinstance(message.value, str):
        try:
            parsed_value = json.loads(message.value)
            if isinstance(parsed_value, dict) and 'file_path' in parsed_value:
                file_path = parsed_value['file_path']
                copy_file(file_path, DESTINATION_DIR)
            else:
                print(f"Received invalid message: {message.value}")
        except json.JSONDecodeError:
            print(f"Invalid JSON string: {message.value}")
    else:
        print(f"Non-string value received: {message.value}")


if __name__ == "__main__":
    print(f"Kafka consumer started. Listening for messages on topic: test")
    for message in consumer:
        process_message(message)
