// src/data/recipes.js
export const CATEGORIES = [
  "all",
  "vegan",
  "vegetarian",
  "anti-inflammatory",
  "high-protein",
];

export const RECIPES = [
  // ——— Vegan ———
  {
    id: "vegan-buddha-bowl",
    title: "Vegan Buddha Bowl 🥗",
    time: 25,
    servings: 2,
    category: "vegan",
    ingredients: [
      "1 cup quinoa",
      "1 cup chickpeas (drained)",
      "1 avocado (sliced)",
      "2 cups mixed greens",
      "Lemon-tahini dressing",
      "Salt & pepper"
    ],
    steps: [
      "Cook quinoa per package.",
      "Assemble greens, quinoa, chickpeas, avocado.",
      "Drizzle with lemon-tahini dressing; season to taste."
    ],
    tags: ["vegan", "fiber"]
  },
  {
    id: "roasted-veggie-pasta",
    title: "Roasted Veggie Pasta 🍝",
    time: 25,
    servings: 3,
    category: "vegan",
    ingredients: [
      "8 oz pasta",
      "1 zucchini (sliced)",
      "1 bell pepper (sliced)",
      "2 tbsp olive oil",
      "Salt, pepper, garlic"
    ],
    steps: [
      "Roast veggies 12–15 min at 425°F.",
      "Boil pasta; drain.",
      "Toss pasta with roasted veggies and olive oil."
    ],
    tags: ["vegan"]
  },

  // ——— Vegetarian ———
  {
    id: "caprese-bowl",
    title: "Caprese Grain Bowl 🍅",
    time: 20,
    servings: 2,
    category: "vegetarian",
    ingredients: [
      "1 cup cooked farro or quinoa",
      "1 cup cherry tomatoes (halved)",
      "4 oz fresh mozzarella (cubed)",
      "Fresh basil",
      "Balsamic glaze, olive oil, salt"
    ],
    steps: [
      "Combine grains, tomatoes, mozzarella, and basil.",
      "Drizzle with olive oil and balsamic glaze; season."
    ],
    tags: ["vegetarian"]
  },
  {
    id: "spinach-feta-omelet",
    title: "Spinach & Feta Omelet 🥚",
    time: 12,
    servings: 1,
    category: "vegetarian",
    ingredients: [
      "2–3 eggs",
      "1 cup spinach",
      "2 tbsp feta",
      "1 tsp olive oil",
      "Salt & pepper"
    ],
    steps: [
      "Whisk eggs; season.",
      "Sauté spinach in oil; add eggs.",
      "Sprinkle feta; fold and finish cooking."
    ],
    tags: ["vegetarian", "quick"]
  },

  // ——— Anti-inflammatory ———
  {
    id: "citrus-chicken-bowl",
    title: "Citrus Chicken Bowl 🍋",
    time: 30,
    servings: 2,
    category: "anti-inflammatory",
    ingredients: [
      "2 chicken breasts",
      "1 cup brown rice",
      "1 orange, zested",
      "1 tbsp olive oil",
      "Salt & pepper"
    ],
    steps: [
      "Cook rice per package.",
      "Season chicken; pan-sear 6–7 min per side.",
      "Toss with zest and oil; serve over rice."
    ],
    tags: ["anti-inflammatory", "high-protein"]
  },
  {
    id: "salmon-turmeric-bowl",
    title: "Turmeric Salmon Bowl 🐟",
    time: 22,
    servings: 2,
    category: "anti-inflammatory",
    ingredients: [
      "2 salmon fillets",
      "1 tsp turmeric + 1/2 tsp black pepper",
      "1 tbsp olive oil",
      "1 cup cooked rice or cauliflower rice",
      "Steamed broccoli"
    ],
    steps: [
      "Season salmon with turmeric, pepper, salt.",
      "Pan-sear 3–4 min/side or bake at 400°F for 10–12 min.",
      "Serve with rice and broccoli; drizzle olive oil."
    ],
    tags: ["anti-inflammatory", "omega-3"]
  },

  // ——— High-protein ———
  {
    id: "chicken-quinoa-bowl",
    title: "Chicken & Quinoa Power Bowl 💪",
    time: 28,
    servings: 2,
    category: "high-protein",
    ingredients: [
      "2 chicken thighs (boneless)",
      "1 cup quinoa",
      "1/2 cup black beans (rinsed)",
      "Salsa or pico de gallo",
      "Lime, salt, pepper"
    ],
    steps: [
      "Cook quinoa; season chicken and pan-sear until done.",
      "Combine quinoa, sliced chicken, beans; top with salsa and lime."
    ],
    tags: ["high-protein", "gluten-free"]
  },
  {
    id: "tofu-stir-fry",
    title: "Tofu Veggie Stir-fry 🍜",
    time: 18,
    servings: 2,
    category: "high-protein",
    ingredients: [
      "14 oz firm tofu (pressed, cubed)",
      "2 cups mixed stir-fry veggies",
      "2 tbsp soy sauce (or tamari)",
      "1 tbsp sesame oil",
      "Garlic & ginger (optional)"
    ],
    steps: [
      "Sear tofu until golden; set aside.",
      "Stir-fry veggies; add soy sauce and aromatics.",
      "Return tofu, toss, and serve with rice."
    ],
    tags: ["high-protein", "vegan option"]
  }
];

