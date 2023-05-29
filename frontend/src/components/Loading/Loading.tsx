import React, { ReactNode, useContext } from "react";
import LoadingContext from "../../contexts/loading.context";

const Loading = (props: ReactNode | any) => {
  const loading = useContext(LoadingContext);
  const { children } = props;
  return !loading ? children : <h1>ładuje sie</h1>;
};

export default Loading;
