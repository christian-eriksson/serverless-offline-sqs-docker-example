Minimal example using ElastiMQ between docker containers in a simple TypeScript project.
It creates two docker containers, one running SQS (ElasticMQ) and one with a Serverless project.

One queue is created `TestQueue` in the SQS container. The Serverless container provides a API 
Gateway handler with the following endpoint `http://localhost:3000/echo` which takes a query parameter `QueueMessage`. Sending a message to the endpoint adds a message to the SQS queue and a handler in 
Serverless will take care of the resulting SQS event and pring the message to console.

# Getting started

```shell
docker-compose build
docker-compose up
```
Use postman (or something equivalent) to send a HTTP request:
```
GET http://localhost:3000/echo?QueueMessage=<Some message>
```

The setup of queues is very much inspired by the example provided by [Arthur (godu) Weber](https://github.com/godu/serverless/tree/master/packages/serverless-offline-sqs/example)