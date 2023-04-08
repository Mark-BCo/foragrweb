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
            <div className="border rounded shadow-lg text-base mb-3">
                <div className="">"{quote.quote_desc}"</div>
                <div className="">{quote.quote_name}</div>
            </div>
        )

    } else return null

}

const memoizedQuotes = memo(Quotes)

export default memoizedQuotes