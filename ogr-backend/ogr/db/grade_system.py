import logging

from ogr.db import DB
from ogr.models.grade_system import (
    GradeSystemUpdateDTO,
    GradeSystemVariantDTO,
    NewGradeSystemDTO,
)

logger = logging.getLogger(__name__)


async def get_grade_systems(
    take=100,
    skip=0,
    *,
    load_current_variant=False,
    load_all_variants=False,
):
    async with DB.manager() as data:
        grade_systems = await data.grade_system.find_many(
            take,
            skip,
            include={
                "variants": {"include": {"grades": True}}
                if load_all_variants
                else False,
                "current_variant": {"include": {"grades": True}}
                if load_current_variant
                else False,
            },
        )
        logger.debug(grade_systems)

        return grade_systems


async def get_grade_system(
    id: int, load_current_variant=False, load_all_variants=False
):
    async with DB.manager() as data:
        grade_system = await data.grade_system.find_first(
            where={"id": id},
            include={
                "variants": {"include": {"grades": True}}
                if load_all_variants
                else False,
                "current_variant": {"include": {"grades": True}}
                if load_current_variant
                else False,
            },
        )
        logger.debug(grade_system)
        return grade_system


async def create_grade_system_variant(
    grade_system: GradeSystemVariantDTO | NewGradeSystemDTO,
):
    async with DB.manager() as data:
        return await data.grade_system_variant.create(
            {
                "type": grade_system.type.value,
                "description": grade_system.description,
                "grades": {
                    "create": [
                        {
                            "name": grade.name,
                            "description": grade.description,
                            "value": grade.value,
                        }
                        for grade in grade_system.grades
                    ]
                },
            },
            include={
                "grades": True,
                "current_grade_system": True,
            },
        )


async def create_grade_system(grade_system: NewGradeSystemDTO):
    async with DB.manager() as data:
        variant = await create_grade_system_variant(grade_system)
        return await data.grade_system.create(
            data={
                "name": grade_system.name,
                "variants": {
                    "connect": [
                        {
                            "id": variant.id,
                        }
                    ]
                },
                "current_variant": {"connect": {"id": variant.id}},
            },
            include={"current_variant": {"include": {"grades": True}}},
        )


async def update_grade_system(grade_system: GradeSystemUpdateDTO):
    async with DB.manager() as data:
        variant = await create_grade_system_variant(grade_system.current_variant)
        return await data.grade_system.update(
            data={
                "name": grade_system.name,
                "current_variant": {"connect": {"id": variant.id}},
                "variants": {"connect": [{"id": variant.id}]},
            },
            where={"id": grade_system.id},
        )


async def delete_grade_system(id: int):
    async with DB.manager() as data:
        await data.grade_system.delete(where={"id": id})
