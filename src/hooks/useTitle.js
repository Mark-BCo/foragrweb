import { useEffect } from "react"

// Applies the hook to chnage the title of the web page we are on
const useTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title
        document.title = title

        return () => document.title = prevTitle
    }, [title])
}

export default useTitle