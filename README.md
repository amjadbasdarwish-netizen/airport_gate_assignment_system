# 🛫 Airport Flight Gate Assignment System

A sophisticated decision-support system designed to solve the **Gate Assignment Problem (GAP)** using Constraint Satisfaction Problem (CSP) techniques and Graph Coloring algorithms.

![Version](https://img.shields.io/badge/version-1.0.0-indigo)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)

## 🌟 Overview

Assigning flights to airport gates is a complex optimization challenge. Two flights cannot occupy the same gate at the same time. This project models these constraints as a **Conflict Graph**, where:
- **Nodes** represent individual flights.
- **Edges** represent time conflicts (overlapping schedules).
- **Colors** represent unique airport gates.

By solving for the **Chromatic Number** of this graph, the system determines the minimum number of gates required to handle a given flight schedule without conflicts.

## 🚀 Features

- **Algorithmic Optimization**: Uses the Welsh-Powell algorithm for efficient graph coloring.
- **Dynamic Gantt Chart**: Real-time visualization of gate occupancy timelines.
- **Interactive Conflict Graph**: stylized network visualization using Cytoscape.js.
- **Conflict Matrix**: Direct 1-to-1 comparison of flight overlaps.
- **Scenario Management**: Load "Light", "Moderate", or "Peak" traffic scenarios.
- **Real-time Interaction**: Toggle flights on/off and watch the assignment algorithm adapt instantly.

## 🛠️ Architecture

### Backend (Python/FastAPI)
- **FastAPI**: High-performance REST API.
- **NetworkX**: Used for graph modeling and calculating conflict edges.
- **Custom Solver**: Implements CSP logic to map colors (gates) to flight requirements.

### Frontend (React/Vite)
- **Zustand**: Lightweight state management.
- **Tailwind CSS**: Modern, responsive UI design.
- **Cytoscape.js**: Interactive network graph visualization.
- **Axios**: API communication.

## 📋 Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **npm** or **yarn**

## ⚙️ Setup & Installation

### 1. Backend Setup
```powershell
# Navigate to backend directory
cd Backend

# Create a virtual environment
python -m venv .venv
.\.venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn networkx

# Start the server
uvicorn main:app --reload
```
*The backend will run on `http://124.0.0.1:8000`*

### 2. Frontend Setup
```powershell
# Navigate to frontend directory
cd arayüzü

# Install dependencies
npm install

# Start the development server
npm run dev
```
*The frontend will typically run on `http://localhost:5173`*

## 📖 Usage Guide

1. **Load a Scenario**: Click on Light, Moderate, or Peak buttons at the top to load flight data.
2. **Explore Views**:
   - **Schedule Tab**: View the horizontal timeline of gate assignments.
   - **Conflict Matrix Tab**: Check which flights are causing bottlenecks.
   - **Conflict Graph Tab**: See the mathematical "color" clusters.
3. **Modify Constraints**: Use the "Flight Inventory" at the bottom to disable specific flights. The system will immediately re-calculate the optimal gate assignments and update all views.

## 🧪 Mathematical Concept

The system solves the following constraints:
1. **Overlap Constraint**: If `Arrival_i < Departure_j` AND `Arrival_j < Departure_i`, flights `i` and `j` conflict.
2. **Minimization**: Find `min(k)` where `k` is the number of gates used.
3. **Adjacency**: No two adjacent nodes in the conflict graph can share the same gate ID.

---
*Developed as a demonstration of CSP and Graph Theory in Aviation Logistics.*
