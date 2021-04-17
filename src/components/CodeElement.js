import React from 'react'
import styled from 'styled-components'
import { colors } from '../config'

const Tag = styled.span`
  color: #fce2bb;
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
  color: #85c143;
`

const CodeElement = ({ tag, children, className, attributes }) => (
  <div className={`mb-1 ml-3 ${className ?? ''}`}>
    {tag != null && tag[0] != null && tag[0] === tag[0].toUpperCase() ? (
      attributes != null ? (
        <>
          <TagClass>
            <span className='d-block'>{`<${tag}`}</span>
            {attributes.map((val, i) => (
              <Attributes key={i}>
                {`${val.title}={`}
                <AttributesValue>{`"${val.value}"`}</AttributesValue>
                {`}`}
              </Attributes>
            ))}
            <span className='d-block'>{`/>`}</span>
          </TagClass>
        </>
      ) : (
        <>
          <TagClass>{`<${tag}>`}</TagClass>
          {children}
          <TagClass>{`</${tag}>`}</TagClass>
        </>
      )
    ) : (
      <>
        <Tag>{`<${tag || ''}>`}</Tag>
        {children}
        <Tag>{`</${tag || ''}>`}</Tag>
      </>
    )}
  </div>
)

export default CodeElement
