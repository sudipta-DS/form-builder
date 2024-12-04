import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function FormPreview() {
  const { id } = useParams(); // Get form ID from URL
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Fetch form data from backend
    axios
      .get(`https://form-builder-backend-c1bb.onrender.com/forms/${id}`)
      .then((response) => {
        setForm(response.data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, [id]);

  // Handle response changes
  const handleResponseChange = (index, value) => {
    setResponses({
      ...responses,
      [index]: value,
    });
  };

  // Submit form responses
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://form-builder-backend-c1bb.onrender.com/forms/${id}/submit`,
        { responses }
      )
      .then((response) => {
        alert("Responses submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting responses:", error);
      });
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{form.title}</h1>
      {form.headerImage && (
        <img src={form.headerImage} alt="Header" className="mb-4" />
      )}

      <form onSubmit={handleSubmit}>
        {form.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <QuestionRenderer
              question={question}
              onChange={(value) => handleResponseChange(index, value)}
            />
          </div>
        ))}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      <Link to={`/forms/${id}/responses`} className="text-green-500 underline">
        View All Responses
      </Link>
    </div>
  );
}

function QuestionRenderer({ question, onChange }) {
  switch (question.type) {
    case "categorize":
      return <RenderCategorize question={question} onChange={onChange} />;
    case "cloze":
      return <RenderCloze question={question} onChange={onChange} />;
    case "comprehension":
      return <RenderComprehension question={question} onChange={onChange} />;
    default:
      return null;
  }
}

// Categorize Question Renderer
function RenderCategorize({ question, onChange }) {
  return (
    <div>
      <h3 className="font-bold mb-2">Categorize Question</h3>
      {question.data.items.map((item, index) => (
        <div key={index} className="mb-2">
          <label className="block">{item}</label>
          <input
            type="text"
            onChange={(e) => onChange({ item, category: e.target.value })}
            className="border p-2 rounded w-full"
            placeholder="Enter category"
          />
        </div>
      ))}
    </div>
  );
}

// Cloze Question Renderer
function RenderCloze({ question, onChange }) {
  return (
    <div>
      <h3 className="font-bold mb-2">Cloze Question</h3>
      <p>{question.data.sentence.replace(/\[__\]/g, "______")}</p>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Fill in the blank"
      />
    </div>
  );
}

// Comprehension Question Renderer
function RenderComprehension({ question, onChange }) {
  return (
    <div>
      <h3 className="font-bold mb-2">Comprehension Question</h3>
      <p className="mb-4">{question.data.passage}</p>
      {question.data.questions.map((q, index) => (
        <div key={index} className="mb-2">
          <label>{q}</label>
          <input
            type="text"
            onChange={(e) => onChange(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Your answer"
          />
        </div>
      ))}
    </div>
  );
}

export default FormPreview;
