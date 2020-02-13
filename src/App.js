import React from 'react';

import './App.css';

import Keyboard from "./Keyboard";

const MAX_ERRORS = 7

class App extends React.Component {

    constructor(props) {
        super(props)

        // here I tried to call initialize which contained a setState, but I got a
        // "Can't call setState on a component that is not yet mounted" message
        this.state = {
            words: [''],
            toGuess: '',
            toDisplay: [''],
            numberOfAttempts: 0,
            errors: 0
        }
    }

   componentDidMount() {
	this.setState ({words:["YONAH","DENIS","PIERRE","MANON","ANTONY"]}, () => {this.initialize();});
   	
    }

    initialize() {
        const IDX_OF_WORD_TO_GUESS = Math.floor(Math.random() * Math.floor(this.state.words.length));
        let toDisplay = []
        for (let idx = 0; idx < this.state.words[IDX_OF_WORD_TO_GUESS].length; idx++) {
            toDisplay[idx] = "_";
        }
        this.setState ({
            toGuess: this.state.words[IDX_OF_WORD_TO_GUESS],
            toDisplay: toDisplay,
            numberOfAttempts: 0,
            errors: 0
        })
    }

    // called in an onClick of a button, so a binding is mandatory
    // to access the state
    playAgain = () => {
        this.initialize();
    }

    displayWord() {
        // In the following, arrayIndex used to provide a key prop, to avoid warning
        return this.state.toDisplay.map(
            (keyClicked, arrayIndex) => <span key={arrayIndex} className="oneLetter">{keyClicked}</span>)
    }

    render() {

        return (
            <div className="App">
                <header>
                    <img src={require("./assets/ReactLogo.svg")} height="190px" alt={"react logo"}/>
                </header>
                <div className="App-header">
                    <p className="picture">
                    {this.state.errors > 0?
                    <img src={require("./assets/pendu"+this.state.errors+".png")} alt="hangman"/>:null
                    }
                    </p>
                    <p>
                        {this.displayWord()}
                    </p>
                    <p>#attempt: {this.state.numberOfAttempts}</p>
                </div>
                {this.playerHasLost()?
                    <div className="App-sorry">
                        <input type="button" value="OMG! You're dead! Click to play again" onClick={this.playAgain}/>
                    </div>
                    :
                    this.state.toDisplay.includes("_") ?
                        <Keyboard onClickFunction={this.tryLetter}/>
                        :
                        <div className="App-congrats">
                            <input type="button" value="Congratulations! Click to play again" onClick={this.playAgain}/>
                        </div>
                }
            </div>
        )
    }

  playerHasLost() {
      return this.state.errors === MAX_ERRORS
  }

  // called in an onClick of a button, so a binding is mandatory
  // to access the state
  tryLetter = (keyClicked) => {

        let {errors, numberOfAttempts, toDisplay, toGuess} = this.state

        numberOfAttempts++

        let baseIdx = 0
        let found = false;
        let foundSomething = false
        do {
            let idx = toGuess.indexOf(keyClicked, baseIdx)
            if (idx >= 0) {
                foundSomething = true
                found = true
                toDisplay[idx] = keyClicked;
                baseIdx = idx + 1
            } else {
                found = false
            }
        } while (found)
        if (!foundSomething) {
            errors++
        }
        this.setState({toDisplay: toDisplay, numberOfAttempts: numberOfAttempts, errors: errors})
    }
}

export default App;
