import { createContext } from "react";
import { User } from "../interfaces/user.interface";

const UserContext = createContext<User | null>(null);

export default UserContext;
