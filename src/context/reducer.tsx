import { User, VideoInfo } from "../models";
import { StateContext } from "./state";
export enum ActionType {
  SIGN_IN = 'Log out',
  SIGN_OUT = 'Sign out',
  SET_VIDEOS = 'Set Videos',
}

export type Action =
  | { type: ActionType.SIGN_IN, payload: { user: User } }
  | { type: ActionType.SIGN_OUT }
  | { type: ActionType.SET_VIDEOS,payload:{videos:VideoInfo[]}}


export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return { ...state, isAuthenticated: true, user: action.payload.user }
    case ActionType.SET_VIDEOS:
      return { ...state, isAuthenticated: true, videos: action.payload.videos }
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false }
    default:
      throw new Error('Not among actions');
  }
}