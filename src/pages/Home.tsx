import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import DefaultLayout from '@/layouts/DefaultLayout';
import ExchangeWindow from '@/components/ExchangeWindow';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <Main>
        <Container>
          {t('home.title')}
          <ContainerCursiveText>{t('home.titleSpan')}</ContainerCursiveText>
          <Table>
            <TableCell>
              <CellImg src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjExLjk5NCAyLjIxOCAxNi43NTkgMjcuNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj4KICAgIDxwYXRoIGQ9Ik0yNy44MTA3IDEzLjUwNTRDMjcuODkzMyAxMy4zNzIxIDI3Ljc5NzUgMTMuMiAyNy42NDA3IDEzLjJIMjEuOTc4NEMyMS44NTgyIDEzLjIgMjEuNzY1MSAxMy4wOTQ3IDIxLjc3OTkgMTIuOTc1NEwyMy4wMjgzIDIuOTA1NTVDMjMuMDU0NiAyLjY5MjY0IDIyLjc3MjggMi41OTMyMiAyMi42NTk4IDIuNzc1NThMMTIuOTE2NiAxOC40OTQ2QzEyLjgzNCAxOC42Mjc5IDEyLjkyOTggMTguOCAxMy4wODY2IDE4LjhIMTguNzQ4OUMxOC44NjkxIDE4LjggMTguOTYyMiAxOC45MDUzIDE4Ljk0NzQgMTkuMDI0NkwxNy42OTkxIDI5LjA5NDRDMTcuNjcyNyAyOS4zMDc0IDE3Ljk1NDUgMjkuNDA2OCAxOC4wNjc1IDI5LjIyNDRMMjcuODEwNyAxMy41MDU0WiIgZmlsbD0iI0MwRjA2MCIvPgogIDwvZz4KPC9zdmc+Cg==" />
              <CellText>
                {t('home.steps.first.span')}
                <CellSpan>{t('home.steps.first.text')}</CellSpan>
              </CellText>
            </TableCell>
            <TableCell>
              <CellImg src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjExLjk5NCAyLjIxOCAxNi43NTkgMjcuNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj4KICAgIDxwYXRoIGQ9Ik0yNy44MTA3IDEzLjUwNTRDMjcuODkzMyAxMy4zNzIxIDI3Ljc5NzUgMTMuMiAyNy42NDA3IDEzLjJIMjEuOTc4NEMyMS44NTgyIDEzLjIgMjEuNzY1MSAxMy4wOTQ3IDIxLjc3OTkgMTIuOTc1NEwyMy4wMjgzIDIuOTA1NTVDMjMuMDU0NiAyLjY5MjY0IDIyLjc3MjggMi41OTMyMiAyMi42NTk4IDIuNzc1NThMMTIuOTE2NiAxOC40OTQ2QzEyLjgzNCAxOC42Mjc5IDEyLjkyOTggMTguOCAxMy4wODY2IDE4LjhIMTguNzQ4OUMxOC44NjkxIDE4LjggMTguOTYyMiAxOC45MDUzIDE4Ljk0NzQgMTkuMDI0NkwxNy42OTkxIDI5LjA5NDRDMTcuNjcyNyAyOS4zMDc0IDE3Ljk1NDUgMjkuNDA2OCAxOC4wNjc1IDI5LjIyNDRMMjcuODEwNyAxMy41MDU0WiIgZmlsbD0iI0MwRjA2MCIvPgogIDwvZz4KPC9zdmc+Cg==" />
              <CellText>
                {t('home.steps.second.span')}
                <CellSpan>{t('home.steps.second.text')}</CellSpan>
              </CellText>
            </TableCell>
            <TableCell>
              <CellImg src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjExLjk5NCAyLjIxOCAxNi43NTkgMjcuNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj4KICAgIDxwYXRoIGQ9Ik0yNy44MTA3IDEzLjUwNTRDMjcuODkzMyAxMy4zNzIxIDI3Ljc5NzUgMTMuMiAyNy42NDA3IDEzLjJIMjEuOTc4NEMyMS44NTgyIDEzLjIgMjEuNzY1MSAxMy4wOTQ3IDIxLjc3OTkgMTIuOTc1NEwyMy4wMjgzIDIuOTA1NTVDMjMuMDU0NiAyLjY5MjY0IDIyLjc3MjggMi41OTMyMiAyMi42NTk4IDIuNzc1NThMMTIuOTE2NiAxOC40OTQ2QzEyLjgzNCAxOC42Mjc5IDEyLjkyOTggMTguOCAxMy4wODY2IDE4LjhIMTguNzQ4OUMxOC44NjkxIDE4LjggMTguOTYyMiAxOC45MDUzIDE4Ljk0NzQgMTkuMDI0NkwxNy42OTkxIDI5LjA5NDRDMTcuNjcyNyAyOS4zMDc0IDE3Ljk1NDUgMjkuNDA2OCAxOC4wNjc1IDI5LjIyNDRMMjcuODEwNyAxMy41MDU0WiIgZmlsbD0iI0MwRjA2MCIvPgogIDwvZz4KPC9zdmc+Cg==" />
              <CellText>
                {t('home.steps.third.span')}
                <CellSpan>{t('home.steps.third.text')}</CellSpan>
              </CellText>
            </TableCell>
          </Table>
          <CoinsImg src="https://letsexchange.io/_nuxt/img/home-coin-bg.357439f.svg" />
        </Container>
        <ExchangeWindow />
      </Main>
    </DefaultLayout>
  );
};

export default Home;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1310px;
  padding: 0 0 130px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 615px;
  width: 100%;
  padding: 85px 0px 145px;
  color: #fff;
  font-size: 38px;
  font-weight: 400;
  line-height: 55px;
  width: 100%;
  position: relative;
`;

const ContainerCursiveText = styled.span`color: #b7f348;
  font-family: 600;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Table = styled.ul`
  margin: 55px 0 0;
  align-items: center;
  border-bottom: 1px solid #b7f348;
  border-top: 1px solid #b7f348;
  display: flex;
  height: 122px;
`;

const TableCell = styled.li`
  width: 33.3%;
  height: 100%;
  border-right: 1px solid #b7f348;
  display: flex;
  justify-content: center;
  align-items: center;
  &:last-child {
    border-right: 0px !important;
  }
`;

const CellImg = styled.img`
  width: 24px;
`;

const CellText = styled.div`
  font-size: 16px;
  letter-spacing: .03em;
  line-height: 135.9%;
  display: flex;
  flex-direction: column;
  color: #b7f348;
  font-style: italic;
  font-weight: 700;
`;

const CellSpan = styled.span`
  color: #fff;
`;

const CoinsImg = styled.img`
  position: absolute;
  width: 100%;
  bottom: -10px;
  z-index: 1;
`;
