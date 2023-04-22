/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GradeDTO } from './GradeDTO';
import type { GradeSystemType } from './GradeSystemType';

export type GradeSystemVariantDTO = {
  id: number;
  description?: string;
  grades?: Array<GradeDTO>;
  created_at: string;
  updated_at: string;
  type: GradeSystemType;
  current_grade_system_id?: number;
};

