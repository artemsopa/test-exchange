import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useHover } from 'usehooks-ts';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Coin } from '@/types/Coin';
import ArrowDownIcon from '@/icons/ArrowDownIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import SwitchIcon from '@/icons/SwitchIcon';
import RefreshIcon from '@/icons/RefreshIcon';
import PrelogoIcon from '@/icons/PrelogoIcon';
import FloatIcon from '@/icons/FloatIcon';
import FixedIcon from '@/icons/FixedIcon';
import SearchIcon from '@/icons/SearchIcon';
import CloseIcon from '@/icons/CloseIcon';
import CheckIcon from '@/icons/CheckIcon';
import { GeneralService } from '@/services/GeneralService';
import Loader from './Loader';
import BackIcon from '@/icons/BackIcon';
import RightArrowIcon from '@/icons/RightArrowIcon';
import CopyIcon from '@/icons/CopyIcon';

const coins: Coin[] = [{
  main: 'BTC',
  title: 'BTC',
  shortTitle: 'BTC',
  desc: 'Bitcoin · Bitcoin',
  img: 'https://letsexchange.s3.eu-central-1.amazonaws.com/coins/9489b9506caf28a7d22423c0bf908937.svg',
  swap: true,
  buysell: true,
  dex: false,
  min: '0.004',
  max: '14',
  regex: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/g,
}, {
  main: 'ETH',
  title: 'ETH',
  shortTitle: 'ETH',
  desc: 'Ethereum · Ethereum',
  img: 'https://letsexchange.s3.eu-central-1.amazonaws.com/coins/cce0373d3721efb48fb7ced57e26f6d6.svg',
  swap: true,
  buysell: true,
  dex: false,
  min: '0.07',
  max: '240.28962909833',
  regex: /^0x[a-fA-F0-9]{40}$/g,
}, {
  main: 'USDT-TRC20',
  title: 'TRC20',
  shortTitle: 'USDT',
  desc: 'TetherUS · Tron (TRC20)',
  img: 'https://letsexchange.s3.eu-central-1.amazonaws.com/coins/9a086127589d7c0279610e20bc0bfaac.svg',
  swap: true,
  buysell: true,
  dex: false,
  min: '110',
  max: '404914.91',
  regex: /^T[0-9a-fA-F]{33}$/,
}, {
  main: 'USDC-ALGO',
  title: 'ALGO',
  shortTitle: 'USDC',
  desc: 'USD Coin · Algorand',
  img: 'https://letsexchange.s3.eu-central-1.amazonaws.com/coins/09e1c1d264e55190c9c7b4ac980d6f5c.svg',
  swap: true,
  buysell: true,
  dex: false,
  min: '110',
  max: '405012.86',
  regex: /^A[2-7A-Z]{58}$/,
}, {
  main: 'XMR',
  title: 'XMR',
  shortTitle: 'XMR',
  desc: 'Monero · Monero',
  img: 'https://letsexchange.s3.eu-central-1.amazonaws.com/coins/c52aabcca125ab1b23b2946181233fc3.svg',
  swap: true,
  buysell: false,
  dex: false,
  min: '0.8',
  max: '2675.68',
  regex: /^4[0-9A-HJ-NP-Za-km-z]{94}$/,
}, {
  main: 'MATIC',
  title: 'MATIC',
  shortTitle: 'MATIC',
  desc: 'Polygon · Polygon',
  img: 'https://letsexchange.s3.eu-central-1.amazonaws.com/coins/64ac60f881250155747b51e815c21431.svg',
  swap: true,
  buysell: false,
  dex: false,
  min: '200',
  max: '653507.63689024',
  regex: /^(0x)?[0-9a-fA-F]{40}$/,
}];

