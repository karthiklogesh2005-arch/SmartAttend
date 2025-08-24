function showResult() {
  const formBox = document.getElementById("formBox");
  const resultBox = document.getElementById("resultBox");
  const attendanceInput = document.getElementById("Attendance");
  const totalInput = document.getElementById("Total");

  const attendance = parseInt(attendanceInput.value);
  const total = parseInt(totalInput.value);

  if (isNaN(attendance) || isNaN(total) || total === 0) {
    alert("Please enter valid inputs!");
    return;
  }

  const currentPercentage = Math.round((attendance / total) * 100);
  const textPercentage = currentPercentage + '%';

  if (currentPercentage > 75) {
    const maxBunks = Math.floor((attendance / 0.75) - total);
    document.getElementById("resultValue").innerText = maxBunks;
    document.getElementById("Command").innerHTML =
      `You're current attendance percentage is <strong>${textPercentage}</strong>, you can bunk <strong>${maxBunks}</strong> more classes.`;
  }
  else if (currentPercentage===75){
    document.getElementById("resultValue").innerText = "None";
    document.getElementById("Command").innerHTML =
      `You're current attendance percentage is <strong>${textPercentage}</strong>, you can't bunk <strong>any</strong> more classes.`;
  }
  
  else {
    let x = 0;
    while ((attendance + x) / (total + x) < 0.75) {
      x++;
    }
    document.getElementById("resultValue").innerText = x;
    document.getElementById("Command").innerHTML =
      `You're current attendance percentage is <strong>${textPercentage}</strong>, you need to attend <strong>${x}</strong> more classes.`;
  }

  // Trigger transitions
  formBox.classList.add("animate-out");
  formBox.classList.remove("animate-in");
  resultBox.classList.add("show");
}

function goBack() {
  const formBox = document.getElementById("formBox");
  const resultBox = document.getElementById("resultBox");

  // Clear inputs
  document.getElementById("Attendance").value = '';
  document.getElementById("Total").value = '';

  // Reverse transition
  resultBox.classList.remove("show");
  formBox.classList.remove("animate-out");
  formBox.classList.add("animate-in");
}
