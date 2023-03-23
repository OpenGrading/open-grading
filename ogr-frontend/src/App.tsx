import Layout from "./widgets/Layout";
import Header from "./widgets/Header";
import Main from "./widgets/Main";

function App() {
  return (
    <div className="App">
      <Layout
        header={<Header>Open Grading Project</Header>}
        sidebar={<div>Sidebar</div>}
        main={<Main />}
        footer={<div>Footer</div>}
      />
    </div>
  );
}

export default App;
