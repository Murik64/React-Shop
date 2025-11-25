import { Link } from 'react-router-dom';
import successPay from '../assets/images/successPay.png'
import Loader from './loaderPay/LoaderPay';
import { useEffect, useState } from 'react';
const SuccessPay = () => {
    const [isLoader, setIsLoader] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoader(false)
        }, 4500)
    }, [])
    return (
        <div className="container success__main">
            {isLoader ? (<Loader />) :
                (
                    <>
                        <h1>Оплата прошла успешно</h1>
                        <img src={successPay} alt="" className='success' />
                        <Link to="/" class="button button--black">
                            <span>Вернуться назад</span>
                        </Link>
                    </>
                )
            }
        </div>
    )
}
export default SuccessPay;