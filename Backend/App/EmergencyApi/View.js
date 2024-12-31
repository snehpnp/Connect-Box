const { createViewAngel } = require('../../View/Angel');
const CreateAngelView = async (req, res) => {

    try {
        await createViewAngel();
        res.status(200).send('View created successfully.');
    }
    catch (error) {
        res.status(500).send('Error:', error);
    }
}


module.exports = { CreateAngelView };