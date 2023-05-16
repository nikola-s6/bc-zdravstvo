import Link from "next/link"

export default function AdminMenu() {
  return (
    <div className="bg-gray-400 mt-3 py-3 flex flex-row flex-wrap mx-10 rounded-lg">
      <Link href="/doctor/create" className="mr-auto ml-auto">
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Create a doctor
        </button>
      </Link>
      <Link href="/patient/create" className="mr-auto ml-auto">
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Create a patient
        </button>
      </Link>
    </div>
  )
}
