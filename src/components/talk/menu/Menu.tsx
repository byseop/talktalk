import React, { useState } from 'react';
import styled from 'styled-components';
import { UserDataTypes } from 'src/modules/login/types';
import { animated, useTransition } from 'react-spring';
import { easeExpOut } from 'd3-ease';
import AlertContainer from 'src/components/common/Alert';
import ChatRoomContainer from './chatRoom';
import { SelectableMenu } from './types';
import palette from 'src/styles/palette';

type MenuPropsType = {
  user: UserDataTypes;
  handleLogout: () => void;
};

const {
  teal: { primary }
} = palette;

export default function Menu({ user, handleLogout }: MenuPropsType) {
  const { login, name, avatar_url, html_url } = user;
  const menuTransition = useTransition(user, null, {
    from: {
      transform: 'translateX(-100%)'
    },
    enter: {
      transform: 'translateX(0%)'
    },
    leave: {
      transform: 'translateX(-100%)'
    },
    config: {
      easing: easeExpOut,
      duration: 1000
    }
  });

  const [logoutAlert, setLogoutAlert] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<SelectableMenu>('');

  return (
    <>
      <MenuWrap>
        {menuTransition.map(({ item, key, props }) =>
          item ? (
            <MenuInner key={key} style={props}>
              <div className="top">
                <div className="user_info_wrap">
                  <div className="user_profile_img">
                    <a href={html_url} target="blank">
                      <img src={avatar_url} alt={login} />
                    </a>
                  </div>
                  <div className="user_info">
                    <div className="login_id">
                      <p>{login}</p>
                    </div>
                    <div className="login_name">
                      <span>{name}</span>
                    </div>
                  </div>
                </div>
                <div className="nav">
                  <ul>
                    <li
                      className="menu_list"
                      onClick={() => setSelectedMenu('chatroom')}
                    >
                      <i className="fas fa-comments"></i> 대화
                    </li>
                    <li
                      className="menu_list"
                      onClick={() => setSelectedMenu('follow')}
                    >
                      <i className="fas fa-users"></i> 팔로우
                    </li>
                    <li
                      className="menu_list"
                      onClick={() => setSelectedMenu('search')}
                    >
                      <i className="fas fa-search"></i> 검색
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bottom">
                <button className="logout" onClick={() => setLogoutAlert(true)}>
                  로그아웃
                </button>
              </div>
            </MenuInner>
          ) : null
        )}
        <ChatRoomContainer selectedMenu={selectedMenu} />
      </MenuWrap>
      <AlertContainer
        visible={logoutAlert}
        setVisible={setLogoutAlert}
        title={'로그아웃'}
        des={'로그아웃 하시겠습니까?'}
        cancelable
        onClose={handleLogout}
      />
    </>
  );
}

const MenuWrap = styled.div`
  width: 300px;
  height: 100vh;
`;

const MenuInner = styled(animated.div)`
  background: ${primary};
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  padding: 1.5em;
  z-index: 10;

  .top {
    width: 100%;
    .user_info_wrap {
      display: flex;
      align-items: center;
      .user_profile_img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        position: relative;
        overflow: hidden;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .user_info {
        margin-left: 1rem;
        p {
          margin: 0;
          color: #fff;
          font-size: 0.8rem;
        }
        span {
          margin: 0;
          color: #fff;
        }
      }
    }

    .nav {
      margin-top: 3rem;
      ul {
        list-style: none;
        padding: 0;
        li {
          color: #fff;
          font-size: 1.125rem;
          text-align: center;
          padding: 1rem 0;
          cursor: pointer;
          a {
            color: inherit;
            text-decoration: none;
          }
          i {
            font-size: 1.875rem;
            margin-right: 0.5rem;
            vertical-align: middle;
          }
        }
      }
    }
  }

  .bottom {
    width: 100%;

    .logout {
      display: block;
      background: none;
      width: 100%;
      padding: 0.5rem;
      border: none;
      color: #fff;
      font-size: 1.125rem;
      cursor: pointer;
      outline: none;
    }
  }
`;
