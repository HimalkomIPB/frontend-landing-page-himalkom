import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import Footer from './components/footer';
import Header from './components/header';
import MainLayout from './layout/MainLayout';
import Departemen from './pages/Departemen';
import Galeri from './pages/Galeri';
import GalleryDetail from './pages/Galeri/Detail';
import Himalkom from './pages/Himalkom';
import Home from './pages/Home';
import Jawara from './pages/Jawara';
import Komnews from './pages/Komnews';
import News from './pages/Komnews/News';
import Komunitas from './pages/Komunitas';
import Megaproker from './pages/Megaproker';
import NotFound from './pages/NotFound';
import Riset from './pages/Riset';
import Syntax from './pages/Syntax';
import Prestasi from './pages/Prestasi'
import DetailPrestasi from './pages/Prestasi/Detail/Detail';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/community/:slug" element={<Komunitas />} />
          <Route path="/himalkom" element={<Himalkom />} />
          <Route path="/division/:slug" element={<Departemen />} />
          <Route path="/komnews" element={<Komnews />} />
          <Route path="/komnews/:slug" element={<News />} />
          <Route path="/riset" element={<Riset />} />
          <Route path="/syntax" element={<Syntax />} />
          <Route path="/megaproker" element={<Megaproker />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/galeri/:id" element={<GalleryDetail />} />
          <Route path="/jawara" element={<Jawara />} />
          <Route path="/prestasi" element={<Prestasi />}/>
          <Route path="/prestasi/:id" element={<DetailPrestasi />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
// TEST