"use client"
import { useEffect, useState } from "react"
import { Menu01Icon } from 'hugeicons-react';

export default function SideMenu() {
    const [isClicked, setIsClicked] = useState(false)
    useEffect(() => {
        console.log(isClicked)
    }, [isClicked])

    return (
        <div style={{...styles.menu, ... (isClicked ? styles.clicked : styles.notClicked)}}>
            <button onClick={() => {setIsClicked(!isClicked)}}>
                <Menu01Icon size={32} />
            </button>
        </div>
    )
}

const styles = {
    menu: {
        position: "fixed",
        backgroundColor: "#252525",
        color: "white",
        margin: 8,
        padding: 8,
        borderRadius: 10,
        transition: "all 0.5s linear"
    },

    clicked: {
        height: "97vh",
        width: 200,
    },

    notClicked: {
        height: "fit-content",
        width: "fit-content",
        paddingBottom: -2
    }
}