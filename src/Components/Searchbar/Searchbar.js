import { Component } from 'react'
import PropTypes from 'prop-types'
import './Searchbar.css'

class Searchbar extends Component {
  state = {
    searchQuery: '',
  }

  static propTypes = {
    onSubmit: PropTypes.func,
  }

  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  handleSubmit = (e) => {
    const { onSubmit } = this.props
    const { searchQuery } = this.state

    e.preventDefault()

    if (searchQuery.trim() === '') {
      alert('please type your query')
      return
    }
    onSubmit(searchQuery)
    this.setState({ searchQuery: '' })
  }

  render() {
    const { searchQuery } = this.state
    const { handleSubmit, handleInputChange } = this
    return (
      <header className='Searchbar'>
        <form className='SearchForm' onSubmit={handleSubmit}>
          <button type='submit' className='SearchForm-button'>
            <span className='SearchForm-button-label'>Search</span>
          </button>

          <input
            className='SearchForm-input'
            type='text'
            value={searchQuery}
            onChange={handleInputChange}
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
          />
        </form>
      </header>
    )
  }
}

export default Searchbar
