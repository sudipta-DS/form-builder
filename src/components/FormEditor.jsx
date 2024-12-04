import CategorizeEditor from "./CategorizeQuestion";
import ClozeEditor from "./ClozeQuestion";
import ComprehensionEditor from "./ComprehensionQuestion";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

export default function FormEditor() {
  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [responseData, setResponseData] = useState("");

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
      const response = await axios.post(
        "https://form-builder-backend-c1bb.onrender.com/forms/create",
        {
          title,
          headerImage,
          questions,
        }
      );

      setResponseData(response.data.formId);
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
      {responseData && (
        <div className="mt-4">
          <Link
            to={`/form/preview/${responseData}`}
            className="text-blue-500 underline"
          >
            Preview and Fill the Form
          </Link>
        </div>
      )}
    </div>
  );
}
