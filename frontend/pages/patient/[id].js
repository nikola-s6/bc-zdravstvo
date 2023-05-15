import { useRouter } from "next/router"

export default function Patient({ id }) {
  const router = useRouter()

  return <div>Ovo je stranica sa informacijama pacijenta: {router.query.id}</div>
}
