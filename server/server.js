const express = require('express')

		const app = express();

		app.use(express.static('server/public'))

		const PORT = 5000
		app.listen(PORT, () => {
    			console.log('INTERNET! PORT: 5000')
		});