import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AllResponses() {
  const { id } = useParams(); // Get form ID from URL
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/forms/${id}/responses`)
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
      <h1 className="text-3xl font-bold mb-4">Responses for Form ID: {id}</h1>
      <div className="space-y-6">
        {responses.map((response, index) => (
          <div key={index} className="border rounded p-4 bg-gray-100">
            <h2 className="text-xl font-semibold">Response {index + 1}</h2>
            <ul className="list-disc pl-6">
              {Object.entries(response.responses).map(
                ([questionIndex, answer], i) => (
                  <li key={i}>
                    <strong>Question {parseInt(questionIndex) + 1}:</strong>{" "}
                    {answer}
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

export default AllResponses;
