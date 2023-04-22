import logging
import logging.config

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from prisma.errors import PrismaError

from ogr.config import get_config
from ogr.db import DB
from ogr.routes import grade_systems, users

config = get_config()

with open(config.log_config) as conf:
    logging.config.fileConfig(conf, disable_existing_loggers=False)

logger = logging.getLogger(__name__)

logger.info("initialising application")


app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await DB.connect()
    logger.info("db started")


@app.on_event("shutdown")
async def shutdown():
    logger.info("shutting down")
    await DB.disconnect()
    logger.info("disconnected from db")


app.include_router(users.router)
app.include_router(grade_systems.router)


@app.exception_handler(PrismaError)
async def prisma_exception_handler():
    return PlainTextResponse("Internal Server Error", status_code=503)
