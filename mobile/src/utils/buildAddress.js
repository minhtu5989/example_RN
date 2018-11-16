export const buildAddress = (address) =>
  address.address_components.reduce((acc, current) => {
    const value = current.long_name;

    if (current.types.includes('street_number')) {
      acc.street = value;
    }

    if (current.types.includes('route')) {
      if (acc.street) {
        acc.street += ' ' + value;
      } else {  
        acc.street = value;
      }
    }

    if (current.types.includes('administrative_area_level_1')) {
      acc.province = value;
    }

    if (current.types.includes('administrative_area_level_2')) {
      acc.city = value;
    }

    if (current.types.includes('administrative_area_level_3')) {
      acc.town = value;
    }

    // if (current.types.includes('country')) {
    //   acc.country = value;
    // }

    if (current.types.includes('locality')) {
      acc.city = value;
    }

    acc._id = address.plaplace_id

    acc.formatted_address = address.formatted_address

    acc.geo = address.geometry.location;

    return acc;
  }, {});
