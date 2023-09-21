import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '@/assets/logo.svg';
import TrustPilot from '@/assets/trust_pilot.svg';

const logos = [{
  href: 'https://www.bestchange.com/letsexchange-exchanger.html',
  src: 'https://letsexchange.io/images/monitoring/best-change.svg',
}, {
  href: 'https://glazok.org/exchange/?details=1195',
  src: 'https://letsexchange.io/images/monitoring/glazok.svg',
}, {
  href: 'https://kurs.expert/ru/obmennik/letsexchange-io/feedbacks.html',
  src: 'https://letsexchange.io/images/monitoring/kurs-expert.svg',
}, {
  href: 'https://bitcoinmarket.global/exchanger.php?id=602',
  src: 'https://letsexchange.io/images/monitoring/bitcoin-market.svg',
}, {
  href: 'https://finector.io/monitoring/exchanger/letsexchange',
  src: 'https://letsexchange.io/images/monitoring/finector.svg',
}, {
  href: 'https://wellcrypto.io/ru/exchangers/letsexchange',
  src: 'https://letsexchange.io/images/monitoring/wellcrypto.svg',
}, {
  href: 'https://scanbit.com.ua/en/exchangers/letsexchange',
  src: 'https://letsexchange.io/images/monitoring/scanbit.svg',
}, {
  href: 'https://multirates.org/exchangers/letsexchange-io',
  src: 'https://letsexchange.io/images/monitoring/bits-media.svg',
}, {
  href: 'https://multirates.org/exchangers/letsexchange-io',
  src: 'https://letsexchange.io/images/monitoring/multirates.svg',
}, {
  href: 'https://rateex.net/exchanger_letsexchange/',
  src: 'https://letsexchange.io/images/monitoring/rateex.svg',
}, {
  href: 'https://www.okchanger.com/exchangers/letsexchange-io',
  src: 'https://letsexchange.io/images/monitoring/okchanger.svg',
}, {
  href: 'https://xrates.pro/reviews/review-letsexchangeio',
  src: 'https://letsexchange.io/images/monitoring/xrates.svg',
}];

const Footer: React.FC = () => {
  enum Path {
    HOME = '/',
    ABOUT_US = '/about-us',
    HOW_IT_WORKS = '/how-it-works',
    CONTACTS = '/contacts',
  }

  const location = useLocation();

  const {
    register, setValue, handleSubmit, formState: { errors },
  } = useForm<{ email: string; }>({
    mode: 'onChange',
  });

  const submit = () => {
    setValue('email', '');
    toast.success('Вы успешно подписались на новости!');
  };

  return (
    <Main>
      <ContentWrapper>
        <LogoImgWrapper to="/">
          <LogoImg src={Logo} />
        </LogoImgWrapper>
        <Content>
          <Navigation>
            <BlockTitle>Навигация</BlockTitle>
            <NavigationItem isActive={location.pathname === Path.HOME} to="/">Главная</NavigationItem>
            <NavigationItem isActive={location.pathname === Path.ABOUT_US} to="/about-us">О нас</NavigationItem>
            <NavigationItem isActive={location.pathname === Path.HOW_IT_WORKS} to="/how-it-works">Как это работает</NavigationItem>
            <NavigationItem isActive={location.pathname === Path.CONTACTS} to="/contacts">Контакты</NavigationItem>
          </Navigation>
          <SubscribeForm onSubmit={handleSubmit(submit)}>
            <BlockTitle>Подписаться на новости</BlockTitle>
            <Input
              placeholder="Введите свою эл. почту"
              {...register(
                'email',
                {
                  maxLength: {
                    value: 255,
                    message: 'Максимальная длина 255',
                  },
                  required: {
                    value: true,
                    message: 'Требуется указать эл. почту',
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Неверный формат эл. почты',
                  },
                },
              )}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            <Button type="submit">Подписаться</Button>
            <SecondaryText>
              Ваш адрес электронной почты НИКОГДА не будет передан, сдан в аренду или продан, и вы можете отказаться от подписки в любое время.
            </SecondaryText>
            <TrustImg src={TrustPilot} />
          </SubscribeForm>
        </Content>
        <PrivacyLinksWrapper>
          <Text>
            Copyright © 2023 LetsExchange. Все права защищены.
          </Text>
        </PrivacyLinksWrapper>
        <LogosTicker>
          <LogosTickerContainer>
            {[...logos, ...logos, ...logos, ...logos, ...logos].map((item, i) => (
              <LogoTickerItem href={item.href} key={i}>
                <LogoTickerImg src={item.src} />
              </LogoTickerItem>
            ))}
          </LogosTickerContainer>
        </LogosTicker>
      </ContentWrapper>
    </Main>
  );
};

export default Footer;

const Main = styled.div`
  background: #05051f;
  padding: 0 15px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1310px;
  padding: 35px 0 0;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
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

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 0 24px;
`;

const BlockTitle = styled.div`
  color: #fff;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
`;

const NavigationItem = styled(Link)<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? '#bef102' : '#fff')};
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
  transition: 0.3s cubic-bezier(.25,.8,.25,1);
  transition-property: color, background-color, opacity;
  &:hover {
    color: #bef102;
  }
`;

const SubscribeForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 16px;
  max-width: 350px;
  width: 100%;
`;

const Input = styled.input`
  border-radius: 15px;
  color: #010615;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  border: none;
  padding: 5px 20px;
`;

const ErrorText = styled.div`
  border-radius: 15px;
  color: #f2545b;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  margin-top: -10px;
  padding: 0px 10px;
`;

const Button = styled.button`
  border: none;
  background-color: #bef102;
  color: black;
  line-height: 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  height: 36px;
  padding: 8px 12px;
  width: fit-content;
  cursor: pointer;
`;

const SecondaryText = styled.div`
  color: hsla(0,0%,100%,.6);
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  margin: 12px 0 0;
`;

const TrustImg = styled.img`
  margin: 0px auto;
  height: 26px;
  cursor: pointer;
`;

const PrivacyLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  padding: 30px 0;
  border-top: 1px solid #171717;
  border-bottom: 1px solid #171717;
`;

const Text = styled.div``;

const LogosTicker = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow: hidden;
  padding: 2em 0;
  position: relative;
  width: 100%;
`;

const LogosTickerContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  animation: slide 15s linear infinite;

  @keyframes slide {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
  }
  &:hover 
  {
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    -o-animation-play-state: paused;
    animation-play-state: paused;
  }
`;

const LogoTickerItem = styled.a`
  opacity: .5;
  transition: all .3s ease-out;
  transition: transform .2s;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const LogoTickerImg = styled.img`
  max-height: 16px;
  max-width: 200px;
  mix-blend-mode: luminosity;
`;
