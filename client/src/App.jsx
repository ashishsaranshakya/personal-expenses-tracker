import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context/globalContext';
import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Navigation from './Components/NavigationMenu/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expense from './Components/Expense/Expense';
import Transactions from './Components/Transactions/Transactions';
import Categories from './Components/Categories/Categories';

function App() {
  const [active, setActive] = useState(1);
  const globalContext = useGlobalContext();

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        setActive(1);
        break;
      case '/transactions':
        setActive(2);
        break;
      case '/incomes':
        setActive(3);
        break;
      case '/expenses':
        setActive(4);
        break;
      case '/categories':
        setActive(5);
        break;
      default:
        setActive(1);
        break;
    }
    globalContext.getProfile();
  }, []);

  return (
    <AppStyled bg="/bg.png">
      <MainLayout>
        <Router>
          <Navigation active={active} setActive={setActive} />
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/transactions" element={<Transactions/>} />
            <Route path="/incomes" element={<Income/>} />
            <Route path="/expenses" element={<Expense/>} />
            <Route path="/categories" element={<Categories/>} />
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
