import { onMounted, onUnmounted, ref } from 'vue'

export default function () {
  const coords = ref<{ latitude: number, longitude: number} >({
    latitude: 0,
    longitude: 0
  })
  const isSupported = 'navigator' in window && 'geolocation' in navigator
  let watcher: number
  onMounted(() => {
    if (isSupported) {
      watcher = navigator.geolocation.watchPosition((position) => {
        coords.value = position.coords
      })
    }
  })

  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })
  return { coords, isSupported }
}
