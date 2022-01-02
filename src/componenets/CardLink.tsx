

import React, { useEffect, useRef, useState } from 'react';
import { st } from '../strings/ticketStrings';
import { DirectLinkInterface } from './Interface';
import { conf } from '../conf/conf';
import copyIcon from '../images/copy.svg'

/**
 * This componenet provide a direct link of the tickets
 * @param card {TicketListItem} - object of card.
 * @param listId  {Number} - id of the list(column)
 */
const CardLink: React.FC<DirectLinkInterface> = ({ card, listId }) => {
  const [link, setLink] = useState('');

  useEffect(() => {
    let createLink = `${conf.url}detail/${listId}/${card.cardId}`;
    setLink(createLink);
  })

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link)
  }

  return (
    <>
      <h4>{card.name}</h4>
      <div className="card-link-wrapper">
        <label>{link}</label>
        <img
          src={copyIcon}
          alt={st.copyLink}
          onClick={handleCopyLink}
        />
      </div>
    </>
  );
}

export default CardLink;

