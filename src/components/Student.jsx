
const Student = ({studentName, clickFunction}) => {

  return (
    // Inside the arrow function, clickFunction, the function passed as a prop to the Student component, is passed as a callback.
    // Remember that a a callback is a function that is passed as an argument to another function and is intended to be executed at a later time or under specific conditions.
    <button onClick={() => clickFunction(studentName)}>{studentName}</button>
  )
}

export default Student