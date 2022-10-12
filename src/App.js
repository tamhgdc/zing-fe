import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '@/routes/Web';
import { DefaultLayout } from '@/layouts';
import { AuthLayout } from '@/layouts';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss';
import { SWRConfig } from 'swr';
import axios from './utils/httpRequest';

function App() {
    return (
        <Router>
            <SWRConfig value={{ fetcher: (url) => axios.get(url), shouldRetryOnError: false }}>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<AuthLayout />} />
                        {publicRoutes.map((route, index) => {
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>

                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </SWRConfig>
        </Router>
    );
}

export default App;
