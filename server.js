const express = require('express')
const PORT = 8080

let app = express()

app.listen(PORT, () => {
    console.log(`
    YOUR SERVER IS LISTENING ON PORT: ${PORT}
    `)
})
