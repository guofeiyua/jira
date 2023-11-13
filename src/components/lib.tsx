import React from "react";
import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  gap?: number | boolean,
  marginBottom?: number
}>`
display: flex;
align-items: center;
margin-bottom: ${props => props.marginBottom + 'rem'};
> * {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined }
}
`
const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const FullPageLoading = () => {
  return <FullPage>
    <Spin size="large"></Spin>
  </FullPage>
}
export const FullPageError = ({error}: {error: Error | null}) => <FullPage>
  <DevTools/>
  <Typography.Text type='danger'>{error?.message}</Typography.Text>
</FullPage>