import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  // all recipes in one spot
  const recipes = [
    {
      id: 1,
      name: "Honey Garlic Salmon",
      category: "High Protein",
      time: "25 min",
      calories: "420 kcal",
      ingredients: [
        "2 salmon fillets",
        "2 tbsp honey",
        "2 tbsp soy sauce",
        "2 cloves garlic",
        "1 tbsp olive oil",
      ],
      steps: [
        "Season salmon with salt and pepper.",
        "Sear in a pan with olive oil.",
        "Mix honey, soy sauce, and garlic.",
        "Pour over salmon and cook until it’s glazed.",
      ],
    },
    {
      id: 2,
      name: "Chicken Quinoa Bowl",
      category: "High Protein",
      time: "30 min",
      calories: "480 kcal",
      ingredients: [
        "1 cup cooked quinoa",
        "Grilled chicken breast",
        "Steamed broccoli",
        "Lemon dressing",
      ],
      steps: [
        "Cook quinoa.",
        "Slice chicken.",
        "Add quinoa, broccoli, and chicken to a bowl.",
        "Drizzle with dressing.",
      ],
    },
    {
      id: 3,
      name: "Greek Yogurt Parfait",
      category: "High Protein",
      time: "10 min",
      calories: "310 kcal",
      ingredients: ["1 cup Greek yogurt", "Berries", "Granola", "Honey"],
      steps: ["Layer yogurt and berries.", "Top with granola.", "Finish with honey."],
    },
    {
      id: 4,
      name: "Veggie Power Bowl",
      category: "Vegetarian",
      time: "20 min",
      calories: "360 kcal",
      ingredients: ["Cooked quinoa", "Roasted vegetables", "Avocado", "Tahini sauce"],
      steps: ["Cook quinoa.", "Add veggies and avocado.", "Drizzle tahini on top."],
    },
    {
      id: 5,
      name: "Pesto Pasta with Tomatoes",
      category: "Vegetarian",
      time: "18 min",
      calories: "390 kcal",
      ingredients: ["Pasta", "Basil pesto", "Cherry tomatoes", "Parmesan"],
      steps: [
        "Boil pasta.",
        "Toss with pesto.",
        "Add tomatoes.",
        "Serve with parmesan.",
      ],
    },
    {
      id: 6,
      name: "Chickpea & Spinach Curry",
      category: "Vegan",
      time: "28 min",
      calories: "340 kcal",
      ingredients: [
        "1 can chickpeas",
        "Fresh spinach",
        "1 can coconut milk",
        "Curry powder",
        "Onion + garlic",
      ],
      steps: [
        "Cook onion and garlic.",
        "Add chickpeas and curry.",
        "Pour in coconut milk.",
        "Stir in spinach at the end.",
      ],
    },
    {
      id: 7,
      name: "Avocado Toast Trio",
      category: "Vegan",
      time: "12 min",
      calories: "280 kcal",
      ingredients: ["2 slices sourdough", "1 avocado", "Lemon", "Cherry tomatoes"],
      steps: [
        "Toast bread.",
        "Mash avocado with lemon, salt, pepper.",
        "Spread and top with tomatoes.",
      ],
    },
    {
      id: 8,
      name: "Roasted Veggie Sheet Pan",
      category: "Vegan",
      time: "30 min",
      calories: "300 kcal",
      ingredients: [
        "Carrots, zucchini, bell peppers",
        "Olive oil",
        "Garlic powder",
        "Italian seasoning",
      ],
      steps: [
        "Preheat oven to 400°F.",
        "Toss veggies with oil and seasoning.",
        "Roast 20–25 minutes.",
      ],
    },
    {
      id: 9,
      name: "Turmeric Ginger Soup",
      category: "Anti-Inflammatory",
      time: "30 min",
      calories: "310 kcal",
      ingredients: [
        "Onion, carrot, celery",
        "1 tsp turmeric",
        "Fresh ginger",
        "4 cups broth",
        "Chicken or chickpeas",
      ],
      steps: [
        "Sauté veggies.",
        "Add turmeric and ginger.",
        "Add broth and protein.",
        "Simmer 15 minutes.",
      ],
    },
    {
      id: 10,
      name: "Salmon with Greens & Berries",
      category: "Anti-Inflammatory",
      time: "22 min",
      calories: "390 kcal",
      ingredients: [
        "Salmon fillet",
        "Spring mix",
        "Blueberries",
        "Olive oil + lemon",
      ],
      steps: [
        "Cook salmon in a pan.",
        "Toss greens with berries.",
        "Add salmon on top.",
        "Drizzle olive oil and lemon.",
      ],
    },
  ];

  const [selected, setSelected] = useState(recipes[0]);

  // colors for the little category pill
  const categoryColor =
    {
      "High Protein": "rgba(81, 180, 255, 0.35)",
      Vegetarian: "rgba(255, 214, 111, 0.35)",
      Vegan: "rgba(159, 244, 175, 0.3)",
      "Anti-Inflammatory": "rgba(247, 173, 255, 0.33)",
    }[selected.category] || "rgba(255,255,255,0.18)";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "min(1100px, 100%)",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          padding: "1.4rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <header>
          <h1 style={{ color: "#fff", marginBottom: 4 }}>Meal Planner</h1>
          <p style={{ color: "rgba(255,255,255,0.75)" }}>
            Pick a recipe to see ingredients and steps.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "1rem",
            minHeight: 430,
          }}
        >
          {/* left list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              maxHeight: 450,
              overflowY: "auto",
            }}
          >
            {recipes.map((recipe) => {
              const isActive = recipe.id === selected.id;
              return (
                <button
                  key={recipe.id}
                  onClick={() => setSelected(recipe)}
                  style={{
                    background: isActive
                      ? "rgba(0,0,0,0.35)"
                      : "rgba(255,255,255,0.12)",
                    border: isActive
                      ? "1px solid rgba(255,255,255,0.33)"
                      : "1px solid transparent",
                    borderRadius: 14,
                    padding: "0.6rem 0.7rem",
                    textAlign: "left",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{recipe.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>
                    {recipe.category} • {recipe.time}
                  </div>
                </button>
              );
            })}
          </div>

          {/* right panel */}
          <div
            style={{
              background:
                "radial-gradient(circle at top, rgba(10,10,10,0.8), rgba(0,0,0,0.45))",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "1.1rem 1.25rem",
              color: "#fff",
              maxHeight: 450,
              overflowY: "auto",
              boxShadow: "0 12px 24px rgba(0,0,0,0.35)",
            }}
          >
            <span
              style={{
                background: categoryColor,
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 999,
                fontSize: 11,
                padding: "0.35rem 0.7rem",
                display: "inline-block",
                marginBottom: 6,
              }}
            >
              {selected.category}
            </span>
            <h2 style={{ marginBottom: 4 }}>{selected.name}</h2>
            <p style={{ fontSize: 12, opacity: 0.85, marginBottom: 10 }}>
              {selected.time} • {selected.calories}
            </p>

            <h3 style={{ fontSize: 14, marginBottom: 4 }}>Ingredients</h3>
            <ul style={{ paddingLeft: "1.1rem", lineHeight: 1.5, marginBottom: 12 }}>
              {selected.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: 14, marginBottom: 4 }}>Steps</h3>
            <ol style={{ paddingLeft: "1.1rem", lineHeight: 1.5 }}>
              {selected.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
