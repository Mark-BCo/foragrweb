import React from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

const DashBoard = () => {
    return (
        <>
            <div className='grid grid-cols-3 place-content-center items-center border rounded shadow-lg p-4'>
                <Link className='flex flex-col justify-center items-center' to='../Learn'>
                    <button className="px-3 py-2 rounded text-4xl"><Icon icon="ion:school-outline" color="darkgreen" /></button>
                    <p className="text-xl text-center">Learn</p>
                </Link>
                <Link className="flex flex-col justify-center items-center" to='../Map'>
                    <button className="px-3 py-2 rounded text-4xl"><Icon icon="gis:pirate-map" color="darkgreen" />
                    </button>
                    <p className="text-xl text-center">Map</p>
                </Link>
                <Link className="flex flex-col justify-center items-center" to='../Partners'>
                    <button className="px-3 py-2 rounded text-5xl"><Icon icon="healthicons:community-meeting" color="darkgreen" />
                    </button>
                    <p className="text-xl text-center">Community</p>
                </Link>
            </div>
            <div className='flex justify-center h-18 mt-3'>
               <h1>Plants Table</h1>
            </div>
        </>
    )
}

export default DashBoard