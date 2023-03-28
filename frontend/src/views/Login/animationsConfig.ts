const animationFormConfig = (startDelay: number = 0, endDelay: number = 0) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        delay: startDelay,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
        delay: endDelay,
      },
    },
  };
};

const animationLoginBoxConfig = {
  exit: {
    height: "100%",
    width: "100%",
  },
};

const animationTextContainerConfig = {
  exit: {
    opacity: 0,
  },
};

export {
  animationFormConfig,
  animationLoginBoxConfig,
  animationTextContainerConfig,
};
