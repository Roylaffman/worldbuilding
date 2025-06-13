import Header from './Header.jsx'
import Footer from './Footer.jsx' 
import Book from './Book.jsx' 
import Body from './Body.jsx'
import List from './List.jsx'
import Map from './map.jsx'
import Task from './Task.jsx'

function App() {
  return(
    <>
      <Header/>
      <div className="container mx-auto px-4 py-8">

        <Body/>
        <List/>
        <Book/>
        <Body/>
        <Map/>
      </div>
      <Footer/>
    </>
  );

}

export default App