const ExchangeWindow: React.FC = () => {
  enum Course {
    FLOAT,
    FIXED,
  }

  enum Step {
    FIRST,
    GIVE_COIN,
    GET_COIN,
    ADD_PROMOCODE,
    SECOND,
    ADD_ADDRESS,
    THIRD,
    FOURTH,
    CANCEL_EXCHANGE,
    CANCELED_TRANSACTION,
    SUPPORT,
  }

  const { t } = useTranslation();

  const {
    register, setValue, handleSubmit, watch, formState: { errors },
  } = useForm<{ wallet: string; }>({
    mode: 'onChange',
  });

  const wallet = watch('wallet');

  useEffect(() => {
    if (!wallet) {
      setWalletValue('');
    } else {
      setWalletValue(wallet);
    }
  }, [wallet]);

  const [currStep, setCurrStep] = useState<Step>(Step.FIRST);

  const [isGiveInputActive, setIsGiveInputActive] = useState<boolean>(false);
  const [isSearchInputActive, setIsSearchActive] = useState<boolean>(false);

  const [isRefreshActive, setIsRefreshActive] = useState<boolean>(true);

  const [isWalletInputFocus, setIsWalletInputFocus] = useState<boolean>(false);

  const [isPolicyChecked, setIsPolicyChecked] = useState<boolean>(false);

  const [selectedCourse, setSelectedCourse] = useState<Course>(Course.FLOAT);

  const [selectedGiveCoin, setSelectedGiveCoin] = useState<Coin>(coins[0]);
  const [selectedGetCoin, setSelectedGetCoin] = useState<Coin>(coins[1]);

  const [giveAmount, setGiveAmount] = useState<string | null>(coins[0].min);
  const [getAmount, setGetAmount] = useState<string | null>(null);
  const [depositAmountUsdt, setDepositAmountUsdt] = useState<string | null>('106.13280000');

  const [searchCoinValue, setSearchCoinValue] = useState<string>('');
  const [walletValue, setWalletValue] = useState<string>('');

  // const [isAddressValid, setIsAddressValid] = useState<boolean | null>(null);

  const [exchangeErorr, setExchangeErorr] = useState<{ message: string; min?: string; max?: string } | null>(null);

  const giveRef = useRef<HTMLDivElement>(null);
  const getRef = useRef<HTMLDivElement>(null);

  const isGiveHover = useHover(giveRef);
  const isGetHover = useHover(getRef);

  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  useEffect(() => {
    setIsPolicyChecked(false);
  }, [currStep]);

  useEffect(() => {
    if (currStep === Step.FOURTH) {
      const timerInterval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(timerInterval);
        } else if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [minutes, seconds, currStep]);

  useEffect(() => {
    if (currStep === Step.FOURTH) {
      setMinutes(30);
      setSeconds(0);
    }
  }, [currStep]);

  useEffect(() => {
    getExchangeInfo();
  }, [giveAmount, selectedGiveCoin, selectedGetCoin, selectedCourse]);

  useEffect(() => {
    if (!isRefreshActive) {
      setTimeout(() => {
        setIsRefreshActive(true);
      }, 1);
    }
  }, [isRefreshActive]);

  const getExchangeInfo = async () => {
    if (giveAmount) {
      try {
        setGetAmount(null);
        const { data } = await GeneralService.getInfo(selectedCourse === Course.FLOAT, giveAmount, selectedGiveCoin.main, selectedGetCoin.main);
        if (Number(giveAmount) < Number(data.min_amount)) {
          setExchangeErorr({
            message: `Минимальная сумма - ${selectedGiveCoin.min} ${selectedGiveCoin.shortTitle}`,
            min: selectedGiveCoin.min,
          });
          setGetAmount('¯\\_(ツ)_/¯');
        } else if (Number(giveAmount) > Number(data.max_amount)) {
          setExchangeErorr({
            message: `Максимальная сумма - ${selectedGiveCoin.max} ${selectedGiveCoin.shortTitle}`,
            max: selectedGiveCoin.max,
          });
          setGetAmount('¯\\_(ツ)_/¯');
        } else {
          setExchangeErorr(null);
          setGetAmount(`≈${data.amount}`);
          setDepositAmountUsdt(data.deposit_amount_usdt);
        }
      } catch (error) {

      }
    }
  };

  useEffect(() => { }, [giveAmount]);

  const handleSwitchCoins = () => {
    const tempGive = selectedGetCoin;
    const tempGet = selectedGiveCoin;

    setSelectedGiveCoin(tempGive);
    setGiveAmount(tempGive.min);
    setSelectedGetCoin(tempGet);
  };

  const hadleChangeCoin = (item: Coin) => {
    if (currStep === Step.GET_COIN && selectedGiveCoin !== item) {
      setSelectedGetCoin(item);
      setCurrStep(Step.FIRST);
      setSearchCoinValue('');
    } else if (currStep === Step.GIVE_COIN && selectedGetCoin !== item) {
      setSelectedGiveCoin(item);
      setCurrStep(Step.FIRST);
      setSearchCoinValue('');
      setGiveAmount(item.min);
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGiveAmount(value);
  };

  const handleCoinSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCoinValue(value);
  };

  const handleWalletChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWalletValue(value);
    // const isValid = validate(value, selectedGetCoin.shortTitle, {
    //   chainType: '',
    //   networkType: '',
    // });
    // setIsAddressValid(isValid);
  };

  const handleCheckPolicy = () => {
    setIsPolicyChecked(!isPolicyChecked);
  };

  return (
    <MainWrapper>
      <Main>
        {currStep === Step.FIRST && (
          <>
            <Headline>
              <PrelogoIcon />
              <StepsWrapper>
                <StepsTitle>{t('exchange.step1.title')}</StepsTitle>
                <StepList>
                  <StepItem isActive />
                  <StepItem />
                  <StepItem />
                  <StepItem />
                </StepList>
              </StepsWrapper>
              <RefreshIconWrapper
                isActive={isRefreshActive}
                onClick={() => { setIsRefreshActive(false); }}
              >
                <RefreshIcon />
              </RefreshIconWrapper>
            </Headline>
            <CourseWrapper>
              <CourseItem
                isFill
                isActive={selectedCourse === Course.FLOAT}
                onClick={() => setSelectedCourse(Course.FLOAT)}
              >
                <FloatIcon />
                {t('exchange.step1.float')}
              </CourseItem>
              <CourseItem
                isFill={false}
                isActive={selectedCourse === Course.FIXED}
                onClick={() => setSelectedCourse(Course.FIXED)}
              >
                <FixedIcon />
                {t('exchange.step1.fixed')}
              </CourseItem>
            </CourseWrapper>
            <Body>
              <InputsWrapper>
                <ErrorInputWrapper isError={!!exchangeErorr}>
                  {exchangeErorr && <ErrorWrapper onClick={() => setGiveAmount(exchangeErorr.min ? exchangeErorr.min : exchangeErorr.max ? exchangeErorr.max : selectedGiveCoin.min)}>{exchangeErorr.message}</ErrorWrapper>}
                  <InputWrapper isHover={isGiveHover} isActive={isGiveInputActive} isError={!!exchangeErorr}>
                    <InputPrimary>
                      <InputLabel>{t('exchange.step1.give')}</InputLabel>
                      <Input
                        type="number"
                        value={giveAmount || selectedGiveCoin.min}
                        onFocus={() => setIsGiveInputActive(true)}
                        onBlur={() => setIsGiveInputActive(false)}
                        onChange={handleAmountChange}
                      />
                      <EqualLabel>
                        ≈$
                        {depositAmountUsdt}
                      </EqualLabel>
                    </InputPrimary>
                    <SelectedCoin ref={giveRef} onClick={() => setCurrStep(Step.GIVE_COIN)}>
                      <CoinImg src={selectedGiveCoin.img} />
                      <CoinTextWrapper>
                        <CoinShortTitle>{selectedGiveCoin.shortTitle}</CoinShortTitle>
                        {selectedGiveCoin.shortTitle !== selectedGiveCoin.title
                          && <CoinTitle>{selectedGiveCoin.title}</CoinTitle>}
                      </CoinTextWrapper>
                      <SvgWrapper>
                        <ArrowDownIcon />
                      </SvgWrapper>
                    </SelectedCoin>
                  </InputWrapper>
                </ErrorInputWrapper>
                <InputWrapper isHover={isGetHover}>
                  <InputPrimary>
                    <InputLabel>{t('exchange.step1.get')}</InputLabel>
                    {getAmount
                      ? <Input type="text" value={getAmount} disabled style={{ cursor: 'not-allowed' }} />
                      : <Loader />}
                  </InputPrimary>
                  <SelectedCoin ref={getRef} onClick={() => setCurrStep(Step.GET_COIN)}>
                    <CoinImg src={selectedGetCoin.img} />
                    <CoinTextWrapper>
                      <CoinShortTitle>{selectedGetCoin.shortTitle}</CoinShortTitle>
                      {selectedGetCoin.shortTitle !== selectedGetCoin.title
                        && <CoinTitle>{selectedGetCoin.title}</CoinTitle>}
                    </CoinTextWrapper>
                    <SvgWrapper>
                      <ArrowDownIcon />
                    </SvgWrapper>
                  </SelectedCoin>
                </InputWrapper>
                <Switch onClick={handleSwitchCoins}>
                  <SwitchIcon />
                </Switch>
              </InputsWrapper>
              <SimpleInput>
                <SimpleTextPrimary>{t('exchange.step1.promocode')}</SimpleTextPrimary>
                <SimpleTextSecondary>
                  {t('exchange.step1.notreq')}
                  <ArrowRightIcon />
                </SimpleTextSecondary>
              </SimpleInput>
              <Button className="btn-4" isDisabled={!!exchangeErorr} onClick={() => (!exchangeErorr ? setCurrStep(Step.SECOND) : undefined)}><span>{t('exchange.step1.submit')}</span></Button>
            </Body>
          </>
        )}
        {(currStep === Step.GET_COIN || currStep === Step.GIVE_COIN) && (
          <>
            <Headline>
              <StepsTitle>{t('search.title')}</StepsTitle>
              <HeadlineIconWrapper onClick={() => setCurrStep(Step.FIRST)}>
                <CloseIcon />
              </HeadlineIconWrapper>
            </Headline>
            <Body>
              <SearchInputWrapper
                isActive={isSearchInputActive}
              >
                <LoupeWrapper>
                  <SearchIcon />
                </LoupeWrapper>
                <InputSearch
                  type="text"
                  placeholder={t('search.inpplace')}
                  onFocus={() => setIsSearchActive(true)}
                  onBlur={() => setIsSearchActive(false)}
                  value={searchCoinValue}
                  onChange={handleCoinSearch}
                />
              </SearchInputWrapper>
              <CoinsList>
                {coins.filter((item) => item.title.toLowerCase().includes(searchCoinValue.toLowerCase())
                  || item.shortTitle.toLowerCase().includes(searchCoinValue.toLowerCase())
                  || item.desc.toLowerCase().includes(searchCoinValue.toLowerCase()))
                  .map((item, index) => (
                    <CoinItem
                      key={index}
                      isDisabled={currStep === Step.GET_COIN ? selectedGiveCoin === item : currStep === Step.GIVE_COIN ? selectedGetCoin === item : false}
                      isActive={item.shortTitle === (currStep === Step.GET_COIN ? selectedGetCoin.shortTitle : selectedGiveCoin.shortTitle)}
                      onClick={() => hadleChangeCoin(item)}
                    >
                      <CoinLiImg src={item.img} />
                      <CoinDescWrapper>
                        <CoinLiTitle>
                          {item.shortTitle}
                          <CoinLiSpan>{item.title}</CoinLiSpan>
                        </CoinLiTitle>
                        <CoinDescText>{item.desc}</CoinDescText>
                        {(item.swap || item.buysell || item.dex)
                          && (
                            <CoinAdditional>
                              {item.swap
                                && <CAdditionalItem>Swap</CAdditionalItem>}
                              {item.buysell
                                && <CAdditionalItem>Buy/Sell</CAdditionalItem>}
                              {item.dex
                                && <CAdditionalItem>DEX</CAdditionalItem>}
                            </CoinAdditional>
                          )}
                      </CoinDescWrapper>
                      {(item.shortTitle === (currStep === Step.GET_COIN ? selectedGetCoin.shortTitle : selectedGiveCoin.shortTitle))
                        && (
                          <CheckIconWrapper>
                            <CheckIcon />
                          </CheckIconWrapper>
                        )}
                    </CoinItem>
                  ))}
              </CoinsList>
            </Body>
          </>
        )}
        {(currStep === Step.SECOND || currStep === Step.THIRD) && (
          <>
            <Headline>
              <HeadlineIconWrapper onClick={() => setCurrStep(currStep === Step.SECOND ? Step.FIRST : currStep === Step.THIRD ? Step.SECOND : Step.FIRST)}>
                <BackIcon />
              </HeadlineIconWrapper>
              <StepsWrapper>
                {currStep === Step.SECOND
                  && <StepsTitle>{t('exchange.step2.title')}</StepsTitle>}
                {currStep === Step.THIRD
                  && <StepsTitle>{t('exchange.step3.title')}</StepsTitle>}
                <StepList>
                  <StepItem isActive />
                  <StepItem isActive />
                  <StepItem isActive={currStep === Step.THIRD} />
                  <StepItem />
                </StepList>
              </StepsWrapper>
              <div style={{ width: '33px', height: '33px' }} />
            </Headline>
            <AddressCoinsWrapper>
              <AddressInfoWrapper>
                <FromToWrapper>
                  <FromToImgWrapper isTop>
                    <FromToImg src={selectedGiveCoin.img} />
                  </FromToImgWrapper>
                  ⇅
                  <FromToImgWrapper>
                    <FromToImg src={selectedGetCoin.img} />
                  </FromToImgWrapper>
                </FromToWrapper>
                <FromToDesc>
                  <FromToItem>
                    {giveAmount}
                    <span>{selectedGiveCoin.shortTitle}</span>
                  </FromToItem>
                  <FromToItem>
                    {getAmount}
                    <span>{selectedGetCoin.shortTitle}</span>
                  </FromToItem>
                </FromToDesc>
              </AddressInfoWrapper>
              {currStep === Step.THIRD
                && (
                  <Address>
                    <CoinAddress>
                      <img src={selectedGetCoin.img} alt="" />
                      {`${t('exchange.step3.your1')} ${selectedGetCoin.shortTitle} ${t('exchange.step3.your2')}`}
                    </CoinAddress>
                    <WalletCoinAddress>{walletValue}</WalletCoinAddress>
                  </Address>
                )}
            </AddressCoinsWrapper>
            {currStep === Step.THIRD
              && (
                <>
                  <AddEmailWrapper>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157ZM18.5762 7.51986C18.8413 7.83807 18.7983 8.31099 18.4801 8.57617L16.2837 10.4066C15.3973 11.1452 14.6789 11.7439 14.0448 12.1517C13.3843 12.5765 12.7411 12.8449 12 12.8449C11.2589 12.8449 10.6157 12.5765 9.95518 12.1517C9.32112 11.7439 8.60271 11.1452 7.71636 10.4066L5.51986 8.57617C5.20165 8.31099 5.15866 7.83807 5.42383 7.51986C5.68901 7.20165 6.16193 7.15866 6.48014 7.42383L8.63903 9.22291C9.57199 10.0004 10.2197 10.5384 10.7666 10.8901C11.2959 11.2306 11.6549 11.3449 12 11.3449C12.3451 11.3449 12.7041 11.2306 13.2334 10.8901C13.7803 10.5384 14.428 10.0004 15.361 9.22291L17.5199 7.42383C17.8381 7.15866 18.311 7.20165 18.5762 7.51986Z" fill="#662bcf" />
                      </g>
                    </svg>
                    {t('exchange.step3.email')}
                    <AddIconWrapper>
                      <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                          <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                      </svg>
                    </AddIconWrapper>
                  </AddEmailWrapper>
                  <CheckboxWrapper>
                    <input type="checkbox" checked={isPolicyChecked} onChange={handleCheckPolicy} />
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {t('exchange.step3.agree1')}
                      <Link to="/">
                        {t('exchange.step3.agree2')}
                      </Link>
                      {t('exchange.step3.agree3')}
                      <Link to="/">
                        {t('exchange.step3.agree4')}
                      </Link>
                    </div>
                  </CheckboxWrapper>
                </>
              )}
            {currStep === Step.SECOND
              && (
                <>
                  <WalletWrapper
                    isError={!!errors.wallet}
                    isFocus={isWalletInputFocus}
                  >
                    <Label
                      isError={!!errors.wallet}
                      isFocus={isWalletInputFocus || walletValue.length > 0}
                    >
                      {`${selectedGetCoin.shortTitle} ${t('exchange.step2.label')}`}
                    </Label>
                    <InputWallet
                      {...register(
                        'wallet',
                        {
                          pattern: {
                            value: selectedGetCoin.regex,
                            message: t('exchange.step2.walletpattern'),
                          },
                        },
                      )}
                      isFocus={isWalletInputFocus || walletValue.length > 0}
                      isError={!!errors.wallet}
                      type="text"
                      onFocus={() => setIsWalletInputFocus(true)}
                      onBlur={() => setIsWalletInputFocus(false)}
                    />
                    {!isWalletInputFocus
                      && (
                        <CopyWallet
                          onClick={() => navigator.clipboard.readText()
                            .then((text) => {
                              setValue('wallet', text);
                            })}
                          isFocus={isWalletInputFocus || walletValue.length > 0}
                        >
                          {t('exchange.step2.paste')}
                        </CopyWallet>
                      )}
                  </WalletWrapper>
                  {errors.wallet && <ErrorText>{errors.wallet.message}</ErrorText>}

                  <ReturnAddress>
                    <RefundPart>
                      <RefundPartImg src={selectedGiveCoin.img} />
                      {t('exchange.step2.back')}
                    </RefundPart>
                    <RefundPart>
                      <RefundPartSpan>{t('exchange.step2.optional')}</RefundPartSpan>
                      <RightArrowIcon />
                    </RefundPart>
                  </ReturnAddress>
                </>
              )}
            {currStep === Step.SECOND
              && <Button isDisabled={!!errors.wallet || walletValue.length < 1} onClick={() => setCurrStep(Step.THIRD)}>{t('exchange.step2.submit')}</Button>}
            {currStep === Step.THIRD
              && <Button isDisabled={!isPolicyChecked} onClick={() => setCurrStep(Step.FOURTH)}>{t('exchange.step3.submit')}</Button>}
          </>
        )}
        {currStep === Step.FOURTH && (
          <>
            <Headline>
              <HeadlineTimer>
                <p>
                  {formattedMinutes}
                  :
                  {formattedSeconds}
                </p>
              </HeadlineTimer>
              <StepsWrapper>
                <StepsTitle>{t('exchange.step4.title')}</StepsTitle>
                <StepList>
                  <StepItem isActive />
                  <StepItem isActive />
                  <StepItem isActive />
                  <StepItem isActive />
                </StepList>
              </StepsWrapper>
              <div style={{ width: '33px', height: '33px' }} />
            </Headline>
            <FPrimaryText>
              {t('exchange.step4.title2')}
            </FPrimaryText>
            <FSecondaryText>
              {t('exchange.step4.desc')}
            </FSecondaryText>
            <FContent>
              <FInfo>
                <FCoinWrapper>
                  <FCoinText>
                    <FCoinImg src={selectedGiveCoin.img} />
                    <FCoinTitle>
                      {selectedGiveCoin.shortTitle}
                      <FCoinSpan>{selectedGiveCoin.title}</FCoinSpan>
                    </FCoinTitle>
                  </FCoinText>
                  <FCoinPriceWrapper>
                    <FFlex>
                      <FCoinPriceDesc>
                        {giveAmount}
                        <FCoinPriceSpan>{selectedGiveCoin.shortTitle}</FCoinPriceSpan>
                      </FCoinPriceDesc>
                      {giveAmount
                        && (
                          <SvgWrapperCopy onClick={() => { navigator.clipboard.writeText(giveAmount); toast.success(t('exchange.step4.copy1')); }}>
                            <CopyIcon />
                          </SvgWrapperCopy>
                        )}
                    </FFlex>
                  </FCoinPriceWrapper>
                </FCoinWrapper>
                <QrWrapper src="https://upload.wikimedia.org/wikipedia/commons/6/61/QR_deWP.svg" />
              </FInfo>
              <FaFlex>
                <FAddress>
                  <CoinAddress>
                    <img src={selectedGiveCoin.img} alt="" />
                    {t('exchange.step4.add')}
                  </CoinAddress>
                  <WalletCoinAddress>bc1q6ej9zr78r2q866pgh7d5mxhc523afw9wxlwjk3</WalletCoinAddress>
                </FAddress>
                <SvgWrapperCopy onClick={() => { navigator.clipboard.writeText('bc1q6ej9zr78r2q866pgh7d5mxhc523afw9wxlwjk3'); toast.success(t('exchange.step4.copy2')); }}>
                  <CopyIcon />
                </SvgWrapperCopy>
              </FaFlex>
              <BottomTrD>
                <span>{t('exchange.step4.id')}</span>
                <div>
                  c65084e4c2ab84
                  <SvgWrapperCopy onClick={() => { navigator.clipboard.writeText('c65084e4c2ab84'); toast.success(t('exchange.step4.copy3')); }}>
                    <CopyIcon />
                  </SvgWrapperCopy>
                </div>
              </BottomTrD>
            </FContent>
            <CancelExchange onClick={() => setCurrStep(Step.FIRST)}>{t('exchange.step4.cancel')}</CancelExchange>
          </>
        )}
      </Main>
      <RateUs href="https://trustpilot.com/review/letsexchange.io?utm_medium=trustbox&utm_source=MicroReviewCount">
        {t('exchange.reviews1')}
        <span>{t('exchange.reviews2')}</span>
        {t('exchange.reviews3')}
        <svg width="20" height="20" viewBox="0 0 102 94" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#04da8d' }} className="styles_star__zugOD"><path fillRule="evenodd" clipRule="evenodd" d="M62.5164 35.7675H101.231L70.0485 57.9374L50.7663 71.535L19.4328 93.7049L31.3335 57.9374L0 35.7675H38.715L50.6157 0L62.5164 35.7675ZM72.6089 66.2137L50.6152 71.6823L81.7981 94L72.6089 66.2137Z" fill="currentColor" /></svg>
        <span>Trustpilot</span>
      </RateUs>
    </MainWrapper>
  );
};

