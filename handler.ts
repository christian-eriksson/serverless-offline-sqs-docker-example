import * as AWS from 'aws-sdk';
AWS.config.update({region: 'eu-central-1'});
var sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  endpoint: 'http://sqs:9324'
});


export const handler = (event: any = {}, context): any => {
  console.log(JSON.stringify(event, null, 4));
  return Promise.resolve();
};

export const echo = async (event: any = {}, context): Promise<any> => {
  const baseQueueURL = "http://sqs:9324/queue/";
  const queueNames = ["TestQueue"];

  for(let i=0, tot=queueNames.length; i < tot; i++) {
    const params = {
      MessageBody: event.queryStringParameters.QueueMessage + " for " + queueNames[i],
      QueueUrl: baseQueueURL + queueNames[i]
    };

    let sqsResponse;
    try {
      sqsResponse = await sqs.sendMessage(params).promise();
    } catch (err) {
      return {
        statusCode: 500,
        body: "Ops..."
      };
    }

    console.log("SQS response:", sqsResponse);
  }
  
  return {
    statusCode: 200,
    body: "Done..."
  }
};