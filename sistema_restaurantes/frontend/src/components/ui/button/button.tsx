import {ReactNode, ButtonHTMLAttributes} from 'react'
import styles from './styles.module.scss'
import {FaSpinner} from 'react-icons/fa'

//Tipagem para definir os atributos do botão individualmente
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean,
    children: ReactNode,
}
//Componente botão cria individualmente, pois pooderá sera aproveitado em várias páginas
export function Button({loading, children, ...rest}:ButtonProps){

    return(

        // "{loading }" serve para renderizar um icone de loading 0 "FaSpinner"
        //{...rest} define os atributos restantes não especificados 
        <button className={styles.button}
        disabled={loading}
        {...rest}
        >

            
        {loading ? (
            <FaSpinner color="#FFF" size={16} />
        ) : (

            <a className={styles.buttonText}>{children}</a>

        )}

        
            
        </button>
    )

}