export default ExchangeWindow;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(255,252,104);
  background: linear-gradient(90deg, rgba(255,252,104,1) 0%, rgba(202,255,181,1) 50%, rgba(145,251,240,1) 100%);
  border-radius: 15px;
  height: fit-content;
  transition: all .3s ease;
  position: relative;
`;

const RateUs = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 14px;
  line-height: 15px;
  padding: 20px 15px;
  gap: 5px;
  width: 100%;
  align-items: center;
  color: black;
  span {
    font-weight: 700;
  }
  svg {
    margin-top: -5px;
    margin-right: -2px;
  }
  cursor: pointer;
`;

const Main = styled.div`
  width: 480px;
  height: fit-content;
  background: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 16px 16px;
  transition: all .3s ease;
`;

const Headline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  gap: 10px;
  width: 100%;
`;

const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 99px);
`;

const StepsTitle = styled.div`
  color: #010615;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -.01em;
  line-height: 24px;
  text-align: start;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StepItem = styled.div<{ isActive?: boolean }>`
  width: 25%;
  border-radius: 4px;
  height: 2px;
  background: ${({ isActive }) => (isActive ? '#662bcf' : '#dadde5')};
`;

const CourseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 7px;
  background: #f0f1f5;
  border-radius: 12px;
  gap: 7px;
`;

