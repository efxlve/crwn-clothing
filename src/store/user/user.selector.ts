import { createSelector } from 'reselect';
import { RootState } from '../store';
import { UserState } from './user.reducer';

export const selectUser = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(selectUser,(user) => user.currentUser);