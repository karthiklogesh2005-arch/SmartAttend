document.addEventListener("DOMContentLoaded", () => {
  const attendanceInput = document.getElementById("Attendance");
  const totalInput = document.getElementById("Total");
  const resultBox = document.getElementById("resultBox");

  attendanceInput.focus();

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    if (resultBox.classList.contains("show")) {
      goBack();
      return;
    }

    if (document.activeElement === attendanceInput) {
      totalInput.focus();
    } else if (document.activeElement === totalInput) {
      showResult();
    } else {
      attendanceInput.focus();
    }
  });
});

function showResult() {
  const formBox = document.getElementById("formBox");
  const resultBox = document.getElementById("resultBox");

  const attendance = parseInt(document.getElementById("Attendance").value.trim(), 10);
  const total = parseInt(document.getElementById("Total").value.trim(), 10);

  if (isNaN(attendance) || isNaN(total) || total <= 0 || attendance < 0) {
    alert("Please enter valid positive numbers (Total > 0).");
    return;
  }
  if (attendance > total) {
    alert("Current attendance cannot be greater than total classes!");
    return;
  }

  const currentPercentage = Math.round((attendance / total) * 100);
  const textPercentage = currentPercentage + "%";

  if (currentPercentage >= 75) {
    const maxBunks = Math.floor(attendance / 0.75 - total);
    document.getElementById("resultValue").textContent = String(maxBunks);
    document.getElementById("Command").innerHTML =
      `Your current attendance percentage is <strong>${textPercentage}</strong>, you can bunk <strong>${maxBunks}</strong> more classes.`;
  } else {
    let x = 0;
    while ((attendance + x) / (total + x) < 0.75) x++;
    document.getElementById("resultValue").textContent = String(x);
    document.getElementById("Command").innerHTML =
      `Your current attendance percentage is <strong>${textPercentage}</strong>, you need to attend <strong>${x}</strong> more classes.`;
  }

  formBox.classList.add("animate-out");
  setTimeout(() => {
    resultBox.classList.add("show");
    formBox.style.display = "none";
  }, 800);
}

function goBack() {
  const formBox = document.getElementById("formBox");
  const resultBox = document.getElementById("resultBox");

  resultBox.classList.remove("show");
  formBox.style.display = "block";
  void formBox.offsetWidth;
  formBox.classList.remove("animate-out");
  document.getElementById("Attendance").focus();
}
