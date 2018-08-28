import React from "react"

import "./searchfield.css"

class SearchField extends React.Component {

  state = {
    date:"",
  }

  // executed when writing the date
  handleOnChangeDate = (event) => {
    this.setState ({
      date: event.target.value
    })
  }

  // executed when the button for search a date is pressed
  handleDate = (event) => {
    event.preventDefault()
    this.props.searchDate(this.state.date)
    this.setState({
      date: "",
    })
  }

  render() {
    return ( // renders the date search field and button
      <div className="serchContainer">
        <h2>Serch for game rounds</h2>
        <form onSubmit={this.handleDate}>
          <input
            className="input"
            type="date"
            placeholder="serach for a date"
            value={this.state.date}
            onChange={this.handleOnChangeDate}
          />
          <button>Search</button>
        </form>
      </div>
    )
  }
}

export default SearchField
