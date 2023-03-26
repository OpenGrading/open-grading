import logging
from fastapi import APIRouter, HTTPException
from prisma.types import Grade_System_VariantInclude, Grade_System_VariantIncludeFromGrade_System

from ogr.db import grade_system
from ogr.models.grade_system import GradeSystemDTO, NewGradeSystemDTO

router = APIRouter(prefix="/grade-systems", tags=["grade-systems"])
logger = logging.getLogger(__name__)


@router.get("/", response_model=dict[str, list[GradeSystemDTO]])
async def get_grade_system_list():
    grade_system_list = await grade_system.get_grade_systems()
    logger.debug(grade_system_list)
    return {"gradeSystems": grade_system_list}


@router.get("/{grade_system_id}", response_model=dict[str, GradeSystemDTO])
async def get_grade_system(
    grade_system_id: int,
    load_current_variant: bool = False,
    load_all_variants: bool = False,
):
    current_gs = await grade_system.get_grade_system(
        grade_system_id, load_current_variant, load_all_variants
    )
    if not current_gs:
        raise HTTPException(404)

    return {"gradeSystem": current_gs}


@router.post("/", response_model=dict[str, GradeSystemDTO])
async def create_grade_system(grade_system_data: NewGradeSystemDTO):
    gs = await grade_system.create_grade_system(grade_system_data)
    logger.debug(gs)
    return {"gradeSystem": gs}


@router.delete("/{grade_system_id}", response_model=dict[str, str])
async def delete_grade_system(grade_system_id: int):
    await grade_system.delete_grade_system(grade_system_id)
    return {"success": True, "removed_id": grade_system_id}
