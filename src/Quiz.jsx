import { decode } from "html-entities";
import React from "react";

export default function Quiz(props){
  
  const allAnswers = props.answers


  // function to update the array based on the user selection
  function update(question,answer){
   
    props.updateArr(question,answer)
  }
  
  return(
    <div>
      <h2>{decode(props.question)}</h2>
      {allAnswers.map((answer,index) => {
        return <button
          className={`
            ${answer === props.userSelection ? 'selected':''}
            ${props.showResults && answer === props.correctAns ? 'correct':''}
            ${props.showResults && answer === props.userSelection && answer !== props.correctAns ? 'incorrect':''}
            ${props.showResults && answer !== props.correctAns ? 'dim':''}
            `
          }
          key={index}
          onClick={()=>update(props.question,answer)}
          disabled ={ props.showResults && true}
        >{decode(answer) }
        </button>
      })}
      <hr/>
    </div>
  )
}