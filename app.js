const express = require('express');
const routes = require('./routes');
const path = require('path');

const sampleRoutes = require('./routes/sampleRoutes');

const app = express();

console.log(typeof queryRoutes);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

// app.use('/sample-data', sampleRoutes);
// app.get('/sample-data', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/sample-data.html'));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
