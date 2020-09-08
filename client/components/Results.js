import React, {Component} from 'react'
import axios from 'axios'

export default class Results extends Component {
  render() {
    const {q, nominated, movies, updateMovies} = this.props
    return (
      <div className="main">
        <div className="results">
          <h3>Search Results {q === '' ? null : `for "${q}"`}</h3>
          <div>
            <ul>
              {!movies ? (
                <li>Nothing to see here! Search for a different title.</li>
              ) : (
                movies.map(m => {
                  return (
                    <li key={m.imdbID}>
                      <strong>{m.Title}</strong>, {m.Year}
                      {nominated.find(n => n.imdbID === m.imdbID) ? (
                        <button type="button" className="nominated" disabled>
                          <i className="far fa-star" /> Nominated
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="nominate"
                          disabled={nominated.length === 5}
                          onClick={async () => {
                            await axios.post(`/api/movies`, {
                              title: m.Title,
                              year: m.Year,
                              imdbID: m.imdbID
                            })
                            updateMovies()
                          }}
                        >
                          <i className="fas fa-star" /> Nominate
                        </button>
                      )}
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
