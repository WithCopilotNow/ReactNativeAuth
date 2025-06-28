import { SessionContext } from "@/contexts/sessionContext";
import { sessionSchema, type Session } from "@/schemas/sessionSchema";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import React, { useEffect, useState } from "react";

type SessionProviderProps = {
    children: React.ReactNode
}

export default function SessionProvider({ children }: SessionProviderProps): React.JSX.Element {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        async function fetchSession(): Promise<void> {
          try {
            const data = await getItemAsync("session_1412", { keychainService: "session" });
            if (data) {
              const parsed = JSON.parse(data);
              const newSession = sessionSchema.parse(parsed);
              setSession(newSession);
            } else {
              setSession(null);
            }
          } catch (error) {
            console.error("Error while fetching session:", error);
            setSession(null);
          }
        }
    
        fetchSession();
      }, []);

    async function logIn(user: Session): Promise<void> {
        try {
            await setItemAsync("session_1412", JSON.stringify(user), { keychainService: "session" });
            setSession(user);
        } catch (error) {
            console.error("Error while logging in:", error);
            throw error;
        }
    }

    async function logOut(): Promise<void> {
        try {
            await deleteItemAsync("session_1412", { keychainService: "session" });
            setSession(null);
        } catch (error) {
            console.error("Error while logging out:", error);
            throw error;
        }
    }
      
  return <SessionContext value={{ session, logIn, logOut }}>{children}</SessionContext>;
}


