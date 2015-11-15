function QuizItem(question, variants, answer, enabled, replied) {
	this.question = question;
	this.variants = variants;
	this.answer = answer;
	this.enabled = enabled;
	this.replied = replied;
}

var quizQuestions = [];
quizQuestions[0] = new QuizItem("Javascript has:", 
						["Function scope and block scope",
						 "Just block scope",
						 "Global and function scope",
						 "Only global scope"], 
						 2,
						 false,
						 false);

quizQuestions[1] = new QuizItem("Which of these is a working object?", 
						["var obj = { car: \"ford\" ; color:green }",
						 "var obj = { car = \"ford\" , color = green }",
						 "var obj = { car: \"ford\" , color:green }",
						 "None of the above"],
						 2,
						 false,
						 false);

// quizQuestions[2] = new QuizItem("Which of these is a working loop?",
// 						["for( i=0 i<10 i+=1) { console.log(i) }",
// 						 "abvfc>sd<;jskjsdf+fdgjf",
// 						 "for( i=0, i<10, i+=1) { console.log(i) }",
// 						 "if (i=0) { i+=1 }"],
// 						 1,
// 						 false,
// 						 false);

// quizQuestions[3] = new QuizItem("What does this output:<br>'hello'!=123",
// 						["false", "true", "neither"],
// 						1,
// 						false,
// 						false);

// quizQuestions[4] = new QuizItem("var num = 10+''",
// 						["typeof num is number",
// 						"typeof numb is boolean",
// 						"typeof num is function",
// 						"typeof num is string"],
// 						3,
// 						false,
// 						false);

var pTag = document.getElementsByTagName('p')[0];
// pTag.innerHTML = test1.question;
// console.log(quizQuestions[0]);
var currentIndex = 0, numOfAnswered = 0;
var currentQuestion = quizQuestions[currentIndex++];
var liTags = document.getElementsByTagName('li');

// console.log(currentQuestion +"dffdf");
function showCurrentQuestion() {
	console.log(currentQuestion +"df")
	pTag.innerHTML = currentQuestion.question;
	for (var i=0; i < liTags.length; i++) {
		if (currentQuestion.variants[i] == undefined) {
			console.log(currentQuestion.variants[i]);
			liTags[i].className = "doNotDisplay";
		} else {
			console.log(currentQuestion.variants[i]);
			liTags[i].innerHTML = currentQuestion.variants[i];//assign question
			liTags[i].className = "";
		}
	}
};

enableLiOnClickEvents();
showCurrentQuestion();

//when a variant is selected it becomes highlighted 
function changeLiStyle() {
	var selectedItem = document.getElementsByClassName('selected')[0];
	//disable previously selected item and enable the clicked one
	if (selectedItem) selectedItem.className = "";
	this.className = "selected";
}


//self-invoking function to find all li tags 
// and assing them text from the object 
// and assign event listeners
function enableLiOnClickEvents() {
	for (var i=0; i < liTags.length; i++) {
		console.log(liTags[i]);
		liTags[i].onclick = changeLiStyle;
	}
};

var button = document.getElementsByClassName('submit')[0];
button.onclick = submitAndCheckAnswer;

function submitAndCheckAnswer() {
	var selectedItem = document.getElementsByClassName('selected')[0];
	console.log(selectedItem.innerHTML);
	currentQuestion.enabled = true;
	if (selectedItem.innerHTML == currentQuestion.variants[currentQuestion.answer]) {
		console.log("Correct");
		currentQuestion.replied = true;
		if (currentIndex == quizQuestions.length) {
			console.log(currentIndex +" " + quizQuestions.length);
			this.className = "finalize";
			this.innerHTML = "Finalize";
		} else {
			console.log(currentIndex +"fdsf " + quizQuestions.length);
			this.innerHTML = "Next Question";
			this.className = "next";
		}
		selectedItem.className="correct";
		numOfAnswered++;
		console.log(numOfAnswered);
		button.onclick = goToNextQuestion;
		disableLiOnClickEvents();
	} else {
		console.log("Wrong!");
		currentQuestion.replied = false;
		if (currentIndex == quizQuestions.length) {
			console.log(currentIndex +" " + quizQuestions.length);
			this.className = "finalize";
			this.innerHTML = "Finalize";
		} else {
			console.log(currentIndex +" " + quizQuestions.length);
			this.innerHTML = "Next Question";
			this.className = "next";
		}
		selectedItem.className="wrong";
		liTags[currentQuestion.answer].className = "correct";
		button.onclick = goToNextQuestion;
		disableLiOnClickEvents();
	}	
}

