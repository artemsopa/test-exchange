import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import DefaultLayout from '@/layouts/DefaultLayout';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  const arr = [{
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/clockIcon.fb50c60.svg',
      title: t('aboutus.1'),
      desc: t('aboutus.1desc'),
    }, {
      src: 'https://letsexchange.io/_nuxt/img/rocketIcon.03cf40b.svg',
      title: t('aboutus.2'),
      desc: t('aboutus.2desc'),
    }],
  }, {
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/speedIcon.2f116f3.svg',
      title: t('aboutus.3'),
      desc: t('aboutus.3desc'),
    }, {
      src: 'https://letsexchange.io/_nuxt/img/coinsIcon.97d2bab.svg',
      title: t('aboutus.4'),
      desc: t('aboutus.4desc'),
    }],
  }, {
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/limitIcon.6b9d9db.svg',
      title: t('aboutus.5'),
      desc: t('aboutus.5desc'),
    }, {
      src: 'https://letsexchange.io/_nuxt/img/lockIcon.a1fd6c2.svg',
      title: t('aboutus.6'),
      desc: t('aboutus.6desc'),
    }],
  }, {
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/shieldIcon.30f8fa4.svg',
      title: t('aboutus.7'),
      desc: t('aboutus.7desc'),
    }, {
      src: 'https://letsexchange.io/_nuxt/img/loopIcon.aa01669.svg',
      title: t('aboutus.8'),
      desc: t('aboutus.8desc'),
    }],
  }, {
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/phoneIcon.beb4381.svg',
      title: t('aboutus.9'),
      desc: t('aboutus.9desc'),
    }],
  }];

  return (
    <DefaultLayout>
      <Main>
        <Path>
          <PathHref to="/">LetsExchange</PathHref>
          <>/</>
          <div>{t('aboutus.mainTitle')}</div>
        </Path>
        <PrimaryText>{t('aboutus.mainTitle')}</PrimaryText>
        <Desc>
          {t('aboutus.mainDesc')}
        </Desc>
        <ContentWrapper>
          {arr.map((line, li) => (
            <ContentLine key={li}>
              {line.lines.map((item, i) => (
                <ContentItem key={i}>
                  <ContentItemNav>
                    <ContentItemImg src={item.src} />
                    {item.title}
                  </ContentItemNav>
                  {item.desc}
                </ContentItem>
              ))}
            </ContentLine>
          ))}
        </ContentWrapper>
      </Main>
    </DefaultLayout>
  );
};

export default AboutUs;

const Main = styled.div`
  margin: 0 auto;
  max-width: 1310px;
  padding: 0 0 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  &:before {
    content: "";
    background-image: url('https://letsexchange.io/_nuxt/img/about-us-bg.e390caa.svg');
    background-size: cover;
    height: 746px;
    position: absolute;
    right: -45px;
    top: 0;
    width: 591px;
    z-index: -1;
  }
`;

const Path = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  color: hsla(0,0%,100%,.6);
  font-size: 14px;
  line-height: 140%;
`;

const Desc = styled.div`
  color: hsla(0,0%,100%,.6);
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
  max-width: 635px;
  width: 100%;
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
  flex-direction: column;
  gap: 30px;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 80px;
  max-width: 600px;
  width: 100%;
  word-spacing: 1px
`;

const ContentLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 45px;
`;

const ContentItem = styled.div`
  width: calc((100% - 45px) / 2);
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: hsla(0,0%,100%,.6);
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
`;

const ContentItemNav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  line-height: 125%;
`;

const ContentItemImg = styled.img`
  width: 42px;
  height: 43px;
`;
