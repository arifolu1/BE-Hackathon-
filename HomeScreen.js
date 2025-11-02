import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const [dietType, setDietType] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/meal-plan", { state: { dietType } });
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to bottom right, #001f3f, #003366)",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "40px",
          borderRadius: "20px",
          width: "80%",
          maxWidth: "500px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", fontWeight: "600" }}>
          🍴 Welcome to <span style={{ color: "#00ccff" }}>NutriPath</span>
        </h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "30px", color: "#cce7ff" }}>
          Choose your diet type and let’s plan your meals for a healthier you!
        </p>

        <select
          value={dietType}
          onChange={(e) => setDietType(e.target.value)}
          style={{
            padding: "12px 15px",
            borderRadius: "10px",
            border: "none",
            width: "100%",
            fontSize: "1rem",
            marginBottom: "20px",
            outline: "none",
          }}
        >
          <option value="">Select a diet type</option>
          <option value="Keto">Keto</option>
          <option value="Vegan">Vegan</option>
          <option value="Paleo">Paleo</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Anti-inflammatory">Anti-inflammatory</option>
        </select>

        <button
          onClick={handleNavigate}
          disabled={!dietType}
          style={{
            backgroundColor: dietType ? "#00ccff" : "#666",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "10px",
            cursor: dietType ? "pointer" : "not-allowed",
            fontSize: "1.1rem",
            transition: "0.3s",
          }}
        >
          {dietType ? `Start ${dietType} Plan` : "Select a Diet Type"}
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;

