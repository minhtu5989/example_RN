import wretch from 'wretch';
import { BASE_URL  } from "../constants/index";

export const customersApi = wretch(`${BASE_URL}/customers`);
