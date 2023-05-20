import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, address } from "@/constants"
import PatientData from "@/components/PatientData"
import OwnerMenu from "@/components/OwnerMenu"
import AdminMenu from "@/components/AdminMenu"

export default function Patient() {
  const [credentials, setCredentials] = useState("")
  const [patientAddress, setPatientAddress] = useState("")

  const { chainId: chainIdHex, account } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const contractAddress = chainId in address ? address[chainId] : null

  const router = useRouter()
  const { id } = router.query

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
      console.log(account + " is a " + cred)
    }
    if (account) {
      fetchData()
    }
  }, [account])

  useEffect(() => {
    console.log(router.isReady)
    console.log(id)
    if (router.isReady) {
      setPatientAddress(id)
      console.log("setovano")
    }
  }, [router.isReady])

  function getMenu() {
    if (credentials == "admin") {
      return <AdminMenu></AdminMenu>
    } else if (credentials == "owner") {
      return <OwnerMenu></OwnerMenu>
    } else {
      return <></>
    }
  }

  if (account) {
    return (
      <div>
        {getMenu()}
        <PatientData credentials={credentials} patientAddress={patientAddress}></PatientData>
      </div>
    )
  } else {
    return <h1>You don't have permission, you are not logged in!!!</h1>
  }
}
