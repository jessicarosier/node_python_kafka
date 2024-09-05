#!/bin/bash

SCRIPT_PATH="/Users/jessicarosier/IdeaProjects/svelte-projects/node_python_kafka/python/consumer_middleware.py"

VENV_PATH="/Users/jessicarosier/IdeaProjects/svelte-projects/node_python_kafka/venv"

start_consumer() {
    echo "Starting Kafka consumer..."
    source "$VENV_PATH/bin/activate"
    python "$SCRIPT_PATH"
}


start_consumer





