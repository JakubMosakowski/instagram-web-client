import {Routes, Route} from 'react-router-dom';
import Browse from './components/browse/Browse';

function App() {
    return (
        <Routes>
            <Route path="/browse" element={<Browse/>}/>
        </Routes>
    );
}

export default App;
