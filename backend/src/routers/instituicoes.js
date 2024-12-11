const express = require('express');
const router = express.Router();
const Instituicoes = require('../models/Instituicoes');

// Lista todas as Instituições
router.get('/', async (req, res) => {
    try {
        const list = await Instituicoes.find({});
        res.status(200).send(list);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar as instituições.' });
    }
});


// Retorna a quantidade de alunos por UF
router.get('/qtd-alunos-por-uf', async (req, res) => {
    try {
        const result = await Instituicoes.aggregate([
            {
                $match: {
                    uf: { $exists: true, $ne: null },
                    qtdAlunos: { $exists: true, $type: "number" }
                }
            },
            {
                $group: {
                    _id: "$uf",
                    totalAlunos: { $sum: "$qtdAlunos" }
                }
            },
            {
                $sort: { totalAlunos: -1 }
            },
            {
                $project: { uf: "$_id", totalAlunos: 1, _id: 0 }
            }
        ]);

        console.log("Aggregation Result:", result); // Log do resultado
        res.status(200).send(result);
    } catch (error) {
        console.error('Error in aggregation:', error);
        res.status(500).send({
            error: 'Erro ao agrupar os dados por UF.',
            details: error.message
        });
    }
});


// Busca uma Instituição por ID
router.get('/:id', async (req, res) => {
    try {
        const instituicao = await Instituicoes.findById(req.params.id);
        if (!instituicao) {
            return res.status(404).send({ error: 'Instituição não encontrada.' });
        }
        res.status(200).send(instituicao);
    } catch (error) {
        res.status(400).send({ error: 'ID inválido ou erro ao buscar instituição.' });
    }
});

// Cria uma nova Instituição
router.post('/', async (req, res) => {
    try {
        const instituicao = await Instituicoes.create(req.body); // Simplifica usando `create`
        res.status(201).send(instituicao);
    } catch (error) {
        const errorMessage = error.code === 11000 ?
            'Já existe uma instituição com este nome.' : error.message;
        res.status(400).send({ error: 'Erro ao criar instituição.', details: errorMessage });
    }
});

// Atualiza uma Instituição por ID
router.patch('/:id', async (req, res) => {
    const updates = req.body;
    const allowedUpdates = ['nome', 'uf', 'qtdAlunos'];
    const isValidOperation = Object.keys(updates).every(update =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Campos inválidos para atualização.' });
    }

    try {
        const instituicao = await Instituicoes.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true } // `new` retorna o documento atualizado, `runValidators` valida os campos
        );

        if (!instituicao) {
            return res.status(404).send({ error: 'Instituição não encontrada.' });
        }

        res.status(200).send(instituicao);
    } catch (error) {
        const errorMessage = error.code === 11000 ?
            'Já existe uma instituição com este nome.' : error.message;
        res.status(400).send({ error: 'Erro ao atualizar instituição.', details: errorMessage });
    }
});

// Deleta uma Instituição por ID
router.delete('/:id', async (req, res) => {
    try {
        const instituicao = await Instituicoes.findByIdAndDelete(req.params.id);
        if (!instituicao) {
            return res.status(404).send({ error: 'Instituição não encontrada.' });
        }
        res.status(200).send({ message: 'Instituição deletada com sucesso.' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao deletar instituição.' });
    }
});


// Bulk delete endpoint
router.post('/bulk-delete', async (req, res) => {
    const { ids } = req.body; // Expecting an array of IDs in the request body

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).send({ error: 'Por favor, forneça uma lista válida de IDs.' });
    }

    try {
        const result = await Instituicoes.deleteMany({
            _id: { $in: ids }
        });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Nenhuma instituição encontrada para deletar.' });
        }

        res.status(200).send({
            message: 'Instituições deletadas com sucesso.',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error('Error deleting institutions:', error);
        res.status(500).send({ error: 'Erro ao deletar instituições.', details: error.message });
    }
});






module.exports = router;
