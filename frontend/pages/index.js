import HomeLoggedIn from "@/components/HomeLoggedIn"
import HomeLoggedOut from "@/components/HomeLoggedOut"
import { useMoralis } from "react-moralis"

export default function Home() {
  const { isWeb3Enabled } = useMoralis()
  // return <>{isWeb3Enabled ? <HomeLoggedIn /> : <HomeLoggedOut />}</>
  return <>{window.localStorage.getItem("connected") ? <HomeLoggedIn /> : <HomeLoggedOut />}</>
}
