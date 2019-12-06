import React from "react"
import useCounter from "../hooks/useCounter"
import useDrawStatus from "../hooks/useDrawStatus"

export default function({ poses, label, counter }) {
  const count = useCounter({ poses, counter })
  useDrawStatus({ label, count })
  return <></>
}
