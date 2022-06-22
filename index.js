let btn = document.createElement('button');
btn.innerHTML = "Show answer";
btn.type = 'submit';
btn.name = 'formBtn';


const answer = document.getElementById('answer');
const botoutput = document.createElement('textarea');
const linebreak = document.createElement('br');
botoutput.name = 'answer';
botoutput.cols = 30;
botoutput.rows = 10;
answer.appendChild(botoutput);
answer.appendChild(linebreak);
answer.appendChild(btn);


// calling API
// const url = 'https://o8pgxlcmgd.execute-api.us-east-1.amazonaws.com/dev2/chat';
// fetch(url, {header: {
//     'Access-Control-Allow-Origin':'http://localhost:3000',
//   }}).then(response => {
//     return response.json()
// }).then(data => {
//     let out = data.body;
// })

var apigClient = apigClientFactory.newClient();
var params = {};
var body = {
    // This is where you define the body of the request,
  };
var additionalParams = {
    // If there are any unmodeled query parameters or headers that must be
    //   sent with the request, add them here.
  };

apigClient.answersGet(params, body, additionalParams)
  .then(function(result){
    // Add success callback code here.
    reply = result.data.body;
})

btn.onclick = function() {
    // alert('Button is clicked');
    botoutput.value = reply;
}


