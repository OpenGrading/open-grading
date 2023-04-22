/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserTagDTO } from './UserTagDTO';

export type UserProfileDTO = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  tags: Array<UserTagDTO>;
};

