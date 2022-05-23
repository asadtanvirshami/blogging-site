import '../styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layouts/Layout'

// eslint-disable-next-line react/display-name
function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
