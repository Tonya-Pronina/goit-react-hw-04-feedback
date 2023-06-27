import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions.jsx';
import Statistics from './Statistics/Statistics.jsx';
import Notification from './Notification/Notification.jsx';
import Section from './Section/Section.jsx';

export const App = () => {
  const [feedback, addFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleIncrement = option => {
    addFeedback(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((total, value) => total + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();

    if (totalFeedback === 0) {
      return 0;
    }

    return Math.round((feedback.good / totalFeedback) * 100);
  };

  const optionsBtn = Object.keys(feedback);

  return (
    <div>
      <Section title="Leave your feedback">
        <FeedbackOptions options={optionsBtn} onFeedback={handleIncrement} />
      </Section>

      {countTotalFeedback() === 0 ? (
        <Notification message="Please, leave your feedback first to see statistics" />
      ) : (
        <Section title="Statistics">
          <Statistics
            {...feedback}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
    </div>
  );
};

export default App;
