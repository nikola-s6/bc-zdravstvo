import OwnerMenu from "@/components/OwnerMenu"
import { abi, address } from "@/constants"
import { useState } from "react"
import { useMoralis } from "react-moralis"
import { useNotification } from "web3uikit"

export default function AdminCreate() {
  const { chainId: chainInHex, account } = useMoralis()
  const chainId = parseInt(chainInHex)
  const contractAddress = chainId in address ? address[chainId] : null

  const dispatch = useNotification()

  const [walletAddress, setWalletAddress] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [residentialAddress, setResidentialAddress] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const { Moralis } = useMoralis()

  const handleSubmit = async function (e) {
    e.preventDefault()

    const sendOptions = {
      abi: abi,
      contractAddress: contractAddress,
      functionName: "addAdmin",
      params: {
        _adminAddress: walletAddress,
        _firstName: firstName,
        _lastName: lastName,
        _phoneNumber: email,
        _email: phoneNumber,
        _rAddress: residentialAddress,
      },
    }
    console.log(sendOptions)
    try {
      dispatch({
        type: "info",
        message: "Waiting for transaction...",
        title: "Transaction started",
        position: "bottomR",
        icon: "bell",
      })
      setIsCreating(true)

      const transaction = await Moralis.executeFunction(sendOptions)
      const txReceipt = await transaction.wait()
      console.log(transaction)
      console.log(txReceipt)

      dispatch({
        type: "success",
        message: "Admin is successfully added",
        title: "Transaction complete",
        position: "bottomR",
        icon: "bell",
      })
      setIsCreating(false)
    } catch (error) {
      console.log(error)
      dispatch({
        type: "error",
        message: "Transaction reverted",
        title: "Error",
        position: "bottomR",
        icon: "bell",
      })
      setIsCreating(false)
    }

    if (document) {
      const form = document.getElementById("form")
      form.reset()
    }
  }

  if (account) {
    return (
      <>
        <OwnerMenu></OwnerMenu>
        <div className="bg-white rounded-lg p-5 my-10 w-[80vw] mx-auto">
          <h1 className="mb-5 border-double border-b-4 border-black text-xl mb-8">
            Create a admin:
          </h1>
          <form className="text-black" onSubmit={handleSubmit} id="form">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_address"
                id="floating_address"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setWalletAddress(e.target.value)
                }}
                required
              />
              <label
                htmlFor="floating_address"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Wallet address
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name
                </label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="tel"
                  pattern="^\+(381){1}[0-9]{3,14}$"
                  name="floating_phone"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue="+381"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value)
                  }}
                  required
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_residential_address"
                  id="floating_residential_address"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setResidentialAddress(e.target.value)
                  }}
                  required
                />
                <label
                  htmlFor="floating_residential_address"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Residential address
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={isCreating}
            >
              Submit
            </button>
          </form>
        </div>
      </>
    )
  } else {
    return <h1>You don't have permission, you are not logged in!!!</h1>
  }
}
