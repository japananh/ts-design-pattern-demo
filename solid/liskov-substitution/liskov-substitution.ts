// Liskov-substitution principle: a subclass should be used wherever its base class can be used

class QuizQuestion {
    private _question: string
    private _answer1: string
    private _answer2: string
    private _answer3: string
    private _correctAns: number

    constructor(question: string, answer1: string, answer2: string, answer3: string, correctAns: number) {
        this._question = question
        this._answer1 = answer1
        this._answer2 = answer2
        this._answer3 = answer3
        this._correctAns = correctAns
    }

    public get question():string {
        return this._question
    }

    public get answer1():string {
        return this._answer1
    }

    public get answer2():string {
        return this._answer2
    }

    public get answer3():string {
        return this._answer3
    }

    public get correctAns():number {
        return this._correctAns
    }
}

class TrueFalseQuestion extends QuizQuestion {
    constructor(question) {
        super(question, "TRUE", "FALSE", null, 1);
    }
}

function formatQs(quizQuestion: QuizQuestion) {
    console.log(quizQuestion.question)
    console.log(`1. ${quizQuestion.answer1}`)
    console.log(`2. ${quizQuestion.answer2}`)
    console.log(`3. ${quizQuestion.answer3}`)
    console.log(`Correct answer: ${quizQuestion.correctAns}`)
}

let quizQs = new QuizQuestion("Which framework is using TypeScript?", "React", "Angular", "Vue-js", 3)
formatQs(quizQs)
/**
 * Which framework is using TypeScript?
 * 1. React
 * 2. Angular
 * 3. Vue-js
 * Correct answer: 3
 */

let trueFalseQs = new TrueFalseQuestion("Is Hanoi the capital city of Vietnam?")
formatQs(trueFalseQs)
/**
 * Is Hanoi the capital city of Vietnam?
 * 1. TRUE
 * 2. FALSE
 * 3. null -> Violate Liskov substitution principle because we can't use `QuizQuestion` here
 * Correct answer: 1
 */