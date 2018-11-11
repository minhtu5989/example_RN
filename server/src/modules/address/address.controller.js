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