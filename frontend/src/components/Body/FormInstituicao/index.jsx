import React, { useState, useEffect } from 'react';

const FormInstituicao = ({ initialData, onChange }) => {
    const [nome, setNome] = useState('');
    const [uf, setUf] = useState('');
    const [qtdAlunos, setQtdAlunos] = useState('');

    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome || '');
            setUf(initialData.uf || '');
            setQtdAlunos(initialData.qtdAlunos || '');
        }
    }, [initialData]);

    useEffect(() => {
        if (onChange) {
            onChange({ nome, uf, qtdAlunos: Number(qtdAlunos) });
        }
    }, [nome, uf, qtdAlunos, onChange]);


    return (
        <form>
            <div className="form-group">
                <label>Nome</label>
                <input
                    type="text"
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>UF</label>
                <input
                    type="text"
                    className="form-control"
                    maxLength={2}
                    value={uf}
                    onChange={(e) => setUf(e.target.value.toUpperCase())}
                    required
                />
            </div>
            <div className="form-group">
                <label>Quantidade de Alunos</label>
                <input
                    type="number"
                    className="form-control"
                    value={qtdAlunos}
                    onChange={(e) => setQtdAlunos(e.target.value)}
                    required
                />
            </div>
        </form>
    );
};

export default FormInstituicao;
