const Filter = ({filter, setFilter}) => {
  return (
    <span id="search">
      Search: {' '}
      <input type="text" value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </span>
  )
}

export default Filter;