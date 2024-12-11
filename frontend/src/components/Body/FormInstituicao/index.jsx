import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ufs from '../../../utils/ufs';

// Validation Schema
const validationSchema = Yup.object({
    nome: Yup.string()
        .trim()
        .min(1, 'O nome deve ter no mínimo 1 caracter.')
        .max(100, 'O nome deve ter no máximo 100 caracteres.')
        .required('O campo "nome" é obrigatório.'),
    uf: Yup.string()
        .required('O campo "uf" é obrigatório.')
        .oneOf(
            ufs.map((u) => u.sigla),
            'Selecione uma UF válida.'
        ),
    qtdAlunos: Yup.number()
        .typeError('A quantidade de alunos deve ser um número.')
        .min(0, 'A quantidade de alunos deve ser maior ou igual a 0.')
        .required('O campo "quantidade de alunos" é obrigatório.'),
});

const FormInstituicao = ({ initialData, onChange, innerRef }) => {
    return (
        <Formik
            initialValues={{
                nome: initialData?.nome || '',
                uf: initialData?.uf || '',
                qtdAlunos: initialData?.qtdAlunos || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                if (onChange) {
                    onChange(values);
                }
            }}
            validateOnChange={true}
            validateOnBlur={true}
            innerRef={innerRef} // Attach Formik instance to innerRef
        >
            {() => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <Field
                            type="text"
                            id="nome"
                            name="nome"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="nome"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="uf">UF</label>
                        <Field
                            as="select"
                            id="uf"
                            name="uf"
                            className="form-control"
                        >
                            <option value="">Selecione a UF</option>
                            {ufs.map((uf) => (
                                <option key={uf.sigla} value={uf.sigla}>
                                    {uf.nome} ({uf.sigla})
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage
                            name="uf"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="qtdAlunos">Quantidade de Alunos</label>
                        <Field
                            type="number"
                            id="qtdAlunos"
                            name="qtdAlunos"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="qtdAlunos"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FormInstituicao;
