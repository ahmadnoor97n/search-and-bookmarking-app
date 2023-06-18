import React, { useContext, useEffect, useState } from 'react';
import { RepoContext } from './context/RepoContext';
import { SearchBar } from './components/SearchSection';
import { RepoList } from './components/RepoList';
import { PaginationComponent } from './components/Pagination';
import { Layout, Tabs, notification } from 'antd';
import { fetchRepos } from './utils/api';
import './App.css';

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '600px',
  position: 'fixed',
  zIndex:1
};

const contentStyle = {
  margin: '70px 0px',
  padding: '20px',
  flexGrow: 1,
};

const footerStyle = {
  width: '600px',
  position: 'fixed',
  bottom: 0,
  zIndex:1
};

const layoutStyle = {
  minHeight: '100vh'
}

const App = () => {
  const { state, dispatch } = useContext(RepoContext);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const data = await fetchRepos(state.searchQuery, state.currentPage);
        dispatch({ type: "SET_REPOS", payload: data });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_ERROR", payload: error.message }); 
        notification.error({ message: "Failed to fetch repositories", description: error.message });
      }
    };

    fetchData();
  }, [state.searchQuery, state.currentPage, dispatch]);

  return (
    <div className='main-container'>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <SearchBar />
        </Header>
        <Content style={contentStyle}>
          <Tabs defaultActiveKey="1" onChange={setActiveTab}>
            <TabPane tab="Search" key="1">
              <RepoList />
            </TabPane>
            <TabPane tab="Bookmarks" key="2">
              <RepoList isBookmark={true} />
            </TabPane>
          </Tabs>
        </Content>
        <Footer style={footerStyle}>
          {state?.totalRepos && activeTab === "1" ? <PaginationComponent /> : null}
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
