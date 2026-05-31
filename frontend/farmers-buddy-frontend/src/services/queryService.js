import API from "./api"

export const createQuery = async (queryData) => {
  const response = await API.post("/queries", queryData)
  return response.data
}

export const getAllQueries = async () => {
  const response = await API.get("/queries")
  return response.data
}

export const replyToQuery = async (id, replyData) => {

  const response = await API.put(
    `/queries/${id}/reply`,
    replyData
  )

  return response.data
}

export const getQueriesByFarmer = async (farmerName) => {

  const response = await API.get(
    `/queries/farmer/${farmerName}`
  )

  return response.data
}