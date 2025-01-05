export default function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
        const randomValue = Math.floor(Math.random() * 128);
        color += letters[randomValue % 16];
    }

    return color;
};