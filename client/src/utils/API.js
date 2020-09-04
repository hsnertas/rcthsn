import axios from 'axios';
// const api =  "https://5ade151bef3fbd0014746da3.mockapi.io"

export default {
  createUser: (body) => axios.post(`/api/budget/user/add`, body),
  getBudgetData : (id) => axios.get(`/api/budget/${id}`),
  addBudgetData : (id,body) => axios.post(`/api/budget/${id}/incexp`, body),
  updateGoal : (id,body) => axios.put(`/api/budget/${id}/goal`, body),
  deleteBudgetEntry : (userId, entryId) => axios.delete(`/api/budget/${userId}/incexp/${entryId}`)
}