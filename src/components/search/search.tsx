import React, { Dispatch, SetStateAction } from 'react'
import styles from './search.module.scss'
import { ImCross } from 'react-icons/im'

type PropsType = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  setSearchMod: Dispatch<SetStateAction<boolean>>
}

const Search: React.FC<PropsType> = ({ searchTerm, setSearchTerm, setSearchMod }) => {
  return (
    <div className={styles.container}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        placeholder="Search"
        type="text"
        onFocus={() => setSearchMod(true)}
        className={styles.input}
      />
      <ImCross fontSize={24} onClick={() => setSearchMod(false)} />
    </div>
  )
}

export default Search
