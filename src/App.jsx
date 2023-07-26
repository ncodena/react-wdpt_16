
import './App.css'
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';
import Student from './components/Student';

function App() {
  const someData = "Hello there!";
  const students = [
    {
        id: 1,
        name: 'Keyvan'
    },

    {
        id: 2,
        name: 'Sanja'
    },
    {
        id: 3,
        name: 'Anna'
    },
    {
        id: 4,
        name: 'Mateo'
    }
]

const handleClick = () => {
  console.log('clicked');
}

//This function takes a name argument and logs a message to the console with the provided name
const handleClickParent = (name) => {
  console.log(`${name} clicked`);
}

  return (
    <>
      <FirstComponent greeting={someData} />
      <SecondComponent />

      <button onClick={handleClick}>click me from parent</button>

      {/*Using the map method, the students array is iterated, and for each student, the Student component is rendered. StudentName and the handleClickParent function are passed as a props */}
      {students.map((student => (
        <Student key={student.id} studentName={student.name} clickFunction={handleClickParent} />
      )))}

      
    </>
  )
}

export default App
