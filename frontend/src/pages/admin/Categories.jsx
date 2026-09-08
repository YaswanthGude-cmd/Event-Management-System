import { useState } from "react";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Technology",
      description: "Technology related events",
      events: 12,
    },
    {
      id: 2,
      name: "Coding",
      description: "Programming and coding events",
      events: 8,
    },
    {
      id: 3,
      name: "Workshop",
      description: "Hands-on learning workshops",
      events: 10,
    },
    {
      id: 4,
      name: "Seminar",
      description: "Educational seminars",
      events: 7,
    },
    {
      id: 5,
      name: "Cultural",
      description: "Cultural and entertainment events",
      events: 5,
    },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (!newCategory.trim()) return;

    setCategories([
      ...categories,
      {
        id: categories.length + 1,
        name: newCategory,
        description: "New event category",
        events: 0,
      },
    ]);

    setNewCategory("");
  };

  return (
    <div className="categories-page">

      <div className="admin-page-header">
        <div>
          <h1>Categories</h1>

          <p>
            Create and manage event categories.
          </p>
        </div>
      </div>


      <div className="category-add-card">

        <input
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button onClick={addCategory}>
          Add Category
        </button>

      </div>


      <div className="categories-grid">

        {categories.map((category) => (
          <div
            className="category-card"
            key={category.id}
          >

            <div className="category-card-top">

              <div className="category-icon">
                {category.name.charAt(0)}
              </div>

              <button className="category-delete">
                ×
              </button>

            </div>


            <h3>{category.name}</h3>

            <p>{category.description}</p>

            <span>
              {category.events} Events
            </span>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Categories;