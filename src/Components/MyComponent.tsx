import { useValue } from "../context/ValueProvider"


const MyComponent = () => {
  const { val, setVal } = useValue()


  const handleAdd = () => {
    setVal((prev: number) => prev + 1)
  }

  const handleSubtract = () => {
    setVal((prev: number) => prev - 1)
  }

  const handleReset = () => {
    setVal(0)
  }
  return (
    <>
      <div>
        {val}
      </div>
      <div style={{ display: "flex", margin: '1rem'}}>
        <button onClick={handleAdd}>Add +</button>
        <button onClick={handleSubtract}>subtract -</button>
      </div>
      <button onClick={handleReset}>reset</button>
    </>
  )
}

export default MyComponent
