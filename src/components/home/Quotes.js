import React from 'react'
import { useGetQuotesQuery } from '../../app/api/quoteSlice'
import { memo } from 'react'

const Quotes = ({ quotesId }) => {

    const { quote } = useGetQuotesQuery("quotesList", {
        selectFromResult: ({ data }) => ({
            quote: data?.entities[quotesId]
        }),
    })

    if (quote) {

        return (
            <div className="antialiased font-bold text-base p-1 border rounded shadow-lg mb-2">
                <div className="">"{quote.quote_desc}"</div>
                <div className="">{quote.quote_name}</div>
            </div>
        )

    } else return null

}

const memoizedQuotes = memo(Quotes)

export default memoizedQuotes