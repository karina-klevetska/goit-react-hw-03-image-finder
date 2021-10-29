import axios from 'axios'

export class ApiService {
  constructor(BASE_URL, API_KEY) {
    this.BASE_URL = BASE_URL
    this.API_KEY = API_KEY
    this._searchQuery = ''
    this._page = 1
    this.perPage = 12
  }

  get searchQuery() {
    return this._searchQuery
  }

  set searchQuery(value) {
    return (this._searchQuery = value)
  }

  get page() {
    return this._page
  }

  set page(value) {
    return (this._page += value)
  }

  resetPage() {
    return (this._page = 1)
  }

  searchImages = () => {
    let url = `${this.BASE_URL}?q=${this.searchQuery}&page=${this.page}&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.perPage}`
    return axios
      .get(url)
      .then((response) => response.data.hits)
      .catch((error) => {
        console.log(error)
      })
  }
}
