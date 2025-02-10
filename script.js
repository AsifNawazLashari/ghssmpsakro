function assignRollNumber() {
  const selectedClass = document.getElementById("classSelection").value;
  if (!selectedClass) return;

  let seatNumbers = JSON.parse(localStorage.getItem("seatNumbers")) || { "6": 101, "7": 0, "8": 0 };

  if (seatNumbers["7"] === 0) seatNumbers["7"] = seatNumbers["6"] + 1;
  if (seatNumbers["8"] === 0) seatNumbers["8"] = seatNumbers["7"] + 1;

  document.getElementById("rollNumber").value = seatNumbers[selectedClass];

  seatNumbers[selectedClass]++;
  localStorage.setItem("seatNumbers", JSON.stringify(seatNumbers));
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const name = document.getElementById("name").value;
  const fatherName = document.getElementById("fatherName").value;
  const classSelection = document.getElementById("classSelection").value;
  const rollNumber = document.getElementById("rollNumber").value;
  const profilePicture = document.getElementById("profilePicture").files[0];

  if (!name || !fatherName || !classSelection || !rollNumber || !profilePicture) {
    alert("Please fill all fields and upload a profile picture.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const profilePicURL = event.target.result;
    const pdf = new jsPDF();

    // ✅ Colored Header
    pdf.setFillColor(0, 102, 204); // Dark Blue
    pdf.rect(0, 0, 210, 25, "F"); // Header background
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.text("ROLL NUMBER SLIP", 105, 15, { align: "center" });

    // ✅ Border for Student Details
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, 30, 190, 50); // Black border

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(`Name: ${name}`, 20, 40);
    pdf.text(`Father Name: ${fatherName}`, 20, 50);
    pdf.text(`Class: ${classSelection}`, 20, 60);
    pdf.text(`Roll Number: ${rollNumber}`, 20, 70);
    pdf.addImage(profilePicURL, "JPEG", 150, 35, 40, 40); // Profile Picture

    // ✅ Table with Colored Header
    pdf.autoTable({
      startY: 85,
      head: [['Date', 'Day', 'Subject', 'Morning Timing', 'Afternoon Timing']],
      body: [
        ['16-12-2024', 'Monday', 'English', '09:00 AM - 11:30 AM', ''],
        ['17-12-2024', 'Tuesday', 'Science', '09:00 AM - 11:30 AM', '12:00 PM - 02:00 PM'],
        ['18-12-2024', 'Wednesday', 'Sindhi', '09:00 AM - 11:30 AM', ''],
        ['19-12-2024', 'Thursday', 'Social Studies', '09:00 AM - 11:30 AM', '12:00 PM - 02:00 PM'],
        ['20-12-2024', 'Friday', 'Islamiyat', '09:00 AM - 11:30 AM', ''],
        ['21-12-2024', 'Saturday', 'Mathematics', '09:00 AM - 11:30 AM', ''],
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [0, 102, 204], // Blue header
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 11,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [230, 230, 230], // Light gray rows
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 30 },
        2: { cellWidth: 35 },
        3: { cellWidth: 45 },
        4: { cellWidth: 45 }
      }
    });

    // ✅ Signature Section with Border
    let ySignature = pdf.autoTable.previous.finalY + 15;
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, ySignature, 190, 25); // Border

    pdf.text("Candidate Signature:", 20, ySignature + 10);
    pdf.line(50, ySignature + 12, 110, ySignature + 12); // Line

    pdf.text("Center Incharge Signature:", 120, ySignature + 10);
    pdf.line(160, ySignature + 12, 190, ySignature + 12); // Line

    // ✅ Instructions with Gray Background
    let instructionsY = ySignature + 35;
    pdf.setFillColor(240, 240, 240); // Light gray
    pdf.rect(10, instructionsY, 190, 40, "F");

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.text("INSTRUCTIONS:", 15, instructionsY + 6);
    pdf.text("1. Bring this slip to the exam hall.", 15, instructionsY + 14);
    pdf.text("2. Do not bring unauthorized materials.", 15, instructionsY + 22);
    pdf.text("3. Bring all necessary writing materials.", 15, instructionsY + 30);
    pdf.text("4. No communication allowed during the exam.", 15, instructionsY + 38);

    pdf.save(`${name}_RollNumberSlip.pdf`);
  };
  reader.readAsDataURL(profilePicture);
}
