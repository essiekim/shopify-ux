import React, {Component} from 'react'
import axios from 'axios'
import toaster from 'toasted-notes'

import '../global.css'
import '../css/Search.css'
import 'toasted-notes/src/styles.css'

import {Nominated, Results, SearchBar} from './index'

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
      toaster.notify(
        "Yay, you're done! Feel free to revise your choices by un-starring and searching for other movies!",
        {duration: null}
      )
    }
  }

  render() {
    return (
      <div>
        <div className="col splash">
          <nav>
            <img
              src="https://i.ibb.co/6nLDq67/the-Shoppies.png"
              alt="The Shoppies"
              draggable="false"
            />
            <SearchBar getMovies={this.getMovies} currentQ={this.currentQ} />
          </nav>
        </div>
        <h3>Select up to 5 movies to nominate for this year's Shoppies.</h3>

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
