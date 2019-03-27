import React, { Component } from 'react';
import './App.css';
import Calendar from './Calendar.jsx';
import moment from 'moment';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      event: false,
    }
  }
  
  
  render() {
    console.log("state dans app", this.state)
    let dayClasses = function(date) {
      let day = date.isoWeekday();
      if (day === 6 || day === 7) {
        return ['weekend'];
      }
      return [];
    };

    return (
      <div className="App">
        <Calendar
          locale="fr"
          startOfWeekIndex={1}
          dayClasses={dayClasses}
        />
      </div>
    );
  }
}

export default App;
