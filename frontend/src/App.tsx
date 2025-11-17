import './App.css';
// 1. Import our new RobotList component
import RobotList from './RobotList';

function App() {
  return (
    <div className="App">
      <h1>Robot Factory Control Panel</h1>
      <RobotList />
    </div>
  )
}

export default App;