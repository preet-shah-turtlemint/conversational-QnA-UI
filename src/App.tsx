import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppHeader from './components/header';
import styled from 'styled-components';
import SideNav from './components/side-nav';
import { RouterConfig } from './__utils/router-config';
import { hasViewPermission } from './__utils/authorization';

const SideNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`

const RouteConfigWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`



function App() {


  return (
    <div className="App">
      {/* <AppHeader /> */}
      {/* <SideNavWrapper>
        <SideNav />
      </SideNavWrapper> */}
      <RouteConfigWrapper>
        <Routes>
          {RouterConfig
            .filter((route) => {
              return hasViewPermission(route.permission)
            })
            .map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </RouteConfigWrapper>
    </div>
  );
}

export default App;