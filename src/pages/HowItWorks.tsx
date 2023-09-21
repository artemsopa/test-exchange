import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import ExchangeWindow from '@/components/ExchangeWindow';

const arr = [{
  id: 1,
  title: 'Выберите валютную пару и установите сумму обмена.',
  desc: 'Выбирайте из сотен монет и обменивайте любые суммы без ограничений.',
  src: 'https://letsexchange.io/_nuxt/img/0.ed23c45.svg',
}, {
  id: 2,
  title: 'Укажите адрес для получения выбранной монеты.',
  desc: 'Добавьте тег назначения (мемо, message и т.д.), если это необходимо.',
  src: 'https://letsexchange.io/_nuxt/img/1.8573689.svg',
}, {
  id: 3,
  title: 'Введите и примените промокод, если он у вас есть.',
  desc: 'Ваш бонус будет добавлен к общей сумме и отображен в поле "Вы получите".',
  src: 'https://letsexchange.io/_nuxt/img/2.ff2be5e.svg',
}, {
  id: 4,
  title: 'Выберите фиксированный или плавающий обменный курс и нажмите “Обменять”.',
  desc: 'Фиксированная ставка исключает изменение курса в течение 30 минут, при плавающей ставке курс может колебаться.',
  src: 'https://letsexchange.io/_nuxt/img/3.154cd62.svg',
}, {
  id: 5,
  title: 'Проверьте и подтвердите детали обмена.',
  desc: 'Если все данные верны, нажмите “Принять”.',
  src: 'https://letsexchange.io/_nuxt/img/4.c8e8987.svg',
}, {
  id: 6,
  title: 'Отправьте точную сумму на адрес депозита.',
  desc: 'Отсканируйте QR-код или скопируйте адрес депозитного кошелька. Не забудьте добавить тег назначения, если необходимо.',
  src: 'https://letsexchange.io/_nuxt/img/5.dfdafcc.svg',
}, {
  id: 7,
  title: 'Подождите, пока произойдет обмен.',
  desc: 'Нажмите “Уведомить меня”, чтобы получить на электронную почту сообщение о завершении обмена.',
  src: 'https://letsexchange.io/_nuxt/img/6.9d6506a.svg',
}, {
  id: 8,
  title: 'Ура! Ваш обмен выполнен',
  desc: 'Запросите квитанцию, если необходимо; вы также можете зарегистрироваться и отслеживать историю своих обменов.',
  src: 'https://letsexchange.io/_nuxt/img/7.e7529b5.svg',
}, {
  id: 9,
  title: 'Давайте обменяем сейчас',
  desc: 'Все готово для вашего легкого и безопасного обмена криптовалюты.',
  src: null,
}];

const HowItWorks: React.FC = () => {
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
          <PathHref to="/">LetsExchange</PathHref>
          <>/</>
          <div>Как это работает</div>
        </Path>
        <PrimaryText>Как это работает</PrimaryText>
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
