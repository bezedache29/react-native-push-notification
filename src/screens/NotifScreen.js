import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import PushNotification, {Importance} from 'react-native-push-notification'

export default function NotifScreen() {

  useEffect(() => {
    createChannels()
  }, [])

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        // playSound: true, // (optional) default: true
        // soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        // vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    )
  }

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'channel-id',
      title: 'You clicked me',
      message: 'You clicked me !! Super that\'s a message',
      bigText: 'Une grosse description que l\'on peut voir quand on déplie la notification',
      color: 'red',
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    })
  }

  // Notification qui se déclenchera dans 20 sec et meme appli eteinte
  const scheduleNotif = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'channel-id',
      title: 'Alarm',
      message: 'Hey ! After 20 sec !',
      date: new Date(Date.now() + 20 * 1000), // Date a laquel la notif ce trigger
      allowWhileIdle: true // Permet de lancer la notification, meme si l'app est éteinte
    })
  }

  const firebaseNotif = () => {
    // On cré une notif sur firebase a un user précis pour qu'il la recoit
  }

  return (
    <View>
      <Button title='Push Local Notification' onPress={handleNotification} />
      <Button title='Push Notification Schedule' onPress={scheduleNotif} />
      <Button title='Push Notification Firebase' onPress={firebaseNotif} />
    </View>
  )
}