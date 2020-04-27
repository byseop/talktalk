import React, { memo } from 'react';
import { ChatRoomTypes } from '../ChatRoomListContainer';
import styled from 'styled-components';
import { Shimmer, IShimmerStyleProps, IShimmerStyles } from '@fluentui/react';
import palette from 'src/styles/palette';

export type ChatRoomListRowPropsTypes = {
  data: ChatRoomTypes;
  handleJoinChat: () => void;
};

const ChatRoomListRow = memo(
  ({ data, handleJoinChat }: ChatRoomListRowPropsTypes) => {
    return (
      <RowWrap onClick={handleJoinChat}>
        <div className="chat_info">
          <h3>{data.title}</h3>
          <p>{data.des}</p>
        </div>
      </RowWrap>
    );
  }
);

export default ChatRoomListRow;

export const ShimmerEl = () => {
  return (
    <RowWrap>
      <div className="chat_info">
        <Shimmer
          width="35%"
          styles={{
            ...shimmerStyle,
            shimmerWrapper: [
              {
                height: 30
              }
            ]
          }}
        />
        <Shimmer
          width="70%"
          styles={{
            ...shimmerStyle,
            shimmerWrapper: [
              {
                height: 19,
                marginTop: 10
              }
            ]
          }}
        />
      </div>
    </RowWrap>
  );
};

const shimmerStyle = (_props: IShimmerStyleProps): IShimmerStyles => {
  return {
    shimmerGradient: [
      {
        backgroundColor: palette.teal.secondary,
        backgroundImage: `linear-gradient(to right, ${palette.teal.tertiray} 0%, ${palette.teal.secondary} 100%)`
      }
    ]
  };
};

const RowWrap = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  transition: background 0.3s ease-out;
  box-sizing: border-box;

  .chat_info {
    flex: 1;
    h3 {
      margin: 0;
      font-weight: 600;
      color: #555;
      font-size: 1.5rem;
    }
    p {
      margin: 10px 0 0;
      color: #555;
      font-size: 1rem;
      line-height: 1.2rem;
      max-height: 2.4rem;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    background: #e6fcf5;
    .chat_info {
      h3,
      p {
        color: #000;
      }
    }
  }
`;
