from datetime import datetime
from typing import List, Optional

from prisma.enums import GradeSystemType
from pydantic import BaseModel


class GradeDTO(BaseModel):
    id: int
    name: str
    value: float
    level: Optional[int]
    description: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class NewGradeDTO(BaseModel):
    name: str
    value: float
    level: Optional[int]
    description: Optional[str]


class GradeSystemVariantDTO(BaseModel):
    id: int
    description: Optional[str]
    grades: List[GradeDTO] = []
    created_at: datetime
    updated_at: datetime
    type: GradeSystemType
    current_grade_system_id: Optional[int]

    class Config:
        orm_mode = True


class NewGradeSystemVariantDTO(BaseModel):
    description: Optional[str]
    type: GradeSystemType
    grades: List[NewGradeDTO] = []


class GradeSystemDTO(BaseModel):
    id: int
    name: str
    created_at: datetime
    updated_at: datetime
    variants: Optional[List[GradeSystemVariantDTO]] = []
    current_variant: Optional[GradeSystemVariantDTO]
    current_variant_id: Optional[int]

    class Config:
        orm_mode = True


class GradeSystemUpdateDTO(GradeSystemDTO):
    current_variant: GradeSystemVariantDTO


class NewGradeSystemDTO(NewGradeSystemVariantDTO):
    name: str
