import { useCallback, useState } from 'react';

import QUESTIONS from '../questions.js';
import { Question } from './Question.jsx';
import quizCompleteImg from '../assets/quiz-complete.png';

export const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; // can't exceed the number of questions

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
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
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
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
