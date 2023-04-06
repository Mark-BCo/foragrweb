import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { accessKey } from "../../../app/keys/keys"

const PlantCard = ({ plants }) => {

    const [result, setResult] = useState([])
    const plantQuery = plants.scientificname

    // This hotlink unsplash api is temporary until users upload more photos and build the database.
    // It does not guarantee that the query will return the exact plant and should not be used in deployment
    // To get as close as possible to the plant the sceintific name of the plant is queried 
    const fetchRequest = async () => {
        const data = await fetch(
            `https://api.unsplash.com/search/photos?query=${plantQuery}&client_id=${accessKey}&per_page=1&content_filter=high`
        );
        const dataJ = await data.json();
        const res = dataJ.results;
        setResult(res);
    };

    // Calls a warning because of the missing dependency
    // Removing the dependency array causes infinite requests on the api query to unsplash
    useEffect(() => {
        fetchRequest()
    }, []);

    return (
        <div className="flex flex-col m-4 overflow-hidden sm:w-52 shadow-2xl text-black bg-shamrock bg-opacity-30 border rounded-lg" key={plants._id}>
            <div className="m-2">
                <div className="flex justify-center m-2">
                    <div className="mr-4">
                        <Link to='/forage'>
                            <Icon icon="file-icons:leaflet" className="h-8 w-8 object-contain" color="darkgreen" rotate={1} />
                        </Link>
                    </div>

                    <div className="mr-4">
                        <Link to='/craft'>
                            <Icon icon="game-icons:stone-crafting" className="h-8 w-8 object-contain" color="darkgreen" />
                        </Link>
                    </div>

                    <div className="mr-4">
                        <Link to='/eat'>
                            <Icon icon="ep:food" className="h-8 w-8 object-contain" color="darkgreen" />
                        </Link>
                    </div>
                    <div className="/lore">
                        <Link to='/lore'>
                            <Icon icon="ic:sharp-history-edu" className="h-8 w-8 object-contain" color="darkgreen" />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="p-2 w-40 h-40 m-6">
                        {result.map((val) => {
                            return (
                                <>
                                    <img
                                        className="flex rounded-xl border shadow-2xl w-56  h-36"
                                        key={val.id}
                                        src={val.urls.regular}
                                        alt="val.alt_description"
                                    />
                                </>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col m-2">
                    <div className="flex flex-col">
                        <div className="font-black text-2xl mb-2 text-center antialiased">{plants.commonname}</div>
                    </div>
                    <div className="flex flex-col m-1">
                        <div className=" bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">
                            <span className="font-bold antialiased">Species: </span>
                            {plants.species}
                        </div>
                    </div>
                    <div className="flex flex-col  m-1">
                        <div className=" bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">
                            <span className="font-bold antialiased">Habitat: </span>
                            {plants.habitat}
                        </div>
                    </div>
                    <div className="flex-flex-col  m-1">
                        <div className=" bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">
                            <span className="font-bold antialiased">Scientific Name: </span>
                            {plants.scientificname}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PlantCard

// {photos.map((photo) => (
//     <li key={photo.id}>
//       <img src={photo.urls.small} alt={photo.alt_description} />
//     </li>