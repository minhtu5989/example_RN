import wretch from 'wretch';

export const PushNotification = async(info, mess) => {
    return (
        info.notifiToken.forEach( el => {
            await wretch(`https://exp.host`)
            .url('/--/api/v2/push/send')
            .headers({ 
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            })
            .post(
                {
                    to: el.token,
                    sound: "default",
                    title: `Tin nhắn từ ${info.firstName} ${info.lastName}`,
                    body: mess.text,
                    data: mess,
                    priority: 'hight'
                }
            )
            .json()
        })
    )
}