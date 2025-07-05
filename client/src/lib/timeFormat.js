

const timeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mintuesRemainder = minutes % 60;
    return `${hours}h ${mintuesRemainder}m`
}

export default timeFormat;