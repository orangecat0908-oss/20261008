---
title: 選擇題測驗卷網站講義（學生版）.md

---

---
title: 選擇題測驗卷網站講義（學生版）

---

---
title: 選擇題測驗卷網站講義（學生版）
tags: [114程式設計與實習_上學期]

---

# 選擇題測驗卷網站講義（學生版）

學號：＿＿＿＿＿＿＿＿　　姓名：＿＿＿＿＿＿＿＿

> **填寫方式**
> 1. 每個學習都要放：**執行截圖**、**三次問 AI 的提示詞**、**最後採用的程式碼**。
> 2. 問 AI 的提示詞請**逐字貼上**自己實際輸入的內容（不要寫摘要），第一次、第二次、第三次依序記錄。
> 3. 程式碼貼在「點開貼上」的收合區塊裡，貼上**你最後真正採用、而且能執行**的版本。

---

## 學習1：產生一個選擇題測驗卷網站

https://cfchen58.synology.me/115/week4/stage1/

**這個階段的目標：** 用 p5.js 做出一個一次顯示一題、四個選項、答完會顯示對錯與總分的測驗網站（題目先寫在程式裡）。
**這個階段會修改的檔案：** index.html、sketch.js

### 執行截圖
![螢幕擷取畫面 2026-10-08 144532](https://hackmd.io/_uploads/HJgQLnnNsMe.png)

（把截圖拖曳到這裡，或貼上圖片連結）

![學習1截圖](請貼上截圖)

### 第一次問 AI

```tex!
使用p5.js撰寫一個選擇題網頁測驗系統，我已經產生一個p5.js專案，請把程式碼寫道sketch.js檔案內，每條指令都需要加上中文註解。測驗系統題目設定為五題，測驗題目內容為程式設計p5.js簡易指令練習測驗，系統採用全螢幕畫布，使用者答錯時，系統會正確答案選項上，加上cbeef3背景顏色，該選項要上下跳動，答錯的選項採用dd2d4a背景顏色，選項左右移動。選擇題總共有四個選項，當五題結束後，需要顯示答對的題數，每次顯示一個題目，需要有下一個題目的按鈕
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
  
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習1的程式碼
```javascript=
//學習1程式碼所在
// 定義測驗題目資料庫（共五題）
let questions = [
  {
    question: "1. 在 p5.js 中，哪一個函式只會在程式開始時執行一次？",
    options: ["draw()", "setup()", "mousePressed()", "createCanvas()"],
    answer: 1 // 正確答案索引（0為第一個選項，1為第二個選項，以此類推）
  },
  {
    question: "2. 想要繪製一個圓形，應該使用哪一個 p5.js 指令？",
    options: ["rect()", "line()", "circle()", "triangle()"],
    answer: 2
  },
  {
    question: "3. 在 p5.js 中，設定畫布背景顏色的指令是什麼？",
    options: ["background()", "fill()", "stroke()", "color()"],
    answer: 0
  },
  {
    question: "4. 若要更改圖形的填滿顏色，應該呼叫哪一個函式？",
    options: ["color()", "fill()", "background()", "stroke()"],
    answer: 1
  },
  {
    question: "5. draw() 函式預設每秒大約執行幾次？",
    options: ["30次", "120次", "1次", "60次"],
    answer: 3
  }
];

// 宣告全域變數
let currentQuestionIndex = 0; // 當前進行到第幾題
let score = 0;                 // 玩家得分（答對題數）
let selectedOption = -1;       // 玩家點選的選項索引（-1表示未選擇）
let isAnswered = false;        // 當前題目是否已經作答

// 按鈕物件
let nextButton;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定文字對齊方式與大小
  textAlign(CENTER, CENTER);
  
  // 建立「下一題」按鈕，並設定其位置與樣式
  nextButton = createButton('下一題');
  nextButton.size(120, 40);
  nextButton.style('font-size', '18px');
  nextButton.style('cursor', 'pointer');
  nextButton.mousePressed(goToNextQuestion);
  nextButton.hide(); // 初始狀態先隱藏按鈕
}

function draw() {
  // 清除背景並設定舒適的粉藍色背景
  background(240, 245, 250);

  // 判斷是否所有題目已回答完畢
  if (currentQuestionIndex < questions.length) {
    // 繪製當前測驗題目與選項
    drawQuiz();
  } else {
    // 繪製最終結算畫面
    drawResult();
  }
}

