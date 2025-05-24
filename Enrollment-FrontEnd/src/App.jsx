import { BrowserRouter } from 'react-router-dom';  
import { RoutesComponent } from './Router';   
import './App.css'

function App() {
  return (
    <BrowserRouter>  {/* Wrap RoutesComponent with BrowserRouter */}
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App
