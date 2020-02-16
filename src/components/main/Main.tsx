import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

const MainVisual = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  position: relative;
  padding: 3rem;
  box-sizing: border-box;
`;
const LoginWrap = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .login_box {
    max-width: 400px;
    width: 100vw;
    background: #1f2f698f;
    position: relative;
    z-index: 1;
    color: #fff;
    text-align: center;
    padding: 2rem;

    h1 {
      margin: 0;
      font-family: 'Bungee Inline', cursive;
      color: #dbdbdb;
      font-size: 3rem;
    }

    .login_button_wrap {
      margin-top: 2rem;

      .login_button {
        a {
          font-size: 1.2rem;
          color: #dbdbdb;
          text-decoration: none;
          
          i {
            margin-right: 5px;
          }
        }
      }
    }
  }
`;

type MainProps = {
  loginSuccessStyle: any;
}

export default function Main({ loginSuccessStyle }: MainProps) {
  const { REACT_APP_CLIENT_ID } = process.env;
  return (
    <>
      <MainVisual />
      <LoginWrap>
        <animated.div className="login_box" style={loginSuccessStyle}>
          <h1>TALK-TALK</h1>
          <div className="login_button_wrap">
            <div className="login_button">
              <a
                href={`https://github.com/login/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}`}
              >
                <i className="fab fa-github login_icon" /> GITHUB LOGIN
              </a>
            </div>
          </div>
        </animated.div>
      </LoginWrap>
    </>
  );
}
