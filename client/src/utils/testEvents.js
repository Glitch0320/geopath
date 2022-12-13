const coords = []

let timestamp = 1670685468789
export const testEvents = coords.map(c => {
    timestamp += 2000
    return {
        latlng: {
            lng: c[0],
            lat: c[1]
        },
        latitude: c[1],
        longitude: c[0],
        accuracy: 10,
        speed: 7,
        timestamp: timestamp
    }
})