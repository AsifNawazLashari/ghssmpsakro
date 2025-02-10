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

    pdf.setFontSize(14);
    pdf.text("ROLL NUMBER SLIP", 105, 20, { align: "center" });

    pdf.text(`Name: ${name}`, 20, 40);
    pdf.text(`Father Name: ${fatherName}`, 20, 50);
    pdf.text(`Class: ${classSelection}`, 20, 60);
    pdf.text(`Roll Number: ${rollNumber}`, 20, 70);
    pdf.addImage(profilePicURL, "JPEG", 150, 30, 40, 40);

    pdf.text("EXAM SCHEDULE", 105, 90, { align: "center" });
    pdf.text("16-12-2024 | English | 09:00 AM - 11:30 AM", 20, 100);
    pdf.text("17-12-2024 | Science | 09:00 AM - 11:30 AM", 20, 110);
    pdf.text("18-12-2024 | Sindhi | 09:00 AM - 11:30 AM", 20, 120);
    pdf.text("19-12-2024 | Social Studies | 09:00 AM - 11:30 AM", 20, 130);
    
    pdf.text("INSTRUCTIONS", 105, 150, { align: "center" });
    pdf.text("1. Bring this slip to the exam hall.", 20, 160);
    pdf.text("2. Do not bring unauthorized materials.", 20, 170);
    pdf.text("3. Bring all necessary writing materials.", 20, 180);
    pdf.text("4. No communication allowed during the exam.", 20, 190);

    pdf.save(`${name}_RollNumberSlip.pdf`);
  };
  reader.readAsDataURL(profilePicture);
             }
