import { Router } from 'express';

import { 
    create, 
    userAddresses,
    update
} from './address.controller';
import { customerAuth } from '../customer';

const routes = Router();

routes.post('/', customerAuth, create)
routes.get('/', customerAuth, userAddresses)
routes.put('/:_id', customerAuth, update)

export default routes;
