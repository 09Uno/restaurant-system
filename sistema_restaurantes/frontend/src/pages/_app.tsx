

import '../../styles/global.scss'
import {AuthProvider} from '../contexts/AuthContext'
//Se o import do AppProps não funcionar, ir no tsconfig e adcionar "moduleResolution": "node",
import { AppProps } from 'next/app'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000}/>
    </AuthProvider>
  )
}

export default MyApp
