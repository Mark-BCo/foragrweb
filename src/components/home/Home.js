import { Icon } from '@iconify/react'
import React from 'react'
import { useGetQuotesQuery } from '../../app/api/quoteSlice'
import Quotes from './Quotes'
import Safety from './Safety'
// import image from "../../img/greenleaf2.png"; 


// import Modal from '../../../features/tools/for-modal'
// import Nav from './for-nav'

// HOME PAGE
const Home = () => {

    const {
        data: quotes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetQuotesQuery("quotesList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if(isLoading) {
        <div>Loading...</div>
    }

    if(isError) {
        <div>Sorry, there has been an error{error.data}</div>
    }

    if (isSuccess) {

        const { ids } = quotes

        const quoteContent = ids?.length && ids.map(quoteId => <Quotes key={quoteId} quotesId={quoteId} />)

        content = (
            <>
                <div className="grid place-content-center min-h-screen bg-center">
                    <div className="flex flex-col justify-center items-center sm:px-16 px-6 sm:py-12 py-4 sm:mx-16 mx-6">
                        <div className="inline-flex py-2 text-8xl place-content-center">
                            Foragr <Icon icon="file-icons:leaflet" className="text-5xl" color="darkgreen" width="38" height="80" rotate={1} />
                        </div>
                        <div className="flex m-2 py-2 text-6xl place-content-center border rounded hover:bg-cugreen hover:text-white ease-in-out duration-300">
                            <a className='text-center' href='https://www.woodlandtrust.org.uk/visiting-woods/things-to-do/foraging/foraging-guidelines/?gclid=Cj0KCQjw27mhBhC9ARIsAIFsETHJxiHSMeKMJ8ezOrb6YjFXpjnCPA8YUAKcwO_WCTM51WnOPfS_y5QaAgs6EALw_wcB&gclsrc=aw.ds'>Foraging Guidelines</a>
                        </div>
                        <div className="flex m-2 py-2 text-2xl place-content-center border rounded">Gathering wild food in your loocal area creates a meaningful and lasting relationship with the land around us. 
                        <br/>Click on the link above to learn more about foraging in your local area,
                        </div>
                    </div>
                    <div className="flex flex-col p-1 ml-12 mr-12 md:mr-28 md:ml-28">
                        <a href="Partners" className="text-3xl text-center">
                            {quoteContent}
                        </a>
                    </div>
                </div>
                <Safety/>
            </>

        )
    }
    return content
}

export default Home
