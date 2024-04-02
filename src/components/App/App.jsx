import { useState } from "react";
import Description from "../Description/Description";
import Feedback from "../Feedback/Feedback";
import Options from "../Options/Options";
import Notification from "../Notification/Notification";

export default function App() {
  const [typesFeedback, setTypesFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const updateFeedback = (feedbackType) => {
    setTypesFeedback((prevTypesFeedback) => ({
      ...typesFeedback,
      [feedbackType]: prevTypesFeedback[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setTypesFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const { good, neutral, bad } = typesFeedback;
  const totalFeedback = good + neutral + bad;

  return (
    <>
      <Description />
      <Options
        onButton={updateFeedback}
        total={totalFeedback}
        reset={resetFeedback}
      />
      {totalFeedback === 0 ? (
        <Notification />
      ) : (
        <Feedback feedback={typesFeedback} total={totalFeedback} />
      )}
    </>
  );
}
