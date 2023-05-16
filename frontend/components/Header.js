import { useMoralis } from "react-moralis"
import { useEffect } from "react"
import { useNotification } from "web3uikit"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

export default function Header() {
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
    useMoralis()
  const dispatch = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (isWeb3Enabled) {
      return
    }
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3()
      }
    }
  }, [isWeb3Enabled])

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`account changed to ${account}`)
      if (account == null) {
        window.localStorage.removeItem("connected")
        deactivateWeb3()
        router.push("/")
      }
    })
  }, [])

  return (
    <div className="sticky top-0 z-50 p-2 border-b-4 border-b-blue-600 flex flex-row items-center bg-blue-400 rounded-b">
      <Link href="/">
        <Image width={170} height={40} alt="logo" src="/logo1.png"></Image>
      </Link>
      <div className="ml-auto py-1 px-1">
        {account ? (
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={function () {
              navigator.clipboard.writeText(account)
              dispatch({
                type: "info",
                message: "Address copied to clipboard",
                title: "Info",
                position: "bottomR",
                icon: "bell",
              })
            }}
          >
            Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
          </button>
        ) : (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={async () => {
              await enableWeb3()
              if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected")
              }
            }}
            disabled={isWeb3EnableLoading}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  )
}
