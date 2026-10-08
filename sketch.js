// 選擇題題庫資料陣列
let questions = [
  {
    question: "1. 在 p5.js 中，用來設定畫布大小的指令是什麼？",
    options: ["A. setup()", "B. createCanvas()", "C. background()", "D. resizeCanvas()"],
    answer: 1 // 正確答案：B
  },
  {
    question: "2. 下列哪一個函式會在 p5.js 中不斷重複執行？",
    options: ["A. setup()", "B. preload()", "C. draw()", "D. mouseClicked()"],
    answer: 2 // 正確答案：C
  },
  {
    question: "3. 若要設定圖形內部的填滿顏色，應該使用哪一個指令？",
    options: ["A. fill()", "B. stroke()", "C. color()", "D. background()"],
    answer: 0 // 正確答案：A
  },
  {
    question: "4. 下列哪一個指令可以在畫布上繪製一個圓形？",
    options: ["A. rect()", "B. line()", "C. circle()", "D. triangle()"],
    answer: 2 // 正確答案：C
  },
  {
    question: "5. 若要設定畫布背景顏色，應該使用哪一個指令？",
    options: ["A. clear()", "B. fill()", "C. stroke()", "D. background()"],
    answer: 3 // 正確答案：D
  }
];

// 控制變數設定
let currentQuestion = 0; // 當前題號
let score = 0; // 得分統計
let gameState = "QUIZ"; // 遊戲狀態：QUIZ (測驗中), END (結束)
let selectedOption = -1; // 已點選的選項
let hasAnswered = false; // 是否已作答
let animTime = 0; // 動畫計時器

// p5.js 初始化設定
function setup() {
  // 建立全螢幕畫布，自動適應視窗寬高
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER); // 設定文字水平垂直置中
}

// 響應式核心：當瀏覽器視窗大小改變（或手機旋轉）時自動執行
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 即時重繪畫布大小
}

// 主繪圖迴圈
function draw() {
  background(245, 247, 250); // 清除畫面並套用背景色
  animTime += 0.1; // 更新動畫時間

  if (gameState === "QUIZ") {
    drawQuizScreen(); // 繪製測驗畫面
  } else if (gameState === "END") {
    drawEndScreen(); // 繪製結算畫面
  }
}

// 繪製測驗畫面（響應式版面）
function drawQuizScreen() {
  let q = questions[currentQuestion];

  // 動態計算響應式字體大小與邊距（根據螢幕寬度與高度調整）
  let titleSize = constrain(width * 0.025, 14, 20); // 題號進度字型大小
  let questionSize = constrain(width * 0.035, 16, 26); // 題目內文字型大小
  let optionSize = constrain(width * 0.028, 14, 20); // 選項字型大小

  // 1. 顯示進度標題
  fill(120);
  textSize(titleSize);
  text(`題目 ${currentQuestion + 1} / ${questions.length}`, width / 2, height * 0.08);

  // 2. 顯示題目（支援自動換行與寬度限制）
  fill(30);
  textSize(questionSize);
  rectMode(CENTER);
  // 題目範圍設定為螢幕寬度的 85%，防止橫向超頁
  text(q.question, width / 2, height * 0.18, width * 0.85, height * 0.15);

  // 3. 計算響應式選項按鈕位置與尺寸
  let btnWidth = min(width * 0.88, 600); // 手機佔 88% 寬度，電腦版最大不超過 600px
  let btnHeight = constrain(height * 0.08, 40, 60); // 按鈕高度隨高度彈性調整
  let startY = height * 0.32; // 起始 Y 座標
  let spacing = constrain(height * 0.02, 10, 20); // 間距彈性調整

  for (let i = 0; i < q.options.length; i++) {
    let x = width / 2;
    let y = startY + i * (btnHeight + spacing);
    let bgColor = color(255);

    // 答題後的動態顏色與動畫處理
    if (hasAnswered) {
      if (selectedOption === q.answer) {
        if (i === q.answer) bgColor = color('#d4edda'); // 答對背景 (淡綠)
      } else {
        if (i === selectedOption) {
          bgColor = color('#cbeef3'); // 答錯點選背景 (#cbeef3)
          x += sin(animTime * 10) * 8; // 左右搖晃
        } else if (i === q.answer) {
          bgColor = color('#f49cbb'); // 正確答案背景 (#f49cbb)
          y += sin(animTime * 10) * 6; // 上下跳動
        }
      }
    } else {
      // 懸停效果 (Hover)
      if (isMouseOver(x, y, btnWidth, btnHeight)) {
        bgColor = color(230, 240, 255);
      }
    }

    // 繪製選項按鈕矩形
    push();
    translate(x, y);
    rectMode(CENTER);
    stroke(210);
    strokeWeight(1.5);
    fill(bgColor);
    rect(0, 0, btnWidth, btnHeight, 10);

    // 繪製選項文字
    noStroke();
    fill(40);
    textSize(optionSize);
    text(q.options[i], 0, 0);
    pop();
  }

  // 4. 繪製下一題按鈕
  if (hasAnswered) {
    drawNextButton();
  }
}

