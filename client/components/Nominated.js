import React, {Component} from 'react'
import axios from 'axios'

export default class Nominated extends Component {
  render() {
    const {nominated, updateMovies} = this.props
    return (
      <div className="main">
        <div className="results">
          <h3>Nominated Movies</h3>
          <p>Un-star to remove a movie from the nominations list.</p>

          <div>
            <ul>
              {!nominated ? (
                <li>
                  Nothing to see here! Search and nominate your favorite movies!
                </li>
              ) : (
                nominated.map(m => {
                  return (
                    <li key={m.imdbID}>
                      <button
                        type="button"
                        onClick={async () => {
                          await axios.delete(`/api/movies/${m.imdbID}`)
                          updateMovies()
                        }}
                      >
                        {' '}
                        <i className="far fa-star" />{' '}
                      </button>
                      <strong>{m.title}</strong>, {m.year}
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
