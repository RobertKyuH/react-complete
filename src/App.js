import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot} from 'radium';
import Person from './Person/Person';


class App extends Component {
  state = {
    persons: [
      { id: 'a1', name: 'Max', age: 28},
      { id: 'a2', name: 'Manu', age: 38},
      { id: 'a3', name: 'Que', age: 49}
    ],
    otherState: 'some other values',
    showPersons: false
  }
  
nameChangedHandler = (event, id) => {
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });
  
  const person = {
    ...this.state.persons[personIndex]
  };

  //alternative
  //const person = Object.assign({}, this.state.persons[personIndex])

  person.name = event.target.value

  const persons = [...this.state.persons];
  persons[personIndex] = person;

  this.setState( { persons: persons  } )
}

deletePersonHandler = (personIndex) => {
  //manipulate copy of array, below alternative on ES6
  //const persons = this.state.persons.slice(); 
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons});
}

togglePersonsHandler = () => {
  const doesShow= this.state.showPersons;
  this.setState ({showPersons: !doesShow});
}

  render() {
    const style={
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons=null;

    if (this.state.showPersons) {
      persons = (
          <div>
              {this.state.persons.map((person, index) => {
                return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
              })}
          </div>
      );

      style.backgroundColor = 'red';
      style[':hover']= {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

let classes = [];
if (this.state.persons.length <=2) {
  classes.push('red'); //classes = ['red']
}

if (this.state.persons.length <=1) {
  classes.push('bold'); //classes = ['bold']
}

return (
    <StyleRoot>
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons} 
      </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
