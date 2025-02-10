async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const name = document.getElementById("name").value.toUpperCase();
  const fatherName = document.getElementById("fatherName").value.toUpperCase();
  const studentClass = document.getElementById("classSelect").value;
  const profilePicture = document.getElementById("profilePicture").files[0];

  if (!name || !fatherName || !profilePicture) {
    alert("Please fill out all fields and upload a profile picture.");
    return;
  }

  const profileReader = new FileReader();
  profileReader.onload = function (profileEvent) {
    const profilePicURL = profileEvent.target.result;

    const pdf = new jsPDF("p", "mm", "a4");

    // Add blue page border with padding
    pdf.setDrawColor(0, 0, 255);
    pdf.setLineWidth(3);
    pdf.rect(5, 5, 200, 287);

    // Add institution name and title
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("GOVERNMENT HIGHER SECONDARY SCHOOL", 105, 20, { align: "center" });
    pdf.text("ANNUAL EXAMINATION 2024-2025", 105, 28, { align: "center" });
    pdf.text("ROLL NUMBER SLIP", 105, 36, { align: "center" });

    let y = 50;

    // Student Details Section
    pdf.setFillColor(139, 69, 19);
    pdf.rect(10, y, 60, 8, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.text("STUDENT DETAILS", 12, y + 6);
    pdf.setTextColor(0, 0, 0);

    y += 12;
    pdf.setFontSize(12);
    pdf.text(`NAME: ${name}`, 15, y);
    pdf.addImage(profilePicURL, "JPEG", 160, y - 10, 25, 30);
    y += 6;
    pdf.text(`FATHER'S NAME: ${fatherName}`, 15, y);
    y += 6;
    pdf.text(`CLASS: ${studentClass}`, 15, y);
    y += 6;
    pdf.text(`ROLL NUMBER: ${100 + parseInt(studentClass) * 100}`, 15, y);

    // Time Table Header
    y += 15;
    pdf.setFillColor(135, 206, 250);
    pdf.rect(10, y, 190, 8, "F");
    pdf.setTextColor(0, 0, 0);
    pdf.text("DATE   DAY   SUBJECT   MORNING TIMING   AFTERNOON TIMING", 12, y + 6);

    y += 10;
    pdf.autoTable({
      startY: y,
      head: [["Date", "Day", "Subject", "Morning Timing", "Afternoon Timing"]],
      body: [
        ["16-12-2024", "Monday", "English", "09:00 AM - 11:30 AM", ""],
        ["17-12-2024", "Tuesday", "Science", "09:00 AM - 11:30 AM", "12:00 PM - 02:00 PM"],
        ["18-12-2024", "Wednesday", "Sindhi", "09:00 AM - 11:30 AM", ""],
      ],
      theme: "grid",
      headStyles: { fillColor: [135, 206, 250], textColor: [0, 0, 0] },
      bodyStyles: { fontSize: 12 },
    });

    // Instructions Section
    let ySignature = pdf.autoTable.previous.finalY + 20;
    pdf.text("INSTRUCTIONS:", 15, ySignature);
    pdf.text("i) Bring this slip in the exam hall.", 15, ySignature + 6);
    pdf.text("ii) No unauthorized material allowed.", 15, ySignature + 12);

    // Save the PDF
    pdf.save(`${name}_RollNumberSlip.pdf`);
  };

  profileReader.readAsDataURL(profilePicture);
}