// 繪製「下一題」按鈕
function drawNextButton() {
  let btnX = width / 2;
  let btnY = height * 0.88; // 靠底部顯示
  let btnWidth = min(width * 0.5, 180); // 響應式寬度
  let btnHeight = constrain(height * 0.07, 40, 50);

  push();
  rectMode(CENTER);
  if (isMouseOver(btnX, btnY, btnWidth, btnHeight)) {
    fill(52, 120, 246);
  } else {
    fill(66, 133, 244);
  }
  noStroke();
  rect(btnX, btnY, btnWidth, btnHeight, 8);

  fill(255);
  textSize(constrain(width * 0.03, 14, 20));
  let btnText = (currentQuestion < questions.length - 1) ? "下一題" : "看結果";
  text(btnText, btnX, btnY);
  pop();
}

// 繪製結算畫面
function drawEndScreen() {
  let titleSize = constrain(width * 0.05, 22, 36);
  let scoreSize = constrain(width * 0.038, 16, 26);

  fill(40);
  textSize(titleSize);
  text("測驗完成！", width / 2, height * 0.3);

  textSize(scoreSize);
  text(`您的總得分：答對 ${score} / ${questions.length} 題`, width / 2, height * 0.45);

  // 再試一次按鈕
  let btnX = width / 2;
  let btnY = height * 0.62;
  let btnW = min(width * 0.5, 200);
  let btnH = constrain(height * 0.08, 45, 55);

  push();
  rectMode(CENTER);
  if (isMouseOver(btnX, btnY, btnW, btnH)) {
    fill(40, 167, 69);
  } else {
    fill(76, 175, 80);
  }
  noStroke();
  rect(btnX, btnY, btnW, btnH, 8);

  fill(255);
  textSize(constrain(width * 0.03, 14, 20));
  text("再試一次", btnX, btnY);
  pop();
}

// 點擊事件監聽
function mousePressed() {
  if (gameState === "QUIZ") {
    let q = questions[currentQuestion];
    let btnWidth = min(width * 0.88, 600);
    let btnHeight = constrain(height * 0.08, 40, 60);
    let startY = height * 0.32;
    let spacing = constrain(height * 0.02, 10, 20);

    if (!hasAnswered) {
      // 點擊選項邏輯
      for (let i = 0; i < q.options.length; i++) {
        let y = startY + i * (btnHeight + spacing);
        if (isMouseOver(width / 2, y, btnWidth, btnHeight)) {
          selectedOption = i;
          hasAnswered = true;
          if (selectedOption === q.answer) {
            score++;
          }
          break;
        }
      }
    } else {
      // 點擊下一題邏輯
      let btnX = width / 2;
      let btnY = height * 0.88;
      let btnWidth = min(width * 0.5, 180);
      let btnHeight = constrain(height * 0.07, 40, 50);

      if (isMouseOver(btnX, btnY, btnWidth, btnHeight)) {
        currentQuestion++;
        hasAnswered = false;
        selectedOption = -1;

        if (currentQuestion >= questions.length) {
          gameState = "END";
        }
      }
    }
  } else if (gameState === "END") {
    // 點擊再試一次
    let btnX = width / 2;
    let btnY = height * 0.62;
    let btnW = min(width * 0.5, 200);
    let btnH = constrain(height * 0.08, 45, 55);

    if (isMouseOver(btnX, btnY, btnW, btnH)) {
      resetQuiz();
    }
  }
}

// 輔助函式：判斷觸控/滑鼠是否落在按鈕區域內
function isMouseOver(cx, cy, w, h) {
  return mouseX > cx - w / 2 && mouseX < cx + w / 2 && mouseY > cy - h / 2 && mouseY < cy + h / 2;
}

// 重置遊戲資料
function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  gameState = "QUIZ";
  selectedOption = -1;
  hasAnswered = false;
}
