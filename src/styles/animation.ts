import { easeExpOut } from 'd3-ease';

const animation = {
  panel: {
    from: {
      transform: 'translateX(-100%)'
    },
    enter: {
      transform: 'translateX(0)'
    },
    leave: {
      transform: 'translateX(-100%)'
    },
    config: {
      easing: easeExpOut,
      duration: 1000
    }
  }
};

export default animation;