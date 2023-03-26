import Layout from "./widgets/Layout";
import Header from "./widgets/Header";
import Main from "./widgets/Main";
import Navigation from "./widgets/Navigation";
import Footer from "./widgets/Footer";

function App() {
  return (
    <div className="App">
      <Layout
        header={<Header>Open Grading Project</Header>}
        sidebar={<Navigation />}
        main={<Main />}
        footer={<Footer />}
      />
    </div>
  );
}

export default App;
