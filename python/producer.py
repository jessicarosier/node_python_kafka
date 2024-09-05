import json
import time
import random
from kafka import KafkaProducer
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import os

# Configure the Kafka producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: json.dumps(x).encode('utf-8'),
    security_protocol='PLAINTEXT'
)

# Define the Kafka topic
TOPIC_NAME = 'test'


class NewFileHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory:
            file_path = event.src_path
            file_name = os.path.basename(file_path)
            event_data = {
                'file_name': file_name,
                'file_path': file_path,
                'timestamp': time.time()
            }
            try:
                producer.send(TOPIC_NAME, value=event_data)
                print(f"Message queued for new file: {json.dumps(event_data)}")
            except Exception as e:
                print(f"Error sending message: {str(e)}")


def watch_directory(path):
    event_handler = NewFileHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    directory_to_watch = "/Users/jessicarosier/IdeaProjects/svelte-projects/node_python_kafka/producer_files"
    # Replace with your directory path
    print(f"Watching directory: {directory_to_watch} for new files...")
    watch_directory(directory_to_watch)
