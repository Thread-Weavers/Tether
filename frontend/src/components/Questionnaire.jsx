import React, { useState } from "react";

const Questionnaire = () => {
  // Static questions and answer options
  const questions = [
  {
    question: "What kind of support do you prefer?",
    options: [
        "A. Encouragement & Motivation",
        "B. Constructive Feedback & Criticism",
        "C. Just someone to listen",
        "D. Regular reminders to stay on track"
    ]
  },
  {
    question: "How often do you want your partner to check in with you?",
    options: [
        "A. Every day",
        "B. Every other day",
        "C. Once a week",
        "D. Only when needed"
    ]
  },
  {
    question: "How would you describe your current mental health journey?",
    options: [
        "A. I'm just getting started",
        "B. I'm making slow progress",
        "C. I'm making steady progress",
        "D. I've been consistent for a long time"
    ]
  },
  {
    question: "What kind of goals are you focusing on?",
    options: [
        "A. Short-term, daily tasks",
        "B. Long-term, bigger life goals",
        "C. A mix of both",
        "D. I'm not sure yet"
    ]
  },
  {
    question: "How do you prefer to communicate?",
    options: [
        "A. Text messages",
        "B. Phone calls",
        "C. Video chats",
        "D. I don’t mind either"
    ]
  },
  {
    question: "What motivates you the most?",
    options: [
        "A. Achieving milestones",
        "B. Positive reinforcement",
        "C. Having someone to hold me accountable",
        "D. Overcoming challenges"
    ]
  },
  {
    question: "How do you handle setbacks?",
    options: [
        "A. I get discouraged easily",
        "B. I push through and try again",
        "C. I reflect and strategize before moving forward",
        "D. I seek support when I struggle"
    ]
  },
  {
    question: "What is your preferred way to stay on track?",
    options: [
        "A. Using checklists and reminders",
        "B. Talking with someone regularly",
        "C. Setting deadlines",
        "D. Reflecting on progress daily"
    ]
  },
  {
    question: "How do you like to receive feedback?",
    options: [
        "A. Direct and straightforward",
        "B. Constructive and encouraging",
        "C. I prefer soft guidance",
        "D. I don't like receiving feedback"
    ]
  },
  {
    question: "What do you value most in an accountability partner?",
    options: [
        "A. Consistency and reliability",
        "B. Empathy and understanding",
        "C. Motivation and encouragement",
        "D. Constructive feedback and honesty"
    ]
  }
];


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswerClick = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = { question: currentQuestion + 1, answer }; // Save the question number and answer (A, B, C, or D)
    setAnswers(updatedAnswers);

    // Move to next question (except q10)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Prev button
  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        alert('Your answers have been submitted!');
      } else {
        alert('Submission failed.');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div className="questionnaire-container">
      <h2>{questions[currentQuestion].question}</h2>

      <div className="options-container">
        {questions[currentQuestion].options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleAnswerClick(option.charAt(0))} // A, B, C, or D
            className={`option ${answers[currentQuestion]?.answer === option.charAt(0) ? "selected" : ""}`}
          >
            {option}
          </div>
        ))}
      </div>

      {currentQuestion > 0 && (
        <button onClick={handlePreviousClick} className="prev-button">
          Previous
        </button>
      )}

      {currentQuestion === questions.length - 1 && (
        <button onClick={handleSubmit} className="submit-button">
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default Questionnaire;
