import { type Session } from "@/schemas/sessionSchema";
import { createContext } from "react";

export type SessionContextType = {
    session: Session | null,
    logIn: (user: Session) => Promise<void>,
    logOut: () => Promise<void>
};

export const SessionContext = createContext<SessionContextType | null>(null);