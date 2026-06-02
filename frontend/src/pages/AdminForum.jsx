// =============================================================
// AdminForum.jsx — Admin View of Community Forum
// =============================================================
// Wraps the existing Forum component inside the Admin layout.
// AdminSidebar provides admin-specific navigation.
// The Forum component itself is reused as-is — no admin-specific
// changes to forum functionality are applied here.
// =============================================================

import AdminSidebar from "../components/AdminSidebar"

import Forum from "./Forum"

function AdminForum() {

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Admin navigation sidebar */}
      <AdminSidebar />

      {/* Reuse the same Forum component in admin context */}
      <div className="flex-1">

        <Forum />

      </div>

    </div>
  )
}

export default AdminForum
