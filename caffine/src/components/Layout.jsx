import { useState } from 'react';
import Modal from './Modal';
import Authentication from './Authentication';
import { useAuth } from '../context/AuthContext';

export default function Layout(props) {

    const { children } = props;

    const [showModal, setShowModal] = useState(false);
    const { globalUser, logout } = useAuth(); // Assuming globalUser is passed as a prop

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND </h1>
                <p>For Coffee Addicts </p>
            </div>
            {globalUser ? (
                <button onClick={logout} className="sign-up-button">
                    <p>Logout</p>
                </button>
            ) : (
                <button onClick={() => setShowModal(true)} className="sign-up-button">
                    <p>Sign up Free</p>
                </button>
            )}
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend</span> was made by <a target="_blank" href="https://www.smoljames.com">Smoljames</a> <br />using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.<br />Check out the project on <a target="_black" href="https://www.github.com/jamezmca/reactjs-full-course">GitHub</a>!</p>
        </footer>
    )

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}