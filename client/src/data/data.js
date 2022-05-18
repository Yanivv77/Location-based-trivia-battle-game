import { v4 as uuid } from "uuid";

export const game = {
  invitedPlayers: [
    { id: 676767, name: "Yaniv", email: "yaniv@mail.com" },
    { id: 676768, name: "Sharon", email: "sharon@mail.com" },
  ],

  isActive: false,
  isFinished: false,
  questions: [],
  currentQuestionNumber: 1,
};

export const questions = [
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: 1, text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: 2, text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: 3, text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: 4, text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: "A", text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: "B", text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: "C", text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: "D", text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: 1, text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: 2, text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: 3, text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: 4, text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: 1, text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: 2, text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: 3, text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: 4, text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: 1, text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: 2, text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: 3, text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: 4, text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: 1, text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: 2, text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: 3, text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: 4, text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: 1, text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: 2, text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: 3, text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: 4, text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: 1, text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: 2, text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: 3, text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: 4, text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: 1, text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: 2, text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: 3, text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: 4, text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
  {
    category: "Geography",
    location: {
      " country": "Israel",
      " place": "Kotel Maaravi",
    },
    extra: {
      pic: null,
      video: null,
      sound: null,
    },
    statistics: {
      total: { " correctAnswers": 100, notCorrectAnswers: 30 },
      perAnswer: {
        1: 100,
        2: 20,
        3: 10,
        4: 10,
      },
    },
    type: "multiple",
    difficulty: "easy",
    question: "The body of the Egyptian Sphinx was based on which animal?",
    answers: [
      { id: 1, text: "Lion", isCorrect: true, falsyLevel: "1" },
      { id: 2, text: "Bull", isCorrect: false, falsyLevel: "1" },
      { id: 3, text: "Horse", isCorrect: false, falsyLevel: "1" },
      { id: 4, text: "Dog", isCorrect: false, falsyLevel: "1" },
    ],
  },
];