const CourseItem = styled.div<{ isActive: boolean, isFill: boolean }>`
  background: ${({ isActive }) => (isActive ? '#fff' : 'rgba(255, 255, 255, 0)')};
  border-radius: 10px;
  box-shadow: ${({ isActive }) => (isActive ? '0 0 0 1px rgba(218,221,230,.32), 0 3px 12px -4px rgba(130,138,157,.41)' : 'none')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ isActive }) => (isActive ? '#010615' : '#656870')};
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  padding: 8px 8px;
  width: 50%;
  gap: 6px;
  transition: color .3s;
  svg {
    transition: color .3s;
  }
  svg g path {
    transition: stroke .3s;
  }
  &:hover {
    color: ${({ isActive }) => (!isActive && '#010615')};
    ${({ isFill }) => (isFill && `
      svg {
        fill: #010615;
      }`)}
    ${({ isFill }) => (!isFill && `
      svg g path {
        stroke: #010615;
      }`)}
  }
  ${({ isActive }) => (!isActive && 'cursor: pointer')};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .btn-4 {
    overflow: hidden;
    position: relative;

    span {
      z-index: 20;
    }

    &:after {
      left: -10px;
      animation: moveRight 2s ease 2s infinite normal forwards;
      background: linear-gradient(90deg,rgba(251,251,255,0) 0,#fff);
      content: "";
      display: block;
      height: 175%;
      opacity: .5;
      position: absolute;
      transform: translateX(-100%) rotate(-25deg);
      width: 75px;
    }
  }

  @keyframes moveRight {
    0% {
      left: -75px;
      z-index: -10;
    }
    100% {
      left: 120%;
      z-index: 100;
    }
  }
`;

const InputsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
`;

const Switch = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 67px;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  cursor: pointer;
  box-shadow: none;
    transition: all .3s ease-out;
  svg g {
    transition: all .3s ease-out;
  }
  &:hover {
    box-shadow: 0 0 0 1px rgba(218,221,230,.32), 0 3px 12px -4px rgba(130,138,157,.41);
    svg g {
      fill: #662bcf;
    }
  }
`;

const InputWrapper = styled.li<{ isHover: boolean, isActive?: boolean, isError?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: #f0f1f5;
  ${({ isHover }) => (isHover && 'background-color: #e2e4e7')};
  ${({ isError }) => (isError && 'background-color: #ffe0e3')};
  ${({ isActive }) => (isActive && 'background-color: #f7f2ff')};
  padding: 12px;
  height: fit-content;
  transition: .3s ease-out;
  ${({ isError }) => (isError && 'box-shadow: 0 0 0 2px #ff3746')};
  ${({ isActive }) => isActive && 'box-shadow: 0 0 0 2px #662bcf;'}
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const ErrorInputWrapper = styled.div<{ isError: boolean }>`
  display: flex;
  flex-direction: column;
  transition: all .3s ease;
  li {
    ${({ isError }) => !isError && `
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    `}
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

const ErrorWrapper = styled.div`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #fff;
  color: #ff3746;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 9px 16px;
  text-decoration-line: underline;
  box-shadow: 0 0 0 2px #ff3746;
`;

const InputPrimary = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.div`
  margin-bottom: 4px;
  color: #656870;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  border: none;
  background: none;
  color: #010615;
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  padding: 0;
  width: 100%;
  input::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:focus {

  }
`;

const EqualLabel = styled.div`
  color: #656870;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
`;

const SelectedCoin = styled.div`
  margin: auto 0px;
  background: white;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(218,221,230,.32), 0 3px 12px -4px rgba(130,138,157,.2);
  cursor: pointer;
`;

const CoinImg = styled.img`
  width: 24px;
  height: 24px;
  margin: auto 0px;
`;

const CoinTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0px;
  justify-content: center;
`;

const CoinShortTitle = styled.div`
  color: #010615;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

const CoinTitle = styled.div`
  color: #662bcf;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

const SvgWrapper = styled.div`
  margin: auto 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SvgWrapperCopy = styled.div`
  margin: auto 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg g path {
    transition: all .2s ease-in-out;
  }
  &:hover svg g path {
    stroke: #662bcf;
  }
`;

const SimpleInput = styled.div`
  border: 1px solid #dadde5;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  justify-content: space-between;
  line-height: 16px;
  padding: 16px;
  transition: all .3s ease;
  font-weight: 400;
  &:hover {
    background-color: #f0f1f5;
  }
`;

const SimpleTextPrimary = styled.div`
  color: #010615;
`;

const SimpleTextSecondary = styled.div`
  color: #9b9ea7;
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: normal;
`;

const Button = styled.div<{ isDisabled: boolean }>`
  background-color: #bef102;
  color: black;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  height: 56px;
  letter-spacing: -.01em;
  line-height: 24px;
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
    transition: all .3s ease-out;
  cursor: pointer;
  &:hover {
    background-color: #b6e703;
  }
  ${({ isDisabled }) => isDisabled && 'opacity: 0.5; cursor: default;'}
`;

const HeadlineIconWrapper = styled.div`
  margin-top: auto;
  width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .3s ease;
  position: relative;
  svg {
    width: 20px;
    height: 20px;
  }
  &:hover {
    background-color: #f0f1f5;
  }
  width: 33px;
  height: 33px;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  box-sizing: border-box;
`;

const HeadlineTimer = styled.div`
  align-items: center;
  border: 2px solid #662bcf;
  border-radius: 12px;
  color: #010615;
  color: #662bcf;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 600;
  height: 36px;
  justify-content: center;
  line-height: 20px;
  width: 68px;
`;

const AddIconWrapper = styled.div`
  margin-top: auto;
  width: 28px;
  height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .3s ease;
  position: relative;
  background-color: white;
  svg {
    width: 21px;
    height: 21px;
  }
  border-radius: 50%;
  position: relative;
  box-sizing: border-box;
  margin-left: auto;
`;

const RefreshIconWrapper = styled.div<{ isActive: boolean }>`
  margin-top: auto;
  width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .3s ease;
  position: relative;
  svg {
    width: 22px;
  }
  svg g {
    transition: fill .3s ease-out;
  }
  &:hover {
    background-color: #f0f1f5;
    svg g {
      fill: #662bcf;
    }
  }

  width: 33px;
  height: 33px;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  box-sizing: border-box;

  ${({ isActive }) => isActive && `
  &::before {
    content: "";
    width: 33px;
    height: 33px;
    position: absolute;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid #662bcf;
    animation: prixClipFix 2s infinite linear;
    animation-iteration-count: 1;
    background: rgba(240, 241, 245, 0);
  }

  @keyframes prixClipFix {
    0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
    25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
    50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
    75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
    100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
  }
  `}  
`;

const SearchInputWrapper = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 52px;
  background-color: #f0f1f3;
  border: 2px solid transparent;
  border-radius: 12px;
  outline: none;
  padding: 14px 14px 14px 48px;
  width: 100%;
  position: relative;
  ${({ isActive }) => isActive && 'border: 2px solid #662bcf;'}
  transition: border .3s ease-in-out;
  &:hover {
    background-color: #ebebeb;
  }
`;

const LoupeWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 14px;
  margin: auto 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  cursor: pointer;
`;

const InputSearch = styled.input`
  margin: auto 0px;
  border: 0px;
  width: 100%;
  background-color: rgba(240, 248, 255, 0);
  color: #05051f;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  &::placeholder {
    color: #9c9c9c;
  }
