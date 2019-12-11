import React, { useState } from "react"
import Select from "react-select"
import Counter from "./Counter"
import options from "../hooks/counters"

export default function({ keypoints }) {
  const [selectedOption, selectOption] = useState(null)
  if (!selectedOption) {
    return (
      <Select
        value={selectedOption}
        options={options}
        onChange={selectOption}
        placeholder="Select counter"
      />
    )
  }
  return (
    <>
      <Select
        onMenuOpen={() => {
          selectOption(null)
        }}
      />
      <Counter
        counter={selectedOption.value}
        keypoints={keypoints}
        label={selectedOption.label}
      />
    </>
  )
}
