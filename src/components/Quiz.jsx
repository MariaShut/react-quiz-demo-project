import { useCallback, useState } from 'react';

import QUESTIONS from '../questions.js';
import { Question } from './Question.jsx';
import quizCompleteImg from '../assets/quiz-complete.png';

export const Quiz = () => {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; // can't exceed the number of questions

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setAnswerState('answered');
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      // setting timer to change color of selected answer, checking.
      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Throphy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

/* Начало викторины:

  userAnswers = [] (пустой массив)
  userAnswers.length = 0
  Показываем вопрос с индексом 0 (первый вопрос)
  
  После первого ответа:

  userAnswers = ['ответ1']
  userAnswers.length = 1
  Показываем вопрос с индексом 1 (второй вопрос) 
  
  Количество данных ответов всегда равно индексу следующего нужного вопроса:

  0 ответов → нужен вопрос #0
  1 ответ → нужен вопрос #1
  2 ответа → нужен вопрос #2 */
