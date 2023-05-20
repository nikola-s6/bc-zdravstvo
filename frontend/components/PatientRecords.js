import { useEffect, useState } from "react"
import { Tab, TabList } from "web3uikit"

export default function PatientRecords({ records }) {
  useEffect(() => {}, [records])

  const unixToRegular = function (unix) {
    let date = new Date(unix * 1000)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDay()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return day + "-" + month + "-" + year + " " + hours + ":" + minutes
  }

  return (
    <div className="flex flex-col justify-center mx-[15vw] my-20">
      <h1 className="text-xl mb-4">Patient records:</h1>
      <TabList isWidthAuto onChange={function noRefCheck() {}} tabStyle="bulbUnion">
        {records.map((record, index) => (
          <Tab tabKey={index + 1} tabName={"Record " + (index + 1)}>
            <div className="flex flex-col">
              <div className="mb-3">
                <h2 className="text-xl text-black">Hospital:</h2>
                <p>{record.hospital}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Doctor:</h2>
                <p>{record.doctor}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Date:</h2>
                <p>{unixToRegular(record.date)}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Diagnosis:</h2>
                <p>{record.diagnosis}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Treatment:</h2>
                <p>{record.treatment}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Medication:</h2>
                <p>{record.medication}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Media link:</h2>
                <p>
                  <a href={"https://" + record.media.cid + ".ipfs.w3s.link"} target="_blank">
                    {record.media.cid + ".ipfs.w3s.link"}
                  </a>
                </p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Media description:</h2>
                <p>{record.media.description}</p>
              </div>
            </div>
          </Tab>
        ))}
      </TabList>
    </div>
  )
}
