import React from 'react'
import { Card, CodeElement } from './components'
import styled from 'styled-components'
import { colors } from './config'

const AppContainer = styled.main`
  background-color: ${colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`

const Code = styled.span`
  font-size: 1.125rem;
`

function App() {
  const getRandomColor = () => {
    const min = 40
    const max = 100
    const number = Math.floor(Math.random() * (max - min + 1)) + min
    const color = colors.cardBackground
    const regex = /(rgb\((\s*\d{2},?)*)(\s*\d{2},?)\)/g
    const subst = `$1 ${number})`
    return color.replace(regex, subst)
  }

  return (
    <AppContainer>
      <div className='container'>
        <div className='row'>
          <div className='col-md'>
            <Card header='Avatar' background={getRandomColor()} text>
              <CodeElement element='<p>' />
              <Code>Hello</Code>
              <CodeElement element='<p>' />
            </Card>
          </div>
          <div className='col-md'>
            <Card header='Avatar' background={getRandomColor()} text>
              <CodeElement element='<p>' />
              <Code>Hello</Code>
              <CodeElement element='<p>' />
            </Card>
          </div>
        </div>
      </div>
    </AppContainer>
  )
}

export default App
