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

const params = ({
  "StartTs": 'StartTs',
  "FinishTs": 'FinishTs',
  "GameTypes": [23],



  "PartnerClientId": 5730,
  "Offset": 0,
  "Count": 'Count',
  "lng": "en"
})
export default async function fetchResults(): Promise<KenoResponse | ErrorResponse> {
  const response = await fetch("https://tvbetframe.com/api/getResults", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "pragma": "no-cache",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Not:A-Brand\";v=\"99\", \"Google Chrome\";v=\"145\", \"Chromium\";v=\"145\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-fetch-storage-access": "none",
      "traceparent": "00-715b10e27aaa9176baac4ca4abb03a20-fcb37799387dffc5-00",
      "ua-pixels": "2843x1191"
    },
    "referrer": "https://tvbetframe.com/?lng=en&clientId=5730&hostname=tvbet.tv&token=TvBet-DemoSite-User-BET&version_signal=1",
    "body": `${"{\"params\":{\"StartTs\":'StartTs',\"FinishTs\":'FinishTs',\"GameTypes\":[23],\"PartnerClientId\":5730,\"Offset\":0,\"Count\":'Count',\"lng\":\"en\"},\"userInfo\":{\"client\":5730,\"currency\":\"EUR\",\"balance\":10000000000,\"lng\":\"en\",\"token\":\"eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE5MzUzMDEsImV4cCI6MTc3MTkzNzEwMSwiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSIsImh0dHBzOi8vYXBpLm5ldC9pZGVudGl0eS1hcGkvcmVzb3VyY2VzIl0sInRva2VuIjoiIiwidXNlcl9wYXJhbWV0ZXJzIjoie1widXNlcl9pZFwiOjQyNDcwOTk1LFwicGFydG5lcl9jbGllbnRfaWRcIjo1NzMwLFwidXNlcl9pc3Rlc3RcIjp0cnVlLFwiY3VycmVuY3lfY29kZVwiOlwiRVVSXCIsXCJsYW5ndWFnZVwiOlwiZW5cIixcInVzZXJfcmVnaXN0cmF0aW9uX2RhdGVcIjpcIjIwMjYtMDItMjRUMTI6MTU6MDFaXCIsXCJ0YWdfaWRcIjpudWxsLFwidXNlcl9jbHVzdGVyXCI6bnVsbCxcInBhcnRuZXJfY2xpZW50X2NsdXN0ZXJcIjpcIkxvd1wiLFwiY291bnRyeV9uYW1lXCI6XCJuelwiLFwiZGV2aWNlX25hbWVcIjpcIlwiLFwiZGV2aWNlX29zXCI6XCJXaW5kb3dzXCIsXCJkZXZpY2VfdHlwZVwiOlwiRGVza3RvcFwiLFwiZGV2aWNlX2Jyb3dzZXJcIjpcIkNocm9tZVwiLFwicGFydG5lcl9pZHNcIjpbNDc5NiwyMDAyNDFdLFwidmlzaXRvcl9pZFwiOlwiNDI0NzA5OTVcIn0iLCJ1c2VyX3Nlc3Npb25faWQiOiJmMGNkMWI5Yi0xOGFjLTQ2NmItOTc4Ni1kMDJiN2YwMzE4NjUiLCJyb2xlIjoiUGFydG5lclVzZXIiLCJwYXJ0bmVyX2NsaWVudF9pZCI6IjU3MzAiLCJwYXJ0bmVyX3VzZXJfaWQiOiJjaGZ1aDQyZmZ2LVR2QmV0LURlbW9TaXRlLVVzZXItQkVULUVVUiIsImN1cnJlbmN5X2NvZGUiOiJFVVIiLCJjbGllbnRfaWQiOiJQYXJ0bmVyQ2xpZW50VXNlci01NzMwLWNoZnVoNDJmZnYtVHZCZXQtRGVtb1NpdGUtVXNlci1CRVQtRVVSIiwidXNlcl9pZCI6IjQyNDcwOTk1Iiwic2NvcGUiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSJdfQ.jNFDMysx5kagxMEZry4YwF6BZzIVOtvYbwSzW2FlAaKbLQn7IEokKoWj4bpMfs7J-eZziz5qOf-nZ91XShN2IuK2kZRHopXkq-JJmVdBmcMD5ttTVGRlgVNHKAidkqvdy1TRgedW1cZKexAaV2JV5P0GLJ-TlgdZXxD4NacbcIgLmfQftju2BfvDzNSW0K0v-h0yNcBdQA0qGg6kGqGnc0f4cr8MUCiCCIuW_Mx_3AWGd2vzDb5nyHdKVwquTI7ROxXJnGC09qyoMBvNQ6HZnwscWE_IXH7JPTQs-4RIafA5NZ3ppSBpFN5ZjWP2RmT3oNVJmfdVienLfgUGd6-QeQCVtXMkJGyW7Pn_4i53BLaIqGINXLEFFl5EyYv1gugiklYykp_YtJg6F0gSaRdYCaCl73MRpy4zcyjn5kUi144zN_DeGm-RNC_-bxKB_OCIoo-W-MASnfXg2K3BqKLInA0KjRHSamLpFp3LOuve5t6p5frh6xsoYhfhQaLcQeSa7QAIIqucOeUmmj1vLPdDwHihsn-USZfNiZO2RqizM8EuW30XwBuQ7sNcGD2w5SHPVgYXgBGdbtGhmHd7aH6RV4xnjABMjQB-dcasb7xzDjr1yd78hz_fEtlDgYo_ZxEaZfcT3sgVcm5FE2hDH3PaP4b7SCHawe7iKlqGQrxhb98\",\"serviceToken\":\"eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE5MzUzMDAsImV4cCI6MTc3NDUyNzMwMCwiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS9yZXNvdXJjZXMiLCJiZXRzLWFwaSIsImNoYXRzLXNpZ25hbHItYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsImZlZWRzLWFwaSIsImdhbWVldmVudHR5cGVzLWFwaSIsImphY2twb3RzLWFwaSIsInBhcnRuZXJzLWFwaSIsInBhcnRuZXJ3YWxsZXRzLWFwaSIsInByb21vY29kZXMtYXBpIiwic2lnbmFsci1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwid2ViIl0sImNsaWVudF9pZCI6IldlYiIsInJvbGUiOiJXZWIiLCJzY29wZSI6WyJiZXRzLWFwaSIsImNoYXRzLXNpZ25hbHItYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsImZlZWRzLWFwaSIsImdhbWVldmVudHR5cGVzLWFwaSIsImphY2twb3RzLWFwaSIsInBhcnRuZXJzLWFwaSIsInBhcnRuZXJ3YWxsZXRzLWFwaSIsInByb21vY29kZXMtYXBpIiwic2lnbmFsci1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwid2ViIl19.duD1hVV_6asgzaU1hGx-Kp_Mu5Ny0brUP-pQRRa7C6L_ldfuSj_-s3W6datG0gugChNET2lkqzEuP9bmV_kelZ_bB4MiJdR4gVL4P_qOkqT3Jmhj-xPILHZiySuYXxWaDHeICvkTHWK24MuvrY8Vm5grJ9EGfr5wKrq3X_Gsepq95l9q9FHrHj5aUe-WOt2NShBk8sg6tD9XWDdsWGhyTFm16lkNv-Ha9LDdriPqTPpcNQY9eUe57HOeJ8KvzShUGpPQ_vQ0LdYmAsRan_FeoKV1lxuX1Q2G2iDbVRb7sJgNXa2FyaWkQOJ9yHRSJY40ZrdyXF3A7s6tlNGCDtNfYVML2c8s4OFtNFm__4D2GNjlZeRiOqgnDpeW9k6_HnODqgpdHoZku-lbvW328S5go6Xh7XzsZuP3Md4S3T_ApWIkVdctN_CLNwgSHmcdq5xe1Vd1_vxY1jErhfp7iyNHQ1XSLTnfKuHXvcSDNTuqL7XoOXvRFHTqhSxdIKisjX03MmTc1zR6BT6QiDf4PivXTl_j9X4keZ2Bup-fpjt-qR9mK_VFoJo5voeJhY16mSELNMUF5_qb5GLDAqCoNJrtAULBMBNa1gdZRDeKtu7exfVH8uMD7if53s3Cu60Mt_iHFgolztgqP27HJCT67A4WolZDxqy2vnt3p8Ww9nGLvj4\",\"tagid\":null,\"stage\":\"9999\",\"userId\":42470995,\"partnerUserId\":\"chfuh42ffv-TvBet-DemoSite-User-BET-EUR\",\"visitorId\":\"\",\"refreshToken\":\"chfuh42ffv-TvBet-DemoSite-User-BET\"}}"}`,
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  });

  return response.json();
}







