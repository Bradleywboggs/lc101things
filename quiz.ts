const input = require('readline-sync')

type Question = string
type QuizAnswer = string
type CandidateAnswer = string
type PassFail = "Passed" | "Failed"
type Percentage = number

type Quiz = {
    name: string,
    questions: Array<Question>,
    answerKey: Array<QuizAnswer>,
    answers: Array<CandidateAnswer>
}


type QuizResults = {
    percentage: Percentage,
    passFail: PassFail,
    totalCorrect: number,
}

const getTotalCorrect = (quiz: Quiz): number => {
    let totalCorrect = 0
    quiz.answerKey.forEach((a, idx) => {
        if (quiz.answers[idx].toLowerCase() === a.toLowerCase()) {
            totalCorrect += 1
        }
    })
    return totalCorrect
}

const getTotalCorrect_usingReduce = (quiz: Quiz): number => quiz.answerKey.reduce((totalCorrect, answer, idx) => answer.toLowerCase() === quiz.answers[idx].toLowerCase() ? totalCorrect + 1 : totalCorrect, 0)
// {
//     return quiz.answerKey.reduce((totalCorrect, answer, idx) => {
//         if (answer.toLowerCase() === quiz.answers[idx]) {
//             return totalCorrect + 1
//         } else {
//             return totalCorrect
//         }
//     }, 0)
// }

const determineQuizResults = (quiz: Quiz): QuizResults => {
    
    const totalCorrect = getTotalCorrect(quiz)
    const percentage = totalCorrect / quiz.questions.length * 100
    const passFail = percentage >= 70 ? "Passed" : "Failed"
    
    return {
        percentage: percentage,
        totalCorrect: totalCorrect,
        passFail: passFail,
    }
}

const getName_Input= (): string => input.question("Enter your Name.")

const getCandidateAnswers_InputOutput = (questions: Array<Question>): Array<CandidateAnswer> => {
    console.log("Please answer the following questions: ")
    return questions.map(q => {
        return input.question(q)}
    )
    // const answers: Array<CandidateAnswer> = []
    // questions.forEach(q => answers.push(input.question(q)))
    // return answers
    
}

const displayAnswerComparison_Output = (quiz: Quiz): void => {
    console.log(`Candidate Name: ${quiz.name}`)
    quiz.questions.forEach((q, idx) => {
        console.log(
            `Question ${idx + 1}): ${q} 
            Your Response: ${quiz.answers[idx]}
            Correct Answer ${quiz.answerKey[idx]}`
        )})
    }

    const displayQuizResult_Output = (result: QuizResults): void => {
    console.log(
        `>>> Overall Grade: ${result.percentage}%  (${result.totalCorrect} of 5 responses correct)<<<
         >>> Status: ${result.passFail} <<<`
    )
}


const runProgram__ = (): void => {
    const questions = [
        "Who was the first American woman in space? ",
        "True or false: 5 kilometer == 5000 meters? ",
        "(5 + 3)/2 * 10 = ? ",
        "Given the array [8, 'orbit', 'Trajectory', 45], what entry is at idnex 2? ",
        "What is the minimum crew size for the ISS? "
    ];
    const answerKey = ["Sally Ride", "true", "40", "Trajectory", "3"];  
    const candidateName = getName_Input()
    const candidateAnswers = getCandidateAnswers_InputOutput(questions)

    const quiz = {
        name: candidateName,
        questions: questions,
        answerKey: answerKey,
        answers: candidateAnswers
    }
    const quizResults = determineQuizResults(quiz)
    
    displayAnswerComparison_Output(quiz)
    displayQuizResult_Output(quizResults)
}

runProgram__()