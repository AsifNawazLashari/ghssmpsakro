async function generatePDF() {
    const { jsPDF } = window.jspdf;

    const name = document.getElementById("name").value;
    const fatherName = document.getElementById("fatherName").value;
    const rollNumber = document.getElementById("rollNumber").value;
    const profilePicture = document.getElementById("profilePicture").files[0];
    const hiddenLogo = document.getElementById("hiddenLogo");

    if (!name || !fatherName || !rollNumber || !profilePicture) {
        alert("Please fill out all fields and upload a profile picture.");
        return;
    }

    const profileReader = new FileReader();
    profileReader.onload = function (profileEvent) {
        const profilePicURL = profileEvent.target.result;
        const logoURL = hiddenLogo.src;

        const pdf = new jsPDF("p", "mm", "a4");
        
        // Add blue border
        pdf.setDrawColor(0, 0, 255);
        pdf.rect(5, 5, 200, 287);

        // Add logo and headings
        pdf.addImage(logoURL, "JPEG", 10, 10, 20, 20);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text("GOVERNMENT HIGHER SECONDARY SCHOOL", 105, 15, { align: "center" });
        pdf.text("ANNUAL EXAMINATION 2024-2025", 105, 22, { align: "center" });
        
        // Time-date banner with blue background
        pdf.setFillColor(0, 0, 255);
        pdf.rect(50, 28, 110, 10, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.text("ROLL NUMBER SLIP", 105, 35, { align: "center" });
        pdf.setTextColor(0, 0, 0);

        let y = 50;
        pdf.setFontSize(10);

        // Student details (Brown & Black text)
        pdf.setTextColor(139, 69, 19);
        pdf.text(`NAME: ${name}`, 15, y);
        pdf.addImage(profilePicURL, "JPEG", 170, y - 10, 25, 33);
        y += 6;
        pdf.text(`FATHER NAME: ${fatherName}`, 15, y);
        y += 6;
        pdf.text(`ROLL NUMBER: ${rollNumber}`, 15, y);
        y += 6;
        pdf.text(`INSTITUTION: GOVERNMENT HIGHER SECONDARY SCHOOL`, 15, y);
        y += 6;
        pdf.text(`CENTER: GOVERNMENT HIGHER SECONDARY SCHOOL`, 15, y);
        y += 10;

        pdf.setTextColor(0, 0, 0); // Reset text color to black
        
        // Exam Schedule Table
        pdf.autoTable({
            head: [['Date', 'Day', 'Subject', 'Morning Timing', 'Afternoon Timing']],
            body: [
                ['16-12-2024', 'Monday', 'English', '09:00 AM - 11:30 AM', ''],
                ['17-12-2024', 'Tuesday', 'Science/Arabic', '09:00 AM - 11:30 AM', '12:00 PM - 02:00 PM'],
                ['18-12-2024', 'Wednesday', 'Sindhi', '09:00 AM - 11:30 AM', ''],
                ['19-12-2024', 'Thursday', 'SS/Drawing', '09:00 AM - 11:30 AM', '12:00 PM - 02:00 PM'],
                ['20-12-2024', 'Friday', 'Islamiyat', '09:00 AM - 11:30 AM', ''],
                ['21-12-2024', 'Saturday', 'Mathematics', '09:00 AM - 11:30 AM', ''],
            ],
            startY: y,
            theme: 'grid',
            headStyles: { fillColor: [169, 169, 169], textColor: [0, 0, 0], fontStyle: 'bold' },
            bodyStyles: { textColor: [0, 0, 0], fontStyle: 'bold' },
        });

        let instructionsY = pdf.autoTable.previous.finalY + 10;
        pdf.text("INSTRUCTIONS:", 15, instructionsY);
        instructionsY += 6;
        pdf.text("i) Bring this slip in the exam hall.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("ii) Do not bring unauthorized material.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("iii) Bring all required writing materials.", 15, instructionsY);

        pdf.save(`${name}_RollNumberSlip.pdf`);
    };

    profileReader.readAsDataURL(profilePicture);
}
