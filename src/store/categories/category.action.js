import { CATEGORIES_ACTIONS_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategories = (categoriesArray) => createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES, categoriesArray);