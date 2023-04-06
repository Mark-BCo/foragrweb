import React from 'react'

const Instruction = () => {
    return (
        <div className='flex flex-wrap border rounded bg-cugreen text-white p-4 w-4/12 text-2xl justify-center m-4 text-center'>
            <div className='flex flex-col'>
                <h3>
                    Forgar Map
                </h3>
                <div>
                    1. Click on a location to pin a marker
                </div>
                <div>
                    2. Click on the marker and open the link in the popup to submit your plant
                </div>
                <div>
                    3. The plant you have uploaded will be stored in our database. When approved this will be added to your found plants list!.
                </div>
            </div>
        </div>
    )
}

export default Instruction