function disableLiOnClickEvents() {
	for (var i=0; i < liTags.length; i++) {
		// console.log(liTags[i]);
		liTags[i].onclick = "";
	}
}

function goToNextQuestion() {
	if (currentIndex == quizQuestions.length) {
		finalize();
		return alert("Quiz is over. Your result: " + numOfAnswered);
	}
	currentQuestion = quizQuestions[currentIndex++];
	//change button's label and event handler
	this.innerHTML = "Submit";
	this.onclick = submitAndCheckAnswer;
	this.className = "submit";
	showCurrentQuestion();
	enableLiOnClickEvents();
}

function cleanUpTheLayout() {
	var mainDiv = document.getElementsByClassName('main')[0];
	// deleting all child nodes 
	while (mainDiv.hasChildNodes()) {
		mainDiv.removeChild(mainDiv.firstChild);
	}
	console.log("clean UPP!!");
}

function finalize() {
	cleanUpTheLayout();
	var mainDiv = document.getElementsByClassName('main')[0];
	var tHeader = document.createElement("p");
	tHeader.appendChild(document.createTextNode("Review your answers"));
	tHeader.setAttribute("class","pAboveTable");
	mainDiv.appendChild(tHeader);
	var table = document.createElement("table");
	// table.border='1px';
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var heading = ["Questions", "Your results", "Correct option"];
	
	for (var i = 0 ; i < heading.length ; i++) {
		var th = document.createElement("th");
		th.width = '200px';
		th.appendChild(document.createTextNode(heading[i]));
		tr.appendChild(th);
		console.log(tr);
	}

	for (var i = 0 ; i < quizQuestions.length; i++) {
			
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.appendChild(document.createTextNode("Question " + (i+1)));
			td.setAttribute("class","questionCol");
			tr.appendChild(td);
			var td = document.createElement('td');
			
			var answer = quizQuestions[i].replied ? (
				td.className = "correctCol",
				"Correct"
				) : (
				td.className = "wrongCol",
				"Incorrect"
				);
			
			td.appendChild(document.createTextNode(answer));
			tr.appendChild(td);
			var td = document.createElement('td');
			if (!quizQuestions[i].replied) {
				var correctAns = quizQuestions[i].variants[quizQuestions[i].answer];
				td.appendChild(document.createTextNode(correctAns));
				td.setAttribute("class","correctCol");
			}
			tr.appendChild(td);
			
			table.appendChild(tr);

	}
	
	mainDiv.appendChild(table);
	var trAll = document.getElementsByTagName("tr");
	console.log(trAll);
	for (var i = 1; i < trAll.length; i++) {
		trAll[i].onclick = function () {
				returnToQuestion(i);
			};
	}
	// var head2 = document.createElement("th");
	// head2.appendChild(document.createTextNode("Your Result"));
	// tr.appendChild(head2);
	// document.body.appendChild(table);
}

function createQuestionLayout() {

}

function returnToQuestion(numOfQuestion) {
	console.log(numOfQuestion);
	if (quizQuestions[numOfQuestion-1].enabled) {
		if (quizQuestions[numOfQuestion-1].replied) {
			cleanUpTheLayout();
			var mainDiv = document.getElementsByClassName('main')[0];
			
		}
	}
}


// function enableLiOnClickEvents() {
// 	for (var i=0; i < liTags.length; i++) {
// 		// console.log(liTags[i]);
// 		liTags[i].onclick = "";
// 	}
// }