`;

const CoinsList = styled.ul`
  width: calc(100% + 32px);
  margin-top: 5px;
  margin-left: -16px;
  height: 340px;
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    background-color: #f0f1f5;
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #9b9ea7;
    border-radius: 8px;
  }
  &::-webkit-scrollbar {
    background-color: #f0f1f5;
    left: 10px;
    position: relative;
    width: 8px;
  }
`;

const CoinItem = styled.li<{ isActive: boolean, isDisabled: boolean }>`
  width: 100%;
  height: 85px;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 12px;
  cursor: pointer;
  ${({ isActive }) => isActive && 'background-color: #f7f2ff;'}
  ${({ isDisabled }) => isDisabled && 'opacity: 0.3; cursor: not-allowed;'}
`;

const CoinLiImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const CoinDescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CoinLiTitle = styled.div`
  margin: auto 0px;
  color: #010615;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const CoinLiSpan = styled.span`
  align-items: center;
  border-radius: 4px;
  color: #010615;
  display: flex;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .06em;
  line-height: 16px;
  padding: 0 4px;
  text-transform: uppercase;
  width: fit-content;
`;

const CoinDescText = styled.div`
  color: #656870;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

const CoinAdditional = styled.ul`
  border: 1px solid #e4e5ed;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  width: fit-content;
  overflow: hidden;
`;

