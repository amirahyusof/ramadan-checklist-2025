document.addEventListener("DOMContentLoaded", function () {
  let checkboxes = document.querySelectorAll(".task");
  let progressText = document.getElementById("progress");
  let progressBar = document.getElementById("progress-bar");
  let resetButton = document.getElementById("reset");
  
  let sadaqahGoal = document.getElementById("sadaqah-goal");
  let sadaqahGiven = document.getElementById("sadaqah-given");
  let sadaqahRemaining = document.getElementById("sadaqah-remaining");

  // Load stored checklist
  checkboxes.forEach((checkbox) => {
      let checked = localStorage.getItem(checkbox.dataset.id);
      if (checked === "true") checkbox.checked = true;
  });

  // Update progress
  function updateProgress() {
      let completed = document.querySelectorAll(".task:checked").length;
      let total = checkboxes.length;
      let percentage = Math.round((completed / total) * 100);
      progressText.innerText = percentage + "%";
      progressBar.style.width = percentage + "%";
  }

  // Save checklist state
  checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
          localStorage.setItem(this.dataset.id, this.checked);
          updateProgress();
      });
  });

  //handle Download PDF
    document.getElementById("download-pdf").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add Title
        doc.setFont("montserrat", "bold");
        doc.setTextColor(40, 40, 120);
        doc.setFontSize(18);
        doc.text("Ramadan Daily Checklist", 10, 20);

        // Get current date from page
        let dateText = document.querySelector(".text-center p:last-child").innerText;
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);
        doc.text(dateText, 10, 30);


        // Add Checklist Items
        let tasks = document.querySelectorAll(".task");
        let yPosition = 45;
        tasks.forEach(task => {
            let isChecked = task.checked ? "[Done] " : "[X] ";
            let taskText = task.parentElement.innerText.trim();

            if(task.checked){
                doc.setTextColor(34, 139, 34);
            }else {
                doc.setTextColor(200, 50, 50);
            }
            

            doc.setFont("montserrat", "normal");
            doc.text(isChecked + taskText, 10, yPosition);
            yPosition += 10;
        });

        // Sadaqah tracking
        let sadaqahGoal = document.getElementById("sadaqah-goal").value || "0";
        let sadaqahGiven = document.getElementById("sadaqah-given").value || "0";
        let sadaqahRemaining = sadaqahGoal - sadaqahGiven;

        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Sadaqah Tracker", 10, yPosition + 10);

        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);
        doc.text(`Goal: RM${sadaqahGoal} | Given: RM${sadaqahGiven} | Remaining: RM${sadaqahRemaining}`, 10, yPosition + 20);

        // Save as PDF
        doc.save("Ramadan_Checklist.pdf");
    });


  // Handle Sadaqah Tracker
  sadaqahGoal.addEventListener("input", () => localStorage.setItem("sadaqahGoal", sadaqahGoal.value));
  sadaqahGiven.addEventListener("input", () => {
      let remaining = sadaqahGoal.value - sadaqahGiven.value;
      sadaqahRemaining.innerText = remaining >= 0 ? remaining : 0;
      localStorage.setItem("sadaqahGiven", sadaqahGiven.value);
  });

  // Load Sadaqah data
  sadaqahGoal.value = localStorage.getItem("sadaqahGoal") || "";
  sadaqahGiven.value = localStorage.getItem("sadaqahGiven") || "";
  sadaqahRemaining.innerText = sadaqahGoal.value - sadaqahGiven.value || 0;

  updateProgress();

  // Reset checklist
  resetButton.addEventListener("click", () => {
      localStorage.clear();
      checkboxes.forEach(cb => cb.checked = false);
      updateProgress();
      sadaqahGoal.value = "";
      sadaqahGiven.value = "";
      sadaqahRemaining.innerText = "0";
  });
});

//add confetti 
function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

function checkCompletion() {
    let tasks = document.querySelectorAll(".task");
    let completed = document.querySelectorAll(".task:checked").length;
    let total = tasks.length;

    if (completed === total) {
        launchConfetti();
    }

    // Check Sadaqah completion
    let sadaqahGoal = document.getElementById("sadaqah-goal").value || 0;
    let sadaqahGiven = document.getElementById("sadaqah-given").value || 0;
    let sadaqahRemaining = sadaqahGoal - sadaqahGiven;

    if (sadaqahRemaining == 0 && sadaqahGoal > 0) {
        launchConfetti();
    }
}

// Attach event listeners to checklist and Sadaqah inputs
document.querySelectorAll(".task").forEach(task => {
    task.addEventListener("change", checkCompletion);
});

document.getElementById("sadaqah-given").addEventListener("input", checkCompletion);
