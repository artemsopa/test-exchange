import React from 'react';
import styled from 'styled-components';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => (
  <Layout>
    <Header />
    <ChildWrapper>
      {children}
    </ChildWrapper>
    <Footer />
  </Layout>
);

export default DefaultLayout;

const Layout = styled.div`
  width: 100%;
  color: #303339;
`;

const ChildWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 684px);
  @media screen and (max-width: 1460px) {
    min-height: calc(100vh - 497px);
  }
  @media screen and (max-width: 653px) {
    min-height: calc(100vh - 544px);
  }
`;
