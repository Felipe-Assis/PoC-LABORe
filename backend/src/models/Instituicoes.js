const mongoose = require('mongoose')

const InstituicaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O campo "nome" é obrigatório.'],
        unique: [true, 'Já existe uma instituição com este nome.'],
        trim: true,
        minlength: [3, 'O nome deve ter no mínimo 3 caracteres.'],
        maxlength: [100, 'O nome deve ter no máximo 100 caracteres.']
    },
    uf: {
        type: String,
        required: [true, 'O campo "uf" é obrigatório.'],
        trim: true,
        uppercase: true,
        minlength: [2, 'O campo "uf" deve ter exatamente 2 caracteres.'],
        maxlength: [2, 'O campo "uf" deve ter exatamente 2 caracteres.'],
        match: [/^[A-Z]{2}$/, 'O campo "uf" deve conter apenas letras maiúsculas.']
    },
    qtdAlunos: {
        type: Number,
        required: [true, 'O campo "qtdAlunos" é obrigatório.'],
        min: [0, 'A quantidade de alunos deve ser maior ou igual a 0.']
    }
}, {
    timestamps: true
});


// Garante que o índice único seja criado no banco
InstituicaoSchema.index({ nome: 1 }, { unique: true });

const Instituicao = mongoose.model('Instituicao', InstituicaoSchema, 'instituicoes')

module.exports = Instituicao