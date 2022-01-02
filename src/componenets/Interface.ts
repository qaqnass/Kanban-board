
// This interface, represents the ticket List items
export interface TicketListItem {
  cardId: number,
  name: string
}

// This interface is represents the Ticket list
export interface TicketList {
  id: number,
  listId: number,
  listTitle: string,
  listItems: TicketListItem[]
}

// This interface is represents the TicketApp prop
export interface ParentProps {
  list: TicketList[],
  handleList: (newList: TicketList[], fromIn: number, toIn: number) => void;
  handleListRefresh: () => void;
}

// This interface, represents the list index and list item index
export interface ListIndex {
  listIndex: number,
  listItemIndex: number
}

// This interface is represents the TicketManager prop
export interface AddTicketInterface {
  list: TicketList,
  handleListRefresh: () => void;
}

// This interface is represents the Add new list prop
export interface AddListInterface {
  lists: TicketList[],
  handleListRefresh: () => void;
}

// This interface is represents the Add new list prop
export interface RemoveListInterface {
  list: TicketList,
  handleListRefresh: () => void;
}

export interface DirectLinkInterface {
  card: TicketListItem,
  listId: number | undefined
}