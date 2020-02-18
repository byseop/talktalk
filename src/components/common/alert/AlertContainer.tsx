import React from 'react';
import Alert from './Alert';

export type AlertPropsContainer = {
  visible?: boolean;
  setVisible: (visible: boolean) => void;
  title?: string;
  des?: string;
  children?: any;
  cancelable?: boolean;
  confirmText?: string;
  cancelText?: string;
  onClose?: Function | undefined;
};

export default function AlertContainer({
  visible = false,
  setVisible,
  title = '',
  des = '',
  children,
  cancelable = false,
  confirmText = '확인',
  cancelText = '취소',
  onClose
}: AlertPropsContainer) {
  const handleConfirm = () => {
    onClose && onClose();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Alert
      visible={visible}
      title={title}
      des={des}
      cancelable={cancelable}
      confirmText={confirmText}
      cancelText={cancelText}
      handleCancel={handleCancel}
      handleConfirm={handleConfirm}
    >
      {children}
    </Alert>
  );
}
