import React from 'react'
import Container from 'react-bootstrap/Container'
import Header from './Header.jsx'
import Body from './Body.jsx'
import Footer from './Footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <Container>
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </Container>
  )
}

export default App;
