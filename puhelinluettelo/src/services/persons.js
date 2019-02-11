import axios from 'axios'

const url = 'http://localhost:3001/api/persons/'
const getAll = () => axios.get(url).then(res => res.data)
const add = (person) => axios.post(url, person).then(res => res.data)
const remove = (person) => axios.delete(url + person.id).then(res => res.data)
const update = (person) => axios.put(url + person.id, person).then(res => res.data)

export default { getAll, add, remove, update }
