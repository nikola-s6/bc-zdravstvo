import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, address } from "@/constants"
import PatientData from "@/components/PatientData"
import OwnerMenu from "@/components/OwnerMenu"
import AdminMenu from "@/components/AdminMenu"

export default function Patient() {
  const [credentials, setCredentials] = useState("")

  const { chainId: chainIdHex, account } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const contractAddress = chainId in address ? address[chainId] : null

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
      return <></>
    }
  }

  return (
    <div>
      {getMenu()}
      <PatientData credentials={credentials}></PatientData>
    </div>
  )
}
