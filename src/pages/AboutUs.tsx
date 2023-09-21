import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import DefaultLayout from '@/layouts/DefaultLayout';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  const arr = [{
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/clockIcon.fb50c60.svg',
      title: 'Ловите момент',
      desc: 'Регистрации не требуется, поэтому вы можете начать обмен в кратчайшие сроки, как только курс обмена будет удобным для Вас.',
    }, {
      src: 'https://letsexchange.io/_nuxt/img/rocketIcon.03cf40b.svg',
      title: 'Начни без усилий',
      desc: 'Интуитивно понятный интерфейс с универсальным виджетом обмена разработан для быстрого и легкого обмена криптовалюты. Просто выберите нужную пару, введите сумму и адрес своего кошелька, затем нажмите “Обменять”.',
    }],
  }, {
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/speedIcon.2f116f3.svg',
      title: 'Сделайте это мгновенно',
      desc: 'Благодаря оптимизированному, полностью автоматизированному процессу обмена транзакции на LetsExchange выполняются мгновенно. Время обработки обмена зависит исключительно от скорости сети выбранных монет.',
    }, {
      src: 'https://letsexchange.io/_nuxt/img/coinsIcon.97d2bab.svg',
      title: 'Получите максимальную выгоду от каждой сделки',
      desc: 'Наша технология SmartRate подбирает наиболее выгодный курс среди нескольких основных обменных платформ для каждого обмена.',
    }],
  }, {
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/limitIcon.6b9d9db.svg',
      title: 'Торговля без ограничений',
      desc: 'Выбирайте из 3530+ монет и 12404500+ криптовалютных пар без каких-либо ограничений на транзакции со стороні LetsExchange.',
    }, {
      src: 'https://letsexchange.io/_nuxt/img/lockIcon.a1fd6c2.svg',
      title: 'Закрепить курс или разрешите ему колебаться',
      desc: 'Выберите параметр “Фиксированный курс”, чтобы получить точную сумму, которую вы видите перед началом транзакции, или придерживайтесь классического метода обмена с плавающим курсом',
    }],
  }, {
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/shieldIcon.30f8fa4.svg',
      title: 'Оставайтесь в безопасности',
      desc: 'Мы не храним ваши средства и личные данные. Все представленные монеты проходят валидацию и проверку. Безопасность платформы повышена за счет шифрования, сертификата SSL и защиты от DDoS-атак.',
    }, {
      src: 'https://letsexchange.io/_nuxt/img/loopIcon.aa01669.svg',
      title: 'Отслеживайте и проверяйте',
      desc: 'Процесс обмена является чистым и прозрачным. Вы можете запросить квитанцию ​​с полной информацией по транзакции.',
    }],
  }, {
    lines: [{
      src: 'https://letsexchange.io/_nuxt/img/phoneIcon.beb4381.svg',
      title: 'Обращайтесь в любое время',
      desc: 'В случае возникновения вопросов наша служба поддержки готова помочь 24/7.',
    }],
  }];

  return (
    <DefaultLayout>
      <Main>
        <Path>
          <PathHref to="/">LetsExchange</PathHref>
          <>/</>
          <div>О нас</div>
        </Path>
        <PrimaryText>О нас</PrimaryText>
        <Desc>
          LetsExchange – это универсальный сервис для обмена криптовалюты без регистрации, ограничений и сложностей. LetsExchange создан командой профессионалов с более чем 10-летним опытом работы в сфере блокчейн и финансовых технологий. LetsExchange экономит ваше время на каждом этапе обмена криптовалюты и увеличивает ваш доход.
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
