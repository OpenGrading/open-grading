from ogr.db import DB
from ogr.models.user import NewUserDTO, UserDTO


async def get_users(take=100, skip=0, with_tags=False):
    async with DB.manager() as data:
        users = await data.user.find_many(take, skip, where={}, include={"tags": with_tags})
        return users


async def get_user(id: int, with_tags=False):
    async with DB.manager() as data:
        user = await data.user.find_first(where={"id": id}, include={"tags": with_tags})
        return user


async def create_user(user: NewUserDTO):
    async with DB.manager() as data:
        return await data.user.create(
            {
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        )


async def update_user(user: UserDTO):
    async with DB.manager() as data:
        return await data.user.update(
            data={
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
            },
            where={"id": user.id},
        )


async def delete_user(id: int):
    async with DB.manager() as data:
        await data.user.delete(where={"id": id})
