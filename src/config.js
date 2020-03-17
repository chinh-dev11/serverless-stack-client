const dev = {
  STRIPE_PUBLISHABLE_KEY: "pk_test_Gcqa0iX35MUoVud3ctRklG9900hDI9Hw8k", // "YOUR_STRIPE_DEV_PUBLIC_KEY"
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-api-iac-dev-attachmentsbucket-tv8eegv37nwq" // "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://zlioazya9g.execute-api.us-east-1.amazonaws.com/dev" // "YOUR_DEV_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_NSHftoVdC", // "YOUR_DEV_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "54irndve5pmdamcvl7008gqm6c", // "YOUR_DEV_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "us-east-1:b739a555-a8bd-49c6-9915-20632a65c64f" // "YOUR_DEV_IDENTITY_POOL_ID"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_Gcqa0iX35MUoVud3ctRklG9900hDI9Hw8k", // "YOUR_STRIPE_PROD_PUBLIC_KEY",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-api-iac-prod-attachmentsbucket-1hgl5e307mipj" //"YOUR_PROD_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://kpigmp15z0.execute-api.us-east-1.amazonaws.com/prod" // "YOUR_PROD_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_jjbM7vtMV", // "YOUR_PROD_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "7lcei036hhmj7lan3e3vni7ad7", // "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "us-east-1:00d623d7-2616-41d0-9ea0-afd8de434d8c" // "YOUR_PROD_IDENTITY_POOL_ID"
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