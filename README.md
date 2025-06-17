# 🎓 Edity – AI-Powered EdTech Platform for Teachers

**Edity** is a cutting-edge MERN-stack web app that empowers educators with AI-enhanced tools to elevate teaching performance, streamline lesson planning, and engage with real-time classroom insights. Built with modern web technologies and tailored for public education systems.

---

## 🚀 Features

### 🧠 Core Tools

- **📘 Personalized Lesson Planning** – Create lesson plans tailored to learning objectives & student needs.
- **📊 360° Performance Reporting** – Visualize class data and insights to inform teaching strategies.
- **⚙️ Automated Assessment Tools** – AI-assisted quiz generation and auto-grading.
- **📈 Real-time Analytics Dashboards** – Data-driven decisions powered by intuitive UI.
- **🤝 Collaborative Educator Platform** – Share strategies, templates, and feedback with peers.
- **📚 Student Learning Tools** – Track individual progress and promote continuous learning.

---

## 🧭 Role-Based Interfaces

| Role             | Features                                                           |
| ---------------- | ------------------------------------------------------------------ |
| **Educators**    | Plan lessons, analyze progress, access community resources.        |
| **Admins**       | Oversee teacher activities and student assessments.                |
| **Students**     | View assignments, learning resources, and personal insights.       |
| **Researchers**  | Access anonymized data for education-focused research & analytics. |
| **Stakeholders** | Collect survey data for policy and resource decisions.             |

---

## 🧱 Tech Stack

**Frontend:**

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for blazing-fast dev
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Query](https://tanstack.com/query/latest) for API caching
- [Zustand](https://zustand-demo.pmnd.rs/) for global state
- JWT-based auth (role-based access)

**Backend:**

- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [OpenAI](https://platform.openai.com/) for AI lesson/assessment tools
- [Socket.IO](https://socket.io/) (planned) for real-time collaboration

---

## 📁 Project Structure

edity/
├── client/ # React frontend
├── server/ # Express backend
├── .env
├── README.md
└── package.json # Monorepo (optional)

---

## 🛠️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/jojoarm/edity.git
cd edity

2. Install dependencies

# Frontend
cd client
npm install

# Backend
cd ../server
npm install

3. Create .env files
For server/.env

PORT=5000
MONGO_URI=your_mongo_db_connection
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key

For client/.env
VITE_API_BASE_URL=http://localhost:5000/api

4. Run the development servers
# In one terminal (backend)
cd server
npm run dev

# In another terminal (frontend)
cd client
npm run dev

🌍 Live Demo
Deploy coming soon on Vercel & Render

🤝 Contributing
Fork this repo

Create a feature branch: git checkout -b feature/your-feature-name

Commit your changes: git commit -m "Add: Your message"

Push to your branch: git push origin feature/your-feature-name

Open a Pull Request

📄 License
This project is licensed under the MIT License.

🙌 Acknowledgments
OpenAI for AI-enhanced learning assistance

MongoDB & Mongoose for flexible data modeling

React Query and Zustand for DX magic

🧑‍💻 Built by Dev Armani
Edity is a forward-thinking initiative focused on transforming education with scalable, AI-first technology.
```
