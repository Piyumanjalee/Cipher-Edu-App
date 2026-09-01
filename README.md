# CipherEdu - Interactive Cryptography & Cipher Studio

> **A full-stack educational web application designed to bridge the gap between theoretical cryptography and practical interactive learning. Built as a final-year IT undergraduate project.**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Project Overview

**CipherEdu** is an interactive, full-stack educational cryptography suite. It provides computer science and IT students, security enthusiasts, and educators with an intuitive playground to visualize, test, and understand classic cryptography algorithms, historical substitution/transposition techniques, and modern binary-to-text encoding systems.

---

## 🛠️ Tech Stack

### **Backend**
- **Language & Runtime**: Python 3.10+
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Asynchronous, High-performance REST API)
- **Server**: [Uvicorn](https://www.uvicorn.org/) (Lightning-fast ASGI server)
- **Data Validation & Serialization**: [Pydantic v2](https://docs.pydantic.dev/) (Strict type enforcement and schema validation)
- **Interactive Documentation**: Auto-generated OpenAPI (Swagger UI & ReDoc)

### **Frontend**
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: *Plus Jakarta Sans* & *JetBrains Mono*

---

## ✨ Features & Implemented Algorithms

| Cipher / Method | Category | Key Concept / Parameter | Description |
|---|---|---|---|
| **Caesar Cipher** | Substitution | `shift` ($1 \le k \le 25$) | Shifts letters cyclically along the alphabet. Includes slider and ROT13 presets. |
| **Vigenère Cipher** | Polyalphabetic | `keyword` (Alphabetic) | Uses repeated keyword characters to determine cyclic multi-alphabet shifts. |
| **Atbash Cipher** | Involution / Mirror | Fixed ($A \leftrightarrow Z$) | Symmetric biblical Hebrew cipher mapping the alphabet to its reverse. |
| **Base64 Encoding** | Radix-64 Representation | Standard RFC 4648 | Converts binary / UTF-8 strings into 6-bit ASCII representations with `=` padding. |
| **Rail Fence Cipher** | Transposition | `rails` ($r \ge 2$) | Writes characters in a zigzag wave pattern and reads row-by-row. |

### **Application Capabilities**
- 🔄 **Real-Time Encryption & Decryption / Encoding & Decoding**: Instant execution via FastAPI backend endpoints.
- 🔀 **Swap & Invert**: Transfer output back to input and reverse the operation for instant round-trip verification.
- 📋 **One-Click Copy**: Copy processed output with feedback visual animations.
- 📖 **Educational Deep-Dives**: Collapsible info cards detailing algorithm mechanisms, mathematical formulas, historical origins, and real-world cryptanalysis vulnerabilities.
- 🚀 **Animated Splash Screen**: Fullscreen neon cryptographic spinner with loading sequence and developer attribution.
- ⚡ **Backend Pulse Indicator**: Real-time heartbeat checking backend connectivity.
- 📱 **Fully Responsive UI**: Tailored layouts for mobile, tablet, and desktop screens with dark-mode aesthetic.

---

## 📡 API Endpoints Reference

The FastAPI backend exposes the following RESTful endpoints:

| Method | Endpoint | Request Payload | Response Attributes |
|---|---|---|---|
| `GET` | `/` | *None* | Welcome message & supported cipher directory |
| `GET` | `/docs` | *None* | Interactive Swagger UI API documentation |
| `POST` | `/caesar` | `{"text": "HELLO", "shift": 3, "operation": "encrypt"}` | `{"result": "...", "original": "...", "shift": 3, "operation": "..."}` |
| `POST` | `/vigenere` | `{"text": "HELLO", "keyword": "KEY", "operation": "encrypt"}` | `{"result": "...", "original": "...", "keyword": "...", "operation": "..."}` |
| `POST` | `/atbash` | `{"text": "HELLO", "operation": "encrypt"}` | `{"result": "...", "original": "...", "operation": "..."}` |
| `POST` | `/base64` | `{"text": "HELLO", "operation": "encode"}` | `{"result": "...", "original": "...", "operation": "..."}` |
| `POST` | `/railfence`| `{"text": "HELLO", "rails": 3, "operation": "encrypt"}` | `{"result": "...", "original": "...", "rails": 3, "operation": "..."}` |

---

## 🚀 How to Run Locally

### **Prerequisites**
- **Python 3.10+** ([Download Python](https://www.python.org/downloads/))
- **Node.js v18+ & npm** ([Download Node.js](https://nodejs.org/))
- **Git**

---

### **1. Clone the Repository**
```bash
git clone https://github.com/Piyumanjalee/Cipher-Edu-App.git
cd Cipher-Edu-App
```

---

### **2. Setup and Run the Backend (FastAPI)**

Open a terminal in the root directory:

```powershell
# Navigate to the backend folder
cd backend

# Create and activate a Python virtual environment
python -m venv venv
.\venv\Scripts\activate       # On Windows (PowerShell)
# source venv/bin/activate    # On macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI development server with auto-reload
uvicorn main:app --reload --port 8000
```

> 🌐 Backend API will be live at: **`http://127.0.0.1:8000`**  
> 📑 Interactive Swagger UI Docs: **`http://127.0.0.1:8000/docs`**

---

### **3. Setup and Run the Frontend (React + Vite)**

Open a second terminal in the root directory:

```powershell
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

> 💻 Frontend Application will be accessible at: **`http://localhost:5173`**

---

### **4. (Optional) Run directly in VS Code**
- Open the project folder in VS Code.
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P`) $\rightarrow$ **Tasks: Run Task** $\rightarrow$ select:
  - **Start Backend (FastAPI)**
  - **Start Frontend (Vite)**
- Or run using the **Run & Debug** panel (`F5`) with the configured `FastAPI: Run App` profile.

---

## 📂 Project Directory Structure

```
Cipher-Edu-App/
├── README.md                      # Comprehensive project documentation
├── .vscode/
│   ├── launch.json                # VS Code debugging launcher
│   └── tasks.json                 # VS Code task runner
├── backend/
│   ├── main.py                    # FastAPI app, Pydantic schemas, and cipher algorithms
│   ├── requirements.txt           # Python dependencies (fastapi, uvicorn)
│   └── venv/                      # Local Python virtual environment
└── frontend/
    ├── index.html                 # Main HTML template with custom web fonts
    ├── vite.config.js             # Vite configuration with API proxy
    ├── package.json               # Node dependencies & build scripts
    └── src/
        ├── index.css              # Tailwind CSS styling and theme definitions
        ├── main.jsx               # React DOM root entry point
        ├── App.jsx                # Main layout, tab navigation, and health checks
        ├── services/
        │   └── api.js             # Centralized API service with error normalization
        └── components/
            ├── Header.jsx         # Navigation header & live backend status badge
            ├── Footer.jsx         # Footer with developer & academic credentials
            ├── SplashScreen.jsx   # Animated loading splash screen
            ├── CipherLayout.jsx   # Reusable cipher card interface
            ├── InfoBanner.jsx     # Educational breakdown accordion
            └── ciphers/
                ├── CaesarTab.jsx
                ├── VigenereTab.jsx
                ├── AtbashTab.jsx
                ├── Base64Tab.jsx
                └── RailFenceTab.jsx
```

---

## 👩‍💻 Author

**Piyumanjalee Kavindi**  
*Final-year IT Undergraduate at Rajarata University of Sri Lanka*

- 🌐 **GitHub**: [@Piyumanjalee](https://github.com/Piyumanjalee)
- 💼 **LinkedIn**: [Piyumanjalee Kavindi Senadheera](https://www.linkedin.com/in/piyumanjalee-kavindi-senadheera/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - feel free to use it for academic, educational, and personal learning purposes.
