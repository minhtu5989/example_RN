import wretch from 'wretch';
import { BASE_URL  } from "../constants/index";

export const customersApi = wretch(`${BASE_URL}/customers`);
export const baseApi = wretch(BASE_URL)
export const PUSH_ENDPOINT = wretch(`${BASE_URL}/users/notifi-token`)
