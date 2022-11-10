import { useState , useEffect} from 'react'
import './App.css'
import Die from "./die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

function App() {

  const [dice, setDice] = useState(allNewDice())
  // console.log(dice);
  const [tenzies ,setTenzies] = useState(false)
  // console.log(tenzies);

  useEffect(()=>{
    let success = true;

    for(let i = 0; i < dice.length ; i++){
      if(!dice[i].isHeld || dice[i].value !== dice[0].value){
            success = false;
            break;
          }
    }
    setTenzies(success);

  },[dice])

  function allNewDice(first){
    const randomNumbers = [];
    for(let i = 0; i < 10; i++) {
      //randomNumbers.push(Math.ceil(Math.random() * 6))
        randomNumbers.push({
          key : i+1,
          value : Math.ceil(Math.random() * 6), 
          isHeld : false
        })
    }
    return randomNumbers;
  }

  function getNewDice(){
    const randomNumbers = [];
    dice.forEach(die =>{
      if(!die.isHeld){
        randomNumbers.push({
                ...die,
                 value : Math.ceil(Math.random() * 6), 
                 isHeld : false
               })
      }else{
        randomNumbers.push({
          ...die
        })
      }
    });
    return randomNumbers;
  }

  function holdDice(index){
    const randomNumbers = [];
    dice.forEach(die =>{
      if(index === die.key){
        randomNumbers.push({
                 ...die,
                 isHeld : !die.isHeld
               })
      }else{
        randomNumbers.push({
          ...die
        })
      }
    });
    setDice(randomNumbers)
  }

  function rollDice(){
    if(!tenzies)
    setDice(getNewDice())
    else
    setDice(allNewDice())
  }

  const diceElements = dice.map(die => <Die 
    value={die.value} 
    key={die.key} 
    isHeld = {die.isHeld} 
    change={holdDice}
    id = {die.key}
    />)
    const { width, height } = useWindowSize();

  return (
    <div className="App">
      <main className='box'>
        <div className='text'>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </div>
          <div className="dice-container">
                {diceElements}
          </div>
          <button 
            className='roll'
            onClick={rollDice}
            >{tenzies? "Reset":"Roll"}
          </button>
      </main>
      {tenzies && <Confetti
           width={width}
           height={height}
           />}
    </div>
  )
}

export default App

// todo:
// CSS: put real dots on the dice
// track hte number of rolls 
// track the time 
// save best score in localStorage
