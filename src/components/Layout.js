import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main style={{ flex: 1, padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
