# 🧠 MLOps Experiment Tracker

A modern  dashboard for visualizing and comparing machine learning experiment logs.  
Upload CSV file with experiment metrics, select experiments, define step limits, and analyze results interactively.



---

## 🚀 Features

- 📊 **Metric Visualization**: Beautiful line charts for each metric across experiments.
- 📁 **CSV Upload**: Simple uploader for experiment logs.
- ✅ **Experiment Selector**: Choose which experiments to display.
- 🔢 **Step Range Input**: Customize how many steps to visualize (e.g., 100, 500, 2000).
- 🎨 **AI-themed UI**: TailwindCSS-powered futuristic design.
- ⚡ **Fast & Lightweight**: Built with Vite + React + Recharts.

---

## 📦 Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
- [PapaParse](https://www.papaparse.com/) (for CSV parsing)

---

## 📁 File Format

CSV file should contain the following headers:

```csv
experiment_id,metric_name,step,value
exp_1,accuracy,1,0.65
exp_1,accuracy,2,0.68
exp_2,accuracy,1,0.61
...
```

---

## 🧪 Running Locally

```bash
# Clone the repo
git clone https://github.com/your-username/mlops-experiment-tracker.git
cd mlops-experiment-tracker

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 🌐 Live Demo

👉 [Visit the Live App on Vercel](https://mlops-experiment-tracker.vercel.app/)

Please use the logs_25k.csv file to test the application.
You can find it in the root directory of the project.

---

## 💼 About This Project

This project was created as a technical test task for a Frontend Engineer position at **Dataforce.solutions**.  
It also demonstrates skills in data visualization, UI/UX design, and modern React development.





### ✨ Developed by [Pavlo Antokhiv](https://www.linkedin.com/in/pavlo-antokhiv/)
