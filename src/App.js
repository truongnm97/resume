import React, { useEffect, useState } from 'react'
import { Age, Card, CodeElement } from './components'
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

const Image = styled.div`
  border-radius: 20px;
  display: block;
  margin: auto;
  background-image: url(${(props) => props.src});
  width: 200px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: ${colors.attrText};
`

const DownloadButton = styled.div`
  font-size: 3rem;
  text-align: center;
  line-height: 1;
`

function App() {
  const [data, setData] = useState(null)
  const [showAge, setShowAge] = useState()

  useEffect(() => {
    const getData = async () => {
      const resGist = await fetch(`https://api.github.com/gists/${process.env.REACT_APP_GIST_ID}`)
      const gistData = await resGist.json()
      const resPortfolio = await fetch(gistData.files[process.env.REACT_APP_GIST_FILENAME].raw_url)
      const portfolioData = await resPortfolio.json()
      setData(portfolioData)
    }

    getData()
  }, [])

  return (
    <AppContainer>
      <div className='container'>
        {data ? (
          <div className='row'>
            <div className='col-lg-4'>
              <div className='row'>
                {/* Avatar */}
                <div className='col-sm-12'>
                  <Card header={data.avatar.constName}>
                    <CodeElement tag='img'>
                      <Image className='img-fluid' src={data.avatar.url} />
                    </CodeElement>
                  </Card>
                </div>
                {/* Information */}
                <div className='col-sm-12'>
                  <Card header={data.information.constName} isArray>
                    <CodeElement
                      tag={'Contact'}
                      attributes={data.information.detail.slice(0, 2)}
                      isArrayItem
                    />
                    <CodeElement
                      tag={'Social'}
                      attributes={data.information.detail.slice(2, data.information.detail.length)}
                    />
                  </Card>
                </div>
                {/* Hobbies */}
                <div className='col-sm-12'>
                  <Card header={data.hobbies.constName}>
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
                  <Card header={data.skills.constName}>
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
                  <Card header={data.languages.constName} isArray>
                    {data.languages.detail.map((val, i) => (
                      <CodeElement
                        key={i}
                        tag={val.title}
                        attributes={val.value}
                        isArrayItem={i !== data.languages.detail.length - 1}
                      />
                    ))}
                  </Card>
                </div>
                {/* Download */}
                <div className='col-sm-12'>
                  <Card isExportDefault={true}>
                    <DownloadButton className='mt-3'>
                      <a href={data.download.url} target='_blank' rel='noopener noreferrer'>
                        <ion-icon
                          style={{ color: colors.attrText }}
                          name='cloud-download-outline'
                        />
                      </a>
                    </DownloadButton>
                  </Card>
                </div>
              </div>
            </div>
            {/* Profile */}
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-sm-12'>
                  <Card header={data.name.constName}>
                    <CodeElement tag='main'>
                      <CodeElement tag='name'>
                        <h1 className='mb-0 ml-3'>
                          <b>{data.name.fullName}</b>
                        </h1>
                      </CodeElement>
                      <CodeElement tag='title'>
                        <h4 className='d-inline'>{data.name.title}</h4>
                      </CodeElement>
                      <CodeElement
                        tag={showAge ? 'age' : 'date-of-birth'}
                        onClick={() => setShowAge(!showAge)}>
                        <Code>
                          {showAge ? (
                            <Age time={data.name.dob} />
                          ) : (
                            new Date(data.name.dob).toLocaleDateString()
                          )}
                        </Code>
                      </CodeElement>
                      <CodeElement tag='address'>
                        <Code>{data.name.address}</Code>
                      </CodeElement>
                    </CodeElement>
                  </Card>
                </div>
                {/* About Me */}
                <div className='col-sm-12'>
                  <Card header={data.profile.constName}>
                    <CodeElement tag='article'>
                      {data.profile.detail.map((val, i) => (
                        <CodeElement key={i} tag='p'>
                          <Code>{val}</Code>
                        </CodeElement>
                      ))}
                    </CodeElement>
                  </Card>
                </div>
                {/* Education */}
                <div className='col-sm-12'>
                  <Card header={data.education.constName}>
                    <CodeElement tag='University' attributes={data.education.detail} />
                  </Card>
                </div>
                {/* Work Experience */}
                <div className='col-sm-12'>
                  <Card header={data.workExperience.constName} isArray>
                    {data.workExperience.detail.map((val, i) => (
                      <CodeElement
                        key={i}
                        tag={val.title}
                        attributes={val.value}
                        isArrayItem={i !== data.workExperience.detail.length - 1}>
                        <CodeElement tag={'p'}>{val.data.content}</CodeElement>
                        <CodeElement tag={'ul'}>
                          Projects:
                          {val.data.projects.map((project, j) => (
                            <CodeElement tag={'li'} key={j}>
                              <a href={project.url} target='_blank' rel='noopener noreferrer'>
                                {project.name}
                              </a>
                            </CodeElement>
                          ))}
                        </CodeElement>
                      </CodeElement>
                    ))}
                  </Card>
                </div>
                {/* Pet Project */}
                <div className='col-sm-12'>
                  <Card header={data.petProjects.constName} isArray>
                    {data.petProjects.detail.map((val, i) => (
                      <CodeElement
                        key={i}
                        tag={val.title}
                        attributes={val.value}
                        isArrayItem={i !== data.petProjects.detail.length - 1}
                      />
                    ))}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='row justify-content-center'>
            <div className='col-lg-4'>
              <Card header='Loading'>
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
