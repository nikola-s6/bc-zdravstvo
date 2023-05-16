import { useMoralis } from "react-moralis"
import Search from "./Search"
import OwnerMenu from "./OwnerMenu"
import Loader from "./Loader"
import AdminMenu from "./AdminMenu"

export default function HomeLoggedIn({ credentials }) {
  const { account } = useMoralis()

  function pageSelector() {
    switch (credentials) {
      case "doctor":
        return <Search></Search>
      case "patient":
        router.push(`/patient/${account}`)
        break
      case "admin":
        return (
          <div>
            <AdminMenu></AdminMenu>
            <Search></Search>
          </div>
        )
      case "owner":
        return (
          <div>
            <OwnerMenu></OwnerMenu>
            <Search></Search>
          </div>
        )
      default:
        return <Loader></Loader>
    }
  }

  return pageSelector()
}
