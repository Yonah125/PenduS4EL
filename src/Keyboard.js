import React from 'react';

class Keyboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
			keys:this.createArray(),
   
            onClick:props.onClickFunction,
            disabledLetters: []
        }
    }

    createArray() {
        let keys = []
        for (let idx = 65; idx < 65 + 25; idx++) {
            keys[idx - 65] = idx
        }

        return keys;
    }
    
    



    isKeyDisabled(keyClicked) {
        return this.state.disabledLetters.includes(keyClicked)
    }

    setKeyDisabled(keyClicked)  {
        this.state.disabledLetters.push(keyClicked)
    }

    render() {

        // In the following, arrayIndex used to provide a key prop, to avoid warning
        return (
            <div className="App-keyboard">
				<div>
                {
                    this.state.keys.map(
                        (keyCode, arrayIndex) =>

                        <input key={arrayIndex}
                               type="button"
                               value={String.fromCharCode(keyCode)}
                               disabled={this.isKeyDisabled(keyCode)}
                               onClick={() =>
                               {
                                   this.setKeyDisabled(keyCode)
                                   this.state.onClick(String.fromCharCode(keyCode))
                               }}/>)
                               
                }
                </div>
                
            </div>
        )
    }
}

export default Keyboard
