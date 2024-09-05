#!/bin/bash

# Set the path to your Python script
SCRIPT_PATH="/Users/jessicarosier/IdeaProjects/svelte-projects/node_python_kafka/python/consumer_middleware.py"

# Set the path to your virtual environment
VENV_PATH="/Users/jessicarosier/IdeaProjects/svelte-projects/node_python_kafka/venv"

# Function to start the consumer
start_consumer() {
    echo "Starting Kafka consumer..."
    source "$VENV_PATH/bin/activate"
    python "$SCRIPT_PATH"
}



start_consumer





