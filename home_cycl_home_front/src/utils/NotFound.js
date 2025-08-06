// src/components/NotFound.js
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>🚲 404 - Page non trouvée 🚲</h1>
            <p>Cette page n'existe pas.</p>
            <Link to="/">Retour à l'accueil</Link>
        </div>
    );
}
