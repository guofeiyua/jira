/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'pages/project-list';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu, MenuProps } from 'antd';
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth() 
  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <Menu.Item key={'logout'}>
          <Button type='link' onClick={logout}>登出</Button>
        </Menu.Item>
      ),
    }]
  return <div>
    <PageHeader>
      <HeaderLeft  gap={true}>
        <SoftwareLogo width={'18rem'} color='rgb(38, 132, 255)' />
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
      <Dropdown menu={{items}}>
        <Button type={'link'} onClick={e => e.preventDefault()}>
          Hi,{user?.name}
        </Button>
      </Dropdown>
      </HeaderRight>
    </PageHeader>
    <Main>
      <ProjectListScreen/>
    </Main>
  </div>
}
const HeaderLeft = styled(Row)`
padding: 3.2rem;`
const HeaderRight = styled.div`
  
`
const PageHeader = styled.header`
  height: 6rem;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`
const Main = styled.main`
  height: calc(100vh - 6rem)
`