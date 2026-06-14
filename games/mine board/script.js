let GRID_SIZE = 10;
let gameover = false;
let firstClick = true;
let timer;
let timePassed = 0;

$(`#mine-board`).css({
  'grid-template-columns': 'repeat(' + GRID_SIZE + ',1fr)',
  'grid-template-rows': 'repeat(' + GRID_SIZE + ',1fr)'
});

let bombsCount = GRID_SIZE * 2;
$(`#mines`).html(bombsCount);
const bombs = new Set();

// تولید اعداد تصادفی برای بمب‌ها
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

while (bombs.size != bombsCount) {
  bombs.add(rand(1, GRID_SIZE * GRID_SIZE));
}

// ساخت برد بازی
for (let i = 1; i <= GRID_SIZE * GRID_SIZE; i++) {
  $(`#mine-board`).append(`<div class="cell" data-id="${i}"></div>`);
}

function triggerStartTimer() {
  if (firstClick) {
    startTimer();
    firstClick = false;
  }
}

// کلیک راست برای پرچم
$(`body`).on(`contextmenu`, `.cell`, function (e) {
  e.preventDefault();
  if (gameover || $(this).hasClass(`revealed`)) return;

  triggerStartTimer();

  if ($(this).text() == `🚩`) {
    $(this).html(``);
    $(`#mines`).html(parseInt($(`#mines`).text()) + 1);
  } else {
    $(this).html(`🚩`);
    $(`#mines`).html(parseInt($(`#mines`).text()) - 1);
  }
});

// کلیک چپ برای باز کردن
$(`body`).on(`click`, `.cell`, function () {
  if (gameover || $(this).text() == `🚩` || $(this).hasClass(`revealed`)) return;

  triggerStartTimer();

  let cellID = parseInt($(this).attr(`data-id`));

  if (bombs.has(cellID)) {
    gameOver();
  } else {
    nullCell(cellID);
    checkWin();
  }
});

function nullCell(cellID) {
  let cell = $(`.cell[data-id=${cellID}]`);
  if (cell.hasClass(`revealed`)) return;

  cell.addClass(`revealed`);

  let neighbors = getNeighbors(cellID);
  let neighborsBombs = 0;

  neighbors.forEach(function (value) {
    if (bombs.has(value)) neighborsBombs++;
  });

  if (neighborsBombs == 0) {
    cell.html(``);
    neighbors.forEach(function (value) {
      nullCell(value);
    });
  } else {
    cell.html(neighborsBombs);
    cell.attr('data-val', neighborsBombs); // این برای رنگ‌بندی اعداد در CSS است
  }
}

function checkWin() {
  let revealedCount = $(`.cell.revealed`).length;
  if (revealedCount === (GRID_SIZE * GRID_SIZE - bombsCount)) {
    youWon();
  }
}

function startTimer() {
  timer = setInterval(function () {
    timePassed++;
    $(`#timer`).html(secondsToMMSS(timePassed));
  }, 1000);
}

function gameOver() {
  if (gameover) return;
  clearInterval(timer);
  gameover = true;

  $(`#mine-board`).addClass(`explosion`);

  bombs.forEach(function (value) {
    $(`.cell[data-id=${value}]`).html(`💣`).css({
      'background-color': '#c0c0c0',
      'border': '1px solid #808080'
    });
  });

  setTimeout(function () {
    alert(`بوم! باختی!`);
    location.reload();
  }, 1000);
}

function youWon() {
  clearInterval(timer);
  gameover = true;
  alert(`تبریک! برنده شدی!`);
  location.reload();
}

function getNeighbors(id) {
  const row = Math.floor((id - 1) / GRID_SIZE);
  const col = (id - 1) % GRID_SIZE;
  const neighbors = [];
  const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

  directions.forEach(([dr, dc]) => {
    const newRow = row + dr;
    const newCol = col + dc;
    if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
      neighbors.push(newRow * GRID_SIZE + newCol + 1);
    }
  });
  return neighbors;
}

function secondsToMMSS(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
