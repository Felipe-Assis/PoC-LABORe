import AddButton from './AddButton';
import BackendStatus from './BackendStatus';
import ChartQtdAlunos from './ChartQtdAlunos';
import InstituicoesTable from './InstituicoesTable';
import './index.css'
import BulkDeleteButton from "./BulkDeleteButton/index.jsx";
import TableFilter from './TableFilter';
import { useInstitutionStore } from  '../../store/instituicoesStore'
import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import MainViewTutorial from "./MainViewTutorial/index.jsx";
const Body = () => {
    const { selectedIds } = useInstitutionStore();
    const [showTutorial, setShowTutorial] = useState(true);
    const [filterValue, setFilterValue] = useState('');

    const handleTutorialFinish = () => {
        setShowTutorial(false); // Stop the tutorial when finished
    };

    return (
        <div className="body">

            {/* Main View Tutorial */}
            <MainViewTutorial start={showTutorial} onFinish={handleTutorialFinish} />

            <BackendStatus />
            <div className="d-flex mb-3">
                <TableFilter filterValue={filterValue} onFilterChange={setFilterValue} /> &nbsp;
                <AddButton />&nbsp;
                {selectedIds?.length > 0 && <BulkDeleteButton />}
            </div>
            <InstituicoesTable filterValue={filterValue}/>
            <ChartQtdAlunos />
        </div>
    );
}

export default Body;