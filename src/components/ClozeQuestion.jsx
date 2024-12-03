import React, { useState } from "react";

function ClozeQuestion({ onSave }) {
  const [sentence, setSentence] = useState("");

  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="font-bold mb-2">Cloze Question</h3>
      <textarea
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Type your sentence with blanks marked as [__]"
      />
    </div>
  );
}

export default ClozeQuestion;
