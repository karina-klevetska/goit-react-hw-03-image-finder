import { Component } from 'react'
import './App.css'
import Searchbar from './Components/Searchbar/Searchbar'
import ImageList from './Components/ImageList/ImageList'

class App extends Component {
  state = {
    searchQuery: '',
  }

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery })
  }

  render() {
    const { handleFormSubmit } = this
    const { searchQuery } = this.state
    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageList searchQuery={searchQuery} />
      </div>
    )
  }
}

export default App
