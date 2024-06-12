import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home';
import Signup from '../src/components/Signup';
import Subscription from '../src/components/Subscription';
import { Theme } from '@radix-ui/themes';

export default function App() {
  return (
    <Theme
      accentColor='mint'
      grayColor='gray'
      panelBackground='solid'
      scaling='100%'
      radius='full'
    >
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/subscription' element={<Subscription />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </Theme>
  );
}
