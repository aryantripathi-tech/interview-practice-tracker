// ─── VARIABLES ───────────────────────────────────────────
const appName = "Interview Practice Tracker";
let currentUser = "Aryan";

// ─── FUNCTIONS ───────────────────────────────────────────
function greetUser(name) {
    return "Welcome back, " + name + "!";
}

function calculateAge(birthYear) {
    return 2025 - birthYear;
}

// ─── IF / ELSE ───────────────────────────────────────────
function checkLogin(enteredPassword, correctPassword) {
    if (enteredPassword === correctPassword) {
        return "Login successful";
    } else {
        return "Wrong password";
    }
}

// ─── ARRAY OF OBJECTS ────────────────────────────────────
let questions = [
    { title: "Three Sum",      topic: "Hashing",   difficulty: "Easy",   company: "Google"    },
    { title: "Binary Search",  topic: "Searching", difficulty: "Medium", company: "Amazon"    },
    { title: "Merge Sort",     topic: "Sorting",   difficulty: "Hard",   company: "Microsoft" }
];

// ─── LOOP + FILTER ───────────────────────────────────────
function showHardQuestions(questions) {
    for (let question of questions) {
        if (question.difficulty === "Hard") {
            console.log(question.title + " - " + question.topic);
        }
    }
}

// ─── RUN ─────────────────────────────────────────────────
console.log(greetUser(currentUser));
console.log(calculateAge(2004));
console.log(checkLogin("hululu", "hululu"));
showHardQuestions(questions);