const CAdditionalItem = styled.li`
  border-right: 1px solid #e4e5ed;
  color: #656870;
  font-size: 11px;
  font-weight: 400;
  line-height: 12px;
  padding: 4px 8px;
  &:last-child {
    border-right: 0px;
  }
`;

const CheckIconWrapper = styled.div`
  margin-top: 8px;
  margin-left: auto;
`;

const AddressCoinsWrapper = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 12px;
  border: 1px solid #dadde5;
  display: flex;
  flex-direction: column;
`;

const AddressInfoWrapper = styled.div`
  width: 100%;
  height: 132px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 12px 16px;
`;

const FromToWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #eeeff5;
  text-align: center;
  font-size: 20px;
  font-weight: 900;
`;

const FromToImgWrapper = styled.div<{ isTop?: boolean }>`
  background: white;
  width: 40px;
  height: 39px;
  border: 3px solid white;
  ${({ isTop }) => (isTop ? `
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
  ` : `
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
  `)}
`;

const FromToImg = styled.img`
  width: 33px;
  height: 33px;
`;

const FromToDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #010615;
  font-size: 24px;
  line-height: 24px;
`;

const FromToItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  span {
    color: #656870;
    font-size: 14px;
    letter-spacing: .04em;
    line-height: 16px;
    text-transform: uppercase;
  }
`;

const WalletWrapper = styled.div<{ isFocus: boolean, isError: boolean }>`
  align-items: center;
  border: 1px solid transparent;
  border-radius: 12px;
  color: #010615;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  height: 62px;
  justify-content: center;
  padding: 12px 16px 12px;
  position: relative;
  transition: all .3s ease;
  width: 100%;
  background: #f0f1f5;
  input:focus {
    #wrplbl {
        font-size: 10px !important;
    }
  }
  ${({ isFocus, isError }) => isError && !isFocus && 'background: #ffedf1; border: 0px;'}
  ${({ isFocus, isError }) => isFocus && `background: white; border: 1px solid ${isError ? '#ff3746' : '#662bcf'};`}
`;

