const coords = [
    [
      0.385794630260591,
      22.13268449585283
    ],
    [
      7.235063426343402,
      23.507288941991376
    ],
    [
      8.38734982401894,
      16.555119305080837
    ],
    [
      1.0218190402877951,
      16.40351935141524
    ],
    [
      -0.2894622865576366,
      23.88109381264796
    ]
  ]

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