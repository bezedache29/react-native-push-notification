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
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    })
  }

  return (
    <View>
      <Button title='Push Notification' onPress={handleNotification} />
    </View>
  )
}