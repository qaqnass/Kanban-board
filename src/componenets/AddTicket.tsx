import React, { useState } from 'react';
import { st } from '../strings/ticketStrings';
import { AddTicketInterface, TicketList } from './Interface';
import { updateList } from './api/ticketAPI';
import { generateID } from './functions/ticketFunctions';

/**
 * This componenet is responsible to add new ticket to the list.
 * @param list {TicketList} - object of TicketList interface.
 * @param handleListRefresh  {callback} - to refresh the list
 */
const AddTicket: React.FC<AddTicketInterface> = ({ list, handleListRefresh }) => {
  const [ticketTitle, setTicketTitle] = useState('');

  const handleTicketTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketTitle(event.target.value)
  }

  const handleAddTicket = () => {
    if (ticketTitle === '') {
      alert(st.ticketRequiredWarning);
      return;
    }

    // generating ticketId
    let cardId = generateID(900000000);
    let newListItem = [...list.listItems, { cardId, name: ticketTitle }];
    let newList = { ...list, listItems: newListItem };

    handleAddTicketAPI(newList)
    setTicketTitle('');
  }

  const handleAddTicketAPI = async (data: TicketList) => {
    await updateList(data).then(response => {
      if (response.ok) {
        setTicketTitle('');
        handleListRefresh();
      }
    })
  }

  return (
    <div className="add-card-container">
      <>
        <label htmlFor="ticket-title">{st.addTicket}</label>
        <input
          value={ticketTitle}
          type="text"
          id="ticket-title"
          name="ticketTitle"
          placeholder={st.ticketTitle}
          onChange={handleTicketTitle}
        />
      </>
      <button onClick={handleAddTicket}>{st.add}</button>
    </div>
  );
}

export default AddTicket;
