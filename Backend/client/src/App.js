import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context/globalContext';
import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Navigation from './Components/NavigationMenu/Navigation';


function App() {
  const [active, setActive] = useState(1);
  const globalContext = useGlobalContext();

  useEffect(() => {
    globalContext.getProfile();
  }, []);

  return (
    <AppStyled bg="/bg.png">
      <MainLayout>
        <Router>
          <Navigation active={active} setActive={setActive} />
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/transactions" element={<h1>Transactions</h1>} />
            <Route path="/incomes" element={<h1>Incomes</h1>} />
            <Route path="/expenses" element={<h1>Expenses</h1>} />
          </Routes>
        </Router>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
