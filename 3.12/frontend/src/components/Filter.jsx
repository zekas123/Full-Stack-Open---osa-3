const Filter = ({ printName, searchName }) => {
  return (
    <div>
      filter shown with: <input 
        value={printName}
        onChange={(e) => searchName(e.target.value)}
      />
    </div>
  )
}

export default Filter