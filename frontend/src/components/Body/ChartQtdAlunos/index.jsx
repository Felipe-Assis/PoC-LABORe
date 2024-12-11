import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {useInstitutionStore} from "../../../store/instituicoesStore.js";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import './index.css';

const ChartQtdAlunos = () => {
    const chartRef = useRef(null);
    const { institutions, fetchInstitutions, fetchStudentCountsByUF, studentCountsByUF } = useInstitutionStore();

    useEffect(() => {
        fetchStudentCountsByUF();
    }, [fetchStudentCountsByUF, institutions]);

    useLayoutEffect(() => {
        if (!chartRef.current || studentCountsByUF.length === 0) return;

        // Create root element
        const root = am5.Root.new(chartRef.current);

        // Set theme
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                paddingLeft: 0,
                paddingRight: 1,
            })
        );

        // Add cursor
        const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        // Create X-axis
        const xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            minorGridEnabled: true,
        });

        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15,
        });

        xRenderer.grid.template.setAll({
            location: 1,
        });

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: "uf",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {}),
            })
        );

        // Create Y-axis
        const yRenderer = am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1,
        });

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: yRenderer,
            })
        );

        // Create series
        const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Qtd Alunos",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "totalAlunos",
                sequencedInterpolation: true,
                categoryXField: "uf",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY}",
                }),
            })
        );

        // Style series columns
        series.columns.template.setAll({
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            strokeOpacity: 0,
        });

        // Add color adapters for dynamic coloring
        series.columns.template.adapters.add("fill", (fill, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        // Set data
        series.data.setAll(studentCountsByUF);
        xAxis.data.setAll(studentCountsByUF);

        // Animate on load
        series.appear(1000);
        chart.appear(1000, 100);

        // Cleanup
        return () => root.dispose();
    }, [studentCountsByUF]);


    return (
        <div className='chart-container'>
            <h1>Gráfico de quantidade de alunos</h1>
            <div className='chart-element'>
                <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
            </div>
        </div>
    );
};

export default ChartQtdAlunos;
