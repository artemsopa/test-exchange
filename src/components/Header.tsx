import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '@/assets/logo.svg';

const Header: React.FC = () => (
  <Main>
    <LogoImgWrapper to="/">
      <LogoImg src={Logo} />
    </LogoImgWrapper>
    <HrefsWrapper>
      <Href to="/">О нас</Href>
      <Href to="/">Как это работает</Href>
      <Href to="/">Афиллиатная реклама</Href>
      <Href to="/">Ru</Href>
      <Href to="/">Помощь</Href>
    </HrefsWrapper>
  </Main>
);

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
`;

const Href = styled(Link)`
  color: #fff;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
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
