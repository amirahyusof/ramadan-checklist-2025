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
