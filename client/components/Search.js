import React, {Component} from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'

import '../global.css'
import '../css/Search.css'

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
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/movies')
    this.setState({
      nominated: data
    })
  }

  getMovies(data) {
    this.setState({
      movies: data
    })
  }

  currentQ(data) {
    this.setState({q: data})
  }

  render() {
    return (
      <div className="section-search">
        <SearchBar getMovies={this.getMovies} currentQ={this.currentQ} />
        <br />
        <br />
        <div className="main">
          <div className="results row">
            <h3>
              Search Results{' '}
              {this.state.q === '' ? null : `for "${this.state.q}"`}
            </h3>
            <div>
              <ul>
                {this.state.movies
                  ? this.state.movies.map(m => {
                      return (
                        <li key={m.imdbID}>
                          <strong>{m.Title}</strong>, {m.Year}
                          {this.state.nominated.find(
                            n => n.imdbID === m.imdbID
                          ) ? (
                            <button
                              type="button"
                              onClick={async () => {
                                await axios.delete(`/api/movies/${m.imdbID}`)
                              }}
                            >
                              <i className="far fa-star" />
                              Nominated
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={async () => {
                                await axios.post(`/api/movies`, {
                                  title: m.Title,
                                  year: m.Year,
                                  imdbID: m.imdbID
                                })
                              }}
                            >
                              <i className="fas fa-star" />
                              Nominate
                            </button>
                          )}
                        </li>
                      )
                    })
                  : 'No results!'}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
