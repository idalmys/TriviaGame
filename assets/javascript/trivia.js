$(document).ready(function() {
    // Variables's initialization 
    var questionsArray = [];
    var array_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var question = "";
    var question1 = "";
    var question2 = "";
    var question3 = "";
    var question4 = "";
    var question5 = "";
    var question6 = "";
    var question7 = "";
    var question8 = "";
    var question9 = "";
    var countStart = 20;
    var rightAnswer = [];
    var wrongAnswer = [];
    var unAnswered = 5;
    var Timer = "";
    var value = "";
    var name = 0;
    var image = "";
    var found = ""

    

    function Insert(array_index){
        //Shuffle my array of index
        var ctr = array_index.length;
        var temp = "";
        var index = "";
        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = array_index[ctr];
            array_index[ctr] = array_index[index];
            array_index[index] = temp;
        }
    }

    function questionObject(position, question, answer1, answer2, answer3, correctAnswer) {
        //questionObject constructor
        this.position =position;
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.correctAnswer = correctAnswer;
    }

    function createQuestion(){
        //Create new questionObject and push it into an array
        question = new questionObject(0, "What date (Year month and date) is Michael born in?", "26 october 1958", "13 december 1948", "29 august 1958", "29 august 1958");
        question1 = new questionObject(1, "Where was Michael born?", "gary indiana", "New York America", "Houston Texas", "gary indiana");
        question2 = new questionObject(2, "When did Michael die?", "26 june", "30 june", "25 june", "25 june");
        question3 = new questionObject(3, "How many copies has Thiller sold?", "66 millions", "under 3", "under 300", "66 millions");
        question4 = new questionObject(4, "How old was Michael when he died?", "50", "60", "80", "50");
        question5 = new questionObject(5, "How many times has Michael had a concert in Ireland?", "6", "10", "3", "3");
        question6 = new questionObject(6, "Who is Michael's oldest brother?", "Tito", "Randy", "Jackie", "Jackie");
        question7 = new questionObject(7, "What year did Michael Jackson divorce with Lisa Marie Presley?", "1998", "1996", "1991", "1996");
        question8 = new questionObject(8, "What pet did Michael Jackson have?", "Dog", "Monkey", "Cat", "Monkey");
        question9 = new questionObject(9, "True or False? Michael got plastice surgery", "True", "False", "None", "True");
        questionsArray.push(question, question1, question2, question3, question4, question5, question6, question7, question8, question9);
    }
    
    function DisplayQuestion(){ 
        
        for (l = 0; l < 5; l++) {
            $("#answers").append("<div id='" + questionsArray[array_index[l]].position + "'></div>")
            $("#" + questionsArray[array_index[l]].position).append("<h3>" + questionsArray[array_index[l]].question + "</h3>");
            $("#" + questionsArray[array_index[l]].position).append("<input type='radio' id='" + questionsArray[array_index[l]].answer1 + "' name='" + questionsArray[array_index[l]].position+ "' value='" + questionsArray[array_index[l]].answer1+ "'>" + "<label>" + questionsArray[array_index[l]].answer1 + "</label>");
            $("#" + questionsArray[array_index[l]].position).append("<input type='radio' id='" + questionsArray[array_index[l]].answer2 + "' name='" + questionsArray[array_index[l]].position + "' value='" + questionsArray[array_index[l]].answer2+ "'>" + "<label>" + questionsArray[array_index[l]].answer2 + "</label>");
            $("#" + questionsArray[array_index[l]].position).append("<input type='radio' id='" + questionsArray[array_index[l]].answer3+ "' name='" + questionsArray[array_index[l]].position + "' value='" + questionsArray[array_index[l]].answer3+ "'>" + "<label>" + questionsArray[array_index[l]].answer3 + "</label>");
            $("#" + questionsArray[array_index[l]].position).append("<img src ='' class='" + questionsArray[array_index[l]].position + "'/>");
            $("img").hide();
        }
        $("#gameDone").append("<button id='done' type='button'>Done</button>");
        $("#gameStartOver").append("<button id='startOver' type='button'>Start Over</button>");
    }   

    function endGame(countStart){
        if(countStart <= 0){
            clearInterval(Timer);
            $("#timers").text("All done!");
            $("#answers").empty();
            $("#answers").append("<label>Correct answers:&nbsp;</label><label>" + rightAnswer.length + "</label>")
            $("#answers").append("<label>Incorrect answers:&nbsp;</label><label>" + wrongAnswer.length + "</label>")
            $("#answers").append("<label>Unanswered:&nbsp;</label><label>" + unAnswered + "</label><br>")
            $("#gameDone").css({"disabled": "true"});
        }    
    }

    function countdown(){
        //Timer count down -- 60 seconds
        $("#timers").text("Time remaining: " + countStart + " seconds");
        Timer = setInterval(function(){
        --countStart;
        $("#timers").text("Time remaining: " + countStart + " seconds");
        endGame(countStart);
        },1000);
    }

    Insert(array_index);
    countdown();
    createQuestion();
    DisplayQuestion();

    $("input").click(function () {
        //Input clicked is the correct answer or no
        value = this.value; //Clicked answer
        name = parseInt(this.name); //Clicked idQuestion

        //Element in questionsArray with idQuestion iqual to clicked idQuestion
        found = questionsArray.find(function(element) {
            return element.position === name;
        }); 

        //See if clicked idQuestion have been clicked before
        var indexRight = rightAnswer.indexOf(this.name);
        var indexWrong = wrongAnswer.indexOf(this.name);

        if(value === found.correctAnswer){
             
            if (indexRight <= -1) {
                rightAnswer.push(this.name);
            }
            if (indexWrong > -1) {
                wrongAnswer.splice(indexWrong, 1);
            }   
        }else{
            
            if (indexRight > -1) {
                rightAnswer.splice(indexRight, 1);
            }
            if (indexWrong <= -1) {
                wrongAnswer.push(this.name);
            }
        }
        if ((indexWrong <= -1) && (indexRight <= -1)) {
            //Unanswered counter
            unAnswered--;
        } 
        $("." + this.name).attr("src",image);
        $("." + this.name).show();
    });  

    $("#done").click(function(){
        //Game done
        countStart = 0;
        endGame(countStart);
    });

    $("#startOver").click(function(){
      
        location.reload();
       
    });
})

 