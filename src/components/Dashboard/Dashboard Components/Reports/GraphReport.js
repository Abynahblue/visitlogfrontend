import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GraphReport = charts => {
    const doc = new jsPDF();

    const gCol = [ 'Months', 'Visits'];
    const gRow = [];

    charts.forEach(chart => {
      const chartData = [
        chart.Months,
        chart.Visit,
        
      ];
      gRow.push(chartData);
    });

    doc.autoTable(gCol, gRow, { startY: 20 });

    const date = Date().split(' ');
    const dateStr = date[0] + date[1]

    doc.text("Charts data", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  };

export default GraphReport