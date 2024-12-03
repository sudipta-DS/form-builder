import React, { useState } from "react";

function CategorizeQuestion({ onSave }) {
  const [items, setItems] = useState([""]);
  const [categories, setCategories] = useState([""]);

  const handleItemChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  const handleCategoryChange = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = value;
    setCategories(updatedCategories);
  };

  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="font-bold mb-2">Categorize Question</h3>
      <div>
        <h4>Items</h4>
        {items.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            className="block mb-2 p-2 border rounded"
            placeholder={`Item ${index + 1}`}
          />
        ))}
        <button onClick={() => setItems([...items, ""])}>Add Item</button>
      </div>

      <div>
        <h4>Categories</h4>
        {categories.map((category, index) => (
          <input
            key={index}
            type="text"
            value={category}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
            className="block mb-2 p-2 border rounded"
            placeholder={`Category ${index + 1}`}
          />
        ))}
        <button onClick={() => setCategories([...categories, ""])}>
          Add Category
        </button>
      </div>
    </div>
  );
}

export default CategorizeQuestion;
