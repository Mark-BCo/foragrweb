import { useState, useEffect } from "react";


const usePersist = () => {

    // If persist does not exist in the local storage return false
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)

    // When persist changes set the value to the local storage
    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])

    return [persist, setPersist]

}

export default usePersist