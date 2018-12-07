import wretch from 'wretch';

export const PushNotification = (info, mess) => {
    if(info._id !== mess[0].user._id){
        info.notifiToken.forEach( async (el) => {
            res = await wretch(`https://exp.host/--/api/v2`)
            .url('/push/send')
            .headers({ 
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            })
            .post(
                {
                    "to": el.token,
                    "sound": "default",
                    "title": `Tin nhắn từ ${info.firstName} ${info.lastName}`,
                    "body": `${mess.text}`,
                    "data": {mess},
                    "priority": "default"
                }
            )
            .json()
            console.log('res',res);
        })
    }
    return 
}