// Add text box and button for question post
let postbtn = document.createElement('button');
postbtn.innerHTML = 'Post';
postbtn.type = 'submit';
postbtn.name = 'formPostBtn';

const question = document.getElementById('question');
const botinput = document.createElement('textarea');
const linebreak = document.createElement('br');
botinput.name = 'inputpost';
botinput.cols = 60;
botinput.rows = 20;
botinput.id = 'inputpost';
question.appendChild(botinput);
question.appendChild(linebreak);
question.appendChild(postbtn);


// Add text box and button for answers
let btn = document.createElement('button');
btn.innerHTML = "Show answer";
btn.type = 'submit';
btn.name = 'formBtn';


const answer = document.getElementById('answer');
const botoutput = document.createElement('textarea');
const linebreak2 = document.createElement('br');
botoutput.name = 'outputanswer';
botoutput.cols = 60;
botoutput.rows = 20;
botoutput.id = 'outputanswer';
answer.appendChild(botoutput);
answer.appendChild(linebreak2);
answer.appendChild(btn);


// Api setting
var apigClient = apigClientFactory.newClient();

postbtn.onclick = function(){
    var questiontext = botinput.value;
    const id = new Date().getTime();
    var body = {"id": id,
                "date": new Date().toISOString(),
                "posts": questiontext};
    var params = {};
    var additionalParams = {};
    console.log("Post question id");
    console.log(id);
    apigClient.questionsPost(params, body, additionalParams)
        .then(function (result) {
            botinput.value = result.data;
            console.log('Post Api call success');
        })
}



btn.onclick = function() {
    // alert('Button is clicked');
    var inputtext = botoutput.value;
    var params = {'q': inputtext};
    var body = {};
    var additionalParams = {};
    apigClient.answersGet(params, body, additionalParams)
        .then(function(result){
        // Add success callback code here.
        reply = result.data;
        if (reply.length == 0) {
            botoutput.value = "no answers found for this category";
        } else {
            answertext = reply.join('\n\n');
            botoutput.value = answertext;
        }
        
    })

}



