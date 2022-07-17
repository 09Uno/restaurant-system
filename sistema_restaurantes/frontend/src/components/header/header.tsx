import styles from './styles.module.scss'
import Link from 'next/link'
import {FiLogOut} from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { userAgent } from 'next/server'

export function Header(){

    const {singOut} = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                <img src='#' width={190} height={60}/>
                </Link>
                 
                <nav>
                    <Link href='/categorias'>
                    <a>Categorias</a>
                    </Link>

                    <Link href='/produtos'>
                        <a>Cardápio</a>
                    </Link>

                    <button onClick={singOut} >
                        <FiLogOut color='#FFF' size={24} />
                        
                    </button>
                </nav>
              
            </div>
        </header>
    )

}