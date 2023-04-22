# Open Grading Project

---

Mission of this project is to allow everyone to access simple and versatile platform for employee grading and development.

## Components

### Ogr Frontend

Frontend is built in TypeScript with React. Using [ChakraUI](https://chakra-ui.com/) as ui-kit.
Nanostores for state management. And nanostores/query for data fetching.
Composition is done with according to [Feature Sliced Design](https://feature-sliced.design/docs/get-started/overview) principle.
Dependencies are managed with npm, and Vite as build tool.

### Ogr Backend

Backend is built in python with FastAPI. Using [Prisma](https://prisma-client-py.readthedocs.io/en/stable/) as ORM.
Postgres as database.

Dependencies are managed with poetry.
Backend is running in Docker with [Docker Compose](https://docs.docker.com/compose/).

## Development

### Setting up

For local development you'll need:

- node, npm
- python
- docker and docker-compose
- poetry

### Developing frontend

Inside org-frontend:

Install dependencies for frontend with:
`npm install`

Start in dev mode with:
`npm run dev`

Next you could start backend and db with:
`docker-compose -f docker/docker-compose.yaml up db api`,
it'll build all the required containers and start backend that listens on port 8000

### Developing backend

Inside org-backend:

Install dependencies for backend with:
`poetry install`

Start in dev mode with:
`poetry run uvicorn ogr.app:main --reload`

Next you could start frontend and db with:
`docker-compose -f docker/docker-compose.yaml up frontend db`

### Db migrations

When working with prisma migrations refer to following guide: [Prisma Client Python](https://prisma-client-py.readthedocs.io/en/stable/)

```bash
# Make sure you've started db container with:
docker-compose -f docker/docker-compose.yaml up db

# Export db connection url with:
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ogr

# When changing prisma schema update client with:
prisma generate`

# And then sync schema changes with db:
prisma migrate dev
```
