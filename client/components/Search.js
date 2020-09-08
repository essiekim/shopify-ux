import React, {Component} from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'

import '../global.css'
import '../css/Splash.css'
import '../css/Search.css'
import Nominated from './Nominated'
import Results from './Results'

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      nominated: [],
      q: ''
    }
    this.getMovies = this.getMovies.bind(this)
    this.currentQ = this.currentQ.bind(this)
    this.updateMovies = this.updateMovies.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/movies')
    this.setState({
      nominated: data
    })
  }

  async updateMovies() {
    const {data} = await axios.get('/api/movies')
    this.setState({
      nominated: data
    })
    this.completedAlert()
  }

  getMovies(data) {
    this.setState({
      movies: data
    })
  }

  currentQ(data) {
    this.setState({q: data})
  }

  completedAlert() {
    if (this.state.nominated.length === 5) {
      alert(
        "You're done! Feel free to revise your choices by un-starring and nominating others!"
      )
    }
  }

  render() {
    return (
      <div>
        <div className="main col splash">
          <SearchBar getMovies={this.getMovies} currentQ={this.currentQ} />
        </div>

        <div className="row main">
          <Results
            q={this.state.q}
            nominated={this.state.nominated}
            movies={this.state.movies}
            updateMovies={this.updateMovies}
          />
          <Nominated
            nominated={this.state.nominated}
            updateMovies={this.updateMovies}
          />
        </div>
      </div>
    )
  }
}
