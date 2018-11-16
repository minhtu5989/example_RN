import Address from './address.model';

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

export const updateAddress = async (addressId, newAddressValues) => {
    try {
      const address = await Address.findById(addressId);
      console.log('address received', address);
      console.log('address new', newAddressValues);
      
      if (!address) {
        throw new Error('Address not exist');
      }
  
      // if (address.user.toString() !== userId.toString()) {
      //   throw new Error('Unauthorized');
      // }
  
      /*
        Object.keys trả về một mảng có value từng phần tử là String
        => Object.key(newAddressValues) = ['street', 'town', 'city', 'province', 'city', 'instructions', 'geo','user']
      */
      Object.keys(newAddressValues).forEach(key => {
        if (key === 'geo') {
          address.geo.coords = [
            newAddressValues[key].lng,
            newAddressValues[key].lat,
          ];
        } 
        // else if (key === 'postalCode') {
        //   address.postalCode = newAddressValues[key].replace(/\s/g, '');
        // } 
        else {
          address[key] = newAddressValues[key];
        }
      });
  
      await address.save();
  console.log('update address', address);
  
      return address;
    } catch (error) {
      throw error;
    }
  };