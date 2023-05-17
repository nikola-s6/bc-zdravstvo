import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useMoralis } from "react-moralis"
import { Modal, Typography } from "web3uikit"

export default function AddPatientRecordModal() {
  const [media, setMedia] = useState([])
  const inputRef = useRef()

  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = function () {
    setModalOpen(!modalOpen)
  }

  const { account } = useMoralis()

  const router = useRouter()

  const handleModalSubmit = async function (e) {
    e.preventDefault()
    console.log(media)
  }

  return (
    <>
      <div className="px-50 flex flex-col items-center">
        <button
          type="button"
          className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={toggleModal}
        >
          Add patient record
        </button>
      </div>
      <div className="absolute top-0 left-0">
        <Modal
          cancelText="close"
          id="regular"
          isVisible={modalOpen}
          okText="Create"
          onCancel={function noRefCheck() {
            toggleModal()
          }}
          onCloseButtonPressed={function noRefCheck() {
            toggleModal()
          }}
          onOk={function noRefCheck() {
            let btn = document.getElementById("btnsbmt")
            btn.click()
          }}
          title={
            <div style={{ display: "flex", gap: 10 }}>
              <Typography color="#68738D" variant="h3">
                Create patient record
              </Typography>
            </div>
          }
        >
          <div
            style={{
              padding: "20px 0 20px 0",
            }}
          >
            <form onSubmit={handleModalSubmit} id="forma">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="patient"
                  id="patient"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={router.query.id}
                  disabled
                  readOnly
                />
                <label
                  htmlFor="patient"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Patient
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="doctor"
                  id="doctor"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={account}
                  disabled
                  readOnly
                />
                <label
                  htmlFor="doctor"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Doctor
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="hospital"
                  id="hospital"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="hospital"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Hospital name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label
                  for="diagnosis"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Diagnosis
                </label>
                <textarea
                  id="dianosis"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write patient's diagnosis here..."
                ></textarea>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label
                  for="treatment"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Treatment
                </label>
                <textarea
                  id="treatment"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write patient's treatment here..."
                ></textarea>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="medication"
                  id="medication"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="medication"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Medication
                </label>
              </div>

              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                htmlFor="metia"
              >
                Upload media files
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="media"
                type="file"
                ref={inputRef}
                multiple
                onChange={() => setMedia(inputRef.current.files)}
              />
              <div className="text-xs">{media.length} files uploaded!</div>

              <button type="submit" id="btnsbmt" className="hidden">
                hidden submit
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  )
}
