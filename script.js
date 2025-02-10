async function generatePDF() {
    const { jsPDF } = window.jspdf;

    const name = document.getElementById("name").value.toUpperCase(); // Made uppercase
    const fatherName = document.getElementById("fatherName").value.toUpperCase(); // Made uppercase
    const rollNumber = document.getElementById("rollNumber").value;
    const studentClass = document.getElementById("classSelect").value; // Added class option
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
        
        // Set the line width to 0.5px for thinner borders
        pdf.setLineWidth(0.5);

        // Add black border
        pdf.setDrawColor(0, 0, 0); // Black color for the border
        pdf.rect(5, 5, 200, 287); // Position and size of the border

        // Add logo and headings
        pdf.addImage(logoURL, "JPEG", 10, 10, 20, 20);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text("GOVERNMENT HIGHER SECONDARY SCHOOL MIRPUR SAKRO", 105, 15, { align: "center" });
        pdf.text("ANNUAL EXAMINATION 2024-2025", 105, 22, { align: "center" });
        
        // Set the color for the line (black)
        pdf.setDrawColor(0, 0, 0);

        // Draw a bottom line for the header
        pdf.line(50, 38, 160, 38); // Line from x=50 to x=160 at y=38

        // Set text color to black for the header text
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);  // Set font size for the text
        pdf.text("ROLL NUMBER SLIP", 105, 35, { align: "center" });

        let y = 50;  // Move to the next y position for further content
        pdf.setFontSize(10);  // Set font size for student details or further content

        // Student details (Brown & Black text)
        pdf.setTextColor(139, 69, 19); // Brown color for labels
        pdf.text(`NAME: ${name}`, 15, y);
        pdf.addImage(profilePicURL, "JPEG", 170, y - 10, 25, 33);
        y += 6;
        pdf.text(`FATHER NAME: ${fatherName}`, 15, y);
        y += 6;
        pdf.text(`ROLL NUMBER: ${rollNumber}`, 15, y);
        y += 6;
        pdf.text(`CLASS: ${studentClass}`, 15, y); // Added class information
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

        // Updated instructions based on examination protocols for Pakistan (Grades 6 to 8)
        pdf.text("1) The candidate must bring this roll number slip to the examination hall.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("2) The candidate must carry a valid ID card along with the roll number slip.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("3) Any form of cheating or malpractice will lead to disqualification from the exam.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("4) The use of mobile phones, calculators, or any electronic devices is strictly prohibited.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("5) The candidate must arrive 30 minutes before the scheduled time for the examination.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("6) Candidates are not allowed to leave the examination hall until the specified time.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("7) In case of any technical issue or emergency, the candidate must report to the supervisor immediately.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("8) Any damage to the examination paper or materials will be penalized.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("9) The examination center is not responsible for any loss of personal belongings.", 15, instructionsY);
        instructionsY += 6;
        pdf.text("10) The candidate must follow all the instructions provided by the examination supervisor.", 15, instructionsY);

        // Add Signature options for Class Teacher and Center Incharge
        instructionsY += 20;
        pdf.text("Class Teacher's Signature: ____________________", 15, instructionsY);
        instructionsY += 6;
        pdf.text("Center Incharge's Signature: ____________________", 15, instructionsY);

        // Save the PDF
        pdf.save(`${name}_RollNumberSlip.pdf`);
    };

    profileReader.readAsDataURL(profilePicture);
}
