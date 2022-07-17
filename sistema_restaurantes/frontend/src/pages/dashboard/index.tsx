import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import { Header } from '../../components/header/header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../service/api'
import { useState } from 'react'
import Modal from 'react-modal'
import {ModalPedidos} from '../../components/ModalPedidos/index'


type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({ orders }: HomeProps) {
    const [orderList, setOrderList] = useState(orders || [])

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)


    function handleCloseModal(){
        setModalVisible(false);
    }

    async function  handleOpenModalView(id: string) {

        const apiClient = setupAPIClient();

        const response = await apiClient.get('/pedidos/detalhes', {
            params: {
                order_id: id,
            }
        })

        setModalItem(response.data)
        setModalVisible(true)

    }


    Modal.setAppElement('#__next');


    return (
        <>
            <Head>
                <title>Página Principal - Sistema</title>
            </Head>

            <div>
                <Header />
                <main className={styles.conteiner}>

                    <div className={styles.conteinerHeader}>
                        <h1>Últimos Pedidos</h1>
                        <button>
                            <FiRefreshCcw color='#3fffa3' />
                        </button>
                    </div>
                    <article className={styles.listOrders}>

                        {orderList.map(item => (
                            <section key={item.id} className={styles.order}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}



                    </article>



                </main>

                {modalVisible &&(
                    <ModalPedidos />
                )}
            </div>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/pedidos/listar')


    return {
        props: {
            orders: response.data
        }
    }
})