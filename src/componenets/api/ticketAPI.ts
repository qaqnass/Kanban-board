import { TicketList } from '../Interface';

export const getTickets = () => {
  return fetch(
    'http://localhost:8000/ticket?_sort=id&order=asc'
  ).then(res => {
    return res.json()
  })
}

export const addList = (data: TicketList) => {
  return fetch('http://localhost:8000/ticket', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const removeList = (id: number) => {
  return fetch('http://localhost:8000/ticket/' + id, {
    method: 'DELETE'
  })
}

export const updateList = (data: TicketList) => {
  let id = data.id;
  return fetch('http://localhost:8000/ticket/' + id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const getListById = (id: string | undefined) => {
  return fetch(
    'http://localhost:8000/ticket/' + id
  ).then(res => {
    return res.json()
  })
}