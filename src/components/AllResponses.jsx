import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AllResponses() {
  const { id } = useParams(); // Get form ID from URL
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://form-builder-backend-c1bb.onrender.com/forms/${id}/responses`
      )
      .then((response) => {
        setResponses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch responses:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading responses...</div>;

  if (responses.length === 0)
    return <div>No responses found for this form.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Responses for Form: {id}</h1>
      <div className="space-y-6">
        {responses.map((response, index) => (
          <div key={index} className="border rounded p-4 bg-gray-100">
            <h2 className="text-xl font-semibold">Response {index + 1}</h2>
            <ul className="list-disc pl-6">
              {Object.entries(response.responses).map(
                ([questionIndex, answer], i) => (
                  <li key={i}>
                    <strong>Question {parseInt(questionIndex) + 1}:</strong>{" "}
                    {renderAnswer(answer)}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const renderAnswer = (answer) => {
  if (typeof answer === "string") {
    // Simple text response
    return answer;
  } else if (Array.isArray(answer)) {
    // Render array responses (multiple items or categories)
    return (
      <ul className="list-disc pl-6">
        {answer.map((item, index) => (
          <li key={index}>{renderAnswer(item)}</li>
        ))}
      </ul>
    );
  } else if (typeof answer === "object") {
    // Render object responses ({ item, category })
    return (
      <div>
        {Object.entries(answer).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>
    );
  } else {
    return "Unsupported response type";
  }
};

export default AllResponses;
