import React from "react"
import { BrowserRouter, Route, Redirect} from "react-router-dom"

import Login from "./login"
import Rounds from "./rounds"
import SearchField from "./searchfield"

import "./app.css"

class App extends React.Component {

  state = {
    tokenID: null,
    gameData: null,
    gameDataSearch: null,
  }

  //Checking if user signed in with correct email and password
  getTokin = (email, password) => {
  fetch('https://papi-stage.contentmedia.eu/2.0/auth/authenticate', {
    method: 'post',
    headers: {
        Accept: "application/json, textplain, */*",
        "Content-Type": "application/json" },
    body: JSON.stringify(
      {
	      "email" : email,
	      "password" : password
      }
    )
  }).then((response) => {
      return response.json()
    }).then((token) => {
      //if user signed in with correct email and password a valid tokenID is received from the API
      if(token.partnersession){
        this.setState({
          tokenID: token.partnersession
        })
        this.getGames()
      } else { //else user is asked to try again to sign in
        alert("Your email or password is not valid. Please try again")
      }
    })
  }

  // with the tokenID set as Authorization a request is send to API get all the game data
  getGames = () => {
    fetch('https://papi-stage.contentmedia.eu/2.0/roundhistory/rounds?accountId=60137&dateFrom=2018-08-16T00:30:10Z&operatorId=7', {
      method: 'get',
      headers: {
        Accept: "application/json, textplain, */*",
        "Content-Type": "application/json",
        Authorization: this.state.tokenID
      }
    }).then((response) => {
        return response.json()
      }).then((data) => {
        if(data.rounds){
          this.setState({
            gameData: data.rounds
          })
          this.dateTransformer()
        }
      })
  }

  //the function transform the format of creation date of game round to YYYY-MM-DD
  dateTransformer = () => {
    const newDate = this.state.gameData.map((round) => {
      const date = round.created
      const resDate = date.split('T');
      const createdDate = resDate[0];
      round.created = createdDate
      return round
    })
  }

  //The function search for the requested date among the gameData and returns a onely game rounds thet was created on the requested date
  searchDate = (date) => {
    const serachResult = (this.state.gameData || []).filter(round => (
    round.created === date
  ))
    if (serachResult.length < 1) {
      alert("No result found on the entered date. Please try another date")
    } else {
      this.setState({ gameDataSearch: serachResult });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="mainContainer">

          <Route exact path="/"
            render={ routeProps => (
              this.state.gameData ? (
                <Redirect to="/home"/>
              ) : (
                <Login
                  login={this.getTokin}
                  {...routeProps} />
              )
            )}/>
          <Route
            path="/home"
            render={routeProps => (
              <SearchField
                searchDate={this.searchDate}
                {...routeProps} />
            )} />
          <Route
            exact path="/home"
            render={routeProps => (
              <Rounds
                rounds={this.state.gameDataSearch}
                {...routeProps} />
            )} />
        </div>
      </BrowserRouter>
    )
  }

}

export default App
