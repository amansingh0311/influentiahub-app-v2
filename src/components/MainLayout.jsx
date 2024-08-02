
import TopNav from "../components/Layout";
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <div>
      <TopNav />
      <main className="py-4">{children}</main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
