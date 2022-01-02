import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { TicketListItem } from '../componenets/Interface';
import { getListById } from '../componenets/api/ticketAPI';
import { st } from '../strings/ticketStrings';

const TicketDetail: React.FC = () => {
  const [ticket, setTicket] = useState<TicketListItem>()
  // get the ticket list id and card id.
  let { listId, cardId } = useParams();

  useEffect(() => {
    if (listId && cardId) {
      handleListId()
    }
  }, [])

  const handleListId = async () => {
    let data = await getListById(listId);

    if (
      data &&
      data.hasOwnProperty('id')
    ) {
      console.log(data)
      let { listItems } = data;
      let foundTicket = listItems.find((c: any) => c.cardId == cardId);

      if (foundTicket) {
        setTicket(foundTicket)
      }
    }
  }

  return (
    <div className="ticket-detail-container">
      <h3>{`${st.ticketTitle}: ${ticket?.name}`}</h3>
    </div>
  )
}

export default TicketDetail;