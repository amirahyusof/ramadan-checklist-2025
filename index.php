<?php
  $date = date("l, F j, Y");
 
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, inital-scale=1.0">
    <title>Ramadan Daily Checklist</title>
    <script src="http://cdn.tailwindcss.com"></script>
    <link>
  </head>
  <body class="bg-[#A9B5DF] text-[#FFF2F2]">
    <div class="max-w-lg mx-auto mt-10 bg-[#7886C7] shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-center mb-2">🌙 Ramadan Daily Checklist</h1>
      <div class="text-center rounded mb-4">
          <p class="text-lg font-semibold">📅 Today’s Date: </p>
          <p class="text-gray-700"> <?php echo $date; ?> </p>
      </div>

      <ul id="checklist" class="mt-6 space-y-3">
        <li>
          <input type="checkbox" class="task" data-id="suhoor"> Sahur Completed
        </li>
        <li>
          <input type="checkbox" class="task" data-id="fast"> Fasting Observed
        </li>
        <li>
          <input type="checkbox" class="task" data-id="prayer"> Daily Prayers Completed
        </li>
        <li>
          <input type="checkbox" class="task" data-id="quran"> Recited Al-Quran
        </li>
        <li>
          <input type="checkbox" class="task" data-id="taraweeh"> Performed Taraweeh
        </li>
        <li>
          <input type="checkbox" class="task" data-id="dua"> Made Dua
        </li>
        <li>
          <input type="checkbox" class="task" data-id="sadaqah"> Gave Sadaqah
        </li>
        <li>
          <input type="checkbox" class="task" data-id="habits"> Avoided Bad Habit
        </li>
        <li>
          <input type="checkbox" class="task" data-id="iftar"> Iftar Completed
        </li>
        <li>
          <input type="checkbox" class="task" data-id="reflection"> Reflected on the Day
        </li>
      </ul>

      <p class="mt-4 text-center font-semibold">Progress: <span id="progress">0%</span></p>
      <div class="w-full bg-[#2D336B] rounded-full h-2.5 mt-2">
        <div id="progress-bar" class="bg-green-500 h-2.5 rounded-full w-0"></div>
      </div>

      <div class="mt-6">
        <label class="block font-semibold">💰 Sadaqah Goal:</label>
        <input type="number" id="sadaqah-goal" class="w-full border p-2 mt-1 text-[#2D336B]" placeholder="Enter goal in RM">
        <label class="block mt-3">Sadaqah Given:</label>
        <input type="number" id="sadaqah-given" class="w-full border p-2 mt-1 text-[#2D336B]" placeholder="Amount given today">
        <p>Remaining: <span id="sadaqah-remaining">0</span></p>
      </div>

      <button id="reset"  class="mt-4 bg-red-500 text-white py-2 px-4 w-full rounded">Reset Checklist</button>
      
      <div class="mt-6 p-4 bg-[#7886C7] rounded text-center" >
        <h2 class="texy-lg font-semibold">📖 Ramadan Dua of the Day</h2>
        <p class="mt-2 italic"><?= include('data/duas.php'); echo getRandomDua() ?></p>
      </div>
    </div>

    <script src="assets/script.js"></script>
  </body>
</html>