import Header from "./header";
import Footer from "./footer";
import PropTypes from "prop-types";

const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fffaf5]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main
        className="flex-grow w-full flex flex-col items-center justify-center px-1 py-1 bg-[#FFFAD6]"
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserLayout;
