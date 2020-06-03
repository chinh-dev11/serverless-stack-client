// AWS account: chinh.le11
const dev = {
  STRIPE_PUBLISHABLE_KEY: "pk_test_Gcqa0iX35MUoVud3ctRklG9900hDI9Hw8k", // "YOUR_STRIPE_DEV_PUBLIC_KEY"
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-api-iac-dev-attachmentsbucket-910eb5xah3zn" // "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://697x3jn56m.execute-api.us-east-1.amazonaws.com/dev" // "YOUR_DEV_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_kVqoYdLDM", // "YOUR_DEV_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "4ji82isdfblv1evfos9om8703d", // "YOUR_DEV_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "us-east-1:e443b78e-6689-49ca-abd3-aaaa544978fc" // "YOUR_DEV_IDENTITY_POOL_ID"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_Gcqa0iX35MUoVud3ctRklG9900hDI9Hw8k", // "YOUR_STRIPE_PROD_PUBLIC_KEY",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-api-iac-prod-attachmentsbucket-18nu4tww28gdj" //"YOUR_PROD_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6x9x0g8721.execute-api.us-east-1.amazonaws.com/prod" // "YOUR_PROD_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_4gpHLypie", // "YOUR_PROD_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "4vnn44sms46dfvnmm2gb0l2k4g", // "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "us-east-1:c8f96990-18bd-4d50-b544-b40b89ee327a" // "YOUR_PROD_IDENTITY_POOL_ID"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000, // 5 MB
  ...config
};