# Fin Alchemist Demo App

Fin Alchemist Demo App is implemented for [`The AWS Amplify Fullstack TypeScript Challenge`](https://dev.to/devteam/join-us-for-the-the-aws-amplify-fullstack-typescript-challenge-3000-in-prizes-ghm).

## **Overview**

This app is equiped with a foundational React application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## **Technologies**

- Node.js
- Typescript
- AWS Amplify
- Material UI

## Features

- **Authentication**: Setup with `Amazon Cognito` for secure user authentication.
- **API**: Ready-to-use *GraphQL* endpoint with `AWS AppSync`.
- **Database**: Real-time database powered by `Amazon DynamoDB`.

## **Development**

### **Requirements**

- An AWS Account with Admin Access
- Node.js v20 or above

### **Install Depedencies**

```shell
$ npm install
```

### **Development Environment Setup**

```shell
$ npx ampx sandbox
```

This command will create the necessary resources on AWS Amplify on the user's default region.

> WARNING: You require an AWS account with Admin Access.

### **Run the App**

```shell
$ npm run dev
```

## Deploying to AWS

For detailed instructions on deploying this app, refer to the [deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.
