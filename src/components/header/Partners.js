import React from 'react'
import { Icon } from '@iconify/react';

const Partners = () => {

    const handleClickScroll = () => {
        const element = document.getElementById('section-1');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <div className="grid min-h-screen antialiased font-black">
                <div className="grid place-content-center min-h-screen">
                    <h1 >
                        Featured Foragrs!
                    </h1>
                    <button onClick={handleClickScroll} className="flex justify-center text-4xl hover:ease-in ease-out duration-300">
                        <Icon icon="file-icons:leaflet" color="darkgreen" rotate={2} />
                    </button>
                </div>
            </div>
            <div id="section-1" className='grid grid-cols-3 min-h-screen antialiased font-black'>
                <div className='m-10 rounded overflow-hidden shadow-lg grid place-content-center hover:bg-cugreen transition ease-in duration-300 hover:text-white hover:shadow-lg'>
                    <a href="https://nisurvival.co.uk/" target="_blank" rel="noreferrer" className="flex flex-col justify-center items-center">
                        <img src="https://nisurvival.co.uk/wp-content/themes/kelpdigtial/images/logo.png" alt="Not Available" className="object-contain h-40 w-40" />
                        NI Survival School
                    </a>
                </div>
                <div className='m-10 rounded overflow-hidden shadow-lg grid place-content-center  hover:bg-cugreen transition ease-in duration-300 hover:text-white hover:shadow-lg'>
                    <a href="https://northernireland.nbnatlas.org/about-cedar/" target="_blank" rel="noreferrer" className="flex flex-col justify-center items-center ">
                        <img src="https://northernireland.nbnatlas.org/wp-content/uploads/2019/01/cedar-logo-master-colour-landscape-2014-002-730x258.png" alt="Not Available" className="object-contain h-40 w-40" />
                        CEDar - Centre for Environmental Data and Recording
                    </a>
                </div>
                <div className='m-10 rounded overflow-hidden shadow-lg grid place-content-center  hover:bg-cugreen transition ease-in duration-300 hover:text-white hover:shadow-lg'>
                    <a href="https://northernireland.nbnatlas.org/" target="_blank" rel="noreferrer" className="flex flex-col justify-center items-center">
                        <img src="https://northernireland.nbnatlas.org/wp-content/uploads/2017/07/AL_Logo-11-1440x349.png" alt="Not Available" className="object-contain h-40 w-40" />
                        NBN Atlas Northern Ireland
                    </a>
                </div>
                <div className='m-10 rounded overflow-hidden shadow-lg grid place-content-center  hover:bg-cugreen transition ease-in duration-300 hover:text-white hover:shadow-lg'>
                    <a href="https://www.nationalmuseumsni.org/" target="_blank" rel="noreferrer" className="flex flex-col justify-center items-center">
                        <img src="http://www.habitas.org.uk/images/nmni_logo.gif" alt="Not Available" className="object-contain h-40 w-40" />
                        National Museums Northern Ireland
                    </a>
                </div>
                <div className='m-10 rounded overflow-hidden shadow-lg grid place-content-center  hover:bg-cugreen transition ease-in duration-300 hover:text-white hover:shadow-lg'>
                    <a href="https://www.wildawake.ie/" target="_blank" rel="noreferrer" className="flex flex-col justify-center items-center">
                        <img src="https://images.squarespace-cdn.com/content/v1/5fe9fc6f78f8af2b98b0e465/1613234461033-6B5UUWMZAF9YOC6GHAIP/Wild-Awake---side-logo-whitetext+%28002%29.png?format=1500w" alt="Not Available" className="object-contain h-40 w-40" />
                        Wild Awake
                    </a>
                </div>
                <div className='m-10 rounded overflow-hidden shadow-lg grid place-content-center  hover:bg-cugreen transition ease-in duration-300 hover:text-white hover:shadow-lg'>
                    <a href="https://bsbi.org/" target="_blank" rel="noreferrer" className="flex flex-col justify-center items-center">
                        <img src="https://bsbi.org/wp-content/uploads/2023/03/BSBI-long-colour.svg" alt="Not Available" className="object-contain h-40 w-40" />
                        BSBI
                    </a>
                </div>
            </div>
        </>
    )
}

export default Partners