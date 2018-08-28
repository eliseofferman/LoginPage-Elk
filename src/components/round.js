import React from "react"

class Round extends React.Component {

  render() {
  const {round} = this.props;

    return ( // renders the date form the sperific game round
      <tr>
        <td>{round.accountId}</td>
        <td>{round.clientMode}</td>
        <td>{round.created}</td>
        <td>{round.currency}</td>
        <td>{round.gameId}</td>
        <td>{round.gameName}</td>
        <td>{round.status}</td>
        <td>{round.totalWin}</td>
        <td>{round.totalBet}</td>
      </tr>
    )
  }
}

export default Round
