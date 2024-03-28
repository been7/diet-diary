import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Detail from "../pages/Detail";
import Fix from "../pages/Fix";
import Main from "../pages/Main";
import Write from "../pages/Write";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/write" element={<Write />} />
          <Route path="/fix/:id" element={<Fix />} />
        </Routes>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
