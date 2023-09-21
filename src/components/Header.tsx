import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '@/assets/logo.svg';

const Header: React.FC = () => {
  enum Path {
    ABOUT_US = '/about-us',
    HOW_IT_WORKS = '/how-it-works',
    CONTACTS = '/contacts',
  }

  const location = useLocation();

  return (
    <Main>
      <LogoImgWrapper to="/">
        <LogoImg src={Logo} />
      </LogoImgWrapper>
      <HrefsWrapper>
        <Href isActive={location.pathname === Path.ABOUT_US} to="/about-us">О нас</Href>
        <Href isActive={location.pathname === Path.HOW_IT_WORKS} to="/how-it-works">Как это работает</Href>
        <Href isActive={location.pathname === Path.CONTACTS} to="/contacts">Контакты</Href>
        <Href to="/">Ru</Href>
      </HrefsWrapper>
    </Main>
  );
};

export default Header;

const Main = styled.div`
  max-width: 1310px;
  width: 100%;
  padding: 37px 15px;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LogoImgWrapper = styled(Link)`
  width: 204px;
  transition: transform .2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const LogoImg = styled.img`
  width: 100%;
`;

const HrefsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const Href = styled(Link)<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? '#bef102' : '#fff')};
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s cubic-bezier(.25,.8,.25,1);
  transition-property: color, background-color, opacity;
  &:hover {
    color: #bef102;
  }
`;
