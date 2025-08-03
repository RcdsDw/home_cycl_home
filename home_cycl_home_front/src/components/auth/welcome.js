import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import TestAddress from "../../utils/TestAddress";

export default function Welcome() {
    const nav = useNavigate();
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Home Cycl Home</h1>
            <div style={styles.overlay}>
                <div style={styles.inputWrapper}>
                    <TestAddress />
                </div>
                <Button
                    onClick={() => nav("/auth/login")}
                    style={styles.login}
                >
                    J'ai déjà un compte
                </Button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url("/assets/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    title: {
        position: 'absolute',
        top: '40px',
        width: '100%',
        textAlign: 'center',
        fontSize: '72px',
        color: 'white',
        opacity: 0.8,
        zIndex: 2,
        margin: 0,
    },
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        border: '1px solid rgba(255, 255, 255, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(2px)',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        minWidth: '300px',
    },
    login: {
        background: 'none',
        border: 'none',
        color: "white",
        padding: 0,
        cursor: 'pointer'
    }
};
