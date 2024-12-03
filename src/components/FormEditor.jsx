// import React, { useState } from "react";
// import CategorizeQuestion from "./CategorizeQuestion";
// import ClozeQuestion from "./ClozeQuestion";
// import ComprehensionQuestion from "./ComprehensionQuestion";
import React, { useState } from "react";
import axios from "axios";

// function FormEditor() {
//   const [questions, setQuestions] = useState([]);

//   const addQuestion = (type) => {
//     setQuestions([...questions, { type, id: Date.now() }]);
//   };

//   const renderQuestionComponent = (question, index) => {
//     switch (question.type) {
//       case "categorize":
//         return <CategorizeQuestion key={question.id} />;
//       case "cloze":
//         return <ClozeQuestion key={question.id} />;
//       case "comprehension":
//         return <ComprehensionQuestion key={question.id} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Form Editor</h1>
//       <button
//         onClick={() => addQuestion("categorize")}
//         className="mr-2 bg-blue-500 text-white p-2 rounded"
//       >
//         Add Categorize Question
//       </button>
//       <button
//         onClick={() => addQuestion("cloze")}
//         className="mr-2 bg-green-500 text-white p-2 rounded"
//       >
//         Add Cloze Question
//       </button>
//       <button
//         onClick={() => addQuestion("comprehension")}
//         className="bg-purple-500 text-white p-2 rounded"
//       >
//         Add Comprehension Question
//       </button>

//       <div className="mt-6">
//         {questions.map((question, index) =>
//           renderQuestionComponent(question, index)
//         )}
//       </div>
//     </div>
//   );
// }

// export default FormEditor;

// import React, { useState } from "react";
// import axios from "axios";

// function FormEditor() {
//   const [title, setTitle] = useState("");
//   const [headerImage, setHeaderImage] = useState("");
//   const [questions, setQuestions] = useState([]);

//   const addQuestion = (type) => {
//     const newQuestion = {
//       type: type,
//       data: getInitialQuestionData(type),
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const getInitialQuestionData = (type) => {
//     switch (type) {
//       case "categorize":
//         return { items: ["Item 1"], categories: ["Category 1"] };
//       case "cloze":
//         return { sentence: "The capital of France is [__]." };
//       case "comprehension":
//         return {
//           passage: "Sample passage",
//           questions: ["What is the passage about?"],
//         };
//       default:
//         return {};
//     }
//   };

//   const handleQuestionChange = (index, newData) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].data = newData;
//     setQuestions(updatedQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/forms/create", {
//         title,
//         headerImage,
//         questions,
//       });
//       alert("Form created successfully! Form ID: " + response.data.formId);
//     } catch (error) {
//       console.error("Failed to create form:", error);
//       alert("Failed to create form. Check the console for more details.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Form Editor</h1>

//       {/* Form Title */}
//       <label className="block mb-2">Form Title:</label>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="border p-2 rounded w-full mb-4"
//       />

//       {/* Header Image */}
//       <label className="block mb-2">Header Image URL:</label>
//       <input
//         type="text"
//         value={headerImage}
//         onChange={(e) => setHeaderImage(e.target.value)}
//         className="border p-2 rounded w-full mb-4"
//       />

//       {/* Question List */}
//       {questions.map((question, index) => (
//         <QuestionEditor
//           key={index}
//           question={question}
//           onChange={(newData) => handleQuestionChange(index, newData)}
//         />
//       ))}

//       {/* Add Question Buttons */}
//       <div className="mb-4">
//         <button
//           onClick={() => addQuestion("categorize")}
//           className="bg-green-500 text-white p-2 rounded mr-2"
//         >
//           Add Categorize Question
//         </button>
//         <button
//           onClick={() => addQuestion("cloze")}
//           className="bg-blue-500 text-white p-2 rounded mr-2"
//         >
//           Add Cloze Question
//         </button>
//         <button
//           onClick={() => addQuestion("comprehension")}
//           className="bg-purple-500 text-white p-2 rounded"
//         >
//           Add Comprehension Question
//         </button>
//       </div>

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-700 text-white p-2 rounded"
//       >
//         Submit Form
//       </button>
//     </div>
//   );
// }

function QuestionEditor({ question, onChange }) {
  switch (question.type) {
    case "categorize":
      return <CategorizeEditor question={question.data} onChange={onChange} />;
    case "cloze":
      return <ClozeEditor question={question.data} onChange={onChange} />;
    case "comprehension":
      return (
        <ComprehensionEditor question={question.data} onChange={onChange} />
      );
    default:
      return null;
  }
}

// Render Categorize Question Editor
function CategorizeEditor({ question, onChange }) {
  const handleItemsChange = (e) =>
    onChange({ ...question, items: e.target.value.split(",") });
  const handleCategoriesChange = (e) =>
    onChange({ ...question, categories: e.target.value.split(",") });

  return (
    <div className="mb-4">
      <h3>Categorize Question</h3>
      <label>Items (comma-separated):</label>
      <input
        type="text"
        value={question.items.join(",")}
        onChange={handleItemsChange}
        className="border p-2 rounded w-full"
      />
      <label>Categories (comma-separated):</label>
      <input
        type="text"
        value={question.categories.join(",")}
        onChange={handleCategoriesChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}

// Render Cloze Question Editor
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

// Render Comprehension Question Editor
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

// export default FormEditor;

export default function FormEditor() {
  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [previewLink, setPreviewLink] = useState("");

  const addQuestion = (type) => {
    const newQuestion = {
      type: type,
      data: getInitialQuestionData(type),
    };
    setQuestions([...questions, newQuestion]);
  };

  const getInitialQuestionData = (type) => {
    switch (type) {
      case "categorize":
        return { items: ["Item 1"], categories: ["Category 1"] };
      case "cloze":
        return { sentence: "The capital of France is [__]." };
      case "comprehension":
        return {
          passage: "Sample passage",
          questions: ["What is the passage about?"],
        };
      default:
        return {};
    }
  };

  const handleQuestionChange = (index, newData) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].data = newData;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/forms/create", {
        title,
        headerImage,
        questions,
      });
      setPreviewLink(
        `http://localhost:3000/form/preview/${response.data.formId}`
      );
      alert("Form created successfully!");
    } catch (error) {
      console.error("Failed to create form:", error);
      alert("Failed to create form. Check the console for more details.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Form Editor</h1>

      {/* Form Title */}
      <label className="block mb-2">Form Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Header Image */}
      <label className="block mb-2">Header Image URL:</label>
      <input
        type="text"
        value={headerImage}
        onChange={(e) => setHeaderImage(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Question List */}
      {questions.map((question, index) => (
        <QuestionEditor
          key={index}
          question={question}
          onChange={(newData) => handleQuestionChange(index, newData)}
        />
      ))}

      {/* Add Question Buttons */}
      <div className="mb-4">
        <button
          onClick={() => addQuestion("categorize")}
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          Add Categorize Question
        </button>
        <button
          onClick={() => addQuestion("cloze")}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Add Cloze Question
        </button>
        <button
          onClick={() => addQuestion("comprehension")}
          className="bg-purple-500 text-white p-2 rounded"
        >
          Add Comprehension Question
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-700 text-white p-2 rounded"
      >
        Submit Form
      </button>

      {/* Preview Link */}
      {previewLink && (
        <div className="mt-4">
          <a
            href={previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Preview and Fill the Form
          </a>
        </div>
      )}
    </div>
  );
}
