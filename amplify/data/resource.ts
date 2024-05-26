import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  StockPerformance: a
    .model({
      username: a.string(),
      stockSymbol: a.string(),
      isActive: a.boolean()
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
