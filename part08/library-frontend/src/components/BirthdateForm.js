import { useState } from "react"
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"

const BirthdateForm = (props) => {

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    editAuthor({variables: {name, setBornTo: Number(birthdate)}})
    setName("")
    setBirthdate("")

  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        name
        <input 
          type="text" 
          value={name} 
          onChange={(e) => {setName(e.target.value)} }
        />
      </div>
      <div>
        born
        <input 
          type="text" 
          value={birthdate} 
          onChange={(e) => {setBirthdate(e.target.value)} }
        />
      </div>
      <button type="submit">update author</button>
      
    </form>
  )
}

export default BirthdateForm