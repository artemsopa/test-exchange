import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import DefaultLayout from '@/layouts/DefaultLayout';

const ContactUs: React.FC = () => {
  const { t } = useTranslation();

  const {
    register, setValue, handleSubmit, formState: { errors },
  } = useForm<{ email: string; name: string; desc: string }>({
    mode: 'onChange',
  });

  const submit = () => {
    setValue('email', '');
    setValue('name', '');
    setValue('desc', '');
    toast.success(t('contacts.notify'));
  };

  return (
    <DefaultLayout>
      <Main>
        <Path>
          <PathHref to="/">PlaceExchange</PathHref>
          <>/</>
          <div>{t('contacts.title')}</div>
        </Path>
        <PrimaryText>{t('contacts.title')}</PrimaryText>
        <ContentWrapper>
          <SecondaryText>
            {t('contacts.time')}
            <Span>{t('contacts.number')}</Span>
          </SecondaryText>
          <Desc>{t('contacts.desc')}</Desc>
          <FormWrapper onSubmit={handleSubmit(submit)}>
            <InputsLine>
              <InputWraper>
                <Input
                  placeholder={t('contacts.nameplace')}
                  {...register('name', {
                    maxLength: {
                      value: 50,
                      message: t('contacts.namemax'),
                    },
                    required: {
                      value: true,
                      message: t('contacts.namerequired'),
                    },
                  })}
                />
                {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
              </InputWraper>
              <InputWraper>
                <Input
                  placeholder={t('contacts.emailplace')}
                  {...register(
                    'email',
                    {
                      maxLength: {
                        value: 255,
                        message: t('contacts.emailmax'),
                      },
                      required: {
                        value: true,
                        message: t('contacts.emailrequired'),
                      },
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: t('contacts.emailpattern'),
                      },
                    },
                  )}
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
              </InputWraper>
            </InputsLine>
            <InputWraper>
              <Textarea
                placeholder={t('contacts.messageplace')}
                {...register(
                  'desc',
                  {
                    required: {
                      value: true,
                      message: t('contacts.messagerequired'),
                    },
                  },
                )}
              />
              {errors.desc && <ErrorText>{errors.desc.message}</ErrorText>}
            </InputWraper>
            <Button type="submit">{t('contacts.send')}</Button>
          </FormWrapper>
        </ContentWrapper>
      </Main>
    </DefaultLayout>
  );
};

export default ContactUs;

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
    background-image: url('https://letsexchange.io/_nuxt/img/contacts-bg.5f7758c.svg');
    background-size: cover;
    height: 616px;
    position: absolute;
    right: -13px;
    top: 0;
    width: 531px;
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
`;

const SecondaryText = styled.div`
  font-size: 24px;
  color: #fff;
  font-weight: 600;
  line-height: 120%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Span = styled.div`
  font-size: 27px;
  color: #b7f348;
  font-style: italic;
  letter-spacing: 1px;
`;

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 670px;
  width: 100%;
`;

const InputsLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const InputWraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  border-radius: 15px;
  color: #010615;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  border: none;
  padding: 5px 20px;
  width: 100%;
  height: 42px;
  opacity: 0.9;
  &::placeholder {
    color: #a6a6a6;
  }
`;

const ErrorText = styled.div`
  border-radius: 15px;
  color: #f2545b;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  padding: 0px 10px;
`;

const Textarea = styled.textarea`
  border-radius: 15px;
  color: #010615;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  border: none;
  padding: 10px 20px;
  width: 100%;
  height: 73px;
  opacity: 0.9;
  resize: none;
  outline: none;
  &::placeholder {
    color: #a6a6a6;
  }
`;

const Button = styled.button`
  margin-top: 15px;
  background-color: #B7F348;
  color: black;
  line-height: 20px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  height: 44px;
  padding: 8px 12px;
  width: 200px;
  cursor: pointer;
  border: 0px;
  transition: all .3s ease-in-out;
  &:hover {
    background-color: #b7f348;
  }
`;
