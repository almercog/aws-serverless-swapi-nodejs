export class ApiGatewayEvent {
  async event({ httpMethod, path, resource, body, pathParameters }) {
    return {
      resource,
      path,
      httpMethod,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "CloudFront-Forwarded-Proto": "https",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-Mobile-Viewer": "false",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Tablet-Viewer": "false",
        "CloudFront-Viewer-ASN": "6147",
        "CloudFront-Viewer-Country": "PE",
        Host: "yd0ymo5txd.execute-api.us-east-1.amazonaws.com",
        "Content-Type": "application/json",
      },
      pathParameters,
      requestContext: {
        resourceId: "l3ahk5",
        resourcePath: resource, // : "/people/{id}",
        httpMethod, // : "GET",
        extendedRequestId: "WEd3XEUOIAMEpwA=",
        requestTime: "11/Apr/2024:16:30:38 +0000",
        path: "/dev".concat(path), // "/dev/people/97f732d9-dac4-4589-a706-6014a724e200",
        accountId: "764022073951",
        protocol: "HTTP/1.1",
        stage: "dev",
        domainPrefix: "yd0ymo5txd",
        requestTimeEpoch: 1712853038870,
        requestId: "e95ac6dd-a117-48aa-922f-1df3153ce9e2",
        identity: {
          cognitoIdentityPoolId: null,
          accountId: null,
          cognitoIdentityId: null,
          caller: null,
          sourceIp: "181.66.150.12",
          principalOrgId: null,
          accessKey: null,
          cognitoAuthenticationType: null,
          cognitoAuthenticationProvider: null,
          userArn: null,
          userAgent: "PostmanRuntime/7.37.0",
          user: null,
        },
        domainName: "yd0ymo5txd.execute-api.us-east-1.amazonaws.com",
        deploymentId: "cb1vsa",
        apiId: "yd0ymo5txd",
      },
      body,
      isBase64Encoded: false,
    };
  }

  async context({ functionName }) {
    return {
      callbackWaitsForEmptyEventLoop: false,
      succeed: () => {},
      fail: () => {},
      done: () => {},
      functionVersion: "$LATEST",
      functionName,
      memoryLimitInMB: "1024",
      logGroupName: "/aws/lambda/".concat(functionName),
      logStreamName: "2024/04/11/[$LATEST]036569c507e9465e8dfcc5813d970286",
      clientContext: undefined,
      identity: undefined,
      invokedFunctionArn:
        "arn:aws:lambda:us-east-1:764022073951:function:".concat(functionName),
      awsRequestId: "7452e84f-1b5d-40b8-a202-58a3bb05e23a",
      getRemainingTimeInMillis: () => {},
    };
  }

  async cb(_, response) {
    console.log("ApiGatewayEvent", response);
    return response;
  }
}
