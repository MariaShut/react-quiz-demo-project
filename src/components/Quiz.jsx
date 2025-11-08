import { useCallback, useState } from 'react';

import QUESTIONS from '../questions.js';
import { QuestionTimer } from './QuestionTimer.jsx';
import quizCompleteImg from '../assets/quiz-complete.png';

export const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; // can't exceed the number of questions

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Throphy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    )
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000} 
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map(answer => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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