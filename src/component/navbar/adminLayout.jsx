import PropTypes from 'prop-types';
import AdminHeader from '../admin/adminHeader';
import AdminSidebar from '../admin/adminSideBar'

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-[#fdf6f3] w-1/4 h-full">
        <AdminSidebar />
      </aside>

      {/* Main content */}
      <div className="w-3/4 flex flex-col">
        <AdminHeader />
        <main className="flex-grow bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
