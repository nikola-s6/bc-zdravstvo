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
      let cred = await getCredentials({
        onError: (error) => console.log(error),
      })
      setCredentials(cred)
      // console.log(account + " is a " + credentials)
    }
    if (account) {
      fetchData()
    }
  }, [account])

  return <>{account ? <HomeLoggedIn credentials={credentials} /> : <HomeLoggedOut />}</>
}
