'use client';


// import WebSocket from 'ws';



const wsUrl =
    "wss://tvbetframe.com/proxy-game/game?default-client=5730&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE1Mjk2MTUsImV4cCI6MTc3MTUzMTQxNSwiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSIsImh0dHBzOi8vYXBpLm5ldC9pZGVudGl0eS1hcGkvcmVzb3VyY2VzIl0sInRva2VuIjoiIiwidXNlcl9wYXJhbWV0ZXJzIjoie1widXNlcl9pZFwiOjQyMzQ4ODMyLFwicGFydG5lcl9jbGllbnRfaWRcIjo1NzMwLFwidXNlcl9pc3Rlc3RcIjp0cnVlLFwiY3VycmVuY3lfY29kZVwiOlwiRVVSXCIsXCJsYW5ndWFnZVwiOlwiZW5cIixcInVzZXJfcmVnaXN0cmF0aW9uX2RhdGVcIjpcIjIwMjYtMDItMTlUMTk6MzM6MzVaXCIsXCJ0YWdfaWRcIjpudWxsLFwidXNlcl9jbHVzdGVyXCI6bnVsbCxcInBhcnRuZXJfY2xpZW50X2NsdXN0ZXJcIjpcIkxvd1wiLFwiY291bnRyeV9uYW1lXCI6XCJuelwiLFwiZGV2aWNlX25hbWVcIjpcIlwiLFwiZGV2aWNlX29zXCI6XCJXaW5kb3dzXCIsXCJkZXZpY2VfdHlwZVwiOlwiRGVza3RvcFwiLFwiZGV2aWNlX2Jyb3dzZXJcIjpcIkNocm9tZVwiLFwicGFydG5lcl9pZHNcIjpbNDc5NiwyMDAyNDFdLFwidmlzaXRvcl9pZFwiOlwiNDIzNDg4MzJcIn0iLCJ1c2VyX3Nlc3Npb25faWQiOiI0MzFhMjY0Zi1lM2NlLTRjZGMtOGFkYi1mMDZmYjkxMGViOTIiLCJyb2xlIjoiUGFydG5lclVzZXIiLCJwYXJ0bmVyX2NsaWVudF9pZCI6IjU3MzAiLCJwYXJ0bmVyX3VzZXJfaWQiOiJtNHZ0NDYycWs4LVR2QmV0LURlbW9TaXRlLVVzZXItQkVULUVVUiIsImN1cnJlbmN5X2NvZGUiOiJFVVIiLCJjbGllbnRfaWQiOiJQYXJ0bmVyQ2xpZW50VXNlci01NzMwLW00dnQ0NjJxazgtVHZCZXQtRGVtb1NpdGUtVXNlci1CRVQtRVVSIiwidXNlcl9pZCI6IjQyMzQ4ODMyIiwic2NvcGUiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSJdfQ.lZKISbFHaMXW2lNxAc5eRaGhpCS4c7Y_GQvTFn5MdOw5M9_lW4zm4JQUITod1X5ekix1SOeLSL5HLn_jG_kGFgVSfC947ThOvCfcrfL7uQwkIrh4BItwtmMkop4WFqEMcp24HTN7KwkHJvJDDtBbwQYT9TYNYffp2u0QS2S_59OFsYu5DvEeU1cNTkOvvXqBheJJDKKM-DAyFqGqZ-2FYhZeAM_T0h9ycvrL-nrh9_vtNq-kMYKV9fbHArgVHWD8SjHTTm91RdDsYsg4jI6IFbmeue8X9SlNlb0bOdr7WoKsDBcxLFj5jw2G-VErIQJBkvkMkZATa-GzoecEQKtwDj8VcWBnpi6nbhZHSm8zbQLTGIvSErxvl-TrkYT0vD-4h4p6oPmr4QiM50Uu4Ycx0zttKrDoVU9no62DzwteBwn8jSIW2xzUNQtoHmZLJ9z-p9w6VklZNHKrJth3qJ8UGj7yk3d92SlZBNykBPpHl0jdz0UhZ3ElHZvK-536uUqpyeuJFCyivjEInGfnvtmirfj-9r_7VXiTls6S2FKuj5iDd0Cp6a73o9qWa_ITygJ3BFLfGtRoL8LmbKsdQB94zCukEJXtsXNg4NPxXH2QxWvHTbaKqPcXjz3E6rFLEdspkPZnTbvFhsBP3ebaxQ-HaKn63doWLvDod6DhOfmmk1E";

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