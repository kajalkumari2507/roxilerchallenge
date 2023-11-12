const randomColorGenerator = (count) =>{
    const arr = [];
    while(count-- > 0){
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        arr.push(`rgb(${r}, ${g}, ${b})`);
    }
    return arr;
}

export default randomColorGenerator;