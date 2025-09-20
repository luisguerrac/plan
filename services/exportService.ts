import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const addTextWithStyles = (doc: jsPDF, text: string, y: number, size: number, options: any) => {
    doc.setFontSize(size);
    doc.text(text, doc.internal.pageSize.getWidth() / 2, y, { align: 'center', ...options });
}

export const exportToPdf = (elementId: string, fileName: string) => {
    const doc = new jsPDF();
    let finalY = 0; // Keep track of the last Y position

    // Add main title
    const mainTitle = (document.querySelector(`#${elementId} h2`) as HTMLElement)?.innerText;
    if (mainTitle) {
        addTextWithStyles(doc, mainTitle, 15, 16, { fontStyle: 'bold' });
        finalY = 20;
    }

    // Add informative data table
    const infoTable = document.getElementById('informative-data-table');
    if (infoTable) {
        autoTable(doc, {
            html: '#informative-data-table',
            startY: finalY + 5,
            theme: 'grid',
            styles: {
                fontSize: 8,
                cellPadding: 2
            },
            headStyles: {
                fillColor: [230, 230, 230],
                textColor: [30, 30, 30],
                fontStyle: 'bold'
            }
        });
        finalY = (doc as any).lastAutoTable.finalY;
    }

    // Add weekly plan tables
    const weeklyPlanTables = document.querySelectorAll<HTMLTableElement>('table[id^="weekly-plan-table-"]');
    weeklyPlanTables.forEach((table, index) => {
        const weekTitle = (table.previousElementSibling as HTMLElement)?.innerText;
        if (weekTitle) {
            addTextWithStyles(doc, weekTitle, finalY + 10, 12, { fontStyle: 'bold' });
            finalY += 15;
        }

        autoTable(doc, {
            html: `#${table.id}`,
            startY: finalY,
            theme: 'grid',
            styles: {
                fontSize: 8,
                cellPadding: 2
            },
            headStyles: {
                fillColor: [230, 230, 230],
                textColor: [30, 30, 30],
                fontStyle: 'bold'
            },
        });
        finalY = (doc as any).lastAutoTable.finalY;
    });

    // Add curricular adaptation section
    const adaptationTitle = (document.querySelector(`#${elementId} #adaptation-info-table`)?.previousElementSibling as HTMLElement)?.innerText;
    const adaptationInfoTable = document.getElementById('adaptation-info-table');
    const adaptationPlanTable = document.getElementById('adaptation-plan-table');

    if (adaptationTitle && adaptationInfoTable && adaptationPlanTable) {
        addTextWithStyles(doc, adaptationTitle, finalY + 15, 14, { fontStyle: 'bold' });
        finalY += 20;

        autoTable(doc, {
            html: `#adaptation-info-table`,
            startY: finalY,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [230, 230, 230], textColor: [30, 30, 30], fontStyle: 'bold' },
        });
        finalY = (doc as any).lastAutoTable.finalY;

        autoTable(doc, {
            html: `#adaptation-plan-table`,
            startY: finalY + 5,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [230, 230, 230], textColor: [30, 30, 30], fontStyle: 'bold' },
        });
    }

    doc.save(`${fileName}.pdf`);
};


export const exportToWord = async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error('Element not found!');
        return;
    }

    const htmlDocx = await import('html-docx-js');
    
    // Basic styles to ensure tables have borders in Word
    const static_css = `
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
                vertical-align: top;
            }
            th {
                background-color: #f2f2f2;
            }
            h2, h3, h4 {
                 font-family: Arial, sans-serif;
            }
            ul {
                margin: 0;
                padding-left: 20px;
            }
        </style>
    `;

    const content = static_css + element.innerHTML;
    const blob = (htmlDocx as any).default.asBlob(content);

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
