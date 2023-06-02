import { createContext } from "react";
import { VerifyProfileInterface } from "../interfaces/verifyprofile.interface";

const VerifyProfileContext = createContext<VerifyProfileInterface | null>(null);

export default VerifyProfileContext;
