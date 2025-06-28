import { SessionContext, type SessionContextType } from "@/contexts/sessionContext";
import { useContext } from "react";

export function useSession(): SessionContextType {
  const context = useContext(SessionContext);
  if(!context) throw new Error("useSession must be used within a SessionProvider");
  return context;
}
