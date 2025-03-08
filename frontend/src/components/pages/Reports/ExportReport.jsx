import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import { FiDownloadCloud } from "react-icons/fi";

const ExportReport = () => {
	const handleExportReport = () => {
		const reportElement = document.getElementById("report-container"); // Ensure charts are inside this container

		if (!reportElement) {
			console.error("Report container not found!");
			return;
		}

		domtoimage
			.toPng(reportElement, { quality: 1 })
			.then((imgData) => {
				const pdf = new jsPDF("p", "mm", "a4");

				const imgWidth = 210; // A4 width in mm
				const imgHeight =
					(reportElement.clientHeight * imgWidth) / reportElement.clientWidth;

				if (imgHeight <= 297) {
					// Fits on one page
					pdf.text("Financial Report", 15, 15);
					pdf.addImage(imgData, "PNG", 10, 25, imgWidth - 20, imgHeight);
				} else {
					// Multiple pages
					let yPos = 25;
					const pageHeight = 297 - 30; 
					let currentHeight = imgHeight;

					while (currentHeight > 0) {
						pdf.text("Financial Report", 15, 15);
						pdf.addImage(imgData, "PNG", 10, yPos, imgWidth - 20, pageHeight);
						currentHeight -= pageHeight;
						yPos -= 297;

						if (currentHeight > 0) {
							pdf.addPage();
							yPos = 10;
						}
					}
				}

				pdf.save("financial_report.pdf");
			})
			.catch((error) => {
				console.error("Error generating PDF: ", error);
			});
	};

    return (
        <button
            onClick={handleExportReport}
            className='mx-2 px-3 py-2 bg-white text-xs text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-300 transition h-[40px] w-[150px] flex items-center justify-center'
        >
            <FiDownloadCloud className="h-5 w-5 mr-2"/>
            <p className='text-[14px]'>Export Report</p>
        </button>
    );
};

export default ExportReport;
