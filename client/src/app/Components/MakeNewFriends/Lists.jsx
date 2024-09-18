import React from 'react'
import { ListItem } from './ListItem'

export const Lists = ({ items,getSuggestions,receivedHandler }) => {
  return (
    <div>

      {items?.length > 0 ? <div>
        {
          items?.map((ele) => {
            return <ListItem receivedHandler={receivedHandler} getSuggestions={getSuggestions} item={ele} />
          })
        }
      </div> : <>Nothing to Show!</>}

    </div>
  )
}
