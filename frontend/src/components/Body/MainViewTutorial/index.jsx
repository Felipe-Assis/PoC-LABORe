import React from 'react';
import Joyride from 'react-joyride';

const MainViewTutorial = ({ start, onFinish }) => {
    const steps = [
        {
            target: '.backend-status',
            content: 'Esta seção mostra o status atual do backend.',
        },
        {
            target: '.add-button',
            content: 'Clique neste botão para adicionar uma nova instituição.',
        },
        {
            target: '.table-container',
            content: 'Esta tabela exibe todas as instituições e permite editar ou excluir.',
        },
        {
            target: '.table-navigation',
            content: 'Utilize a paginação para acessar demais instituições',
        },
        {
            target: '.tableFilter',
            content: 'Você pode também filtrar as instituições exibidas na tabela aqui.'
        },
        {
            target: '.chart-container',
            content: 'Este gráfico mostra a distribuição de estudantes por estado.',
        },
        {
            target: '.btn-warning',
            content: 'Clique aqui para editar uma instituição.',
        },
        {
            target: '.btn-danger',
            content: 'Clique aqui para excluir uma instituição.',
        },
        {
            target: '.btn-bulk-delete',
            content: 'Você pode usar esse seletor para selecionar múltiplas componentes para então deletar diversos registros de uma única vez!',
        },
    ];


    return (
        <Joyride
            steps={steps}
            run={start} // Start the tutorial if the prop is true
            continuous
            scrollToFirstStep
            showProgress
            showSkipButton
            styles={{
                options: {
                    primaryColor: '#007bff',
                    zIndex: 1000,
                },
            }}
            callback={(data) => {
                if (data.status === 'finished' || data.status === 'skipped') {
                    onFinish(); // Notify the parent component when the tutorial ends
                }
            }}
        />
    );
};

export default MainViewTutorial;
