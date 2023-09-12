import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailure } from './category.action';
import { CATEGORIES_ACTIONS_TYPES } from './category.types';

export function* fetchCategoriesStartAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments);
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield* put(fetchCategoriesFailure(error as Error));
    }
}

export function* onFetchCategoriesStart() {
    yield takeLatest(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START, fetchCategoriesStartAsync);
}

export function* categoriesSaga() {
    yield all([
        call(onFetchCategoriesStart)
    ]);
}