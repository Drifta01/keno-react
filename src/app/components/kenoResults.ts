/**
 * IMPORTANT SECURITY WARNING:
 * This file contains a hardcoded JWT token. This is a major security risk.
 * This token should be stored securely in an environment variable.
 */

// Define interfaces for the API response shapes
interface KenoResponse {
  Success: boolean;
  Value: {
    Items: any[]; // You can define a stricter type for Items if you know its structure
  };
  Error?: string | null;
}

interface ErrorResponse {
  error: string;
}

/**
 * Fetches historical Keno game results from the TVBet API.
 *
 * @param {number} startTs - The start timestamp (Unix epoch) for the results query.
 * @param {number} finishTs - The end timestamp (Unix epoch) for the results query.
 * @param {number} [count=30] - The number of results to fetch.
 * @returns {Promise<KenoResponse | ErrorResponse>} A promise that resolves to the API response.
 */
export default async function kenoResults(
  startTs: number,
  finishTs: number,
  count: number = 30
): Promise<KenoResponse | ErrorResponse> {
  const url = "https://tvbetframe.com/api/getResults";

  // WARNING: This is a hardcoded token. Do not use in production.
  const hardcodedToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE2NDQyNjksImV4cCI6MTc3MTY0NjA2OSwiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSIsImh0dHBzOi8vYXBpLm5ldC9pZGVudGl0eS1hcGkvcmVzb3VyY2VzIl0sInRva2VuIjoiIiwidXNlcl9wYXJhbWV0ZXJzIjoie1widXNlcl9pZFwiOjQyMzgzOTUwLFwicGFydG5lcl9jbGllbnRfaWRcIjo1NzMwLFwidXNlcl9pc3Rlc3RcIjp0cnVlLFwiY3VycmVuY3lfY29kZVwiOlwiRVVSXCIsXCJsYW5ndWFnZVwiOlwiZW5cIixcInVzZXJfcmVnaXN0cmF0aW9uX2RhdGVcIjpcIjIwMjYtMDItMjFUMDM6MjQ6MjlaXCIsXCJ0YWdfaWRcIjpudWxsLFwidXNlcl9jbHVzdGVyXCI6bnVsbCxcInBhcnRuZXJfY2xpZW50X2NsdXN0ZXJcIjpcIkxvd1wiLFwiY291bnRyeV9uYW1lXCI6XCJuelwiLFwiZGV2aWNlX25hbWVcIjpcIlwiLFwiZGV2aWNlX29zXCI6XCJXaW5kb3dzXCIsXCJkZXZpY2VfdHlwZVwiOlwiRGVza3RvcFwiLFwiZGV2aWNlX2Jyb3dzZXJcIjpcIkNocm9tZVwiLFwicGFydG5lcl9pZHNcIjpbNDc5NiwyMDAyNDFdLFwidmlzaXRvcl9pZFwiOlwiNDIzODM5NTBcIn0iLCJ1c2VyX3Nlc3Npb25faWQiOiIxM2RiZTdmZS02ODkyLTRiYWYtODE5OS02N2U5NTQ5ZGVkYjQiLCJyb2xlIjoiUGFydG5lclVzZXIiLCJwYXJ0bmVyX2NsaWVudF9pZCI6IjU3MzAiLCJwYXJ0bmVyX3VzZXJfaWQiOiJzcG9pZ3F1c2Y2LVR2QmV0LURlbW9TaXRlLVVzZXItQkVULUVVUiIsImN1cnJlbmN5X2NvZGUiOiJFVVIiLCJjbGllbnRfaWQiOiJQYXJ0bmVyQ2xpZW50VXNlci01NzMwLXNwb2lncXVzZjYtVHZCZXQtRGVtb1NpdGUtVXNlci1CRVQtRVVSIiwidXNlcl9pZCI6IjQyMzgzOTUwIiwic2NvcGUiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSJdfQ.BaMFsucWD9CviOR25yuEqZSlfbgSkutD9vKuSKhG8rwcbMxTs-GrYOwAQc-7FKZig-fyqU6y9UgS0nqC-qxfJsIR06pvhJae-MshYoLV58apO_6ps1M8LlVL9D_Cy3VZRrJdNJ8E4BkKqUoAAlRuWni5lr00jZwIeC-jJfRebW7wSZex2XV-g-UMj0ARefLdqZj7LvCdBCPa9pDQgUTsX99i3Mv06pgVMbMQuWwFarbjn43qPknlivDHn2kPV7VfLdDzEFlMEXkF4bGQivsB0-C1vU9UrFeWRlA5VxQK13qJKzvYngjSXti8gD2BZNMWVzWCXHzdPREbIoQn8I88NgmTQ8qh13gwYIH-wxGMC6HF_sWlQduJtPliXtjw6qamP7agxftG8bm466FsQ2-f6ziGJ1C-htZNzgxHErFEA6IM-LGf4JQwAf_jXjUGSW7jawXnHMnIDlkpB1aoIb5B0aTKeatNrDqZT-Ho-cNmUD-nn5EpmXub49vQWfiGFaijFQfCgKjCtodaGQZcjmCtipXtCwLEwtQbv_gh2SXA1yDZrRvq_8UbGhWO7rSASL5USs_mJX0r-iMkKlbVtT938HHoWxoI7NviFlcyW_Ggke8OjsaffeA8bJwAoWHWuorTW17AuzF-RO27AIJftIP4zWfY6v9XqYBAsHFFUE3PxPs";

  const requestBody = {
    params: {
      StartTs: startTs,
      FinishTs: finishTs,
      GameTypes: [23],
      PartnerClientId: 5730,
      Offset: 0,
      Count: count,
      lng: "en",
    },
    userInfo: {
      client: 5730,
      currency: "EUR",
      balance: 10000000000,
      lng: "en",
      token: hardcodedToken,
    },
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data: KenoResponse = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
}