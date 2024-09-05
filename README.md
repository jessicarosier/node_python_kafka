# Node - Python - Kafka - Example

This is a simple example of how to use Kafka with Python.


[Click here to learn more about Kafka](https://kafka.apache.org/intro)


## Requirements

The `docker-compose.yml` file is already configured to run a Kafka instance.

To create the container, run the following command:

```
docker-compose up -d
```


A Python virtual environment is needed to run the code. To create the virtual environment, run the following command:

```
python3.9 -m venv venv
```

To activate the virtual environment, run the following command:

```
source venv/bin/activate
```

To install the dependencies, run the following command:

```
pip install -r requirements.txt
```



# References, useful links, documentation and example code

- [Kafka documentation](https://kafka.apache.org/documentation/)
- [Kafka Python documentation](https://kafka-python.readthedocs.io/en/master/index.html)
- [KafkaJS documentation](https://kafka.js.org/docs/getting-started)
- [Kafka Python examples](https://github.com/dpkp/kafka-python)
- [Watchdog documentation](https://python-watchdog.readthedocs.io/en/stable/)
- [Watchdog examples](https://github.com/gorakhargosh/watchdog)

-[Helpful walkthrough tutorial](https://towardsdatascience.com/getting-started-with-apache-kafka-in-python-604b3250aa05)

-[Helpful tutorial using Node.js](https://www.youtube.com/watch?v=EiDLKECLcZw)