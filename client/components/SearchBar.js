import React, {Component} from 'react'
import axios from 'axios'
import secret from '../../secrets'

import Search from './Search'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event)
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {data} = await axios.get(
      `http://www.omdbapi.com/?s=${this.state.query}&type=movie&apikey=${
        secret.apiKey
      }`
    )

    this.props.getMovies(data.Search)
    this.props.currentQ(this.state.query)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="searchBar">
            <i className="fas fa-search" />
            <input
              placeholder="Start searching for a nomination-worthy movie title here"
              name="query"
              type="text"
              value={this.state.query}
              onKeyDown={this.onKeyPress}
              onChange={this.handleChange}
            />
          </div>
          <div className="buttonBar">
            <button type="submit" className="searchButton">
              Search
            </button>
            <button type="button" className="nomButton">
              View Nominations
            </button>
          </div>
        </form>
      </div>
    )
  }
}
