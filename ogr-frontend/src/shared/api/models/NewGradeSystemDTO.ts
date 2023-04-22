/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GradeSystemType } from './GradeSystemType';
import type { NewGradeDTO } from './NewGradeDTO';

export type NewGradeSystemDTO = {
  description?: string;
  type: GradeSystemType;
  grades?: Array<NewGradeDTO>;
  name: string;
};

