import logoImg from '../assets/quiz-logo.png';

export const Header = () => {
  return (
    <header>
      <img src={logoImg} alt="logo" />
      <h1>React Quiz</h1>
    </header>
  )
}