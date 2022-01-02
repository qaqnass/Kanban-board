import { useRef, useState } from 'react';
import { ParentProps, ListIndex } from './Interface';
import AddTicket from './AddTicket';
import AddList from './AddList';
import '../styles/ticket.css';
import RemoveList from './RemoveLis';
import CardLink from './CardLink';

/**
 * this component is used to manage all other components that depend on Ticket.
 * @param list {Object[]} - list of the tickets
 * @param handleList {callback} - this funciton use to update the list.
 * @handleListRefresh {callback} - this function is used to refresh
 * the list after any change will happens to the list.
 */
const TicketManager: React.FC<ParentProps> = ({
  list,
  handleList,
  handleListRefresh
}) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const dragCard = useRef<ListIndex | null>(null);
  const dragCardStarted = useRef<ListIndex | null>(null);
  const dragCardNode = useRef<HTMLLIElement | null>(null);

  const handletDragStart = (
    event: React.DragEvent<HTMLLIElement>,
    listItem: ListIndex
  ) => {
    if (event.target instanceof HTMLLIElement) {
      dragCardNode.current = event.target;
      dragCardNode.current.addEventListener('dragend', handleDragEnd)
    }

    dragCard.current = listItem;
    dragCardStarted.current = listItem;
    setTimeout(() => {
      setDragging(true);
    }, 0)
  }

  const handleDragEnd = () => {
    setDragging(false);
    dragCard.current = null;
    dragCardStarted.current = null;
    dragCardNode.current?.removeEventListener('dragend', handleDragEnd)
    dragCardNode.current = null;
  }

  const handleDragEnter = (
    event: React.DragEvent<HTMLLIElement>,
    listItem: ListIndex
  ) => {
    if (dragCardNode.current !== event.target) {
      let listIndex = dragCard.current?.listIndex,
        listIndexStart = dragCardStarted.current?.listIndex,
        listItemIndex = dragCard.current?.listItemIndex,
        newList = JSON.parse(JSON.stringify(list));

      newList[listItem.listIndex].listItems.splice(
        listItem.listItemIndex, 0,
        newList[listIndex ? listIndex : 0].listItems.splice(listItemIndex, 1)[0]
      );

      dragCard.current = listItem;

      handleList(
        newList,
        listIndexStart ? listIndexStart : 0,
        listIndex ? listIndex : 0
      );
    }
  }

  const getStyles = (item: ListIndex) => {
    if (
      dragCard.current?.listIndex === item.listIndex &&
      dragCard.current?.listItemIndex === item.listItemIndex
    ) {
      return "card moved"
    }

    return "card"
  }

  if (list) {
    return (
      <ul className="column-container">
        {list.map((l, listIndex) => {
          return (
            <li
              key={l.listId}
              className="ticket-wrapper shadow-2"
              onDragEnter={(e) => {
                if (dragging && l.listItems.length === 0) {
                  handleDragEnter(e, { listIndex, listItemIndex: 0 })
                }
              }}
            >
              <div className="list-header">
                <h3>{l.listTitle}</h3>
                <RemoveList
                  list={l}
                  handleListRefresh={() => {
                    handleListRefresh()
                  }}
                />
              </div>
              <ul className="column">
                {l.listItems.map((item, listItemIndex) => (
                  <li
                    draggable
                    key={item.cardId}
                    onDragStart={(e) => handletDragStart(e, { listIndex, listItemIndex })}
                    onDragEnter={(e) => handleDragEnter(e, { listIndex, listItemIndex })}
                    className={dragging ? getStyles({ listIndex, listItemIndex }) : "card"}>
                    <CardLink card={item} listId={l.id} />
                  </li>
                ))}
              </ul>
              <AddTicket
                list={l}
                handleListRefresh={() => {
                  handleListRefresh()
                }}
              />
            </li>
          )
        })}

        <AddList
          lists={list}
          handleListRefresh={() => {
            handleListRefresh()
          }}
        />
      </ul>
    )
  } else {
    return null;
  }
}

export default TicketManager;
