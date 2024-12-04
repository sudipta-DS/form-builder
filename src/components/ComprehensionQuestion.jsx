import React from "react";

function ComprehensionEditor({ question, onChange }) {
  const handlePassageChange = (e) =>
    onChange({ ...question, passage: e.target.value });
  const handleQuestionsChange = (e) =>
    onChange({ ...question, questions: e.target.value.split("\n") });

  return (
    <div className="mb-4">
      <h3>Comprehension Question</h3>
      <label>Passage:</label>
      <textarea
        value={question.passage}
        onChange={handlePassageChange}
        className="border p-2 rounded w-full"
      />
      <label>Questions (newline-separated):</label>
      <textarea
        value={question.questions.join("\n")}
        onChange={handleQuestionsChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
export default ComprehensionEditor;
