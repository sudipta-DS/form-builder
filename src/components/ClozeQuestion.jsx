import React from "react";

function ClozeEditor({ question, onChange }) {
  return (
    <div className="mb-4">
      <h3>Cloze Question</h3>
      <label>Sentence (use [__] for blanks):</label>
      <input
        type="text"
        value={question.sentence}
        onChange={(e) => onChange({ sentence: e.target.value })}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
export default ClozeEditor;
