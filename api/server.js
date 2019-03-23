import fastify from "fastify"

const app = fastify({
    logger: true
})

app.get('/', async (request, reply) => {
    return 'Hello world!'
})

app.listen(3000, function (err, address) {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
})
