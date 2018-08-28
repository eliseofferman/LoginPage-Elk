import React from "react"
import Round from "./round"

class Rounds extends React.Component {

  render() {

  if(this.props.rounds){ // renders the date form the sperific game round
    return (
      <table>
        <tr>
          <th>Account Id</th>
          <th>Client Mode</th>
          <th>Created</th>
          <th>Currency</th>
          <th>Game Id</th>
          <th>Game Name</th>
          <th>Status</th>
          <th>Total Win</th>
          <th>Total Bet</th>
        </tr>
        {this.props.rounds.map((round, index) => { //renders the each game round
          return <Round key={index} round= {round}/>
        })}
      </table>
    )
  } else { // if no games roud exist on date, component returns null
    return null
  }
  }
}

export default Rounds
