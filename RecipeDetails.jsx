import { RECIPES } from "./data/recipes";

export default function RecipeDetails({ id, onBack }) {
  const recipe = RECIPES.find(r => r.id === id);

  if (!recipe) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 16,}}>
        <button onClick={onBack}>← Back</button>
        <p>Recipe not found.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <button onClick={onBack} style={{ marginBottom: 12 }}>← Back</button>

      <h2>{recipe.title}</h2>
      <p style={{ opacity: 0.8 }}>
        {recipe.time} min • serves {recipe.servings}
      </p>

      <section>
        <h3>Ingredients</h3>
        <ul style={{ paddingLeft: 36, borderBlockColor:"black" }}>
          {recipe.ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>


      <section>
        <h3>Steps</h3>
        <ol style={{ paddingLeft: 18 }}>
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
