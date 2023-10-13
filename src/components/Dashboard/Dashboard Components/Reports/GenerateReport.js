import jsPDF from 'jspdf';
import 'jspdf-autotable';


const GeneratePDF = reports => {
    const doc = new jsPDF();

    const tCol = ['Id', 'Full_Name', 'Email', 'Position', 'Phone_Number'];
    const tRow = [];

    reports.forEach(report => {
      const reportData = [
        report.Id,
        report.Full_Name,
        report.Email,
        report.Position,
        report.Phone_Number,
      ];
      tRow.push(reportData);
    });

    doc.autoTable(tCol, tRow, { startY: 20 });

    const date = Date().split(' ');
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text("Employees data.", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  };

  export default GeneratePDF