from fastapi import APIRouter, HTTPException
from prisma.errors import UniqueViolationError
from prisma.models import User, UserTag

from ogr.db import user
from ogr.models.user import NewUserDTO, UserDTO, UserProfileDTO

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=dict[str, list[UserDTO]])
async def index() -> dict[str, list[User]]:
    users = await user.get_users(with_tags=True)
    return {"users": users}


@router.get("/{user_id}", response_model=dict[str, UserProfileDTO])
async def get_user_profile(user_id: int) -> dict[str, User]:
    user_profile = await user.get_user(user_id, with_tags=True)
    if not user_profile:
        raise HTTPException(404)

    user_profile.tags = [
        UserTag(text="Hello", id=1, users=[]),
        UserTag(text="World", id=2, users=[]),
    ]
    return {"userProfile": user_profile}


@router.post("/", response_model=UserDTO)
async def index_post(user_data: NewUserDTO) -> User:
    try:
        return await user.create_user(user_data)
    except UniqueViolationError as e:
        raise HTTPException(status_code=409, detail=e.meta.get("target"))
