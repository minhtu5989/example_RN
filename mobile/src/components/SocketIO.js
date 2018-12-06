import io from 'socket.io-client';

import { BASE_URL } from '../constants/index';

export const socket = io.connect(BASE_URL)
