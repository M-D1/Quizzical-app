import { useState , useEffect } from "react";
import './App.css';
import Quiz from './Quiz'



function App (){
  const[game, setGame] = useState(false)
  
  function startQuiz(){
    setGame(true)
  }


  const [arr,setArr] = useState([]);
  
  const [count ,setCount] = useState(0)
  const [showResults, setShowResults] = useState(false)
 
   
        useEffect(()=> {
           if(arr.length === 0){
             fetch("https://opentdb.com/api.php?amount=5")
          .then(res => res.json())
          .then(date => { 
            
            setArr(date.results.map(item => {
          
            return {
              question:item.question,
              answers: shuffle([item.correct_answer,...item.incorrect_answers]),
              correctAns: item.correct_answer,
              userSelection: ''
           }
         }))

          })}
  },[arr])
    
    
  
// function to shuffle the array
  function shuffle(array){
    for(let i = 0; i < array.length; i++){
    let item = array[i]
    const randomNum = Math.floor(Math.random()* array.length)
    array[i] = array[randomNum]
    array[randomNum] = item
    return array
  }
  }
// function to update the array based on the user selection
  function userSelection(question,answer){
    setArr(oldArr => oldArr.map(newArr => {
      return newArr.question === question ?
       {...newArr, userSelection:answer} : newArr
    }))
  }
//function  to decide what will happen if the check btn is clicked
  function check(){
        // checking if all the answers has been answerd or not 
       const hasSelected = arr.some(value => value.userSelection === '')
        hasSelected ? alert('Answer All The Questions Please') : setShowResults(true)    
        // updaing the count variable to match how many the user get the anwers right
        arr.forEach(item => (
          item.userSelection === item.correctAns && 
          setCount(oldValue => oldValue+1)
        ))
  }
//function  to decide what will happen if the play again btn is clicked
// resiting the state to its default 
    function restartGame(){
      setArr([])
      setCount(0)
      setShowResults(false)  
    }

  const dispalyItems = arr.map((item,index) => {
    return <Quiz
      key={index}
      question = {item.question}
      answers =  {item.answers}
      correctAns = {item.correctAns}
      userSelection = {item.userSelection}
      updateArr ={userSelection}
      showResults ={showResults}
    />
  })
 
  return(
    <main> 
      
      {game ? 
       <div>
     

        {dispalyItems}
        {!showResults ? arr.length > 0 && 
        <div className="btn-check">
        <button onClick={check} className="check">
          Check Answers
          </button>
        </div>
         :
        <div className="results-container">
          <p className="results">You scored {count} correct answers </p>
          <button className="restartGame" onClick={restartGame} >Play Again</button>
        </div>
        }
      
      </div> : 
    <div>
        <h1>Quizzical</h1>
        <button className="startQuiz" onClick={startQuiz}>Start Quiz</button>
      </div>}  
 
    </main>

  )
}

export default App