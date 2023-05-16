import OwnerMenu from "@/components/OwnerMenu"
import { abi, address } from "@/constants"
import { useRef, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Form, useNotification } from "web3uikit"

export default function AdminCreate() {
  const { chainId: chainInHex } = useMoralis()
  const chainId = parseInt(chainInHex)
  const contractAddress = chainId in address ? address[chainId] : null

  const dispatch = useNotification()

  const [walletAddress, setWalletAddress] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [residentialAddress, setResidentialAddress] = useState("")

  const { Moralis } = useMoralis()

  return (
    <>
      <OwnerMenu></OwnerMenu>
      <div className="mx-[20vw] my-10">
        <Form
          buttonConfig={{
            onClick: function noRefCheck() {},
            theme: "primary",
          }}
          data={[
            {
              inputWidth: "100%",
              name: "wallet address",
              type: "text",
              value: "",
              id: "adresa",
              validation: {
                required: true,
              },
            },
            {
              inputWidth: "100%",
              name: "first name",
              type: "text",
              value: "",
              validation: {
                required: true,
              },
            },
            {
              inputWidth: "100%",
              name: "last name",
              type: "text",
              value: "",
              validation: {
                required: true,
              },
            },
            {
              inputWidth: "100%",
              name: "phone number",
              type: "text",
              value: "+381",
              validation: {
                // regExp: "^381^[0-9]+$",
                required: true,
              },
            },
            {
              inputWidth: "100%",
              name: "your email",
              type: "email",
              validation: {
                // regExp: "^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$",
                required: true,
              },
              value: "",
            },
            {
              inputWidth: "100%",
              name: "residential address",
              type: "text",
              value: "",
              validation: {
                required: true,
              },
            },
          ]}
          onSubmit={async function noRefCheck(data) {
            console.log(data)

            const sendOptions = {
              abi: abi,
              contractAddress: contractAddress,
              functionName: "addAdmin",
              params: {
                _adminAddress: data[0].inputResult,
                _firstName: data[1].inputResult,
                _lastName: data[2].inputResult,
                _phoneNumber: data[3].inputResult,
                _email: data[4].inputResult,
                _rAddress: data[5].inputResult,
              },
            }

            const transaction = await Moralis.executeFunction(sendOptions)
            await transaction.wait()
            console.log(transaction)

            dispatch({
              type: "info",
              message: "Admin is successfully added",
              title: "Transaction complete",
              position: "bottomR",
              icon: "bell",
            })
          }}
          title="Create admin:"
          id="forma"
        />
      </div>
    </>
  )
}
