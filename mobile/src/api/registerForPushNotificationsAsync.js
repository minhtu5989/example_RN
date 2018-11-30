import { Permissions, Notifications } from 'expo';
import { PUSH_ENDPOINT } from './Api';

export const registerForPushNotificationsAsync = async(_id) => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return await PUSH_ENDPOINT
    .url('/user/notifiToken')
    // .headers({ 
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // })
    .post({
      token,
      _id: _id
    })
    .json();

}