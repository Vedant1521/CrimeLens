# 🔍 India Crime Analytics

> *Unmasking Crime Patterns Across India — One Data Point at a Time*

A full-stack crime intelligence platform that transforms NCRB government data into interactive visualizations, state-level insights, and AI-powered analysis.

[![Live Demo](https://img.shields.io/badge/Live_Demo-india--crime--analytics.vercel.app-000000?style=flat-square&logo=vercel&logoColor=white)](https://india-crime-analytics-pr7xl7msh-ayushcmds-projects.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-ayushcmd-181717?style=flat-square&logo=github)](https://github.com/ayushcmd/india-crime-analytics)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)

---

## What is this?

**India Crime Analytics** delivers a comprehensive, data-driven view of crime across all Indian states — built for researchers, journalists, policymakers, and curious citizens. It goes beyond raw numbers by surfacing trends, correlations, and patterns through an intuitive dashboard with 11 specialized modules.

> 📊 **755,580+** crimes tracked · 📅 **2018–2025** coverage · 🏛️ **All 28 States + UTs** · 🤖 **AI-powered Q&A**

---

## Features

### 11 Intelligence Modules

| Module | Description |
|--------|-------------|
| Overview | National KPIs — total crimes, top category, top state |
| Heatmap | State-level crime intensity map with severity labels |
| Trends | Year-over-year charts across all crime types |
| States | Per-state deep-dive with historical breakdown |
| Report Card | Ranked scorecards for every state |
| Compare | Side-by-side state comparison tool |
| Calendar | Temporal crime pattern analysis by date/month |
| **Literacy ★** | **Literacy rate vs crime rate correlation analysis** |
| Categories | Filter and explore by crime type |
| News | Curated crime-related news feed |
| Records | Searchable, filterable raw data table |

### AI Chatbot

Powered by **GROQ AI** for sub-second responses. Ask natural language questions like:

- *"Which state had the highest murders in 2022?"*
- *"How has theft trended over the last 5 years?"*
- *"Compare crime rates of Delhi and Mumbai."*
- *"What is the safest state in India right now?"*

### Literacy vs Crime Correlation *(Standout Feature)*

Most crime dashboards stop at raw numbers. This platform goes further — overlaying **literacy rate data** with **crime rate data** per state to surface whether education correlates with safety.

> A unique analytical lens you won't find on any other Indian crime platform.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React.js + Tailwind CSS | UI, routing, styling |
| Charts | Recharts / Chart.js | Interactive data visualizations |
| Backend | Node.js + Express | REST API, data serving |
| Database | MongoDB Atlas | Crime data storage |
| AI | GROQ API | Natural language chatbot |
| Data Pipeline | Python | NCRB data cleaning & processing |
| Frontend Deploy | Vercel | Hosting + CDN |
| Backend Deploy | Render | API server hosting |

---

## Project Structure

```
india-crime-analytics/
├── frontend/               # React.js application
│   └── src/
│       ├── components/     # Reusable UI components
│       └── pages/          # Module pages (Overview, Heatmap, etc.)
├── backend/                # Express REST API
│   ├── routes/             # API route handlers
│   └── models/             # MongoDB schema models
├── data-processing/        # Python data pipeline (NCRB CSV cleaning)
├── .gitignore
└── README.md
```



---

## Deployment

| Service | Platform | 
|---------|----------|
| Frontend | Vercel
| Backend API | Render
| Database | MongoDB Atlas 

---

## Data Source

All statistics sourced from the **National Crime Records Bureau (NCRB)**, Ministry of Home Affairs, Government of India.

- **Coverage:** 2018 – 2025
- **Scope:** All Indian states and union territories
- **Categories:** Theft, murder, assault, rape, kidnapping, cybercrime, and more
- **Official Source:** [ncrb.gov.in](https://ncrb.gov.in)

> *This project uses publicly available government data strictly for educational, research, and analytical purposes.*

---



---


Built by [**Ayush**](https://github.com/ayushcmd) 

⭐ **Star this repo if it helped you!**
