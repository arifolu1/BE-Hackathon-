import React, { useState } from "react";

// a few shared styles so it’s not messy below
const layout = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    minHeight: "100vh",
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  shell: {
    width: "min(1100px, 100%)",
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 18,
    padding: "1.4rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  body: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "1rem",
    minHeight: 430,
  },
};

const chipColors = {
  "High Protein": "rgba(81, 180, 255, 0.35)",
  Vegetarian: "rgba(255, 214, 111, 0.35)",
  Vegan: "rgba(159, 244, 175, 0.3)",
  "Anti-Inflammatory": "rgba(247, 173, 255, 0.33)",
};

export default function App() {
  const items = [
    // high protein
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
        "Season salmon.",
        "Sear in olive oil.",
        "Whisk honey, soy, garlic.",
        "Pour over and cook until sticky.",
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
        "1 chicken breast (grilled)",
        "Steamed broccoli",
        "Lemon dressing",
      ],
      steps: [
        "Cook quinoa.",
        "Slice chicken.",
        "Layer quinoa, broccoli, chicken.",
        "Drizzle dressing.",
      ],
    },
    {
      id: 3,
      name: "Greek Yogurt Parfait",
      category: "High Protein",
      time: "10 min",
      calories: "310 kcal",
      ingredients: ["Greek yogurt", "Berries", "Granola", "Honey"],
      steps: ["Layer yogurt + berries.", "Top with granola.", "Finish with honey."],
    },
    // vegetarian
    {
      id: 4,
      name: "Veggie Power Bowl",
      category: "Vegetarian",
      time: "20 min",
      calories: "360 kcal",
      ingredients: ["Quinoa", "Roasted veg", "Avocado", "Tahini lemon"],
      steps: ["Cook quinoa.", "Add veg + avocado.", "Drizzle sauce."],
    },
    {
      id: 5,
      name: "Pesto Pasta & Tomatoes",
      category: "Vegetarian",
      time: "18 min",
      calories: "390 kcal",
      ingredients: ["Pasta", "Basil pesto", "Cherry tomatoes", "Parmesan"],
      steps: [
        "Boil pasta.",
        "Toss with pesto.",
        "Add tomatoes.",
        "Serve with parm.",
      ],
    },
    // vegan
    {
      id: 6,
      name: "Chickpea Spinach Curry",
      category: "Vegan",
      time: "28 min",
      calories: "340 kcal",
      ingredients: [
        "1 can chickpeas",
        "Spinach",
        "Coconut milk",
        "Curry powder",
        "Onion + garlic",
      ],
      steps: [
        "Sauté onion/garlic.",
        "Add chickpeas + curry.",
        "Pour coconut milk.",
        "Stir in spinach.",
      ],
    },
    {
      id: 7,
      name: "Avocado Toast Trio",
      category: "Vegan",
      time: "12 min",
      calories: "280 kcal",
      ingredients: ["Sourdough", "Avocado", "Lemon", "Tomatoes"],
      steps: [
        "Toast bread.",
        "Mash avo w/ lemon, salt.",
        "Spread and top with tomatoes.",
      ],
    },
    {
      id: 8,
      name: "Roasted Sheet Pan Veg",
      category: "Vegan",
      time: "30 min",
      calories: "300 kcal",
      ingredients: ["Mixed vegetables", "Olive oil", "Garlic powder", "Herbs"],
      steps: [
        "Heat oven to 400°F.",
        "Toss veg with oil + seasoning.",
        "Roast 20–25 min.",
      ],
    },
    // anti-inflammatory
    {
      id: 9,
      name: "Turmeric Ginger Soup",
      category: "Anti-Inflammatory",
      time: "30 min",
      calories: "310 kcal",
      ingredients: [
        "Onion, carrot, celery",
        "Turmeric",
        "Fresh ginger",
        "Broth",
        "Chicken or chickpeas",
      ],
      steps: [
        "Sauté veggies.",
        "Add turmeric + ginger.",
        "Add broth + protein.",
        "Simmer 15 min.",
      ],
    },
    {
      id: 10,
      name: "Salmon + Greens + Berries",
      category: "Anti-Inflammatory",
      time: "22 min",
      calories: "390 kcal",
      ingredients: ["Salmon", "Spring mix", "Blueberries", "Lemon olive oil"],
      steps: [
        "Pan-sear salmon.",
        "Toss greens with berries.",
        "Top with salmon.",
        "Drizzle dressing.",
      ],
    },
  ];

  const [active, setActive] = useState(items[0]);

  return (
    <div style={layout.page}>
      <div style={layout.overlay}>
        <div style={layout.shell}>
          <header>
            <h1 style={{ color: "#fff", marginBottom: 4 }}>Meal Planner</h1>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              Tap a meal to see ingredients and steps.
            </p>
          </header>

          <div style={layout.body}>
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
              {items.map((item) => {
                const isActive = active.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActive(item)}
                    style={{
                      background: isActive
                        ? "rgba(0,0,0,0.33)"
                        : "rgba(255,255,255,0.13)",
                      border: isActive
                        ? "1px solid rgba(255,255,255,0.33)"
                        : "1px solid transparent",
                      borderRadius: 14,
                      padding: "0.55rem 0.65rem",
                      textAlign: "left",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 11, opacity: 0.8 }}>
                      {item.category} • {item.time}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* right panel */}
            <div
              style={{
                background:
                  "radial-gradient(circle at top, rgba(10,10,10,0.78), rgba(0,0,0,0.45))",
                border: "1px solid rgba(255,255,255,0.11)",
                borderRadius: 16,
                padding: "1.1rem 1.3rem",
                color: "#fff",
                maxHeight: 450,
                overflowY: "auto",
                boxShadow: "0 12px 24px rgba(0,0,0,0.35)",
              }}
            >
              <span
                style={{
                    background:
                      chipColors[active.category] || "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: 999,
                    fontSize: 11,
                    padding: "0.35rem 0.7rem",
                    display: "inline-block",
                    marginBottom: 6,
                  }}
              >
                {active.category}
              </span>
              <h2 style={{ marginBottom: 4 }}>{active.name}</h2>
              <p style={{ fontSize: 12, opacity: 0.85, marginBottom: 12 }}>
                {active.time} • {active.calories}
              </p>

              <h3 style={{ fontSize: 14, marginBottom: 4 }}>Ingredients</h3>
              <ul style={{ paddingLeft: "1.1rem", lineHeight: 1.5, marginBottom: 12 }}>
                {active.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              <h3 style={{ fontSize: 14, marginBottom: 4 }}>Steps</h3>
              <ol style={{ paddingLeft: "1.1rem", lineHeight: 1.5 }}>
                {active.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


