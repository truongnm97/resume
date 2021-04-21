import React from 'react'
import styled from 'styled-components'
import { colors } from '../config'

const Tag = styled.span`
  color: ${colors.text2};
  font-family: 'Inconsolata', monospace;
`
const TagClass = styled.h2`
  font-family: 'Inconsolata', monospace;
  display: inline;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin: 0;
  padding: 0;
  color: ${colors.primary};
`

const Attributes = styled.span`
  display: block;
  color: ${colors.text};
  font-size: 1rem;
  margin-left: 1rem;
`

const AttributesValue = styled.span`
  color: ${colors.attrText};
`

const Comma = styled.span`
  color: ${colors.text2};
`

const SquareBracket = styled.span`
  color: ${colors.primary};
`

const Container = styled.div`
  ${(props) => (props.onClick != null ? `cursor: pointer` : '')}
`

const CodeElement = ({ tag, children, className, attributes, onClick, style, isArrayItem }) => (
  <Container className={`mb-1 ml-3 ${className ?? ''}`} onClick={onClick} style={style}>
    {tag != null && tag[0] != null && tag[0] === tag[0].toUpperCase() ? (
      attributes != null ? (
        <>
          <TagClass>
            <span className='d-block'>{`<${tag}`}</span>
            {attributes.map((val, i) => (
              <Attributes key={i}>
                {`${val.title}={`}
                {Array.isArray(val.value) ? (
                  <>
                    <SquareBracket>{'['}</SquareBracket>
                    {val.value.map((item, j) => (
                      <React.Fragment key={j}>
                        {j === 0 ? '' : ','}
                        <AttributesValue>{`"${item}"`}</AttributesValue>
                      </React.Fragment>
                    ))}
                    <SquareBracket>{']'}</SquareBracket>
                  </>
                ) : val.url != null ? (
                  <AttributesValue>
                    <a
                      href={val.url}
                      target={val.url.includes('http') ? '_blank' : '_self'}
                      rel='noopener noreferrer'>
                      {`"${val.value}"`}
                    </a>
                  </AttributesValue>
                ) : (
                  <AttributesValue>{`"${val.value}"`}</AttributesValue>
                )}
                {}
                {`}`}
              </Attributes>
            ))}
            {children != null ? (
              <span className='d-block'>{`>`}</span>
            ) : (
              <span className='d-block'>
                {`/>`}
                <Comma>{`${isArrayItem ? ',' : ''}`}</Comma>
              </span>
            )}
          </TagClass>
          {children}
          {children != null && (
            <TagClass>
              <span className='d-block'>
                {`</${tag}>`}
                <Comma>{`${isArrayItem ? ',' : ''}`}</Comma>
              </span>
            </TagClass>
          )}
        </>
      ) : (
        <>
          <TagClass>{`<${tag}>`}</TagClass>
          {children}
          <TagClass>
            {`</${tag}>`}
            <Comma>{`${isArrayItem ? ',' : ''}`}</Comma>
          </TagClass>
        </>
      )
    ) : (
      <>
        <Tag>{`<${tag || ''}>`}</Tag>
        {children}
        <Tag>
          {`</${tag || ''}>`}
          <Comma>{`${isArrayItem ? ',' : ''}`}</Comma>
        </Tag>
      </>
    )}
  </Container>
)

export default CodeElement
