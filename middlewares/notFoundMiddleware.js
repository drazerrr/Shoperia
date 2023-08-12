const notFoundMiddleware = (req, res) => res.status(404).send('Routes does not exists');


export default notFoundMiddleware;