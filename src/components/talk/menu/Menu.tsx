import React from 'react';
import styled from 'styled-components';
import { UserDataTypes } from 'src/modules/login/types';
import { animated, useTransition } from 'react-spring';
import { Menu as FluentMenu } from '@fluentui/react';
import { easeExpOut } from 'd3-ease';

const MenuWrap = styled(animated.div)`
  width: 300px;
  height: 100vh;
  background: #7491fb;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 1.5em;

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
  }
`;

const menus = ['Chat', 'Guide'];

type MenuPropsType = {
  user: UserDataTypes;
};

export default function Menu({ user }: MenuPropsType) {
  const { login, name, avatar_url, html_url } = user;
  const menuTransition = useTransition(user, null, {
    from: {
      transform: 'translateX(-100%)'
    },
    enter: {
      transform: 'translateX(0%)'
    },
    leave: {
      transform: 'translateX(0)'
    },
    config: {
      easing: easeExpOut,
      duration: 1000
    }
  })
  return (
    <>
      {menuTransition.map(({ item, key, props }) =>
        item ? (
          <MenuWrap key={key} style={props}>
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
                <FluentMenu items={menus} pointing vertical primary />
              </div>
            </div>
          </MenuWrap>
        ) : null
      )}
    </>
  );
}
