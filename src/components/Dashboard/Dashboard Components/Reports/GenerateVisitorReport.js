import jsPDF from 'jspdf';
import 'jspdf-autotable';


const GenerateVisitorPDF = visitors => {
    const doc = new jsPDF();

    const vCol = ['Visitor', 'Email',  'Host Email', 'Created By', 'Created At', ];
    const vRow = [];
  visitors.forEach(visitor => {
      const visitorData = [
        visitor.guest_id.fullName,
        visitor.guest_id.email,
        visitor.guest_id?.qrCodeId?.email,
         visitor.guest_id?.qrCodeId?.admin || visitor.guest_id?.qrCodeId?.host,
         visitor.guest_id.qrCodeId?.createdAt ? new Date(visitor.guest_id.qrCodeId?.createdAt).toLocaleString() : "null",
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