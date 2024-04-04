import { useEffect, useState } from "react";
import Description from "../Description/Description";
import Feedback from "../Feedback/Feedback";
import Options from "../Options/Options";
import Notification from "../Notification/Notification";

export default function App() {
  const [typesFeedback, setTypesFeedback] = useState(() => {
    const savedFeedbacks = localStorage.getItem("feedbacks");
    if (savedFeedbacks !== null) {
      return JSON.parse(savedFeedbacks);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem("feedbacks", JSON.stringify(typesFeedback));
  }, [typesFeedback]);

  const updateFeedback = (feedbackType) => {
    setTypesFeedback({
      ...typesFeedback,
      [feedbackType]: typesFeedback[feedbackType] + 1,
    });
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
