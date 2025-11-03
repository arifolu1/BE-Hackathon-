import "./App.css";

import { useState } from "react";
import MealPlan from "./MealPlan";
import RecipeDetails from "./RecipeDetails";

function App() {
  const [selectedId, setSelectedId] = useState(null);

  // If a recipe is selected, show its details.
  if (selectedId) {
    return <RecipeDetails id={selectedId} onBack={() => setSelectedId(null)} />;
  }

  // Otherwise, show the meal plan.
  return (
    <div>
      <h1>Meal Plan App</h1>
      <p>Welcome! Select a Diet Type to get Started.</p>
      <MealPlan onSelect={setSelectedId} />
    </div>
  );
}

export default App;

  


