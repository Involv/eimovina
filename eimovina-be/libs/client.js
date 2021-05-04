import https from "https";
import { URL } from "url";
import aws4 from "aws4";

const appsyncUrl = process.env.GRAPHQL_API_URL;
const region = process.env.region;
const endpoint = new URL(appsyncUrl).hostname.toString();

export const mutate = async (query, operationName, variables) => {
  console.log('REGION');
  console.log(region);

  const req = aws4.sign({
    service: 'appsync',
    region: process.env.region,
    method: 'POST',
    host: endpoint,
    path: '/graphql',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      operationName: operationName,
      variables: variables
    })
  });

  console.log(req);

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req }, (result) => {
      result.on('data', (data) => {
        resolve(JSON.parse(data.toString()));
      });
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

  console.log(data);

  return data;
};
