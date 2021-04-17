import React, { useEffect, useState } from 'react'
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
  font-size: 1rem;
`

const Image = styled.img`
  border-radius: 20px;
  max-height: 200px;
  display: block;
  margin: auto;
`

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  return (
    <AppContainer>
      <div className='container'>
        {data ? (
          <div className='row'>
            <div className='col-sm-4'>
              <div className='row'>
                {/* Avatar */}
                <div className='col-sm-12'>
                  <Card header={data.avatar.constName} text>
                    <CodeElement tag='img'>
                      <Image
                        className='img-fluid'
                        src={data.avatar.url}
                        alt={data.avatar.constName}
                      />
                    </CodeElement>
                  </Card>
                </div>
                {/* Contact */}
                <div className='col-sm-12'>
                  <Card header={data.contact.constName} text>
                    <CodeElement>
                      {data.contact.detail.map((val, i) => (
                        <CodeElement key={i} tag={val.title}>
                          <Code className={'d-block ml-3'}>
                            {val.title === 'Email' ? (
                              <a href={`mailto:${val.data}`}>{val.value}</a>
                            ) : val.title === 'Phone' ? (
                              <a href={`tel:${val.data}`}>{val.value}</a>
                            ) : (
                              val.value
                            )}
                          </Code>
                        </CodeElement>
                      ))}
                    </CodeElement>
                  </Card>
                </div>
                {/* Hobbies */}
                <div className='col-sm-12'>
                  <Card header={data.hobbies.constName} text>
                    <CodeElement tag={'ul'}>
                      {data.hobbies.detail.map((val, i) => (
                        <CodeElement key={i} tag='li'>
                          <Code>{val}</Code>
                        </CodeElement>
                      ))}
                    </CodeElement>
                  </Card>
                </div>
                {/* Skills */}
                <div className='col-sm-12'>
                  <Card header={data.skills.constName} text>
                    <CodeElement tag={'ul'}>
                      {data.skills.detail.map((val, i) => (
                        <CodeElement key={i} tag='li'>
                          <Code>{val}</Code>
                        </CodeElement>
                      ))}
                    </CodeElement>
                  </Card>
                </div>
                {/* Languages */}
                <div className='col-sm-12'>
                  <Card header={data.languages.constName} text>
                    <CodeElement tag={''}>
                      {data.languages.detail.map((val, i) => (
                        <CodeElement key={i} tag={val.title} attributes={val.value} />
                      ))}
                    </CodeElement>
                  </Card>
                </div>
              </div>
            </div>
            {/* Title */}
            <div className='col-sm-8'>
              <div className='row'>
                <div className='col-sm-12'>
                  <Card header={data.name.constName} text>
                    <CodeElement>
                      <CodeElement tag='name'>
                        <h1 className='mb-0 ml-3'>
                          <b>{data.name.fullName}</b>
                        </h1>
                      </CodeElement>
                      <CodeElement tag='title'>
                        <h4 className='mb-0 d-inline'>{data.name.title}</h4>
                      </CodeElement>
                    </CodeElement>
                  </Card>
                </div>
                {/* About Me */}
                <div className='col-sm-12'>
                  <Card header={data.profile.constName} text>
                    <CodeElement>
                      {data.profile.detail.map((val, i) => (
                        <CodeElement key={i} className={'text-justify'} tag='p'>
                          <Code>{val}</Code>
                        </CodeElement>
                      ))}
                    </CodeElement>
                  </Card>
                </div>
                {/* Education */}
                <div className='col-sm-12'>
                  <Card header={data.education.constName} text>
                    <CodeElement tag='University' attributes={data.education.detail} />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='row justify-content-center'>
            <div className='col-sm-4'>
              <Card header='Loading' text>
                <CodeElement tag='div'>
                  <Code>Please wait....</Code>
                </CodeElement>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppContainer>
  )
}

export default App
