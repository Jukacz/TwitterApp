import React, { ReactChild, ReactNode, useContext } from "react";
import LoadingContext from "../../contexts/loading.context";

const Loading = (props: ReactNode | any) => {
  const loading = useContext(LoadingContext);
  const { children } = props;
  console.log(loading);
  return !loading ? children : <h1>ładuje sie</h1>;
};

export default Loading;
