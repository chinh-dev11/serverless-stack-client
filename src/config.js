export default {
  MAX_ATTACHMENT_SIZE: 5000000, // 5 MB
  s3: {
      REGION: "us-east-1",
      BUCKET: "serverless-stack-notesapp-uploads"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://t27xi9i6pl.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_8wj2BjpOi",
      APP_CLIENT_ID: "2gkkkf0qvqafl9eitum7id1ndm",
      IDENTITY_POOL_ID: "us-east-1:2bcaff13-b14b-4fd4-b838-08c04241b1a4"
    }
};