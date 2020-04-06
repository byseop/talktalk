import React from 'react';
import styled from 'styled-components';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { animated, useTransition } from 'react-spring';

export type AlertPropsTypes = {
  visible: boolean;
  title: string;
  des: string;
  children: any;
  cancelable: boolean;
  confirmText: string;
  cancelText: string;
  handleCancel: () => void;
  handleConfirm: () => void;
};

export default function Alert({
  visible,
  title,
  des,
  children,
  cancelable,
  confirmText,
  cancelText,
  handleCancel,
  handleConfirm,
}: AlertPropsTypes) {
  const alertVisTransition = useTransition(visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  const alertBoxTransition = useTransition(visible, null, {
    from: { opacity: 0, transform: 'translateY(100px) scale(0.5)' },
    enter: { opacity: 1, transform: 'translateY(0) scale(1)' },
    leave: { opacity: 0, transform: 'translateY(100px) scale(0.5)' },
    config: { tension: 200, friction: 15 },
  });

  return (
    <>
      {alertVisTransition.map(({ item, key, props }) =>
        item ? (
          <AlertBg key={key} style={props}>
            {alertBoxTransition.map(({ item, key, props }) =>
              item ? (
                <animated.div className="alert_box" key={key} style={props}>
                  <div className="alert_title">
                    <p>{title}</p>
                  </div>
                  <div className="alert_des">
                    <span>{des}</span>
                  </div>
                  {children && <div className="alert_children">{children}</div>}
                  <div className="alert_buttons">
                    <PrimaryButton
                      className="confirm_button"
                      onClick={handleConfirm}
                    >
                      {confirmText}
                    </PrimaryButton>
                    {cancelable && (
                      <DefaultButton
                        className="cancel_button"
                        onClick={handleCancel}
                      >
                        {cancelText}
                      </DefaultButton>
                    )}
                  </div>
                </animated.div>
              ) : null
            )}
          </AlertBg>
        ) : null
      )}
    </>
  );
}

const AlertBg = styled(animated.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;

  .alert_box {
    max-width: 320px;
    width: 100%;
    padding: 1.5rem;
    background: #fff;
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.12);

    .alert_title {
      font-size: 1.875rem;
      p {
        margin: 0;
        font-weight: bold;
      }
    }

    .alert_des {
      margin-top: 1rem;
      font-size: 1.125em;
    }

    .alert_buttons {
      margin-top: 1.5rem;

      button + button {
        margin-left: 1rem;
      }
    }
  }
`;
