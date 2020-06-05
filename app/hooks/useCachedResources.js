import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'roboto-light': require('../assets/fonts/Roboto/Roboto-Light.ttf'),
          'roboto-regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
          'roboto-medium': require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
          'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
          'roboto-black': require('../assets/fonts/Roboto/Roboto-Black.ttf')
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
