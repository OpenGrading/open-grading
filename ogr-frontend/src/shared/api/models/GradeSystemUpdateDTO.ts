/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GradeSystemVariantDTO } from './GradeSystemVariantDTO';

export type GradeSystemUpdateDTO = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  variants?: Array<GradeSystemVariantDTO>;
  current_variant: GradeSystemVariantDTO;
  current_variant_id?: number;
};

