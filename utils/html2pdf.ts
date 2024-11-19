import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const htmlToPDF = async (
    htmlId: string,
    title = 'passport',
    bgColor = '#fff',
) => {
    const pdfDom: HTMLElement | null = document.getElementById(
        htmlId,
    ) as HTMLElement;
    pdfDom.style.padding = '0 10px !important';
    const A4Width = 595.28;
    const A4Height = 841.89;
    const canvas = await html2canvas(pdfDom, {
        scale: 2,
        useCORS: true,
        backgroundColor: bgColor,
    });
    const pageHeight = (canvas.width / A4Width) * A4Height;
    let leftHeight = canvas.height;
    let position = 0;
    const imgWidth = A4Width;
    const imgHeight = (A4Width / canvas.width) * canvas.height;
    /*
     根据自身业务需求  是否在此处键入下方水印代码
    */
    const pageData = canvas.toDataURL('image/jpeg', 1.0);
    const PDF = new jsPDF('p', 'pt', 'a4');
    if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
        while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= A4Height;
            if (leftHeight > 0) PDF.addPage();
        }
    }
    PDF.save(title + '.pdf');
};
