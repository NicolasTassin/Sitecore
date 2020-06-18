import React from 'react';
import Collection from './Components/Collection'
import Header from './Components/Header'
import './App.css';
import styled from 'styled-components'

const MainApp = styled.div`
  text-align: center;
  display: flex;
  flex-direction:column;
  justify-content: center;
  width:100%;

`
const AppBody = styled.div`
  
  text-align: center;
  display: flex;
  justify-content: space-around;
  margin: 10% 0;

`

function App() {
  
  return (
    <MainApp>
      <Header />
      <AppBody>
        <Collection/>
        
      </AppBody>
    </MainApp>
  );
}

export default App;
