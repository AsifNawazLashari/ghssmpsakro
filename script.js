// Store the generated students' data temporarily in memory
let generatedStudents = [];

// Function to generate the PDF and store the student's data
async function generatePDF() {
    const { jsPDF } = window.jspdf;

    const name = document.getElementById("name").value.toUpperCase();
    const fatherName = document.getElementById("fatherName").value.toUpperCase();
    const rollNumber = document.getElementById("rollNumber").value;
    const studentClass = document.getElementById("classSelect").value;
    const profilePicture = document.getElementById("profilePicture").files[0];
    const hiddenLogo = document.getElementById("hiddenLogo");

    // Validation: Ensure all fields are filled
    if (!name || !fatherName || !rollNumber || !profilePicture) {
        alert("Please fill out all fields and upload a profile picture.");
        return;
    }

    // Use FileReader to convert profile picture to base64
    const profileReader = new FileReader();
    profileReader.onload = function (profileEvent) {
        const profilePicURL = profileEvent.target.result;
        const logoURL = hiddenLogo.src;

        // Create a new PDF document
        const pdf = new jsPDF("p", "mm", "a4");

        // Add black border
        pdf.setDrawColor(0, 0, 0); // Black color for the border
        pdf.setLineWidth(0.5);
        pdf.rect(5, 5, 200, 287); // Position and size of the border

        // Add logo and text heading
        pdf.addImage(logoURL, "JPEG", 10, 10, 20, 20);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text("GOVERNMENT HIGHER SECONDARY SCHOOL MIRPUR SAKRO", 105, 15, { align: "center" });
        pdf.text("ANNUAL EXAMINATION 2024-2025", 105, 22, { align: "center" });

        // Draw a line under the header
        pdf.line(50, 38, 160, 38);

        // Set text color to black for the title
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);  // Font size for title
        pdf.text("ROLL NUMBER SLIP", 105, 35, { align: "center" });

        let y = 50;  // Vertical position for next content

        // Student Details: Name, Father Name, Roll Number, Class
        pdf.setFontSize(10);
        pdf.setTextColor(139, 69, 19); // Brown for labels
        pdf.text(`NAME: ${name}`, 15, y);
        pdf.addImage(profilePicURL, "JPEG", 170, y - 10, 25, 33); // Add profile image
        y += 10;
        pdf.text(`FATHER NAME: ${fatherName}`, 15, y);
        y += 6;
        pdf.text(`ROLL NUMBER: ${rollNumber}`, 15, y);
        y += 6;
        pdf.text(`CLASS: ${studentClass}`, 15, y); // Added class info
        y += 6;
        pdf.text(`INSTITUTION: GOVERNMENT HIGHER SECONDARY SCHOOL`, 15, y);
        y += 6;
        pdf.text(`CENTER: GOVERNMENT HIGHER SECONDARY SCHOOL`, 15, y);
        y += 10;

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

        // Save the generated PDF
        pdf.save(`${name}_RollNumberSlip.pdf`);

        // Store the student data in memory for display later
        generatedStudents.push({ name, fatherName });
        displayGeneratedStudents(); // Update the table with newly added student
    };

    profileReader.readAsDataURL(profilePicture);
}

// Function to display generated students in the table
function displayGeneratedStudents() {
    const dataBody = document.getElementById("dataBody");
    dataBody.innerHTML = "";  // Clear any existing rows in the table

    // Loop through the generated students and create a row for each
    generatedStudents.forEach(student => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        const fatherNameCell = document.createElement("td");

        nameCell.textContent = student.name;
        fatherNameCell.textContent = student.fatherName;

        // Append the cells to the row
        row.appendChild(nameCell);
        row.appendChild(fatherNameCell);

        // Append the row to the table body
        dataBody.appendChild(row);
    });
}

// Initialize the display for existing students
displayGeneratedStudents();