// 繪製測驗畫面
function drawQuiz() {
  let q = questions[currentQuestionIndex];

  // 繪製頂部進度標題
  fill(50);
  noStroke();
  textSize(20);
  text(`題目 ${currentQuestionIndex + 1} / ${questions.length}`, width / 2, height * 0.15);

  // 繪製題目文字
  textSize(24);
  textStyle(BOLD);
  text(q.question, width / 2, height * 0.25);
  textStyle(NORMAL);

  // 設定選項按鈕的尺寸與佈局參數
  let optionW = min(width * 0.6, 500); // 按鈕寬度
  let optionH = 50;                   // 按鈕高度
  let startY = height * 0.38;          // 第一個選項的 Y 座標起始點
  let spacing = 65;                    // 選項之間的間距

  // 迴圈繪製四個選項
  for (let i = 0; i < q.options.length; i++) {
    let x = width / 2;
    let y = startY + i * spacing;

    // 預設選項背景顏色（淺灰色）與文字顏色
    let bgColor = color(255);
    let textColor = color(50);

    // 當使用者已經點擊作答時的動畫與顏色邏輯
    if (isAnswered) {
      if (selectedOption === q.answer) {
        // --- 情況 A：答對了 ---
        if (i === q.answer) {
          bgColor = color('#cbeef3'); // 正確選項顯示 cbeef3 背景色
        }
      } else {
        // --- 情況 B：答錯了 ---
        if (i === q.answer) {
          // 正確答案：背景設為 cbeef3 並且進行「上下跳動」動畫
          bgColor = color('#cbeef3');
          y += sin(frameCount * 0.2) * 8; 
        } else if (i === selectedOption) {
          // 答錯的選項：背景設為 dd2d4a 並且進行「左右移動」動畫
          bgColor = color('#dd2d4a');
          textColor = color(255); // 轉為白字以利閱讀
          x += sin(frameCount * 0.3) * 8; 
        }
      }
    }

    // 繪製選項的外框與背景矩形
    stroke(200);
    strokeWeight(1.5);
    fill(bgColor);
    rectMode(CENTER);
    rect(x, y, optionW, optionH, 10); // 圓角矩形

    // 繪製選項文字
    noStroke();
    fill(textColor);
    textSize(18);
    text(q.options[i], x, y);
  }

  // 若已作答，顯示「下一題」按鈕並定位於畫布下方
  if (isAnswered) {
    nextButton.position(width / 2 - 60, height * 0.82);
    nextButton.show();
  } else {
    nextButton.hide();
  }
}

// 繪製最終結算畫面
function drawResult() {
  nextButton.hide(); // 隱藏按鈕

  // 顯示完成測驗提示與得分資訊
  fill(40);
  noStroke();
  textSize(36);
  textStyle(BOLD);
  text("測驗結束！", width / 2, height * 0.4);

  textSize(28);
  textStyle(NORMAL);
  text(`您總共答對了 ${score} / ${questions.length} 題`, width / 2, height * 0.52);
}

// 滑鼠點擊事件監聽
function mousePressed() {
  // 如果已經作答或題目已結束，則不處理選項點擊
  if (isAnswered || currentQuestionIndex >= questions.length) return;

  let optionW = min(width * 0.6, 500);
  let optionH = 50;
  let startY = height * 0.38;
  let spacing = 65;

  // 判斷滑鼠是否點擊在四個選項之一的範圍內
  for (let i = 0; i < 4; i++) {
    let x = width / 2;
    let y = startY + i * spacing;

    // 檢查點擊座標是否落在該選項矩形內
    if (
      mouseX > x - optionW / 2 &&
      mouseX < x + optionW / 2 &&
      mouseY > y - optionH / 2 &&
      mouseY < y + optionH / 2
    ) {
      selectedOption = i;  // 紀錄選擇的選項
      isAnswered = true;   // 標記為已作答

      // 若答對則增加得分
      if (i === questions[currentQuestionIndex].answer) {
        score++;
      }
      break;
    }
  }
}

// 切換至下一題的處理函式
function goToNextQuestion() {
  currentQuestionIndex++; // 題號加 1
  selectedOption = -1;    // 重置選擇狀態
  isAnswered = false;     // 重置作答狀態
}

// 當使用者調整瀏覽器視窗大小時自動修正畫布尺寸
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```
:::


---

## 學習2：網頁設定為響應式網頁

https://cfchen58.synology.me/115/week4/stage2/

**這個階段的目標：** 讓網站在電腦、平板、手機（直向與橫向）都能正常顯示，視窗大小改變時版面自動調整。
**這個階段會修改的檔案：** index.html、sketch.js

### 執行截圖
![螢幕擷取畫面 2026-10-08 144532](https://hackmd.io/_uploads/H1a902Eofe.png)

（把截圖拖曳到這裡，或貼上圖片連結）

![學習2截![20261008](https://hackmd.io/_uploads/SyMbxa4oGg.gif)
圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```
網頁設定為響應式網頁，如何讓網站在電腦、平板、手機（直向與橫向）都能正常顯示，視窗大小改變時版面自動調整。
### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習2的程式碼
```javascript=
//學習2程式碼所在
// 定義測驗題目資料庫（共五題）
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

```
:::


---

## 學習3：設定嵌入 Google 字型，網頁文字採用這些字型

https://cfchen58.synology.me/115/week4/stage3/

**這個階段的目標：** 從 Google Fonts 嵌入繁體中文字型，並讓畫布上的題目與選項文字使用這些字型。
**這個階段會修改的檔案：** index.html、sketch.js

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習3截圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習3的程式碼
```javascript=
//學習3程式碼所在

```
:::


---

## 學習4：設定題庫並抽題顯示題目網頁（CSV 檔案）

https://cfchen58.synology.me/115/week4/stage4/

**這個階段的目標：** 把題目移到 questions.csv，網站讀取題庫後每次隨機抽出 5 題。
**這個階段會修改的檔案：** index.html、sketch.js、questions.csv

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習4截圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習4的程式碼
```javascript=
//學習4程式碼所在

```
:::


---

## 學習5：利用 Google Sheets 當題庫

https://cfchen58.synology.me/115/week4/stage5/

**這個階段的目標：** 把題庫放在 Google 試算表，網站直接讀取，老師改試算表，網站題目就跟著更新。
**這個階段會修改的檔案：** index.html、sketch.js（questions.csv 當備用題庫）

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習5截圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習5的程式碼
```javascript=
//學習5程式碼所在

```
:::


---

## 我的心得

這五個學習中，哪一個最困難？你是怎麼解決的？（請寫出實際發生的事）

＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
