import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

export default function Search() {
  const [address, setAddress] = useState("")
  const router = useRouter()

  const redirect = function (e) {
    e.preventDefault()
    router.push(`/patient/${address}`)
  }

  return (
    <div className="h-[70vh] flex flex-col pt-[10vh] items-center">
      <Image alt="logo" src="/logo2.png" width={500} height={200}></Image>
      <form className="w-[45vw]" onSubmit={redirect}>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-black bg-black rounded-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-balck dark:focus:border-blue-500"
            placeholder="Enter patient wallet address:"
            onChange={(e) => {
              setAddress(e.target.value)
            }}
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-400 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
