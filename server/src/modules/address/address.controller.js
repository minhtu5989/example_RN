import * as Yup from 'yup';
import * as AddressServices from './address';


export const create = async (req, res) => {
  const { data } = req.body;

  const schema = Yup.object().shape({
    street: Yup.string().required(),
    town: Yup.string().required(),
    city: Yup.string().required(),
    province: Yup.string().required(),
    instructions: Yup.string(),
    geo: Yup.object().shape({
      lng: Yup.number().required(),
      lat: Yup.number().required(),
    }),
  });

  try {
    await schema.validate(data);

    const address = await AddressServices.createAddress({
      ...data,
    //   postalCode: data.postalCode.replace(/\s/g, ''),       //xoá  space  trong chuỗi
      user: req.user._id, 
    });

    res.status(201).json({ address });
  } catch (error) {
    res.status(400).json({ message: error.message });
  };
}

export const userAddresses = async (req, res) => {
  try {
    const addresses = await AddressServices.getUserAddress(req.user._id)

    res.status(201).json({ addresses });
    
  } catch (error) {
    console.log('error', error);
    
  }
}

export const update = async (req, res) => {
  try {
    if (!req.body.data) {
      return res.sendStatus(400);
    }

    const address = await AddressServices.updateAddress(
      req.params.id,
      req.body.data,
      req.user._id,
    );

    res.status(200).json({ address });
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}