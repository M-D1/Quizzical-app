import { useState ,useEffect} from 'react'

import './App.css'

function App() {
    useEffect(()=>{
      fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
        .then(res => res.json())
        .then(data=> {
          const array = data.results
          array.map(el => {
            console.log(el)
          })
        })
    })


}

export default App
