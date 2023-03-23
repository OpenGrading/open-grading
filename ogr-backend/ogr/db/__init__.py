from contextlib import contextmanager
from prisma import Prisma


class DataProvider:
    def __init__(self) -> None:
        self.db = Prisma()

    async def connect(self):
        await self.db.connect()

    async def disconnect(self):
        await self.db.disconnect()

    def cursor(self):
        return self.db

    @contextmanager
    def manager(self):
        yield self.db


DB = DataProvider()
