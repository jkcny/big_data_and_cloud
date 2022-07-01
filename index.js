let btn = document.createElement('button');
btn.innerHTML = "Show answer";
btn.type = 'submit';
btn.name = 'formBtn';


const answer = document.getElementById('answer');
const botoutput = document.createElement('textarea');
const linebreak = document.createElement('br');
botoutput.name = 'outputanswer';
botoutput.cols = 60;
botoutput.rows = 30;
botoutput.id = 'outputanswer'
answer.appendChild(botoutput);
answer.appendChild(linebreak);
answer.appendChild(btn);



var apigClient = apigClientFactory.newClient();
var body = {
    // This is where you define the body of the request,
  };
var additionalParams = {
    // If there are any unmodeled query parameters or headers that must be
    //   sent with the request, add them here.
  };


btn.onclick = function() {
    // alert('Button is clicked');
    var inputtext = botoutput.value;
    var params = {'q': inputtext};
    apigClient.answersGet(params, body, additionalParams)
        .then(function(result){
        // Add success callback code here.
        reply = result.data;
        botoutput.value = reply;
    })

}



