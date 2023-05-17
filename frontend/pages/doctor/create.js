import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, address } from "@/constants"
import AdminMenu from "@/components/AdminMenu"
import OwnerMenu from "@/components/OwnerMenu"
import { useRouter } from "next/router"
import Loader from "@/components/Loader"
import CreateDoctorComponent from "@/components/CreateDoctorComponent"

export default function DoctorCreate() {
  const { chainId: chainIdHex, account } = useMoralis()
  const [credentials, setCredentials] = useState("")
  const chainId = parseInt(chainIdHex)
  const contractAddress = chainId in address ? address[chainId] : null

  const [loaded, setLoaded] = useState(false) //is data fetched

  const router = useRouter()

  const { runContractFunction: getCredentials } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getCredentials",
    params: {},
  })

  useEffect(() => {
    async function fetchData() {
      let cred = await getCredentials({
        onError: (error) => console.log(error),
      })
      setCredentials(cred)
      console.log(account + " is a " + credentials)
    }
    if (account) {
      fetchData()
    }
  }, [account])

  function getMenu() {
    if (credentials == "admin") {
      return <AdminMenu></AdminMenu>
    } else if (credentials == "owner") {
      return <OwnerMenu></OwnerMenu>
    } else {
      return <Loader></Loader>
    }
  }

  return (
    <>
      {getMenu()}
      <CreateDoctorComponent></CreateDoctorComponent>
    </>
  )
}
