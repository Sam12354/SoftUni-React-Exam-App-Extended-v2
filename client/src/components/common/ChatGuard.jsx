import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export default function ChatGuard({ children }) {
    const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) {
        return null  // Just hide, no redirect
    }

    return <>{children}</>
}
