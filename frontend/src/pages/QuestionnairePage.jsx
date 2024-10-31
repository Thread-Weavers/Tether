import React from 'react';
import Questionnaire from '../components/Questionnaire';  // Make sure the path is correct based on your folder structure
import "../styles/questionnaire.css";

const QuestionnairePage = () => {
  return (
    <div className="questionnaire-page">
      <h1>Let's get to know eachother...</h1>
      <Questionnaire />
    </div>
  );
};

export default QuestionnairePage;
