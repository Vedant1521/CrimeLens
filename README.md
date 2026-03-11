# India Crime Analytics

A crime intelligence platform built on NCRB data — turning government statistics into clear, interactive insights across all Indian states from 2018 to 2025.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://india-crime-analytics-pr7xl7msh-ayushcmds-projects.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-ayushcmd-181717?style=flat-square&logo=github)](https://github.com/ayushcmd/india-crime-analytics)

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)

---

## Overview

**755,580+** crimes tracked across **28 states + UTs** over **7 years**. Built for researchers, journalists, and policymakers who need more than raw numbers.

---

## Features

### Interactive Home Map
An SVG map of India where every state is color-coded by crime risk level — green for safe, cyan for moderate, orange for concerning, red for high risk. Hover over any state to see its crime count and risk label. Powered by real NCRB data with animated blinking indicators.

### 11 Analytics Modules

| Module | What it does |
|--------|-------------|
| Home | India crime risk map with state-level color coding |
| States | State intensity rankings with severity labels |
| Trends | Year-over-year crime trends across categories |
| Report Card | Safety grades for every state |
| Compare | Side-by-side state comparison |
| Calendar | Monthly crime pattern analysis |
| Literacy | Crime rate vs literacy rate correlation |
| Categories | Filter and explore by crime type |
| News | Curated crime news feed |
| Records | Searchable raw data table |

### AI Chatbot
Natural language Q&A powered by GROQ. Ask anything — *"Which state had the most kidnappings in 2023?"* — and get a response in under a second.

### Emergency Helplines
A persistent bottom-left popup with verified helpline numbers across 6 categories — Police, Women Safety, Child Safety, Cyber Crime, Anti-Corruption, and Drug Abuse. One-click copy for any number.

### Literacy Correlation *(Standout)*
Most crime dashboards stop at counts. This one overlays literacy rate data with crime rate data per state — surfacing whether education correlates with safety. You won't find this on any other Indian crime platform.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js |
| Charts | Recharts / Chart.js |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| AI | GROQ API |
| Data Pipeline | Python |
| Deploy | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
india-crime-analytics/
├── frontend/
│   └── src/
│       └── components/     # All UI modules
├── backend/
│   ├── routes/             # API endpoints
│   └── models/             # MongoDB schemas
├── data-processing/        # Python NCRB data pipeline
└── README.md
```

---

## Data Source

All data sourced from the **National Crime Records Bureau (NCRB)**, Ministry of Home Affairs, Government of India.

- Coverage: 2018–2025
- Scope: All states and union territories
- Categories: Theft, murder, assault, rape, kidnapping, cybercrime, and more
- [ncrb.gov.in](https://ncrb.gov.in)

---

Built by [Ayush](https://github.com/ayushcmd)
