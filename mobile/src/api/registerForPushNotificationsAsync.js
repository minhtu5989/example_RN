import { Permissions, Notifications } from 'expo';
import { customersApi } from './Api';

export const registerForPushNotificationsAsync = async(info) => {
    // check for existing permissions ...
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  let finalStatus = status;
  
    //check if no existing permission, ask user for permission...
  if(status !== 'granted') {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    finalStatus = status;
  }
  
    //check if no permission, exit the function
  if(finalStatus !== 'granted'){ 
    return ;
  }
  
    // get push notification token
  let token = await Notifications.getExpoPushTokenAsync() 
  console.log('__token-Notifi', token);
  
    //POST the token to your backend server from where you can retrieve it to send push notifications.
  return await customersApi
    .url('/user/notifiToken')
    .headers({ 
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
    .post({ 
      _id: info._id,
      token: token
    })
    .json();

}