import { useEffect, useState } from 'react';
import { TicketList } from '../componenets/Interface';
import TicketManager from "../componenets/TicketManager";
import { getTickets, updateList } from '../componenets/api/ticketAPI';


/**
 * TicketApp  is defined simply
 * to manager the Kanban board
 * @function
 */
const TicketApp: React.FC = () => {
  const [list, setList] = useState<TicketList[] | []>([]);

  // get the Ticketes and prepare it for the app.
  useEffect(() => {
    handeListTickets();
  }, []);

  const handeListTickets = async () => {
    let data = await getTickets();
    if (data) {
      setList(data);
    }
  }

  /**
   * This function use for update the ticket lists
   */
  const handleList = (
    list: TicketList[],
    fromIn: number,
    toIn: number
  ) => {
    setList(list);
    updateList(list[fromIn]).then(res => {
      if (res.ok) {
        updateList(list[toIn]);
      }
    })

  }

  return (
    <TicketManager
      list={list}
      handleList={(list, fromIn, toIn) => {
        handleList(list, fromIn, toIn)
      }}
      handleListRefresh={() => {
        handeListTickets()
      }}
    />
  );
}

export default TicketApp;
