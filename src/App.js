import React, { useEffect, useState } from 'react'
import { Planet, File } from 'react-kawaii'
import { Typography, Layout, Space, Button } from 'antd'
import './App.scss'
import 'antd/dist/antd.dark.css'

const { Paragraph, Text } = Typography
const { Content } = Layout

function App() {
  const [clicked, setClicked] = useState(false)

  let timeout = null

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [timeout])

  const onClickMe = () => {
    setClicked(true)
    timeout = setTimeout(() => {
      setClicked(undefined)
    }, 5000)
  }

  return (
    <Layout className='app'>
      <Content className='header'>
        {clicked == null ? (
          <Space size={20} direction='horizontal'>
            <Planet size={900} mood='happy' color='#ffffff' />
            <Text strong>NOW GTFO!!!!</Text>
          </Space>
        ) : clicked === true ? (
          <Space size={10} direction='vertical'>
            <File />
            <Paragraph>
              Nothing here <Text strong>YET!!!!</Text>
            </Paragraph>
          </Space>
        ) : (
          <Space size={10} direction='vertical'>
            <div className='logo'>
              <Planet />
            </div>
            <Paragraph>
              Welcome to
              <br />
              <Text className='title' strong>
                The Amazing World of Teddy
              </Text>
            </Paragraph>
            <Button shape='round' size='large' onClick={onClickMe}>
              Click me
            </Button>
          </Space>
        )}
      </Content>
    </Layout>
  )
}

export default App
