import Customer from './customer.model';
import { buildCustomerInfo } from './buildCustomerInfo';
import { AuthServices } from '../../services/Auth';

export const customerAuth = async (req, res, next) => {
  const token = AuthServices.getTokenFromHeaders(req);

  if (!token) {
    req.user = null;

    return res.sendStatus(401);
  }

  const customer = await Customer.findById(token.id);

  if (!customer) {
    req.user = null;

    return res.sendStatus(401);
  }

  req.user = customer;

  return next();
};

export const getOrCreateCustomer = async (info, providerName) => {
  const customerInfo = buildCustomerInfo(info, providerName);

  try {
    const _customer = await Customer.findOne({ email: customerInfo.email });

    const { provider, ...userInfo } = customerInfo;

    if (!_customer) {
      const customer = await Customer.create({
        ...userInfo,
        provider: [provider],
      });

      return customer;
    }

    const providerExist = _customer.provider.find(
      el =>
        el.uid === customerInfo.provider.uid &&
        el.type === customerInfo.provider.type,
    );

    if (providerExist) {
      return _customer;
    }

    _customer.provider.push(customerInfo.provider);

    await _customer.save();

    return _customer;
  } catch (error) {
    throw error;
  }
};

export const me = async userId => {
  try {
    const user = await Customer.findById(userId);

    if (!user) {
      throw new Error('User not exist');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const getNotifiToken = async (userId, tokenValue) => {
  try {
    const user = await Customer.findById(userId);
    
    if (!user) {
      throw new Error('User not exist');
    }

    const TokenExisted = user.notifiToken.find(el => el.token === tokenValue)
    if(TokenExisted)
    {
      return 203;
    }

    user.notifiToken.push({ token: tokenValue })

    /* 
      Tránh việc trong mảng bị lặp phần tử
      vì có thể người dùng delete app và register lại lần nữa

      token từ Register ko thể bị trùng vì mỗi thiết bị chỉ có 1 token riêng, không thay đổi dc
      cho nên một thiết bị có thể đky với nhiều user dưới cùng một token Notifi

      notifiToken dạng mảng vì user có thể sử dụng nhiều thiết bị 
    */ 

    await user.save();

    return; 

  } catch (error) {
    throw error;
  }
}
