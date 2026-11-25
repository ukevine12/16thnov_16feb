//part 1
const students =[
    {name: "Alice", age:22, score:85},
    {name: "Bob", age:17, score:92},
    {name: "Charlie", age:25, score:45},
    {name: "David", age:19, score:78},
    {name: "Emma", age:21, score:95},
    {name: "Frank", age:16, score:88},
    {name: "Grace", age:23, score:67},
    {name: "Henry", age:20, score:100},
    {name: "Ivy", age:18, score:55},
    {name: "Jack", age:24, score:73}
];

const totalRegistered = students.length;
// use splice

for ( var i = students.length -1;i>=0; i--){
    if (students[i].age <18){
        students.splice(i,1);
    }
}

const registrationDisqualified = totalRegistered - students.length;

//part 2 

for(var i=0;i<students.length;i++){
    students[i].examscores=[];

    for(var j=0;j<3;j++){
        var randomscore=Math.floor(Math.random()*101);
        students[i].examscores.push(randomscore);

    } 
    var total=0;
    for(var j=0;j<students[i].examscores.length;j++){
        total+=students[i].examscores[j];

    }
    students[i].studentaverage=(total/3).toFixed(2);

    var bonus=0;
    var deduction=0;

    if(students[i].examscores[0]===100 && students[i].examscores[1]===100 && students[i].examscores[2]===100){
        bonus+=20;
    }
    if(students[i].examscores[0]<30 || students[i].examscores[1]<30 || students[i].examscores[2]<30){
        deduction-=15;
    }
    
    students[i].bonus =bonus;
    students[i].deduction=deduction;
    
}


//console.log(students);

const suspiciousStudents = ["Alice", "Henry", "Grace"];

// PART 3

for (var i = 0; i < students.length; i++) {

    students[i].finalscore =
        Number(students[i].studentaverage) +
        students[i].bonus +
        students[i].deduction;

    students[i].hackerPenalty = 0;

    if (suspiciousStudents.includes(students[i].name)) {

        if (students[i].name === "Alice") {
            students[i].hackerPenalty = 10;
        }
        else if (students[i].name === "Henry") {
            students[i].hackerPenalty = 20;
        }
        else if (students[i].name === "Grace") {
            students[i].hackerPenalty = 5;
        }
    }

    students[i].finalscore -= students[i].hackerPenalty;

    // TWIST 5: Limit the final score between 0 and 100

    if (students[i].finalscore > 100) {
        students[i].finalscore = 100;
    }

    if (students[i].finalscore < 0) {
        students[i].finalscore = 0;
    }
}
// part 4


function secretMission() {

    for (var i = 0; i < students.length; i++) {

        students[i].missionBonus = 0;

        var studentname = students[i].name.toLowerCase();

        if (students[i].hackerPenalty === 0) {

            if (studentname.startsWith("a")) {
                students[i].missionBonus = 10;
            }
            else if (studentname.includes("a") && studentname.includes("e")) {
                students[i].missionBonus = 15;
            }
            
            else if (studentname.includes("a")) {
                students[i].missionBonus = 5;
            }
        }

        // final score
        students[i].finalscore += students[i].missionBonus;

        // Maximum score is 100
        if (students[i].finalscore > 100) {
            students[i].finalscore = 100;
        }
    }

    return students;
}

// Calling the function
secretMission();

//part 5

function competitionRanking() {

    students.sort(function(a, b) {

       
        if (b.finalscore !== a.finalscore) {
            return b.finalscore - a.finalscore;
        }

        if (b.age !== a.age) {
            return b.age - a.age;
        }

        return a.name.localeCompare(b.name);

    });

    return students;
}

//part 6

function unexpectedBetrayal(rankedStudents) {

    var disqualifiedStudents = [];
    var remainingStudents = [];

    // Disqualify the first 3 students
    for (var i = 0; i < rankedStudents.length; i++) {

        if (i < 3) {
            rankedStudents[i].disqualified = true;
            disqualifiedStudents.push(rankedStudents[i]);
        }
        else {
            remainingStudents.push(rankedStudents[i]);
        }
    }

    console.log("===== DISQUALIFIED STUDENTS =====");

    for (var i = 0; i < disqualifiedStudents.length; i++) {
        console.log(disqualifiedStudents[i].name);

    }

    return remainingStudents;
}

//part 7


// PART 7: FINAL REPORT

function finalReport(finalRankings) {

    console.log("====================================");
    console.log("       SOLVIT ACADEMY RESULTS");
    console.log("====================================");

    var competitionDisqualified =
        students.length - finalRankings.length;

    var totalDisqualified =
        registrationDisqualified + competitionDisqualified;

    console.log("Total Registered Students:", totalRegistered);
    console.log("Eligible Students:", students.length);
    console.log("Disqualified Students:", totalDisqualified);

    if (finalRankings.length === 0) {
        console.log("No winner today!");
        return;
    }

    console.log("WINNER:", finalRankings[0].name);
    console.log("Score:", finalRankings[0].finalscore);

    if (finalRankings.length > 1) {
        console.log("SECOND PLACE:", finalRankings[1].name);
        console.log("Score:", finalRankings[1].finalscore);
    }

    if (finalRankings.length > 2) {
        console.log("THIRD PLACE:", finalRankings[2].name);
        console.log("Score:", finalRankings[2].finalscore);
    }

    // Competition summary
    var total = 0;
    var highest = finalRankings[0].finalscore;
    var lowest = finalRankings[0].finalscore;

    for (var i = 0; i < finalRankings.length; i++) {

        total += finalRankings[i].finalscore;

        if (finalRankings[i].finalscore > highest) {
            highest = finalRankings[i].finalscore;
        }

        if (finalRankings[i].finalscore < lowest) {
            lowest = finalRankings[i].finalscore;
        }
    }

    var average = total / finalRankings.length;

    console.log("====================================");
    console.log("       COMPETITION SUMMARY");
    console.log("====================================");

    console.log("Highest Score:", highest);
    console.log("Lowest Score:", lowest);
    console.log("Average Score:", average.toFixed(2));

    console.log("Congratulations to all participants!");
    console.log("====================================");
}


console.log(students);
const ranked = competitionRanking();
const finalRankings = unexpectedBetrayal(ranked);
finalReport(finalRankings);


