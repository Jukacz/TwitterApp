import { createContext } from "react";
import { User, UserContextInterface } from "../interfaces/user.interface";

const UserContext = createContext<UserContextInterface | null>(null);

export default UserContext;
