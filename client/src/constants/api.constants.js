import baseUrl from "../baseurl";

const host = baseUrl()

const API_URL = `${host}/api`;

export const API_FETCH_LOAD_FILES = `${API_URL}/upload`

export const API_CREATE_RENT_ADS = `${API_URL}/rent/create-ad`
export const API_FETCH_ALL_RENT_ADS = `${API_URL}/rent/fetch-all`
export const API_FETCH_OFFSET_RENT_ADS = `${API_URL}/rent/fetch-offset`
export const API_FETCH_USER_RENT_ADS = `${API_URL}/rent/fetch-user`
export const API_FETCH_SINGLE_RENT_AD = `${API_URL}/rent/fetch-single-ad`
export const API_FETCH_DELETE_AD = `${API_URL}/rent/delete`
export const API_FETCH_DELETE_AD_AUTH = `${API_URL}/rent/delete-auth`

export const API_FETCH_DATING_CATEGORIES = `${API_URL}/dating/categories`
export const API_FETCH_SINGLE_CATEGORY = `${API_URL}/dating/single-category`
export const API_CREATE_DATING_ADS = `${API_URL}/dating/create-ad`
export const API_FETCH_SINGLE_DATING_AD = `${API_URL}/dating/fetch-single-ad`
export const API_FETCH_DELETE_DATING_AD = `${API_URL}/dating/delete`
export const API_FETCH_DELETE_DATING_AD_AUTH = `${API_URL}/dating/delete-auth`
export const API_FETCH_USER_DATING_ADS = `${API_URL}/dating/fetch-user`
export const API_FETCH_OFFSET_DATING_ADS = `${API_URL}/dating/fetch-offset`

export const API_FETCH_ALL_NEWS = `${API_URL}/news/fetch-all`
export const API_FETCH_NEWS_OFFSET = `${API_URL}/news/fetch-offset`
export const API_FETCH_SINGLE_POST = `${API_URL}/news/fetch-single`
export const API_CREATE_POST = `${API_URL}/news/create-post`