import React, { useState } from 'react'
import Partners from './for-partners'

const Modal = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="flex rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-black-400"type="button" onClick={() => setShowModal(true)}>Afilliated Partners</button>
            {showModal ? (
                <>
                    <button className="flex rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-black-400" onClick={() => setShowModal(false)}>Hide Partners</button>
                    <Partners />
                </>
            ) : null}
        </>
    )
}

export default Modal
