import HomeLoggedIn from "@/components/HomeLoggedIn"
import HomeLoggedOut from "@/components/HomeLoggedOut"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, address } from "@/constants"

export default function Home() {
  const { chainId: chainIdHex, account } = useMoralis() // chain id is in hex
  const [credentials, setCredentials] = useState("")
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
      let cred = await getCredentials()
      setCredentials(cred)
    }
    fetchData()
  }, [account])

  return <>{account ? <HomeLoggedIn /> : <HomeLoggedOut />}</>
}
