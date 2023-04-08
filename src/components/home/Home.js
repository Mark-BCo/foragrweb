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

    if (isLoading) {
        <div>Loading...</div>
    }

    if (isError) {
        <div>Sorry, there has been an error{error.data}</div>
    }

    if (isSuccess) {

        const { ids } = quotes

        const quoteContent = ids?.length && ids.map(quoteId => <Quotes key={quoteId} quotesId={quoteId} />)

        content = (
            <>
                <div className="grid place-content-center min-h-screen bg-center m-10 text-center">
                    <div className="flex flex-col">
                        <div className="inline-flex text-8xl place-content-center mb-8">
                            Foragr<Icon icon="file-icons:leaflet" className="text-5xl" color="darkgreen" width="38" height="80" rotate={1} />
                        </div>
                        <div className="flex flex-wrap text-6xl place-content-center">
                            <a className="flex flex-col mb-8 p-2 border rounded shadow-lg hover:bg-cugreen hover:text-white ease-in-out duration-300" target="_blank" rel="noreferrer" href='https://www.woodlandtrust.org.uk/visiting-woods/things-to-do/foraging/foraging-guidelines/?gclid=Cj0KCQjw27mhBhC9ARIsAIFsETHJxiHSMeKMJ8ezOrb6YjFXpjnCPA8YUAKcwO_WCTM51WnOPfS_y5QaAgs6EALw_wcB&gclsrc=aw.ds'>Foraging Guidelines
                                <span className="text-2xl mt-2 font-bold antialiased">Gathering wild food in your local area creates a meaningful and lasting relationship with the land around us.
                                    <br />Click here to find out more!
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="font-bold antialiased">
                        <a href="Partners" className="">
                            {quoteContent}
                        </a>
                    </div>
                    <Safety />
                </div>
            </>

        )
    }
    return content
}

export default Home
