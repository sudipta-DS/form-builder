import React from "react";

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

export default CategorizeEditor;
