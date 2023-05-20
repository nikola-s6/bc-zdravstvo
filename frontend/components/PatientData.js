import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, address } from "@/constants"
import { useRouter } from "next/router"
import Loader from "./Loader"
import AddPatientRecordModal from "./AddPatientRecordModal"
import PatientRecords from "./PatientRecords"

export default function PatientData({ credentials }) {
  const router = useRouter()
  const [patientAddress, setPatientAddress] = useState(router.query.id)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastname] = useState("")
  const [phoneNum, setPhoneNum] = useState("")
  const [email, setEmail] = useState("")
  const [rAddress, setRAddress] = useState("")
  const [gender, setGender] = useState(0)
  const [reports, setReports] = useState([])
  const [exists, setExists] = useState(false)

  const [loaded, setLoaded] = useState(false)

  const { chainId: chainIdHex, isWeb3Enabled, enableWeb3, authenticate } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const contractAddress = chainId in address ? address[chainId] : null

  const { runContractFunction: getPatient } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getPatient",
    params: { _patientAddress: patientAddress },
  })

  useEffect(() => {
    async function fetchPatientData() {
      console.log(isWeb3Enabled)
      if (!isWeb3Enabled) {
        await enableWeb3()
        await authenticate()
      }
      console.log(router.query.id)
      setPatientAddress(router.query.id)
      let data = await getPatient({
        onError: (error) => console.log(error),
      })
      console.log(data)
      setLoaded(true)
      if (data) {
        setExists(data.exists)
        setFirstName(data.firstName)
        setLastname(data.lastName)
        setEmail(data.email)
        setPhoneNum(data.phoneNumber)
        setRAddress(data.rAddress)
        setGender(data.gender)
        setReports(data.reports)
      }
    }
    if (router.isReady) {
      fetchPatientData()
    }
  }, [router.isReady, patientAddress])

  if (!loaded) {
    return <Loader></Loader>
  } else {
    if (exists == false) {
      return (
        <div className="mt-40 flex flex-col justify-center items-center">
          <h1 className="text-3xl px-auto">
            {patientAddress
              ? "Patient " +
                patientAddress.slice(0, 6) +
                "..." +
                patientAddress.slice(patientAddress.length - 4) +
                " does not exist"
              : "error"}
          </h1>
        </div>
      )
    } else {
      return (
        <>
          {/* TABLE WITH PATIENT DATA */}
          <div className="flex flex-col justify-center mx-[15vw] mt-20">
            <h1 className="text-xl mb-4">Patient data:</h1>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                <thead class="text-xs text-white uppercase bg-blue-600 dark:text-white">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-blue-500 border-b border-blue-400">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                    >
                      Wallet address
                    </th>
                    <td class="px-6 py-4">{patientAddress}</td>
                  </tr>
                  <tr class="bg-blue-500 border-b border-blue-400">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                    >
                      First name
                    </th>
                    <td class="px-6 py-4">{firstName}</td>
                  </tr>
                  <tr class="bg-blue-500 border-b border-blue-400">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                    >
                      Last name
                    </th>
                    <td class="px-6 py-4">{lastName}</td>
                  </tr>
                  <tr class="bg-blue-500 border-b border-blue-400">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                    >
                      Gender
                    </th>
                    <td class="px-6 py-4">{gender == 0 ? "Male" : "Female"}</td>
                  </tr>
                  <tr class="bg-blue-500 border-b border-blue-400">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                    >
                      Email
                    </th>
                    <td class="px-6 py-4">{email}</td>
                  </tr>
                  <tr class="bg-blue-500 border-blue-40">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                    >
                      Phone number
                    </th>
                    <td class="px-6 py-4">{phoneNum}</td>
                  </tr>
                  <tr class="bg-blue-500 border-blue-40">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                    >
                      Residential address
                    </th>
                    <td class="px-6 py-4">{rAddress}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <PatientRecords records={reports}></PatientRecords>
          <AddPatientRecordModal
            abi={abi}
            contractAddress={contractAddress}
            patientAddress={patientAddress}
            credentials={credentials}
          ></AddPatientRecordModal>
        </>
      )
    }
  }
}
