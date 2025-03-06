document.addEventListener("DOMContentLoaded", function () {
    let dateElement = document.getElementById("current-date");
    setRandomDua();

    // Get today's date
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = today.toLocaleDateString("en-US", options); // Change "en-US" to your preferred locale

    // Display the date
    dateElement.textContent = `${formattedDate}`;

    let checkboxes = document.querySelectorAll(".task");
    let progressText = document.getElementById("progress");
    let progressBar = document.getElementById("progress-bar");
    let resetButton = document.getElementById("reset");
  
    let sadaqahGoal = document.getElementById("sadaqah-goal");
    let sadaqahGiven = document.getElementById("sadaqah-given");
    let sadaqahRemaining = document.getElementById("sadaqah-remaining");
  
    // Load stored checklist state
    checkboxes.forEach((checkbox) => {
      let checked = localStorage.getItem(checkbox.dataset.id);
      if (checked === "true") {
        checkbox.checked = true;
      }
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
  
  // Update progress function
  function updateProgress() {
    let completed = document.querySelectorAll(".task:checked").length;
    let total = checkboxes.length;
    let percentage = Math.round((completed / total) * 100);
    progressText.innerText = percentage + "%";
    progressBar.style.width = percentage + "%";
  }

  // Save checklist state and update progress on change
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      localStorage.setItem(this.dataset.id, this.checked);
      updateProgress();
      checkCompletion(); // Ensure confetti triggers correctly
    });
  });
  
  // Handle Sadaqah Tracker
  sadaqahGoal.addEventListener("input", function () {
    localStorage.setItem("sadaqahGoal", sadaqahGoal.value);
  });

  sadaqahGiven.addEventListener("input", function () {
    let remaining = sadaqahGoal.value - sadaqahGiven.value;
    sadaqahRemaining.innerText = remaining >= 0 ? remaining : 0;
    localStorage.setItem("sadaqahGiven", sadaqahGiven.value);
    checkCompletion(); // Check if Sadaqah is completed
  });
  
  // Load Sadaqah data
  sadaqahGoal.value = localStorage.getItem("sadaqahGoal") || "";
  sadaqahGiven.value = localStorage.getItem("sadaqahGiven") || "";
  sadaqahRemaining.innerText = Math.max(0, sadaqahGoal.value - sadaqahGiven.value) || 0;

  // Reset checklist
  resetButton.addEventListener("click", function () {
    checkboxes.forEach(cb => localStorage.removeItem(cb.dataset.id));
    localStorage.removeItem("sadaqahGoal");
    localStorage.removeItem("sadaqahGiven");
    checkboxes.forEach(cb => cb.checked = false);
    updateProgress();
    sadaqahGoal.value = "";
    sadaqahGiven.value = "";
    sadaqahRemaining.innerText = "0";
  });
  
  updateProgress(); // Ensure progress is displayed correctly on page load
  
  // Confetti effect
  function launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  
  // Check completion of all tasks and sadaqah goal
  function checkCompletion() {
    let completed = document.querySelectorAll(".task:checked").length;
    let total = checkboxes.length;

    if (completed === total) {
      launchConfetti(); // Fire confetti when all tasks are done
    }

    let sadaqahTarget = parseFloat(sadaqahGoal.value) || 0;
    let sadaqahGivenAmount = parseFloat(sadaqahGiven.value) || 0;
    let sadaqahRemainingAmount = sadaqahTarget - sadaqahGivenAmount;

    if (sadaqahRemainingAmount === 0 && sadaqahTarget > 0) {
      launchConfetti(); // Fire confetti when sadaqah goal is met
    }
  };
});

// Dua list
const duas = [
  "اللهم إني أسألك الجنة وأعوذ بك من النار (O Allah, I ask You for Paradise and seek refuge from Hellfire).",
  "اللهم إنك عفو تحب العفو فاعف عني (O Allah, You are Most Forgiving, and You love forgiveness; so forgive me).",
  "اللهم بارك لنا في رمضان وتقبل منا الصيام والقيام (O Allah, bless us in Ramadan and accept our fasting and prayers)."
  ];

  function setRandomDua() {
    document.getElementById("random-dua").textContent = duas[Math.floor(Math.random() * duas.length)];
  }

  