const Label = styled.div<{ isFocus: boolean, isError: boolean }>`
  color: #656870;
  font-size: 16px;
  left: 16px;
  line-height: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ isFocus, isError }) => isFocus && `font-size: 12px; top: 15px; color: ${isError ? '#ff3746' : '#662bcf'};`}
  transition: all .2s ease;
`;

const InputWallet = styled.input<{ isFocus: boolean, isError: boolean }>`
  position: absolute;
  z-index: 2;
  background: none;
  border: none;
  color: #010615;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  padding: 0;
  width: 310px;
  left: 16px;
  top: 25px;
  ${({ isFocus }) => isFocus && 'width: 100%'}
`;

const CopyWallet = styled.div<{ isFocus: boolean }>`
  display: block;
  width: 92px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 600;
  line-height: 20px;
  transition: all .3s ease-out;
  border-radius: 8px;
  font-size: 14px;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #dadde5;
  color: #662bcf;
  margin-left: auto;
  ${({ isFocus }) => isFocus && 'display: none;'}
`;

const ReturnAddress = styled.div`
  align-items: center;
  border: 1px solid #dadde5;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  justify-content: space-between;
  line-height: 16px;
  padding: 16px;
  transition: all .3s ease;
  width: 100%;
  background-color: white;
  transition: all .3s ease-in-out;
  &:hover {
    background-color: #f0f1f5;
  }
`;

const RefundPart = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 12px;
  color: #010615;
  font-style: normal;
  font-weight: 500;
`;

const RefundPartImg = styled.img`
  width: 20px;
  height: 20px;
  margin: auto 0px;
`;

const RefundPartSpan = styled.span`
  color: #9b9ea7;
`;

const Address = styled.div`
  border-top: 1px solid #dadde5;
  box-sizing: border-box;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FAddress = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CoinAddress = styled.div`    
  align-items: center;
  color: #656870;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: 500;
  justify-content: flex-start;
  line-height: 16px;
  margin-bottom: 4px;
  gap: 5px;
  img {
    width: 16px;
    height: 16px;
  }
`;

const WalletCoinAddress = styled.div`
  align-items: center;
  color: #010615;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 500;
  justify-content: flex-start;
  line-height: 20px;
  word-break: break-all;
`;

const AddEmailWrapper = styled.div`
  align-items: center;
  background-color: #f7f2ff;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 14px 12px 14px 14px;
  transition: all .3s ease;
  color: #010615;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  svg {
    margin-right: 10px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div svg {
    margin-right: 0;
    width: 22px;
    height: 22px;
    transition: all .3s ease-in-out;
    border-radius: 50%;
  }
  &:hover div {
    background-color: #662bcf;
    svg g path {
      stroke: white;
    }
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 20px 0px;
  input {
    appearance: none;
    background: transparent;
    border: 2px solid #662bcf;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    flex: 0 0 auto;
    height: 20px;
    margin: 10px 0px 0px;
    opacity: .8;
    outline: none;
    transition: all .2s ease-out;
    width: 20px;
  }
  input:hover {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 12px;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='12' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 6.375 4.125 9l6-6' stroke='%23662BCF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    border: 2px solid #662bcf;
    opacity: 1;
  }
  input:checked {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 12px;
    background-color: #662bcf;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='12' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 6.375 4.125 9l6-6' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    border-color: #662bcf;
    cursor: pointer;
  }
  
  div {
    color: #656870;
    flex-wrap: wrap;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
  }

  div a {
    color: #662bcf;
  }
`;

const FPrimaryText = styled.div`
  color: #010615;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -.01em;
  line-height: 24px;
  margin-bottom: 4px;
`;

const FSecondaryText = styled.div`
  color: #656870;
  font-size: 14px;
  line-height: 20px;
`;

const CancelExchange = styled.div`
  width: 100%;
  background-color: #fff;
  border: 1px solid #dadde5;
  color: #010615;
  border-radius: 12px;
  font-size: 16px;
  height: 44px;
  padding: 12px 24px;
  line-height: 20px;
  cursor: pointer;
  align-items: center;
  display: flex;
  flex-direction: row;
  font-weight: 600;
  justify-content: center;
  transition: all .1s ease-out;
  &:hover {
    background-color: #efefef;
  }
`;

const FContent = styled.div`
  width: 100%;
  border: 1px solid #dadde5;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const FInfo = styled.div`
  border: 2px solid #bef102;
  border-radius: 11px;
  display: flex;
  flex-direction: row;
  height: 114px;
`;

const FCoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 111px);
`;

const FCoinText = styled.div`
  border-bottom: 1px solid #dadde5;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 12px 12px 12px 16px;
`;

const FCoinImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

const FCoinTitle = styled.div`
  color: #010615;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  line-height: 16px;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const FCoinSpan = styled.div`
  color: #656870;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: .01em;
  font-weight: 400;
`;

const FCoinPriceWrapper = styled.div`
  padding: 8px 12px 12px 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FCoinPriceDesc = styled.div`
  color: #010615;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -.01em;
  line-height: 28px;
  display: flex;
  flex-direction: column;
`;

const FCoinPriceSpan = styled.span`
  color: #9b9ea7;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
  line-height: 12px;
  text-transform: uppercase;
  margin-left: 3px;
`;

const QrWrapper = styled.img`
  border-left: 1px solid #dadde5;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

const FFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const FaFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
`;

const BottomTrD = styled.div`
  border-top: 1px solid #dadde5;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 16px;
  span {
    color: #656870;
    font-size: 14px;
    line-height: 16px;
  }
  div {
    color: #010615;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
`;

const ErrorText = styled.div`
  margin-top: -12px;
  border-radius: 15px;
  color: #d61a28;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  padding: 0px 10px;
`;
