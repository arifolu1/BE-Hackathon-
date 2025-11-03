from __future__ import annotations
from flask import Flask, request, redirect, url_for, render_template_string
import os
import requests

app = Flask(__name__)

# -----------------------------------
# Options (value, label)
# -----------------------------------
PLAN_OPTIONS = [
    ("bulk", "Bulk"),
    ("cut", "Cut"),
    ("weight", "Weight Management"),
    ("keto", "Keto"),
    ("low_sugar", "Low Sugar"),
    ("vegan", "Vegan"),
]

# Optional: teammate’s API (not required for testing)
RECIPES_API = os.getenv("RECIPES_API", "")


# -----------------------------------
# Base Layout (HTML wrapper)
# -----------------------------------
BASE_HTML = """
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ title }}</title>
    <style>
      :root{
        --bg:#0f172a; --card:#fff; --fg:#0b132b; --muted:#6b7280;
        --brand:#22c55e; --brand-dark:#16a34a; --ring:rgba(34,197,94,.25);
        --shadow:0 20px 60px rgba(2,8,23,.25);
        --c-bulk:#0ea5e9; --c-cut:#f97316; --c-weight:#8b5cf6;
        --c-keto:#06b6d4; --c-low-sugar:#e11d48; --c-vegan:#22c55e;
      }
      *{box-sizing:border-box}
      html,body{height:100%}
      body{
        margin:0; font-family:ui-sans-serif,system-ui,"Segoe UI",Roboto,Arial;
        color:var(--fg); background:var(--bg); position:relative; overflow-y:auto;
      }
      .bg{position:fixed; inset:0;
        background:linear-gradient(180deg,rgba(15,23,42,.55),rgba(15,23,42,.75)),
        url('{{ url_for('static', filename='images/hero.jpg') }}') center/cover no-repeat fixed;
        z-index:-2; filter:saturate(1.1) contrast(1.05);
      }
      .grain{position:fixed; inset:0; background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);
        background-size:3px 3px; opacity:.25; z-index:-1;}
      .header{ text-align:center; padding:36px 16px 12px; }
      .logo{ display:inline-block; padding:8px; border-radius:16px; background:rgba(255,255,255,.85); box-shadow:var(--shadow); }
      .logo img{ display:block; width:120px; height:auto; border-radius:12px; }
      .title{ color:#fff; font-weight:800; letter-spacing:.2px; font-size:clamp(26px,4vw,38px); margin:14px 0 4px; text-shadow:0 10px 30px rgba(0,0,0,.35); }
      .subtitle{ color:rgba(255,255,255,.9); font-size:15px; text-shadow:0 6px 18px rgba(0,0,0,.35); }
      .wrap{ max-width:980px; margin:18px auto 56px; padding:0 16px; }
      .card{ background:var(--card); border:1px solid rgba(226,232,240,.6); border-radius:20px; padding:20px; box-shadow:var(--shadow); backdrop-filter:blur(6px); }
      h1{ font-size:clamp(22px,3vw,30px); margin:0 0 8px; color:#0b132b }
      p{ color:var(--muted); margin:0; }
      .grid{ display:grid; gap:14px; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); margin-top:14px; }
      .opt{ border:1px solid #e5e7eb; border-radius:14px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; background:#fff; transition:transform .08s ease, box-shadow .12s ease, border-color .12s ease;}
      .opt:hover{ transform:translateY(-2px); box-shadow:0 12px 28px rgba(2,8,23,.08); border-color:#d1d5db; }
      .left{ display:flex; align-items:center; gap:12px; }
      .icon{ width:38px; height:38px; border-radius:999px; display:grid; place-items:center; color:#fff; font-size:20px; font-weight:700; }
      .icon.bulk{ background:var(--c-bulk); }
      .icon.cut{ background:var(--c-cut); }
      .icon.weight{ background:var(--c-weight); }
      .icon.keto{ background:var(--c-keto); }
      .icon.low_sugar{ background:var(--c-low-sugar); }
      .icon.vegan{ background:var(--c-vegan); }
      .opt span{ font-weight:700; color:#0b132b }
      .muted{ color:var(--muted); font-size:13px; margin-top:6px; }
      .btn{ display:inline-flex; align-items:center; justify-content:center; background:var(--brand); color:#fff; border:none; border-radius:999px; padding:11px 18px; cursor:pointer; font-weight:700; margin-top:14px; box-shadow:0 10px 30px var(--ring); transition:transform .08s, box-shadow .12s, background .12s;}
      .btn:hover{ background:var(--brand-dark); transform:translateY(-1px); box-shadow:0 16px 36px var(--ring); }
      .recipes{ list-style:none; padding:0; margin:18px 0 0; display:grid; gap:12px; }
      .recipes li{ border:1px solid #e5e7eb; border-radius:12px; padding:14px 16px; background:#fff; }
      .badge{ display:inline-block; padding:2px 8px; border-radius:999px; background:#dcfce7; color:#166534; font-size:12px; margin-left:8px; }
      .top{ display:flex; justify-content:space-between; align-items:center; gap:12px;}
      .top-left{ display:flex; align-items:center; gap:10px;}
      .plan-dot{ width:38px; height:38px; border-radius:999px; display:grid; place-items:center; color:#fff; font-weight:800;}
      .spacer{ height:12px; }
    </style>
  </head>
  <body>
    <div class="bg"></div>
    <div class="grain"></div>

    <div class="header">
      <div class="logo">
        <img src="{{ url_for('static', filename='images/logo.png') }}" alt="Meal Planner">
      </div>
      <div class="title">Smart Meal Planner</div>
      <div class="subtitle">Healthy choices, customized for your goals.</div>
    </div>

    <div class="wrap">
      <div class="card">
        {{ content|safe }}
      </div>
    </div>
  </body>
</html>
"""

