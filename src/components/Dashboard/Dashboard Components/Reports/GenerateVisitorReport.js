import jsPDF from 'jspdf';
import 'jspdf-autotable';


const GenerateVisitorPDF = visitors => {
    const doc = new jsPDF();

    const vCol = ['Id', 'Visitor', 'Company', 'Email',  'Phone', 'Host', 'Time_In', 'Time_Out', 'Position'];
    const vRow = [];

    visitors.forEach(visitor => {
      const visitorData = [
        visitor.Id,
        visitor.Full_name,
        visitor.Company,
        visitor.Email,
        visitor.Phone_Number,
        visitor.Full_Name,
        visitor.Time_In,
        visitor.Time_Out,
        visitor.Position,
        
      ];
      vRow.push(visitorData);
    });

    doc.autoTable(vCol, vRow, { startY: 20 });

    const date = Date().split(' ');
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4] + date[5] + date[6] + date[7] + date[8]

    doc.text("Visitors data", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  };

  export default GenerateVisitorPDF