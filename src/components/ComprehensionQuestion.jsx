import React, { useState } from "react";

function ComprehensionQuestion({ onSave }) {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState([""]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="font-bold mb-2">Comprehension Question</h3>
      <textarea
        value={passage}
        onChange={(e) => setPassage(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Type the passage"
      />

      <h4 className="mt-4">Questions</h4>
      {questions.map((question, index) => (
        <input
          key={index}
          type="text"
          value={question}
          onChange={(e) => handleQuestionChange(index, e.target.value)}
          className="block mb-2 p-2 border rounded"
          placeholder={`Question ${index + 1}`}
        />
      ))}
      <button onClick={() => setQuestions([...questions, ""])}>
        Add Question
      </button>
    </div>
  );
}

export default ComprehensionQuestion;
