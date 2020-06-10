import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import palette from 'src/styles/palette';
import {
  TextField,
  IStyleFunctionOrObject,
  ITextFieldStyleProps,
  ITextFieldStyles,
  ChoiceGroup,
  IChoiceGroupOption,
  PrimaryButton
} from '@fluentui/react';
import { SelectedChatType } from '../ChatRoomList';
import AlertContainer from 'src/components/common/Alert';

export default function CreateChatRoom({
  update,
  isComplete,
  handleCloseModal
}: {
  update: (
    selectedCreateType: SelectedChatType,
    formData: { title: string; des: string }
  ) => void;
  isComplete: boolean;
  handleCloseModal: () => void;
}) {
  const [selectedCreateType, setSelectedCreateType] = useState<
    SelectedChatType
  >('CHANNEL');
  const [isError, setIsError] = useState<boolean>(false);

  const validationLength = useCallback((value: any, count: number) => {
    if (typeof value !== 'string') {
      setIsError(true);
      return '입력이 올바르지 않습니다.'
    };
    if (value.length > count) {
      setIsError(true);
      return `${count}자 이내로 작성해 주세요.`
    };
    setIsError(false);
  }, []);

  const [formData, setFormData] = useState({ title: '', des: '' });

  const handleChangeCreateType = useCallback(
    (
      _e?: React.FormEvent<HTMLInputElement | HTMLElement> | undefined,
      option?: IChoiceGroupOption | undefined
    ) => {
      setSelectedCreateType(option?.key as SelectedChatType);
    },
    []
  );

  const handleChangeField = useCallback(
    (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string | undefined
    ) => {
      const { name } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: newValue });
    },
    [formData]
  );

  console.log(isError);

  return (
    <>
      <CreateChatRoomWrap>
        <div className="create_title">
          <h3>새로운 대화 만들기</h3>
        </div>
        <div className="create_form_wrap">
          <form>
            <legend>Form - the new chat</legend>
            <div className="form_wrap">
              <div className="input_wrap">
                <ChoiceGroup
                  selectedKey={selectedCreateType}
                  options={createTypeOptions}
                  onChange={handleChangeCreateType}
                />
              </div>
              {selectedCreateType === 'CHANNEL' && (
                <>
                  <div className="input_wrap">
                    <TextField
                      name="title"
                      placeholder="제목을 입력해 주세요"
                      borderless
                      required
                      onGetErrorMessage={(value) => validationLength(value, 50)}
                      styles={inputStyle}
                      onChange={handleChangeField}
                    />
                  </div>
                  <div className="input_wrap">
                    <TextField
                      name="des"
                      multiline
                      placeholder="간략한 설명을 입력해 주세요"
                      borderless
                      onGetErrorMessage={(value) =>
                        validationLength(value, 100)
                      }
                      styles={{ ...inputStyle, ...multilineInputStyle }}
                      resizable={false}
                      onChange={handleChangeField}
                    />
                  </div>
                </>
              )}
              <div className="input_wrap">
                <PrimaryButton
                  text="만들기"
                  onClick={() => update(selectedCreateType, formData)}
                  disabled={isError}
                />
              </div>
            </div>
          </form>
        </div>
      </CreateChatRoomWrap>
      {isComplete && (
        <AlertContainer
          visible={isComplete}
          setVisible={handleCloseModal}
          title={'완료'}
          des={'생성을 완료했습니다.'}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

const CreateChatRoomWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  background: ${palette.teal.tertiray};

  legend {
    font-size: 0 !important;
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    margin: -1px;
  }

  .create_title {
    > h3 {
      font-size: 2rem;
      margin: 0;
      color: #555;
    }
  }

  .create_form_wrap {
    margin-top: 2rem;

    .input_wrap {
      & + .input_wrap {
        margin-top: 1.5rem;
      }
    }
  }
`;

const inputStyle: IStyleFunctionOrObject<
  ITextFieldStyleProps,
  ITextFieldStyles
> = {
  root: {
    maxWidth: 500
  },
  fieldGroup: {
    height: 'auto'
  },
  field: {
    height: '3rem'
  }
};
const multilineInputStyle: IStyleFunctionOrObject<
  ITextFieldStyleProps,
  ITextFieldStyles
> = {
  field: {
    height: '6rem'
  }
};

const createTypeOptions: IChoiceGroupOption[] = [
  {
    key: 'CHANNEL',
    text: '오픈 채널'
  },
  {
    key: 'DIRECT_MESSAGE',
    text: '다이렉트 메세지',
    disabled: true
  }
];
