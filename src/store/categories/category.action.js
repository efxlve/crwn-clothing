import { CATEGORIES_ACTIONS_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailure = (error) => createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_FAILURE, error);