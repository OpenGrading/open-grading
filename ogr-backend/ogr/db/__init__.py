import logging
from contextlib import asynccontextmanager

from prisma.errors import PrismaError

from prisma import Prisma

logger = logging.getLogger(__name__)


class DataProvider:
    def __init__(self) -> None:
        self.db = Prisma()

    async def connect(self):
        await self.db.connect()

    async def disconnect(self):
        await self.db.disconnect()

    def cursor(self):
        return self.db

    @asynccontextmanager
    async def manager(self):
        try:
            logger.info("[db] begin transaction")
            await self.db.execute_raw("BEGIN")
            yield self.db
            logger.info("[db] commit transaction")
            await self.db.execute_raw("COMMIT")
        except PrismaError as e:
            await self.db.execute_raw("ROLLBACK")
            logger.info("[db] rollback transaction")
            logger.error(f"[db] error while performing db-request: {e}")
            raise


DB = DataProvider()
