import React, {Component} from 'react'
import axios from 'axios'

import '../global.css'
import '../css/Search.css'

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      movies: []
    }
  }

  async componentDidMount() {
    let {data} = await axios.get('/api/movies')
    this.setState({
      movies: data
    })
  }

  render() {
    console.log(this.state.movies)
    return (
      <div className="section-search">
        <br />
        <br />
        <div className="main">
          <div className="results row">
            <h3>Search Results for "Avengers"</h3>
            <div>
              <ul>
                {this.state
                  ? this.state.movies.map(m => {
                      return (
                        <li key={m.id}>
                          <strong>{m.title}</strong>, {m.year}
                          <button
                            type="button"
                            onClick={async () => {
                              await axios.delete(`/api/movies/${m.id}`)
                              console.log('deleted?')
                            }}
                          >
                            delete
                          </button>
                        </li>
                      )
                    })
                  : 'Loading'}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
