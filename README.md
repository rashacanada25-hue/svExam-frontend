# Movie Watchlist - Frontend

React + TypeScript + Vite app for the Fullstack Movie Watchlist exam.

## Live Link

- Frontend: _(add your Vercel URL here)_

## Backend

- Backend repo: _(add GitHub link)_
- Backend live: _(add deployed backend URL)_

Set the API URL in `.env`:

```env
VITE_API_URL=http://localhost:3000
```

In production, set `VITE_API_URL` to your deployed backend URL in Vercel project settings.

## Pages

| Route | Page |
|-------|------|
| `/all-movies` | All movies with delete button |
| `/add-movie` | Add movie form with validation |
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

AI was used with Cursor to build the React pages, axios API layer, shadcn components, and the "Generate Description with AI" button on the add-movie page.
