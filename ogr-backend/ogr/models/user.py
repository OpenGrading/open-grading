from pydantic import BaseModel, EmailStr

from ogr.models.user_tag import UserTagDTO


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


class NewUserDTO(UserBase):
    password: str


class UserDTO(UserBase):
    id: str


class UserProfileDTO(UserDTO):
    tags: list[UserTagDTO]
