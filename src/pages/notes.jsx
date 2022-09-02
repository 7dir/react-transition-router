import React from 'react'

function Notes() {
  const tempNotes = ['react', 'site', 'fairtail', 'music']
  const [notes, setNotes] = React.useState(tempNotes)

  const setNote = function (event) {
    console.log(event)
    // console.log(this)
    console.log()
  }

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, index) => {
          return (
            <li key={note}>
              <input key={note} value={note} onChange={() => setNote()}></input>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Notes
