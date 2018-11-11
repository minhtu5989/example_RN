import Address from './address.model';
import { userInfo } from 'os';

export const createAddress = async (data) => {
    try {
        const address = await Address.create({
            ...data,
            geo:{
                type: 'point',
                coords: [data.geo.lng, data.geo.lat],
            },
        })
        return address;
    } catch (error) {
        throw error
    }
} 

export const getUserAddress = async (userId) => {
    try {
        const addresses = await Address.find({user: userId})
        
        return addresses;
    } catch (error) {
        throw error
    }
}