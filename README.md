# ScienceTrend Hub Frontend

Frontend for the ScienceTrend Hub project, built with React, Vite and React Router.

## Main features

- Authentication screens: login, register, forgot password and reset password.
- Shared workspace layout with sidebar, navbar, search, notifications and account menu.
- Dashboard with publication statistics, trend charts, topic rankings, papers and journals.
- Papers, trends, library, notifications, reports and administration pages.
- Reusable cards and common UI components.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://su26swp06-be-production.up.railway.app/api
VITE_BACKEND_BASE_URL=https://su26swp06-be-production.up.railway.app
```

Use `http://localhost:8080/api` and `http://localhost:8080` when running the backend locally.

## Run locally

```bash
npm install
npm run dev
```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm run build
```

## Main structure

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   ├── ChartBox.jsx
│   ├── JournalCard.jsx
│   ├── PaperCard.jsx
│   ├── StatCard.jsx
│   └── TopicCard.jsx
├── pages/
├── routes/
├── services/
├── styles/
└── utils/
```

## Notes

The dashboard currently uses sample data so the interface can be developed independently. Replace the sample arrays with calls from `src/services` after the corresponding backend endpoints are confirmed.
