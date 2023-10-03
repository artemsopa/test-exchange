import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultLayout from '@/layouts/DefaultLayout';
import ExchangeWindow from '@/components/ExchangeWindow';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const arr = [{
    id: 1,
    title: t('how.1'),
    desc: t('how.1desc'),
    src: 'https://letsexchange.io/_nuxt/img/0.ed23c45.svg',
  }, {
    id: 2,
    title: t('how.2'),
    desc: t('how.2desc'),
    src: 'https://letsexchange.io/_nuxt/img/1.8573689.svg',
  }, {
    id: 3,
    title: t('how.3'),
    desc: t('how.3desc'),
    src: 'https://letsexchange.io/_nuxt/img/2.ff2be5e.svg',
  }, {
    id: 4,
    title: t('how.4'),
    desc: t('how.4desc'),
    src: 'https://letsexchange.io/_nuxt/img/3.154cd62.svg',
  }, {
    id: 5,
    title: t('how.5'),
    desc: t('how.5desc'),
    src: 'https://letsexchange.io/_nuxt/img/4.c8e8987.svg',
  }, {
    id: 6,
    title: t('how.6'),
    desc: t('how.6desc'),
    src: 'https://letsexchange.io/_nuxt/img/5.dfdafcc.svg',
  }, {
    id: 7,
    title: t('how.7'),
    desc: t('how.7desc'),
    src: 'https://letsexchange.io/_nuxt/img/6.9d6506a.svg',
  }, {
    id: 8,
    title: t('how.8'),
    desc: t('how.8desc'),
    src: 'https://letsexchange.io/_nuxt/img/7.e7529b5.svg',
  }, {
    id: 9,
    title: t('how.9'),
    desc: t('how.9desc'),
    src: null,
  }];

  const [step, setStep] = useState(arr[0]);
  const [stepImg, setStepImg] = useState(arr[0].src);

  useEffect(() => {
    setStepImg(null);
    setTimeout(() => setStepImg(step.src), 10);
  }, [step]);

  return (
    <DefaultLayout>
      <Main>
        <Path>
          <PathHref to="/">PlaceExchange</PathHref>
          <>/</>
          <div>{t('how.title')}</div>
        </Path>
        <PrimaryText>{t('how.title')}</PrimaryText>
        <ContentWrapper>
          <ListWrapper>
            {arr.map((item, i) => (
              <Item isActive={item.id === step.id} key={i}>
                <Title isActive={item.id === step.id} onClick={() => setStep(item)}>{item.title}</Title>
                <Desc isActive={item.id === step.id}>{item.desc}</Desc>
              </Item>
            ))}
          </ListWrapper>
          {stepImg && <ItemImg src={stepImg} />}
          {!stepImg && !step.src
              && (
              <WindowWrapper>
                <ExchangeWindow />
              </WindowWrapper>
              )}
        </ContentWrapper>
      </Main>
    </DefaultLayout>
  );
};

export default HowItWorks;

const Main = styled.div`
  margin: 0 auto;
  max-width: 1310px;
  padding: 0 0 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Path = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  color: hsla(0,0%,100%,.6);
  font-size: 14px;
  line-height: 140%;
`;

const PathHref = styled(Link)`
  color: hsla(0,0%,100%,.6);
  transition: color 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    color: #bef102;
  }
`;

const PrimaryText = styled.div`
  font-size: 56px;
  color: #fff;
  font-weight: 900;
  letter-spacing: -.03em;
  line-height: 120%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 36px;
  gap: 24px;
  max-width: 1310px;
  width: 100%;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 400px;
  width: 100%;
  word-spacing: 1px;
`;

const Item = styled.div<{ isActive: boolean }>`
  padding: 5px 0 5px 36px;
  display: flex;
  flex-direction: column;
  border-left: 4px solid #eaeaea;
  transition: all .7s ease;
  ${({ isActive }) => isActive && 'gap: 15px;'}
  ${({ isActive }) => isActive && 'border-left: 4px solid #b7f348;'}
`;

const Title = styled.div<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 600;
  line-height: 120%;
  color: white;
  cursor: pointer;
  ${({ isActive }) => isActive && 'font-size: 24px;'}
`;

const Desc = styled.div<{ isActive: boolean }>`
  color: hsla(0,0%,100%,.6);
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
  height: ${({ isActive }) => (isActive ? 'fit-content' : '0px')};
  max-height: ${({ isActive }) => (isActive ? '100px' : '0px')};
  overflow: hidden;
  transition: all .3s linear;
`;

const ItemImg = styled.img`
  width: 630px;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 1s ease-in-out;
`;

const WindowWrapper = styled.div`
  padding: 30px 50px 0px 0px;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 1s ease-in-out;
`;
