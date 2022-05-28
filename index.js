const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cli = require('nodemon/lib/cli');
const app = express()
const port = process.env.PORT || 5000


// middleware
app.use(cors())
app.use(express.json())

// assignment12
// B7Jy3iBymlSgBim4

app.get('/', (req, res) => {
    res.send('CAR PARTS ARE MANUFACTURING')
})



const uri = "mongodb+srv://assignment12:B7Jy3iBymlSgBim4@cluster0.rzhpt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()

        const toolsCollections = client.db("assignment12").collection("tools")
        const ordersCollections = client.db("assignment12").collection("orders")
        const reviewsCollections = client.db("assignment12").collection("review")

        app.get('/tools', async (req, res) => {
            const query = {}
            const cursor = toolsCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/tools/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const cursor = await toolsCollections.findOne(query)
            res.send(cursor)
        })

        app.post('/orders', async (req, res) => {
            const order = req.body
            const postedData = await ordersCollections.insertOne(order)
            res.send(postedData)
        })

        app.get('/orders', async (req, res) => {
            const email = req.query.email
            console.log(email);
            const query = { email: email }
            const cursor = ordersCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.post('/review', async (req, res) => {
            const review = req.body
            const postedData = await reviewsCollections.insertOne(review)
            res.send(postedData)
        })
    }
    finally {

    }
}

run().catch(console.dir)


app.listen(port, (req, res) => {
    console.log(port, 'is running')
})