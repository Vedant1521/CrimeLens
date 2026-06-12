# CrimeLens

A full-stack crime intelligence platform that transforms NCRB crime datasets into interactive visualizations, comparative analytics, and AI-powered insights across Indian states and union territories.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Platform-000000?style=flat-square\&logo=vercel\&logoColor=white)](https://india-crime-analytics.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Vedant1521-181717?style=flat-square\&logo=github)](https://github.com/Vedant1521)

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square\&logo=react\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square\&logo=node.js\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square\&logo=mongodb\&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square\&logo=python\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square\&logo=vercel\&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square\&logo=render\&logoColor=black)

---

## Overview

CrimeLens converts raw NCRB crime datasets into meaningful insights through modern data visualization and analytics.

Built for researchers, journalists, policymakers, students, and data enthusiasts, the platform enables users to explore crime trends, compare states, identify patterns, and interact with crime data through natural-language queries.

### What CrimeLens Offers

* Analyze crime trends from 2018–2025
* Compare crime statistics across states and UTs
* Explore category-wise crime patterns
* Discover literacy–crime correlations
* Query crime data using AI
* Access verified emergency helplines
* Search and filter historical crime records

📊 **750,000+ crime records analyzed across India**

---

## Key Features

### 🗺️ Interactive Crime Risk Map

An SVG-based map of India that visualizes crime intensity across states and union territories.

Features:

* Dynamic state-wise risk classification
* Color-coded safety indicators
* Hover-based crime insights
* Real NCRB data integration
* Interactive user experience

---

### 📈 Advanced Analytics Dashboard

CrimeLens provides 11 specialized analytics modules:

| Module       | Description                                      |
| ------------ | ------------------------------------------------ |
| Home         | Interactive India crime risk map                 |
| States       | State-wise rankings and crime intensity analysis |
| Trends       | Year-over-year crime trend visualization         |
| Report Card  | Safety grading system for all states             |
| Compare      | Side-by-side state comparisons                   |
| Calendar     | Monthly crime pattern analysis                   |
| Literacy     | Literacy rate vs crime rate correlation          |
| Categories   | Crime-type exploration and filtering             |
| News         | Curated crime-related news feed                  |
| Records      | Searchable crime records database                |
| AI Assistant | Natural-language crime insights                  |

---

### 🤖 AI Crime Assistant

Powered by GROQ API.

Users can ask crime-related questions in natural language and receive instant responses.

Example Queries:

* Which state had the highest murder rate in 2024?
* Compare cybercrime trends in Delhi and Maharashtra.
* Which states show the lowest crime rates?

---

### 📚 Literacy vs Crime Correlation

A standout feature of CrimeLens.

This module combines literacy statistics and crime data to explore potential relationships between educational development and crime patterns across Indian states.

Unlike traditional crime dashboards, CrimeLens goes beyond raw counts to surface deeper social insights.

---

### 🚨 Emergency Helpline Center

Integrated emergency support widget featuring:

* Police Helpline
* Women Safety Helpline
* Child Safety Helpline
* Cyber Crime Helpline
* Anti-Corruption Helpline
* Drug Abuse Support Helpline

Includes one-click copy functionality for quick access.

---

## Architecture

```text
NCRB Datasets
      │
      ▼
Python Data Processing Pipeline
      │
      ▼
MongoDB Atlas
      │
      ▼
Node.js + Express APIs
      │
      ▼
React Frontend
      │
      ▼
Recharts + Chart.js Visualizations
      │
      ▼
CrimeLens Dashboard
```

---

## Tech Stack

| Layer              | Technology          |
| ------------------ | ------------------- |
| Frontend           | React.js            |
| Data Visualization | Recharts, Chart.js  |
| Backend            | Node.js, Express.js |
| Database           | MongoDB Atlas       |
| AI Integration     | GROQ API            |
| Data Processing    | Python              |
| Deployment         | Vercel, Render      |

---

## Project Highlights

* Processed and visualized 750K+ crime records
* Built 11 analytics modules for crime exploration
* Developed an interactive SVG-based India crime map
* Integrated AI-powered querying using GROQ
* Implemented advanced filtering and comparison tools
* Built scalable REST APIs with Express.js
* Leveraged MongoDB Atlas for cloud-based storage
* Deployed a production-ready full-stack application

---

## Project Structure

```text
CrimeLens/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── assets/
│       └── services/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── config/
│
├── data-processing/
│   ├── datasets/
│   ├── cleaning/
│   └── scripts/
│
├── README.md
└── package.json
```

---

## Data Source

All crime statistics are sourced from:

**National Crime Records Bureau (NCRB)**
Ministry of Home Affairs, Government of India

Coverage:

* Years: 2018–2025
* All States and Union Territories
* Multiple crime categories
* Official government datasets

NCRB: https://ncrb.gov.in

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/Vedant1521/CrimeLens.git
cd CrimeLens
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

---

## Future Enhancements

* Crime forecasting using Machine Learning
* District-level analytics
* Downloadable PDF reports
* Advanced predictive dashboards
* Real-time crime news sentiment analysis
* AI-powered recommendations and insights

---

## Author

### Vedant Gupta

B.Tech Mathematics & Computing
Delhi Technological University (DTU)

GitHub: https://github.com/Vedant1521

---

⭐ If you found this project interesting, consider starring the repository.