# -----------------------------------
# Home Page
# -----------------------------------
HOME_BODY = """
<h1>Select a Meal Plan</h1>
<p>Pick a goal, and we'll show meal plans configured for that diet.</p>
<div class="spacer"></div>

<form method="post" action="{{ url_for('choose') }}">
  <div class="grid">
    {% for value, label in options %}
    <label class="opt">
      <div class="left">
        <div class="icon {{ value }}">
          {% if value == 'bulk' %}🏋️{% elif value == 'cut' %}✂️{% elif value == 'weight' %}⚖️{% elif value == 'keto' %}🥑{% elif value == 'low_sugar' %}🍬{% elif value == 'vegan' %}🌿{% else %}🍽️{% endif %}
        </div>
        <div>
          <span>{{ label }}</span>
        </div>
      </div>
      <input type="radio" name="plan" value="{{ value }}" {% if loop.first %}checked{% endif %} />
    </label>
    {% endfor %}
  </div>
  <button class="btn" type="submit">Continue</button>
</form>
"""

# -----------------------------------
# Meal Plan Page
# -----------------------------------
PLAN_BODY = """
<div class="top">
  <div class="top-left">
    <div class="plan-dot {{ plan_value }}">
      {% if plan_value == 'bulk' %}🏋️{% elif plan_value == 'cut' %}✂️{% elif plan_value == 'weight' %}⚖️{% elif plan_value == 'keto' %}🥑{% elif plan_value == 'low_sugar' %}🍬{% elif plan_value == 'vegan' %}🌿{% else %}🍽️{% endif %}
    </div>
    <div>
      <h1>{{ title }}</h1>
      <p>Since you selected <strong>{{ plan_label }}</strong>, here are some configured meal plans.</p>
    </div>
  </div>
  <a class="btn" style="background:#eef2ff;color:#1f2937;" href="{{ url_for('home') }}">← Change plan</a>
</div>

<div class="spacer"></div>

{% if recipes and recipes|length > 0 %}
  <ul class="recipes">
    {% for r in recipes %}
      <li>
        <strong>{{ r.get('title', 'Untitled Recipe') }}</strong>
        {% if r.get('plan') %}<span class="badge">{{ r['plan'] }}</span>{% endif %}
        <div class="muted">{{ r.get('summary', 'A tasty option suited to your goal.') }}</div>
      </li>
    {% endfor %}
  </ul>
{% else %}
  <p class="muted">No recipes found yet. Ask your teammate to add some for <em>{{ plan_label }}</em>!</p>
{% endif %}
"""

# -----------------------------------
# Helper functions
# -----------------------------------
def plan_label_from_value(value: str) -> str:
    for v, label in PLAN_OPTIONS:
        if v == value:
            return label
    return "Unknown"


def fetch_recipes_for_plan(plan: str):
    # Optional external API integration (for team)
    if RECIPES_API:
        try:
            res = requests.get(f"{RECIPES_API}{plan}", timeout=3)
            if res.ok:
                return res.json()
        except Exception:
            pass
    # Fallback sample recipes
    return [
        {"title": "Chicken & Rice Power Bowl", "plan": plan, "summary": "High protein, carb-forward."},
        {"title": "Beef & Sweet Potato Hash", "plan": plan, "summary": "A tasty option suited to your goal."},
    ]


# -----------------------------------
# Flask Routes
# -----------------------------------
@app.route("/", methods=["GET"])
def home():
    inner = render_template_string(HOME_BODY, options=PLAN_OPTIONS)
    return render_template_string(BASE_HTML, title="Meal Planner", content=inner)


@app.route("/", methods=["POST"])
def choose():
    selected = request.form.get("plan", "bulk")
    return redirect(url_for("plan_screen", value=selected))


@app.route("/plan/<value>")
def plan_screen(value: str):
    label = plan_label_from_value(value)
    recipes = fetch_recipes_for_plan(value)
    inner = render_template_string(
        PLAN_BODY,
        title=f"{label} • Meal Plans",
        plan_label=label,
        plan_value=value,
        recipes=recipes,
    )
    return render_template_string(BASE_HTML, title=f"{label} • Meal Plans", content=inner)


# -----------------------------------
# Run Server
# -----------------------------------
if __name__ == "__main__":
    app.run(debug=True)

