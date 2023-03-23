from fastapi import APIRouter, HTTPException
from prisma.models import UserTag

from ogr.db import user
from ogr.models.user import UserProfileDTO

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}", response_model=dict[str, UserProfileDTO])
async def get_user_profile(user_id: int):
    user_profile = await user.get_user(user_id, with_tags=True)
    if not user_profile:
        raise HTTPException(404)

    user_profile.tags = [UserTag(text="Hello", id=1, users=[]), UserTag(text="World", id=2, users=[])]
    return {"userProfile": user_profile}
