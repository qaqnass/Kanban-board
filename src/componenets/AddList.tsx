import React, { useEffect, useRef, useState } from 'react';
import { st } from '../strings/ticketStrings';
import { AddListInterface, TicketList } from './Interface';
import { addList } from './api/ticketAPI';
import { generateID } from './functions/ticketFunctions';

/**
 * This componenet is use to add new columnto the list.
 * @param lists {TicketList[]} - array of TicketList.
 * @param handleListRefresh  {callback} - to refresh the list
 */
const AddList: React.FC<AddListInterface> = ({ lists, handleListRefresh }) => {
  const [listTitle, setListTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // check if inputRef is not exist
    if (!inputRef.current) {
      return;
    }

    /**
     * Without the above condition typescript witll give as an error because it
     * might be at some point no element to focuse at all.
    */
    inputRef.current.focus();
  }, [lists])

  const handleListTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(event.target.value)
  }

  const handleAddList = () => {
    if (listTitle === '') {
      alert(st.listRequiredWarning);
      return;
    }

    // generating ticketId
    let listId = generateID(900000000);
    // create new list
    let newList = {
      id: 0,
      listId,
      listTitle,
      listItems: []
    }

    handleAddListAPI(newList)
  }

  const handleAddListAPI = async (data: TicketList) => {
    await addList(data).then(response => {
      if (response.ok) {
        handleListRefresh()
        setListTitle('');
      }
    })
  }

  return (
    <div className="ticket-wrapper shadow-2">
      <div className="add-card-container">
        <>
          <label htmlFor="ticket-title">{st.addList}</label>
          <input
            value={listTitle}
            type="text"
            id="list-title"
            name="listTitle"
            placeholder={st.listTitle}
            onChange={handleListTitle}
            ref={inputRef}
          />
        </>
        <button onClick={handleAddList}>{st.add}</button>
      </div>
    </div>
  );
}

export default AddList;
