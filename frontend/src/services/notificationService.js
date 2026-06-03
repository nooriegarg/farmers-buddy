import API from "./api"

// Fetch all notifications for the logged-in user (includes broadcasts to their role).
// Called by Navbar on mount and every 30 seconds to keep the bell up to date.
export const getNotifications = (userId) =>
  API.get(`/notifications/user/${userId}`).then((res) => res.data)

// Mark a single notification as read when the user clicks it.
export const markNotificationRead = (id) =>
  API.put(`/notifications/${id}/read`).then((res) => res.data)
