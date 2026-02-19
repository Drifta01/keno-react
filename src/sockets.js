'use client';


// import WebSocket from 'ws';



const wsUrl =
    "wss://tvbetframe.com/proxy-game/game?default-client=5730&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE0Njk1MjQsImV4cCI6MTc3MTQ3MTMyNCwiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSIsImh0dHBzOi8vYXBpLm5ldC9pZGVudGl0eS1hcGkvcmVzb3VyY2VzIl0sInRva2VuIjoiIiwidXNlcl9wYXJhbWV0ZXJzIjoie1widXNlcl9pZFwiOjQyMzMxMjg4LFwicGFydG5lcl9jbGllbnRfaWRcIjo1NzMwLFwidXNlcl9pc3Rlc3RcIjp0cnVlLFwiY3VycmVuY3lfY29kZVwiOlwiRVVSXCIsXCJsYW5ndWFnZVwiOlwiZW5cIixcInVzZXJfcmVnaXN0cmF0aW9uX2RhdGVcIjpcIjIwMjYtMDItMTlUMDI6NTI6MDRaXCIsXCJ0YWdfaWRcIjpudWxsLFwidXNlcl9jbHVzdGVyXCI6bnVsbCxcInBhcnRuZXJfY2xpZW50X2NsdXN0ZXJcIjpcIkxvd1wiLFwiY291bnRyeV9uYW1lXCI6XCJuelwiLFwiZGV2aWNlX25hbWVcIjpcIlwiLFwiZGV2aWNlX29zXCI6XCJXaW5kb3dzXCIsXCJkZXZpY2VfdHlwZVwiOlwiRGVza3RvcFwiLFwiZGV2aWNlX2Jyb3dzZXJcIjpcIkNocm9tZVwiLFwicGFydG5lcl9pZHNcIjpbNDc5NiwyMDAyNDFdLFwidmlzaXRvcl9pZFwiOlwiNDIzMzEyODhcIn0iLCJ1c2VyX3Nlc3Npb25faWQiOiJjNWM1ZmU0OC1iYzU1LTRlODgtOWY0MS1iYjNkNjIxOGY0N2MiLCJyb2xlIjoiUGFydG5lclVzZXIiLCJwYXJ0bmVyX2NsaWVudF9pZCI6IjU3MzAiLCJwYXJ0bmVyX3VzZXJfaWQiOiJtZHVxaG45M2FiLVR2QmV0LURlbW9TaXRlLVVzZXItQkVULUVVUiIsImN1cnJlbmN5X2NvZGUiOiJFVVIiLCJjbGllbnRfaWQiOiJQYXJ0bmVyQ2xpZW50VXNlci01NzMwLW1kdXFobjkzYWItVHZCZXQtRGVtb1NpdGUtVXNlci1CRVQtRVVSIiwidXNlcl9pZCI6IjQyMzMxMjg4Iiwic2NvcGUiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSJdfQ.3KtDExMxCvHuLsB-KxMcxoKCPpL5i-KSfw3XG5PUpVlUCa451cBObzyk-of0w7iGREvK_TvqEQRtFsf7dOxJJMMuj51EqZQiJVIgosvOdyllZxktzRhuR-1iRw_RNmeS_Mg_2QA-sNmODx7XKWA3z0zcVFJ7yXOQWj6327j8MAWKljugJM0A6kFtNJVRU6wi0VlhUDHuC7VEXqe5YfPA8A58vkI7ErcGDuxrtR65sII9ikZLTtDJ0rU7YIygrVl7Qbtb9rLbXt4ctxuaT5tK-nnvtsydOdCCTSm__wYSrgP7PDSnUn_Ekqq7JNvfmNZAfO2G7fcEZyED2m52vpVBwPR3zVmJ4gDtQdnkkszdDMEh3Zl-P5xA9SHVh836fpSRGUxHTH0D7jDX8-KCWOiM0Q23rwLdgzHBOEqaHb4aOH-eLlhe4kQ7lRY9cTbTDz5AutB3yp0fTBxN-oVJhOWHiDObuG3UxOQmcka5yZVXrJqw91t5uaeMCVgp7bjnJisZE8QjKlHvVHfxyfjthyj-AHLi2DX4fIqZ3tq4lX30Yj4rae0l0ri-LnBjAACDd7jCmtT7UOQhGYbB4CZ3AhGUbBHLXfy2tUuRAMWYL1RjUXCYhJm08y19LccUs2qZGdMw4f7oVbeCxMVTjQE120YI4r8UWNoIne4pnDElyfuDlK8";

const subscribe = JSON.stringify({
    target: 'CurrentGameStateSubscribe',
    arguments: [{ GameType: 23 }],
    invocationId: '0',
    type: 1,
});

const gameEvent = JSON.stringify({
    target: 'CurrentGameResultSubscribe',
    arguments: [{ GameType: 23 }],
    invocationId: '1',
    type: 1,
});




const socket = new WebSocket(wsUrl);

socket.onopen = () => {
    console.log('WebSocket connection opened');

    socket.send(JSON.stringify({ protocol: 'json', version: 1 }) + '\u001e');
};


let handshake = false;
console.log('message');
log = (data) => {
    try {
        let cleanedText = data.replace(/\u001E/g, '');
        const result = JSON.parse(cleanedText);

        const items = result.arguments[0].data.results;
        const gameEdition = result.arguments[0].data.gameEdition;
        console.log(gameEdition)
        console.log(items);

        // console.log(cleanedText)
    } catch (e) {
        // console.log(e)
    }
};


socket.addEventListener('message', (event) => {
    socket.send(JSON.stringify({ type: 6 }) + '\u001e');
    log(event.data);

    // console.dir(event)
    if (handshake == false) {
        // socket.send(subscribe)
        socket.send(gameEvent);
        handshake = true;
    }
    socket.removeEventListener('message', event);
});


export default socket