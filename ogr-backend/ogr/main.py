import logging
import logging.config
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from prisma.errors import UniqueViolationError
from ogr.db import DB
from ogr.db import user

from ogr.models.user import NewUserDTO, UserDTO
from ogr.routes import users, grade_systems

with open("ogr/logging.conf") as conf:
    logging.config.fileConfig(conf, disable_existing_loggers=False)

logger = logging.getLogger(__name__)

logger.info("initialising application")
app = FastAPI()

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


@app.get("/", response_model=dict[str, list[UserDTO]])
async def index():
    users = await user.get_users(with_tags=True)
    return {"users": users}


@app.post("/", response_model=UserDTO)
async def index_post(user_data: NewUserDTO):
    try:
        return await user.create_user(user_data)
    except UniqueViolationError as e:
        raise HTTPException(status_code=409, detail=e.meta.get("target"))
