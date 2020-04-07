import React, { useCallback } from 'react';
import styled from 'styled-components';
import palette from 'src/styles/palette';
import {
  TextField,
  IStyleFunctionOrObject,
  ITextFieldStyleProps,
  ITextFieldStyles
} from '@fluentui/react';

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

export default function CreateChatRoom() {
  const validationLength = useCallback((value: any, count: number) => {
    if (typeof value !== 'string') return '입력이 올바르지 않습니다.';
    if (value.length > count) return `${count}자 이내로 작성해 주세요.`;
  }, []);

  return (
    <CreateChatRoomWrap>
      <div className="create_title">
        <h3>새로운 대화 만들기</h3>
      </div>
      <div className="create_form_wrap">
        <form>
          <legend>Form - the new chat</legend>
          <div className="form_wrap">
            <div className="input_wrap">
              <TextField
                placeholder="제목을 입력해 주세요"
                borderless
                required
                onGetErrorMessage={(value) => validationLength(value, 50)}
                styles={inputStyle}
              />
            </div>
            <div className="input_wrap">
              <TextField
                multiline
                placeholder="간략한 설명을 입력해 주세요"
                borderless
                onGetErrorMessage={(value) => validationLength(value, 300)}
                styles={{ ...inputStyle, ...multilineInputStyle }}
                resizable={false}
              />
            </div>
          </div>
        </form>
      </div>
    </CreateChatRoomWrap>
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
