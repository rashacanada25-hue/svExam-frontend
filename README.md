# Movie Watchlist - Frontend

React + TypeScript + Vite app for the Fullstack Movie Watchlist exam.

## Live Link

- Frontend: https://frontend-umber-psi-57.vercel.app

## Backend

- Backend repo: https://github.com/rashacanada25-hue/SvExam-Backend
- Backend live: https://svexam-backend-production-b40e.up.railway.app

## Environment Variables

Local development (`.env`):

```env
VITE_API_URL=http://localhost:3000
```

Production (Vercel project settings):

```env
VITE_API_URL=https://svexam-backend-production-b40e.up.railway.app
```

## Pages

| Route | Page |
|-------|------|
| `/all-movies` | All movies with delete button |
| `/add-movie` | Add movie form with validation and AI description |
| `/search-movies` | Live search by title |

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Stack

- React
- Tailwind CSS
- shadcn/ui
- axios

## AI Usage

AI was used with Cursor to build the React pages, axios API layer, shadcn components, and the AI description generation on the add-movie page.

## Exam Links (Submission)

- Frontend: https://frontend-umber-psi-57.vercel.app
- Backend: https://svexam-backend-production-b40e.up.railway.app
- Frontend GitHub: https://github.com/rashacanada25-hue/svExam-frontend
- Backend GitHub: https://github.com/rashacanada25-hue/SvExam-Backend
