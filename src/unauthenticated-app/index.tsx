import { Button, Card, Divider } from "antd";
import React, { useState } from "react"
import { Login } from "./login";
import { RegisterScreen } from "./register";
import styled from '@emotion/styled';
import logo from 'assets/logo.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg';
import { useDocumentTitle } from "utils";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister ] = useState(false);

  useDocumentTitle('请登录注册以继续')
  return <Background>
    <Container>
      <Header></Header>
        <ShadowCard>
          <Title>
          {
            isRegister ? '请注册' : '请登录'
          }
          </Title>
          {
            isRegister ? <RegisterScreen/> : <Login/>
          }
          <Divider/>
          <Button type='link' onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? '已经有账号了？请直接登录' : '没有账号？注册新账号'}</Button>
          </ShadowCard>
    </Container>
  </Background>
  
}
export const LongButton = styled(Button)`
  width: 100%;
`
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132)
`
const Background = styled.div`
position: absolute;
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-attachment: fixed;
background-position: left bottom, right bottom;
background-size:  calc(((100vw - 40rem)/2) - 4rem), calc(((100vw - 40rem)/2) - 4rem), cover;
background-image: url(${left}), url(${right});
`
const Header = styled.header`
   background: url(${logo}) no-repeat center;
   padding: 5rem 0;
   background-size: 8rem;
   width: 100%;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,.1) 0 0 10px;
  text-align: center;
`