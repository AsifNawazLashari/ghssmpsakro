async function generatePDF() {
  const { jsPDF } = window.jspdf;

  const name = document.getElementById("name").value.toUpperCase();
  const fatherName = document.getElementById("fatherName").value.toUpperCase();
  const studentClass = document.getElementById("class").value;
  const rollNumber = document.getElementById("rollNumber").value.toUpperCase();
  const profilePicture = document.getElementById("profilePicture").files[0];

  if (!name || !fatherName || !rollNumber || !profilePicture) {
    alert("Please fill out all fields and upload a profile picture.");
    return;
  }

  const profileReader = new FileReader();
  profileReader.onload = function (profileEvent) {
    const profilePicURL = profileEvent.target.result;

    const pdf = new jsPDF("p", "mm", "a4");

    // Blue page border
    pdf.setDrawColor(0, 0, 255);
    pdf.setLineWidth(4);
    pdf.rect(5, 5, 200, 287);

    // Header Text
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("GOVERNMENT HIGHER SECONDARY SCHOOL", 105, 20, { align: "center" });
    pdf.text("ANNUAL EXAMINATION 2024-2025", 105, 28, { align: "center" });

    // Student Details
    let y = 40;
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(139, 69, 19); // Brown color for columns
    pdf.text("STUDENT DETAILS:", 15, y);
    pdf.setTextColor(0, 0, 0); // Black color for information
    pdf.text(`NAME: ${name}`, 15, y + 8);
    pdf.text(`FATHER NAME: ${fatherName}`, 15, y + 16);
    pdf.text(`CLASS: ${studentClass}`, 15, y + 24);
    pdf.text(`ROLL NUMBER: ${rollNumber}`, 15, y + 32);

    pdf.addImage(profilePicURL, "JPEG", 170, y, 25, 30);

    // Time Table Header (Sky Blue)
    pdf.setFillColor(135, 206, 250);
    pdf.rect(10, 80, 190, 10, "F");
    pdf.setTextColor(0, 0, 0);
    pdf.text("DATE", 20, 87);
    pdf.text("DAY", 50, 87);
    pdf.text("SUBJECT", 80, 87);
    pdf.text("MORNING TIMING", 120, 87);
    pdf.text("AFTERNOON TIMING", 160, 87);

    // Time Table Data
    pdf.autoTable({
      startY: 90,
      head: [["Date", "Day", "Subject", "Morning Timing", "Afternoon Timing"]],
      body: [
        ["16-12-2024", "Monday", "English", "09:00 AM - 11:30 AM", ""],
        ["17-12-2024", "Tuesday", "Science", "09:00 AM - 11:30 AM", "12:00 PM - 02:00 PM"],
      ],
      theme: "grid",
      headStyles: { fillColor: [135, 206, 250], textColor: [0, 0, 0] },
      bodyStyles: { fontSize: 10, textColor: [0, 0, 0] },
    });

    // Instructions
    let instructionsY = pdf.autoTable.previous.finalY + 20;
    pdf.text("INSTRUCTIONS:", 15, instructionsY);
    pdf.text("i) Bring this slip to the exam hall.", 15, instructionsY + 6);
    pdf.text("ii) Do not bring unauthorized material.", 15, instructionsY + 12);

    pdf.save(`${name}_RollNumberSlip.pdf`);
  };

  profileReader.readAsDataURL(profilePicture);
}
