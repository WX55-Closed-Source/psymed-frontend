import { createAction, props } from '@ngrx/store';

export const setRole = createAction(
  '[Auth] Set Role',
  props<{ rolid: string }>()
)