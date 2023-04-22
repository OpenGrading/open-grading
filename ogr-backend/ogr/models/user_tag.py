from pydantic import BaseModel


class UserTagBase(BaseModel):
    text: str


class UserTagDTO(UserTagBase):
    id: int
