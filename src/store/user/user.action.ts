import { User } from 'firebase/auth';
import { USER_ACTIONS_TYPES } from './user.types';
import { createAction, withMatcher, ActionWithPayload, ActionWithoutPayload } from '../../utils/reducer/reducer.utils';
import { UserData, AdditionalInformation } from '../../utils/firebase/firebase.utils';

export type CheckUserSession = ActionWithoutPayload<typeof USER_ACTIONS_TYPES.CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPayload<typeof USER_ACTIONS_TYPES.SET_CURRENT_USER, UserData>;

export type GoogleSignInStart = ActionWithoutPayload<typeof USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<typeof USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, { email: string, password: string }>;

export type SignUpStart = ActionWithPayload<typeof USER_ACTIONS_TYPES.SIGN_UP_START, { email: string, password: string, displayName: string }>;

export type SignUpSuccess = ActionWithPayload<typeof USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, { user: User, additionalDetails: AdditionalInformation }>;

export type SignInFailed = ActionWithPayload<typeof USER_ACTIONS_TYPES.SIGN_IN_FAILED, Error>;

export type SignInSuccess = ActionWithPayload<typeof USER_ACTIONS_TYPES.SIGN_IN_SUCCESS, UserData>;

export type SignUpFailed = ActionWithPayload<typeof USER_ACTIONS_TYPES.SIGN_UP_FAILED, Error>;

export type SignOutStart = ActionWithoutPayload<typeof USER_ACTIONS_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = ActionWithoutPayload<typeof USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<typeof USER_ACTIONS_TYPES.SIGN_OUT_FAILED, Error>;

export const checkUserSession = withMatcher((): CheckUserSession =>
  createAction(USER_ACTIONS_TYPES.CHECK_USER_SESSION));

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser =>
  createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user));

export const googleSignInStart = withMatcher((): GoogleSignInStart =>
  createAction(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart =>
  createAction(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, { email, password }));

export const signInSuccess = withMatcher((user: UserData & { id: string }): ActionWithPayload<typeof USER_ACTIONS_TYPES.SIGN_IN_SUCCESS, UserData> =>
  createAction(USER_ACTIONS_TYPES.SIGN_IN_SUCCESS, user));

export const signInFailed = withMatcher((error: Error): SignInFailed =>
  createAction(USER_ACTIONS_TYPES.SIGN_IN_FAILED, error));

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart =>
  createAction(USER_ACTIONS_TYPES.SIGN_UP_START, { email, password, displayName }));

export const signUpSuccess = withMatcher((user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
  createAction(USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails }));

export const signUpFailed = withMatcher((error: Error): SignUpFailed =>
  createAction(USER_ACTIONS_TYPES.SIGN_UP_FAILED, error));

export const signOutStart = withMatcher((): SignOutStart =>
  createAction(USER_ACTIONS_TYPES.SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess =>
  createAction(USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher((error: Error): SignOutFailed =>
  createAction(USER_ACTIONS_TYPES.SIGN_OUT_FAILED, error));