from __future__ import annotations
from flask import Flask, request, render_template_string, redirect, url_for

app = Flask(__name__)

# -----------------------------------
# Meal Plan Options
# -----------------------------------
PLAN_OPTIONS = [
    ("vegan", "Vegan"),
    ("vegetarian", "Vegetarian"),
    ("anti-inflammatory", "Anti-inflammatory"),
    ("high_protein", "High Protein"),
]

# Icon image mapping (make sure you have these under static/icons/)
ICONS = {
    "vegan": "vegan.png",
    "vegetarian": "vegetarian.png",
    "anti-inflammatory": "anti_inflammatory.png",
    "high_protein": "high_protein.png",
}

# Descriptions for each plan
DESCRIPTIONS = {
    "vegan": "Plant-based meals packed with fiber and nutrients.",
    "vegetarian": "Balanced vegetarian meals with dairy and eggs allowed.",
    "anti-inflammatory": "Whole-food recipes to help reduce inflammation.",
    "high_protein": "Extra protein for muscle building and recovery.",
}

# -----------------------------------
# Base HTML Layout
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
        --bg:#0f172a; --card:#ffffffee; --fg:#0b132b; --muted:#6b7280;
        --brand:#22c55e; --brand-dark:#16a34a; --ring:rgba(34,197,94,.25);
        --shadow:0 20px 60px rgba(2,8,23,.25);
        --sel:#3b82f6;
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
        z-index:-2; filter:saturate(1.05) contrast(1.02);
      }
      .grain{position:fixed; inset:0;
        background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);
        background-size:3px 3px; opacity:.22; z-index:-1;}

      .header{text-align:center; padding:36px 16px 8px;}
      .logo{display:inline-block; padding:8px; border-radius:16px;
            background:rgba(255,255,255,.85); box-shadow:var(--shadow);}
      .logo img{display:block; width:120px; height:auto; border-radius:12px;}
      .title{color:#fff; font-weight:800; letter-spacing:.2px;
             font-size:clamp(26px,4vw,38px); margin:14px 0 4px;
             text-shadow:0 10px 30px rgba(0,0,0,.35);}
      .subtitle{color:rgba(255,255,255,.9); font-size:15px;
                text-shadow:0 6px 18px rgba(0,0,0,.35);}

      .wrap{max-width:1100px; margin:18px auto 56px; padding:0 18px;}
      .card{background:var(--card); border:1px solid rgba(226,232,240,.6);
            border-radius:22px; padding:26px; box-shadow:var(--shadow);
            backdrop-filter:blur(6px);}
      h1{font-size:clamp(22px,3vw,30px); margin:0 0 10px; color:#0b132b;}
      p{color:var(--muted); margin:0;}

      .plans{display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
             gap:16px; margin-top:18px;}
      .plan-card{
        position:relative; border:1px solid #e5e7eb; border-radius:18px;
        padding:18px; background:#fff; display:flex; gap:14px; align-items:center;
        transition:transform .12s ease, box-shadow .12s ease, border-color .12s ease;
        box-shadow:0 6px 18px rgba(2,8,23,.08);
      }
      .plan-card:hover{transform:translateY(-2px); box-shadow:0 14px 28px rgba(2,8,23,.12);}
      .plan-card.selected{border-color:var(--sel);
        box-shadow:0 0 0 4px rgba(59,130,246,.18),0 16px 36px rgba(2,8,23,.16);}
      .badge{width:52px; height:52px; border-radius:14px; overflow:hidden;
             display:grid; place-items:center; background:#f3f4f6;
             border:1px solid #eef2f7; flex:0 0 auto;}
      .badge img{width:100%; height:100%; object-fit:cover;}
      .plan-meta{flex:1 1 auto;}
      .plan-title{font-weight:800; color:#0b132b; font-size:18px;}
      .plan-desc{color:var(--muted); font-size:13px; margin-top:4px; line-height:1.35;}
      .hidden-radio{position:absolute; inset:0; opacity:0; cursor:pointer;}
      .btn{display:inline-flex; align-items:center; justify-content:center;
           background:var(--brand); color:#fff; border:none; border-radius:999px;
           padding:12px 20px; cursor:pointer; font-weight:800; margin-top:18px;
           box-shadow:0 10px 30px var(--ring);
           transition:transform .08s, box-shadow .12s, background .12s;}
      .btn:hover{background:var(--brand-dark); transform:translateY(-1px);
                 box-shadow:0 16px 36px var(--ring);}
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

    <script>
      document.addEventListener('change', (e)=>{
        if(e.target && e.target.name === 'plan'){
          document.querySelectorAll('.plan-card').forEach(c=>c.classList.remove('selected'));
          const container = e.target.closest('.plan-card');
          if(container){ container.classList.add('selected'); }
        }
      });
    </script>
  </body>
</html>
"""

# -----------------------------------
# Meal Plan Selection Body
# -----------------------------------
HOME_BODY = """
<h1>Select a Meal Plan</h1>
<p>Pick a goal and we’ll suggest meal plans configured for that diet.</p>

<form method="post" action="/continue">
  <div class="plans">
    {% for value, label in options %}
      {% set icon_file = icons.get(value, 'placeholder.png') %}
      {% set desc = descriptions.get(value, 'A tasty, balanced set of recipes to match your goal.') %}

      <label class="plan-card {% if loop.first %}selected{% endif %}">
        <div class="badge">
          <img src="{{ url_for('static', filename='icons/' ~ icon_file) }}" alt="{{ label }} icon">
        </div>
        <div class="plan-meta">
          <div class="plan-title">{{ label }}</div>
          <div class="plan-desc">{{ desc }}</div>
        </div>
        <input class="hidden-radio" type="radio" name="plan" value="{{ value }}" {% if loop.first %}checked{% endif %} />
      </label>
    {% endfor %}
  </div>

  <button class="btn" type="submit">Continue</button>
</form>
"""

# -----------------------------------
# Routes
# -----------------------------------
@app.route("/", methods=["GET"])
def home():
    inner = render_template_string(
        HOME_BODY,
        options=PLAN_OPTIONS,
        icons=ICONS,
        descriptions=DESCRIPTIONS
    )
    return render_template_string(BASE_HTML, title="Meal Planner", content=inner)

@app.route("/continue", methods=["POST"])
def continue_button():
    selected_plan = request.form.get("plan", "vegan")
    # Temporary placeholder page to simulate navigation
    return f"<h2 style='color:white; text-align:center; margin-top:40px;'>Selected plan: {selected_plan}</h2>"

# -----------------------------------
# Run Flask
# -----------------------------------
if __name__ == "__main__":
    app.run(debug=True)
