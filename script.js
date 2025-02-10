function generatePDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  // Fetch form values
  const name = document.getElementById("name").value;
  const fatherName = document.getElementById("fatherName").value;
  const studentClass = document.getElementById("classSelect").value;
  const profilePicture = document.getElementById("profilePicture").files[0];

  if (!name || !fatherName || !studentClass || !profilePicture) {
    alert("Please fill all fields and upload a picture.");
    return;
  }

  // Convert profile picture
  const reader = new FileReader();
  reader.onload = function (event) {
    const profilePicURL = event.target.result;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);

    // Title & Institution Name
    pdf.text("GOVERNMENT HIGHER SECONDARY SCHOOL", 105, 20, { align: "center" });
    pdf.text("ANNUAL EXAMINATION 2024-2025", 105, 30, { align: "center" });
    pdf.text("ROLL NUMBER SLIP", 105, 40, { align: "center" });
    pdf.line(70, 42, 140, 42);

    // Student Details (Bold)
    let y = 60;
    pdf.text(`NAME: ${name}`, 20, y);
    pdf.addImage(profilePicURL, "JPEG", 150, y - 10, 30, 35);
    y += 8;
    pdf.text(`FATHER NAME: ${fatherName}`, 20, y);
    y += 8;
    pdf.text(`CLASS: ${studentClass}`, 20, y);
    y += 8;
    pdf.text(`INSTITUTE: GOVERNMENT HIGHER SECONDARY SCHOOL`, 20, y);
    y += 8;
    pdf.text(`EXAM CENTER: GOVERNMENT HIGHER SECONDARY SCHOOL`, 20, y);
    y += 12;

    // Exam Schedule
    pdf.autoTable({
      head: [['Date', 'Day', 'Subject', 'Morning Timing', 'Afternoon Timing']],
      body: [
        ['16-12-2024', 'Monday', 'English', '09:00 AM - 11:30 AM', ''],
        ['17-12-2024', 'Tuesday', 'Science/Arabic', '09:00 AM - 11:30 AM', '12:00 PM - 02:00 PM'],
        ['18-12-2024', 'Wednesday', 'Sindhi', '09:00 AM - 11:30 AM', ''],
        ['19-12-2024', 'Thursday', 'SS/Drawing', '09:00 AM - 11:30 AM', '12:00 PM - 02:00 PM'],
        ['20-12-2024', 'Friday', 'Islamiyat', '09:00 AM - 11:30 AM', ''],
        ['21-12-2024', 'Saturday', 'Mathematics', '09:00 AM - 11:30 AM', '']
      ],
      startY: y,
      theme: 'grid',
      styles: { fontSize: 10, textColor: [0, 0, 0] },
      headStyles: { fillColor: [150, 150, 150], fontStyle: 'bold' },
      bodyStyles: { fontStyle: 'bold' },
    });

    // Signature Section
    let ySignature = pdf.autoTable.previous.finalY + 20;
    pdf.line(20, ySignature, 60, ySignature);
    pdf.text("Candidate Signature:", 20, ySignature + 8);
    
    let centerText = "Center Incharge Signature:";
    let textWidth = pdf.getTextWidth(centerText);
    let endX = 190 - textWidth;
    pdf.line(endX, ySignature, 190, ySignature);
    pdf.text(centerText, endX, ySignature + 8);

    // Save PDF
    pdf.save(`${name}_RollNumberSlip.pdf`);
  };

  reader.readAsDataURL(profilePicture);
}
