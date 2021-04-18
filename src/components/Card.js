import React from 'react'
import styled from 'styled-components'
import Buttons from './Buttons'
import { colors } from '../config'

const CardComponent = styled.section`
  margin: 15px 0;
  background: ${(props) => props.background ?? colors.cardBackground};
  box-shadow: 0px 25px 60px rgba(25, 11, 57, 0.25);
  border-radius: 20px;
  padding: 50px 30px;
  font-weight: normal;
  font-size: 1rem;
  position: relative;
  transform: translate(0, 0);

  a {
    color: ${colors.link};
    &:visited {
      color: #8d92df;
    }
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
    color: ${colors.text2};
  }
  :after {
    font-family: 'Inconsolata', monospace;
    content: ' = ';
  }
`

const Space = styled.span`
  :before {
    font-family: 'Inconsolata', monospace;
    color: ${colors.text2};
    content: '() ';
  }
  :after {
    font-family: 'Inconsolata', monospace;
    color: ${colors.primary};
    content: '=> ( ';
  }
`

const Code = styled.code`
  color: ${colors.text};
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

const Card = ({ header, children, background }) => {
  const onDragStart = (e) => {
    const { parentNode } = e.target
    if (parentNode) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/html', parentNode)
      e.dataTransfer.setDragImage(parentNode, parentNode.clientWidth / 2, 20)
    }
  }

  const getRandomColor = () => {
    const min = 0
    const max = 100
    const number = Math.floor(Math.random() * (max - min + 1)) + min
    const color = colors.cardBackground
    const regex = /(rgb\((\s*\d{2},?)*)(\s*\d{2},?)\)/g
    const subst = `$1 ${number})`
    return color.replace(regex, subst)
  }

  return (
    <CardComponent
      background={background ?? getRandomColor()}
      className='animate__animated animate__fadeInUp animate__backOutDown'>
      <Header onDragStart={onDragStart} draggable />
      <HeaderButtons />
      <Heading export>{header}</Heading>
      <Space />
      <Code>{children}</Code>
    </CardComponent>
  )
}

export default Card
