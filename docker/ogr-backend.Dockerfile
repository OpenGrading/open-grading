FROM python:3.10-alpine as base

ENV   PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.2.2 \
  API_HOST="0.0.0.0" \
  API_PORT=8000

RUN apk add --update --no-cache --virtual .tmp-build-deps \
  gcc libc-dev nodejs npm \
  && apk add libffi-dev

RUN pip install "poetry==$POETRY_VERSION"
RUN npm install -g "prisma"

WORKDIR /app
COPY ogr-backend/poetry.lock ogr-backend/pyproject.toml /app/
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

COPY ogr-backend/prisma /app/prisma
RUN npx prisma version


FROM base as migration
CMD [ "npx", "prisma", "migrate", "deploy" ] 


FROM base as production
RUN npx prisma generate

COPY ogr-backend/ogr /app/ogr

CMD uvicorn ogr.main:app --host $API_HOST --port $API_PORT
