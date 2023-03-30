import CMedia from '../../constants/CMedia.js'

const Search = {
  id: 'search',
  label: 'Search Input',
  media: CMedia.search,
  category: 'Extra',
  content: `
  <form>
    <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
      <div class="input-group">
        <div class="input-group-prepend">
          <button data-gjs-type="button" type="submit" class="btn btn-link text-warning"><i class="fa fa-search"></i></button>
        </div>
        <input type="search" class="form-control border-0 bg-light">
      </div>
    </div>
  </form>`,
}

export default Search
