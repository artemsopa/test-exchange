import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useHover, useOnClickOutside } from 'usehooks-ts';

import { useTranslation } from 'react-i18next';
import Logo from '@/assets/logo.png';
import ArrowDownIcon from '@/icons/ArrowDownIcon';

const langsList = [
  { title: 'En', src: 'https://letsexchange.io/_ipx/s_16x16/images/flags/lang_en.png' },
  { title: 'Ru', src: 'https://letsexchange.io/_ipx/s_16x16/images/flags/lang_ru.png' },
];

const Header: React.FC = () => {
  enum Path {
    ABOUT_US = '/about-us',
    HOW_IT_WORKS = '/how-it-works',
    CONTACTS = '/contacts',
  }

  const { t, i18n } = useTranslation();

  const [isLangVisible, setIsLangVisible] = useState<boolean>(false);

  const [currLang, setCurrLang] = useState(langsList[0]);

  const location = useLocation();

  const langRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const isLangHover = useHover(langRef);

  useEffect(() => {
    const lang = localStorage.getItem('LANG');
    if (lang) {
      const item = JSON.parse(lang);
      setCurrLang(item);
      i18n.changeLanguage(item.title.toLowerCase());
    }
  }, []);

  const handleClickOutside = () => {
    setIsLangVisible(false);
  };

  useOnClickOutside(langDropdownRef, handleClickOutside);

  const handleLangChange = (item: any) => {
    setCurrLang(item);
    localStorage.setItem('LANG', JSON.stringify(item));
    i18n.changeLanguage(item.title.toLowerCase());
    setIsLangVisible(false);
  };

  return (
    <Main>
      <LogoImgWrapper to="/">
        <LogoImg src={Logo} />
      </LogoImgWrapper>
      <HrefsWrapper>
        <Href isActive={location.pathname === Path.ABOUT_US} to="/about-us">{t('header.about')}</Href>
        <Href isActive={location.pathname === Path.HOW_IT_WORKS} to="/how-it-works">{t('header.how')}</Href>
        <Href isActive={location.pathname === Path.CONTACTS} to="/contacts">{t('header.contacts')}</Href>
        <LangWrapper ref={langDropdownRef}>
          <LangSelected ref={langRef} onClick={() => setIsLangVisible(!isLangVisible)}>
            <LangImg src={currLang.src} />
            {currLang.title}
            <ArrowDownIcon color={isLangHover ? '#bef102' : '#fff'} />
          </LangSelected>
          <LangsList isVisible={isLangVisible}>
            {langsList.map((item) => (
              <LangListItem
                isActive={currLang.title === item.title}
                onClick={() => handleLangChange(item)}
              >
                <LangImg src={item.src} />
                {item.title}
              </LangListItem>
            ))}
          </LangsList>
        </LangWrapper>
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
  width: 200px;
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

const LangWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LangSelected = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  color: #fff;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0 12px;
  align-items: center;
  transition: 0.3s cubic-bezier(.25,.8,.25,1);
  transition-property: color, background-color, opacity;
  &:hover {
    cursor: pointer;
    color: #bef102;
  }
`;

const LangImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const LangsList = styled.div<{ isVisible: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  position: absolute;
  top: 36px;
  left: -23px;
  background: #12122e;
  border: none;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(27,20,58,.16);
  max-height: 310px;
  padding: 10px 8px;
  gap: 8px;
  width: 128px;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const LangListItem = styled.div<{ isActive: boolean }>`
  font-size: 16px;
  padding: 12px 8px 12px 12px;
  color: #fff;
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  ${({ isActive }) => isActive && 'background: #2f2f44;'}
  &:hover {
    cursor: pointer;
    color: #bef102;
  }
`;
