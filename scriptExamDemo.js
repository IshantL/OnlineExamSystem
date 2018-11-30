/**
 * Author: Steve Collins
 * Email: stephen@beesmartdesign.co.uk
 * Date: 23/05/2014
 * 
 */

/* Dynamic JS & jQuery quiz. From the course: http://javascriptissexy.com/how-to-learn-javascript-properly/
*
*  This page contains the primary quiz functionality that's initiated from cookie.js 
*
 */

function quiz_init() {

     debugger;
      // setting up/caching some vars
        var wrongAnswer=[];
        var userChoice = [];
        var div = $('#quizDiv');
        var nButton = $('#nButton');
        var bButton = $('#bButton');
        var nextQButton = $('#nextQButton');
        var goQuestion = $('#goButton');
        var questionHeading = $("h2");
        var currentQuestion = 0;
        var score = 0;
        var flagButton= false;
        // empty and reload the page for new questions
       function loadPages() {
            questionHeading.empty();
            div.empty();
            showQuestion();
            showChoices();        
            showButtons();
        }

        // display the iterative questions
        function showQuestion() {
            debugger;
            var displayQuestion = allQuestions[currentQuestion].question;
            var txt = document.createTextNode(displayQuestion);
            var questionNo = document.createTextNode("Question " + (currentQuestion + 1));
            var br = document.createElement('br');


            questionHeading.append(questionNo).hide().fadeIn(500);
            questionHeading.append(br);
            questionHeading.append(txt);

        }

        // display the iterative choices
        function showChoices() {
            debugger;
            var displayChoices=[];
            var displayChoices1 = allQuestions[currentQuestion].A;
            var displayChoices2 = allQuestions[currentQuestion].B;
            var displayChoices3 = allQuestions[currentQuestion].C;
            var displayChoices4 = allQuestions[currentQuestion].D;
            if(displayChoices1!==""){
                displayChoices.push("A: "+displayChoices1);
           }if(displayChoices2!==""){
                 displayChoices.push("B: "+displayChoices2);
            }
            if(displayChoices3!==""){
                displayChoices.push("C: "+displayChoices3);
           }
           if(displayChoices4!==""){
            displayChoices.push("D: "+displayChoices4);
            }

            for (var i = 0; i < displayChoices.length; i++) {
                var lb = document.createElement('label');
                var inp = document.createElement('input');
                var br = document.createElement('br');

                inp.setAttribute('type', 'radio');
                inp.setAttribute('name', 'answer');
                inp.setAttribute('value', i);
                lb.appendChild(inp);
                lb.appendChild(document.createTextNode(displayChoices[i]));

                div.append(lb);
                div.append(lb).children(':last').hide().fadeIn(500);
                div.append(br);
            }
        }

        // grab the users choice of radio button - (in case they wish to go back a page)
        function RadionButtonSelectedValue(name, SelectedValue) {
        $('input[name="' + name+ '"]').val([SelectedValue]);
        }


        // show back button (except for the last page)
        function showButtons() {
            nButton.show();
            if (currentQuestion > 0) {
                bButton.show();
            }
            else if (currentQuestion == 0) {
                bButton.hide();
            }
        }


        /* A user clicks the back button, de-increment question count and reload.
           (say we're on Q3, we click back, Q2 is shown, we grab the users previous 
            answer to Q2 as an integer. Use the function show this answer value as
            a radio button choice, then delete the outdated answer from the array.*/

        bButton.on('click', function () {
                
                currentQuestion--;
                loadPages();    
                var lastUserChoice = userChoice[userChoice.length - 1];
                RadionButtonSelectedValue("answer", lastUserChoice)
                userChoice.pop();
            }   
        )
        nextQButton.on('click', function () {
             if(!flagButton){
                currentQuestion++;
             }   
            //currentQuestion++;
            document.getElementById('answerPanal').innerHTML = "";
            loadPages();    
            //var lastUserChoice = userChoice[userChoice.length - 1];
           // RadionButtonSelectedValue("answer", lastUserChoice)
            //userChoice.pop();
            flagButton=false;
        });
        /* a user clicks the next button (+ client validation)
           Log their answer. Roll on if their are more Q's. 
        */
        nButton.on('click', function () {
            
            if ($('input[name=answer]:checked', '#quizDiv').length === 0) {
                alert("please select an answer");
            } 
            else {
                logAnswer();
                //checkAnswer(currentQuestion);
                nButton.hide();
                flagButton=true;
            }

            // If there are more questions
            if (currentQuestion < allQuestions.length) {

                //loadPages();
            } // finish and disable button
            else {
                totalScorePage()
            }

        });

        goQuestion.on('click', function () {
            debugger;
            var value = $('#goQuestion').val();
            currentQuestion=parseInt(value)-1 ;
            if (currentQuestion < allQuestions.length && currentQuestion >= 0) {

                questionHeading.empty();
                div.empty();
                showQuestion();
            showChoices();
            showButtons();
            } // finish and disable button
            else {
                alert("Question number not found");
            }
            
        });

        function checkAnswer(currentQuestion){
            debugger;
            currentAnswer = ($('input[name=answer]:checked', '#quizDiv').val()); // grab the users choice
            var ans=currentAnswer;
            var ansfinal=null;
            if(ans==="0"){
                ansfinal = "A";
            }
            if(ans==="1"){
                ansfinal = "B";
            }
            if(ans==="2"){
                ansfinal = "C";
            }
            if(ans==="3"){
                ansfinal = "D";
            }
            if(ansfinal===allQuestions[currentQuestion-1].correctAnswer){
                //alert("Right");
                document.getElementById('answerPanal').innerHTML = "";
                document.getElementById('answerPanal').innerHTML +=`<div id="answerPanal" style="font-size: larger;color:  #076749;margin-left: 40%;">Your answer is CORRECT</div>`
               
            }else{
                debugger;
               
               var ansKey= allQuestions[currentQuestion-1].correctAnswer;
               var rightAnswer=allQuestions[currentQuestion-1][ansKey];
                //alert("Wrong....Right answer is "+ rightAnswer);
                document.getElementById('answerPanal').innerHTML = "";
                document.getElementById('answerPanal').innerHTML +=`<div id="answerPanal" style="font-size: larger;color: #ea0a0a;margin-left: 40%;">Your answer is WRONG. Correct answer is `+ansKey+`</div>`

            }
        }


        function logAnswer(){
            debugger;
            currentAnswer = ($('input[name=answer]:checked', '#quizDiv').val()); // grab the users choice
            userChoice.push(currentAnswer); // push it to the array
            currentQuestion++;
        }

        function totalScorePage (){
            debugger;
            questionHeading.remove(); // clear the page
                div.remove();
                nButton.remove();// disable the buttons
                bButton.remove();
                
                for (var i = 0; i < allQuestions.length; i++) {

            var ans=userChoice[i];
            var ansfinal=null;
            if(ans==="0"){
                ansfinal = "A";
            }
            if(ans==="1"){
                ansfinal = "B";
            }
            if(ans==="2"){
                ansfinal = "C";
            }
            if(ans==="3"){
                ansfinal = "D";
            }//Iterate through the arrays, compare choice and correct answer, total score
                    if (ansfinal == allQuestions[i].correctAnswer) {
                        score++;
                    }else{
                        wrongAnswer.push(allQuestions[i]);
                    }   
                };

                percentScore = Math.floor(((score) / (allQuestions.length)) * 100); // get a % score
                // create the score page and give the user a chance to reload
                $("<p>", {
                    id: 'thankYou', text: 'Thanks for taking the quiz '
                })
                    .appendTo("body")

                $("<p>", {
                    id: 'finalScore', text: 'Your final score is '
                })
                    .appendTo("body")
                    .append(score)
                    .append(" out of ")
                    .append(allQuestions.length);

                $("<h3>", {
                    id: 'finalPercent', text: "That's "
                })
                    .appendTo("body")
                    .append(percentScore + "%");

                $("<button>", {
                    id: 'wrongAnswer', text: "Click here to check right answers"
                })
                    .appendTo("body")
                    .on('click', function () {
                        window.location='questions.html';
                    });

                $("<button>", {
                    id: 'reloading', name: 'reloading', value: 'reloading', text: "Play again"
                })
                    .appendTo("body")
                    .on('click', function () {
                        location.reload();
                    });
        }


        showQuestion();
        showChoices();
        showButtons();
        var quesElem=wrongAnswer.map((ques)=>{
            debugger;
            var a=JSON.stringify(ques,null, 2);;
             return `<div>`+a+`</div>`
        }).join("");
         document.getElementById('questionslist').innerHTML+=quesElem;
    }

getQuestionsExam(); // grab the questions stored in the JSON file


