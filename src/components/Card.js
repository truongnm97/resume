import React from 'react'
import styled from 'styled-components'
import Buttons from './Buttons'
import { colors } from '../config'

const CardComponent = styled.section`
  margin: 15px 0;
  background: ${(props) => props.background ?? colors.cardBackground};
  box-shadow: 0px 25px 60px rgba(25, 11, 57, 0.25);
  border-radius: 20px;
  padding: 70px 30px;
  font-weight: normal;
  font-size: 1.125rem;
  position: relative;
  font-family: 'Inconsolata', monospace;
  transform: translate(0, 0);

  a:link {
    color: #61dafb;
  }
  a:visited {
    color: #8d92df;
  }
  a:hover,
  a:active {
    color: #61dafb;
  }
`

const Heading = styled.h2`
  font-family: 'Inconsolata', monospace;
  display: inline;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin: 0;
  padding: 0;
  color: ${colors.primary};

  :before {
    font-family: 'Inconsolata', monospace;
    content: 'export const ';
    color: #fce2bb;
  }
  :after {
    font-family: 'Inconsolata', monospace;
    content: ' = ';
  }
`

const Space = styled.span`
  :before {
    font-family: 'Inconsolata', monospace;
    color: #fce2bb;
    content: '() ';
  }
  :after {
    font-family: 'Inconsolata', monospace;
    color: ${colors.primary};
    content: '=> ( ';
  }
`

const Text = styled.p`
  margin: 0;
  padding: 0;
  margin-left: 20px;

  @media screen and (max-width: 600px) {
    margin-left: 10px;
  }
`

const Code = styled.code`
  font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  :after {
    content: ');';
    color: ${colors.primary};
  }
`

const HeaderButtons = styled(Buttons)`
  position: absolute;
  left: 15px;
  top: 15px;
`

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  cursor: move;
`

const Card = ({ header, children, text, background }) => {
  const onDragStart = (e) => {
    const { parentNode } = e.target
    if (parentNode) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/html', parentNode)
      e.dataTransfer.setDragImage(parentNode, parentNode.clientWidth / 2, 20)
    }
  }

  return (
    <CardComponent background={background}>
      <Header onDragStart={onDragStart} draggable />
      <HeaderButtons />
      <Heading export>{header}</Heading>
      <Space />
      <Code>{text ? <Text>{children}</Text> : children}</Code>
    </CardComponent>
  )
}

export default Card
