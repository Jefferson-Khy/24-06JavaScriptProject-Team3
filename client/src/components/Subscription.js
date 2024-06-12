import React from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';
import {
  Text,
  Button,
  Card,
  Box,
  Inset,
  Strong,
  Badge,
} from '@radix-ui/themes';

export default function Subscription() {
  const navigate = useNavigate();

  const signupClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <>
      <div className='header-container'>
        <div className='header-content'>
          <img className='cube-icon' src='cube.svg' alt='cube' />
          <a href='/'>
            <h1 className='site-name'>SubFusion</h1>
          </a>
        </div>
      </div>
      <main className='card-container'>
        <Box maxWidth='240px' maxHeight='60%'>
          <Card size='1'>
            <Inset clip='padding-box' side='top' pb='current'>
              <img
                src='https://png.pngtree.com/png-vector/20190107/ourmid/pngtree-animationcomputereditormonitorsoftware-line-icon-png-image_312345.jpg'
                alt='Bold typography'
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width: '100%',
                  height: 150,
                }}
              />
            </Inset>
            <Badge color='green'>
              <Strong size='3'>Daily Subscription</Strong>
            </Badge>
            <Text as='p' size='2'>
              Unlock the power of Sub Fusion software every day with our Daily
              Plan. Seamlessly integrate our cutting-edge features into your
              workflow, ensuring efficiency and productivity round the clock.
              Dive into the world of seamless data management, all for $5 a day.
            </Text>
            <Button variant='soft' onClick={signupClick}>
              BUY
            </Button>
          </Card>
        </Box>
        <Box maxWidth='240px' maxHeight='60%'>
          <Card size='1'>
            <Inset clip='padding-box' side='top' pb='current'>
              <img
                src='https://png.pngtree.com/png-vector/20190107/ourmid/pngtree-animationcomputereditormonitorsoftware-line-icon-png-image_312345.jpg'
                alt='Bold typography'
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width: '100%',
                  height: 150,
                  backgroundColor: 'var(--gray-5)',
                }}
              />
            </Inset>
            <Badge color='green'>
              <Strong size='3'>Monthly Subscription</Strong>
            </Badge>
            <Text as='p' size='2'>
              Maximize your potential with our Monthly Plan. Enjoy uninterrupted
              access to Sub Fusion's suite of tools and resources for a full
              month. With a fixed monthly fee of $20, you'll have the
              flexibility to harness the software's capabilities at your pace.
            </Text>
            <Button variant='soft' onClick={signupClick}>
              BUY
            </Button>
          </Card>
        </Box>
        <Box maxWidth='240px' maxHeight='60%'>
          <Card size='1'>
            <Inset clip='padding-box' side='top' pb='current'>
              <img
                src='https://png.pngtree.com/png-vector/20190107/ourmid/pngtree-animationcomputereditormonitorsoftware-line-icon-png-image_312345.jpg'
                alt='Bold typography'
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width: '100%',
                  height: 150,
                  backgroundColor: 'var(--gray-5)',
                }}
              />
            </Inset>
            <Badge color='green'>
              <Strong size='3'>Semi-Annual Subscription</Strong>
            </Badge>
            <Text as='p' size='2'>
              Take your operations to the next level with our Semi-Annual Plan.
              For a one-time fee of $75, gain six months of comprehensive access
              to Sub Fusion's advanced features. Dive deep into data insights
              and streamline your processes at an unbeatable value.
            </Text>
            <Button variant='soft' onClick={signupClick}>
              BUY
            </Button>
          </Card>
        </Box>
        <Box maxWidth='240px' maxHeight='60%'>
          <Card size='1'>
            <Inset clip='padding-box' side='top' pb='current'>
              <img
                src='https://png.pngtree.com/png-vector/20190107/ourmid/pngtree-animationcomputereditormonitorsoftware-line-icon-png-image_312345.jpg'
                alt='Bold typography'
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width: '100%',
                  height: 150,
                  backgroundColor: 'var(--gray-5)',
                }}
              />
            </Inset>
            <Badge color='green'>
              <Strong size='3'>Yearly Subscription</Strong>
            </Badge>
            <Text as='p' size='2'>
              <Text>
                Commit to excellence with our Yearly Plan. Secure a full year of
                uninterrupted access to Sub Fusion's revolutionary software at a
                discounted rate of $125 per year. Harness the full potential of
                our feature-rich platform to drive innovation and stay ahead of
                the competition.
              </Text>
            </Text>
            <Button variant='soft' onClick={signupClick}>
              BUY
            </Button>
          </Card>
        </Box>
      </main>
    </>
  );
}
