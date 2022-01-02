import React from 'react';
import { st } from '../strings/ticketStrings';
import { RemoveListInterface, } from './Interface';
import { removeList } from './api/ticketAPI';
import removeIcon from '../images/remove-icon.svg';

/**
 * RemoveList, this component simply use to delete the list(column)
 * @param list {TicketList} - object of TicketList interface.
 * @param handleListRefresh  {callback} - to refressh the list
 */
const RemoveList: React.FC<RemoveListInterface> = ({ list, handleListRefresh }) => {

  const handleRemoveTicketList = async () => {
    if (list) {
      removeList(list.id).then(response => {
        if (response.ok) {
          handleListRefresh()
        }
      })
    }
  }

  return (
    <>
      <img
        className="remove-icon"
        src={removeIcon}
        alt={st.removeIcon}
        onClick={() => {
          handleRemoveTicketList()
        }}
      />
    </>
  );
}

export default RemoveList;
