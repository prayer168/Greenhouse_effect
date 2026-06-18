const compareData = {
  natural: {
    title: "自然溫室效應",
    copy: "適量的水氣、二氧化碳和甲烷會留住一部分熱量，讓地球平均溫度不會太低。",
    points: ["地球仍會把熱往太空散出", "保留一部分熱量，使環境適合生命", "不是污染，而是自然存在的能量交換"]
  },
  enhanced: {
    title: "增強溫室效應",
    copy: "當人類活動讓溫室氣體快速增加，更多紅外線被吸收後再射回地表，地球就更容易升溫。",
    points: ["燃燒煤、石油、天然氣會增加二氧化碳", "畜牧、稻田與廢棄物會增加甲烷", "升溫會影響極端天氣、海平面與生態"]
  }
};

const presets = {
  preindustrial: { co2: 280, methane: 18, albedo: 34, saving: 5 },
  today: { co2: 420, methane: 45, albedo: 31, saving: 20 },
  high: { co2: 760, methane: 82, albedo: 24, saving: 8 },
  mitigation: { co2: 360, methane: 28, albedo: 36, saving: 72 }
};

const actions = [
  { icon: "❄️", title: "冷氣設定 26 到 28 度", impact: 22, effort: "容易", note: "搭配風扇與關門窗，班級最容易立刻做到。" },
  { icon: "🍱", title: "午餐自備餐具", impact: 14, effort: "容易", note: "減少一次性用品，也能降低垃圾處理的能源。" },
  { icon: "🚲", title: "走路、腳踏車或共乘上學", impact: 28, effort: "中等", note: "交通排放常和汽油、柴油燃燒有關。" },
  { icon: "🔌", title: "關閉待機電源", impact: 18, effort: "容易", note: "下課或放學巡檢插座，是很好的班級任務。" },
  { icon: "🌳", title: "校園樹蔭與綠地照護", impact: 16, effort: "中等", note: "植物能吸收二氧化碳，也能降低局部熱感。" },
  { icon: "☀️", title: "屋頂太陽能倡議", impact: 34, effort: "困難", note: "效果高，但需要學校、家長與行政單位一起規畫。" },
  { icon: "🥗", title: "減少食物浪費", impact: 20, effort: "中等", note: "食物從生產到運送都會用到能源，剩食也可能產生甲烷。" },
  { icon: "📊", title: "班級能源紀錄表", impact: 12, effort: "容易", note: "先記錄用電與行動，才能知道方案是否有效。" }
];

const claims = [
  {
    text: "「今天很冷，所以全球暖化不存在。」",
    type: "myth",
    title: "這是迷思",
    explain: "天氣是短時間、單一地點的狀態；氣候要看長時間、多地區的平均趨勢。某一天冷，不代表長期沒有升溫。",
    reason: 0,
    reasons: [
      "只用一天的天氣下結論，沒有看長期氣候資料。",
      "二氧化碳濃度增加，會讓所有地方每天都變熱。",
      "只要冬天還會冷，就代表地球沒有吸收熱量。"
    ]
  },
  {
    text: "「二氧化碳增加會影響地球能量收支。」",
    type: "evidence",
    title: "接近科學證據",
    explain: "二氧化碳會吸收部分紅外線。濃度增加時，留在地球系統中的熱量通常會增加。",
    reason: 1,
    reasons: [
      "只要看今天的氣溫，就能知道二氧化碳有沒有增加。",
      "二氧化碳會吸收紅外線，因此可能改變進出地球的能量。",
      "二氧化碳只是一種氣體，不可能和熱量有關。"
    ]
  },
  {
    text: "「溫室效應完全不好，最好一點都不要有。」",
    type: "myth",
    title: "這是迷思",
    explain: "自然溫室效應讓地球不會過冷。真正需要注意的是人類活動造成的增強溫室效應。",
    reason: 2,
    reasons: [
      "溫室效應只會造成污染，和地球溫度沒有關係。",
      "只要把所有溫室氣體移除，生物就會更容易生活。",
      "自然溫室效應能保留適量熱量，問題是增強太多。"
    ]
  },
  {
    text: "「減少能源浪費可以降低排放。」",
    type: "evidence",
    title: "接近科學證據",
    explain: "若電力或交通能源來自化石燃料，節能通常能減少燃燒與溫室氣體排放。",
    reason: 0,
    reasons: [
      "許多能源來自燃燒燃料，少浪費通常能減少排放。",
      "節能只會省錢，和二氧化碳排放沒有任何關係。",
      "只要有一個人節能，全球溫度隔天就會立刻下降。"
    ]
  }
];

const questions = [
  {
    q: "自然溫室效應最重要的功能是什麼？",
    choices: ["讓地球保留適量熱量", "讓地球完全不散熱", "阻止所有太陽光進入", "讓海水停止蒸發"],
    answer: 0,
    explain: "自然溫室效應會保留一部分熱量，使地球溫度較適合生命。"
  },
  {
    q: "下列哪一項會讓二氧化碳排放增加？",
    choices: ["大量燃燒煤、石油或天然氣", "白天有太陽光", "月亮反射陽光", "植物行光合作用"],
    answer: 0,
    explain: "化石燃料燃燒會把儲存在地下的碳轉成二氧化碳排到空氣中。"
  },
  {
    q: "雲、冰雪或淺色地表的反射增加時，模型中通常會發生什麼事？",
    choices: ["反射較多陽光，吸收的能量較少", "二氧化碳立刻消失", "地球不再有夜晚", "紅外線全部停止"],
    answer: 0,
    explain: "反射率較高時，較多太陽能被反射回太空，地表吸收能量會降低。"
  },
  {
    q: "為什麼不能只用某一天很冷來否定全球暖化？",
    choices: ["氣候要看長期趨勢", "冷天一定是假資料", "暖化只發生在夏天", "地球每天溫度都相同"],
    answer: 0,
    explain: "天氣變化很快；氣候變遷需要看多年資料與全球或區域趨勢。"
  },
  {
    q: "甲烷也是溫室氣體，常和哪類活動有關？",
    choices: ["畜牧、稻田、垃圾掩埋", "鉛筆寫字", "月食", "紙張折疊"],
    answer: 0,
    explain: "畜牧消化、稻田與有機垃圾分解都可能產生甲烷。"
  },
  {
    q: "下列哪個說法最正確？",
    choices: ["自然溫室效應必要，增強溫室效應需要減緩", "所有溫室氣體都應該變成零", "溫室效應和能量無關", "只有火山會排放二氧化碳"],
    answer: 0,
    explain: "重點不是把自然現象消除，而是減少人類活動造成的快速增加。"
  },
  {
    q: "班級做減碳方案時，除了效果，還應該考慮什麼？",
    choices: ["可行性與誰需要合作", "字體顏色", "是否最難做到", "是否完全不用記錄"],
    answer: 0,
    explain: "好的實作方案要能被執行，並知道需要哪些人一起合作。"
  },
  {
    q: "這份教材中的溫度數字應該怎麼看？",
    choices: ["用來比較趨勢的概念模型", "精準預測未來某一天氣溫", "氣象局即時資料", "和真實世界完全無關"],
    answer: 0,
    explain: "模型用來幫助理解變因關係，不是正式氣候預報。"
  },
  {
    q: "如果想設計一個公平的溫室效應比較實驗，最好怎麼做？",
    choices: ["一次只改變一個主要變因", "每次同時亂改所有滑桿", "只看自己喜歡的結果", "不需要記錄任何數字"],
    answer: 0,
    explain: "公平比較要盡量控制其他條件，才能判斷是哪一個變因造成觀察到的差異。"
  },
  {
    q: "下列哪一項最像是可在校園實作的減碳紀錄方式？",
    choices: ["每週記錄用電與完成的節能行動", "只在月底猜一次結果", "只記錄天氣，不記錄行動", "由一個人憑印象決定分數"],
    answer: 0,
    explain: "持續記錄行動和數據，才能比較方案是否真的有幫助，也方便小組討論改進。"
  }
];

const inputs = {
  co2: document.querySelector("#co2"),
  methane: document.querySelector("#methane"),
  albedo: document.querySelector("#albedo"),
  saving: document.querySelector("#saving")
};

const canvas = document.querySelector("#climateCanvas");
const ctx = canvas.getContext("2d");
let animationTick = 0;
let selectedActions = new Set();
let activeClaimIndex = 0;
let selectedJudgement = "";
let selectedReason = null;
let evidenceAnswers = new Map();
let quizIndex = 0;
let quizScore = 0;
let answered = false;

function setActiveTab(id) {
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === id);
  });
  document.querySelectorAll(".tab-trigger").forEach(trigger => {
    trigger.classList.toggle("active", trigger.dataset.tab === id);
  });
  if (id === "lab") {
    drawClimate();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupTabs() {
  document.querySelectorAll(".tab-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      setActiveTab(trigger.dataset.tab);
    });
  });
}

function updateCompare(mode) {
  const data = compareData[mode];
  document.querySelector("#compareTitle").textContent = data.title;
  document.querySelector("#compareCopy").textContent = data.copy;
  document.querySelector("#compareList").innerHTML = data.points.map(point => `<li>${point}</li>`).join("");
  document.querySelector("#compareVisual").classList.toggle("enhanced", mode === "enhanced");
  document.querySelector("#compareCaption").textContent = mode === "enhanced"
    ? "溫室氣體變多：更多熱量回射，散到太空的熱變少"
    : "適量溫室氣體：保留一部分熱量，仍讓熱散出";
  document.querySelectorAll(".mode-tab").forEach(button => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
}

function climateState() {
  const co2 = Number(inputs.co2.value);
  const methane = Number(inputs.methane.value);
  const albedo = Number(inputs.albedo.value);
  const saving = Number(inputs.saving.value);
  const greenhouse = Math.min(86, 26 + (co2 - 280) * 0.055 + methane * 0.22 - saving * 0.11);
  const retainedHeat = Math.max(18, Math.round(greenhouse));
  const temp = Math.max(-0.4, ((co2 - 280) / 180) + methane / 70 - (albedo - 30) / 18 - saving / 95);
  return { co2, methane, albedo, saving, retainedHeat, temp };
}

function updateReadouts() {
  const state = climateState();
  document.querySelector("#co2Value").textContent = `${state.co2} ppm`;
  document.querySelector("#methaneValue").textContent = `${state.methane}%`;
  document.querySelector("#albedoValue").textContent = `${state.albedo}%`;
  document.querySelector("#savingValue").textContent = `${state.saving}%`;
  document.querySelector("#heatReadout").textContent = `${state.retainedHeat}%`;
  document.querySelector("#tempReadout").textContent = `${state.temp >= 0 ? "+" : ""}${state.temp.toFixed(1)}°C`;
  document.querySelector("#reflectReadout").textContent = `${state.albedo}%`;
  document.querySelector("#labInsight").textContent = labInsightText(state);
}

function labInsightText(state) {
  const heatPart = state.retainedHeat >= 62
    ? "溫室氣體偏多，紅外線回射變強，熱量較不容易散到太空。"
    : state.retainedHeat <= 36
      ? "溫室氣體較少，較多紅外線能散到太空。"
      : "溫室氣體保留一部分熱量，地球仍會持續向外散熱。";
  const reflectPart = state.albedo >= 40
    ? "反射率高，雲與冰雪把較多陽光反射回去。"
    : state.albedo <= 24
      ? "反射率低，地表吸收的太陽能較多。"
      : "反射率中等，部分陽光被反射、部分被吸收。";
  const savingPart = state.saving >= 60
    ? "節能與再生能源比例高，排放壓力下降。"
    : state.saving <= 20
      ? "節能比例低，排放壓力仍然明顯。"
      : "節能行動正在減少一部分排放壓力。";
  return `${heatPart} ${reflectPart} ${savingPart}`;
}

function drawArrow(x1, y1, x2, y2, color, width = 5) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 15 * Math.cos(angle - .55), y2 - 15 * Math.sin(angle - .55));
  ctx.lineTo(x2 - 15 * Math.cos(angle + .55), y2 - 15 * Math.sin(angle + .55));
  ctx.closePath();
  ctx.fill();
}

function drawLabel(text, x, y, options = {}) {
  const paddingX = options.paddingX ?? 12;
  const paddingY = options.paddingY ?? 7;
  const fontSize = options.fontSize ?? 18;
  ctx.save();
  ctx.font = `700 ${fontSize}px Microsoft JhengHei, sans-serif`;
  const metrics = ctx.measureText(text);
  const width = metrics.width + paddingX * 2;
  const height = fontSize + paddingY * 2;
  ctx.fillStyle = options.background ?? "rgba(10, 24, 38, .76)";
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = options.border ?? "rgba(255, 255, 255, .18)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = options.color ?? "rgba(255,255,255,.94)";
  ctx.fillText(text, x + paddingX, y + fontSize + paddingY - 2);
  ctx.restore();
}

function roundRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawClimate() {
  const state = climateState();
  const w = canvas.width;
  const h = canvas.height;
  animationTick += 0.012;

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, state.retainedHeat > 62 ? "#211f3d" : "#142b42");
  sky.addColorStop(.58, state.retainedHeat > 62 ? "#5f6f85" : "#3b718c");
  sky.addColorStop(1, "#f0c170");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const earthX = w * .58;
  const earthY = h * .69;
  const earthR = Math.min(w, h) * .17;
  const atmosphereR = earthR + 34 + state.retainedHeat * .32;
  const albedoCount = Math.round(state.albedo / 8);
  const heatLines = 3 + Math.round(state.retainedHeat / 16);
  const gasCount = Math.max(6, Math.round(state.retainedHeat / 7));
  const labels = [];
  const queueLabel = (text, x, y, options) => labels.push({ text, x, y, options });

  ctx.fillStyle = "#f5c04e";
  ctx.beginPath();
  ctx.arc(116, 108, 58, 0, Math.PI * 2);
  ctx.fill();
  queueLabel("太陽短波進入", 196, 60, { background: "rgba(72, 48, 16, .78)", color: "#fff1c7" });

  for (let i = 0; i < 5; i += 1) {
    const y = 92 + i * 38 + Math.sin(animationTick * 3 + i) * 5;
    drawArrow(172, y, earthX - 82, earthY - 170 + i * 34, "rgba(255,224,145,.82)", 6);
  }

  queueLabel(`雲與冰雪反射 ${state.albedo}%`, w - 296, 76, {
    background: "rgba(58, 90, 112, .76)",
    color: "#f2fbff"
  });
  for (let i = 0; i < albedoCount; i += 1) {
    const startX = earthX - 160 + i * 46;
    const startY = earthY - 175 + Math.sin(animationTick * 2 + i) * 8;
    drawArrow(startX, startY, startX - 92, startY - 88, "rgba(218,244,255,.78)", 4);
  }

  ctx.strokeStyle = `rgba(221,244,255,${0.24 + state.retainedHeat / 170})`;
  ctx.lineWidth = 10 + state.retainedHeat / 8;
  ctx.beginPath();
  ctx.arc(earthX, earthY, atmosphereR, Math.PI * 1.08, Math.PI * 1.92);
  ctx.stroke();
  queueLabel(`CO2 ${state.co2} ppm / 甲烷 ${state.methane}%`, earthX - 108, earthY - atmosphereR - 72, {
    background: "rgba(92, 78, 42, .82)",
    color: "#fff7d4"
  });

  ctx.fillStyle = "rgba(255, 232, 160, .9)";
  for (let i = 0; i < gasCount; i += 1) {
    const angle = Math.PI * (1.08 + (0.84 * i) / Math.max(1, gasCount - 1));
    const radius = atmosphereR + Math.sin(animationTick * 2 + i) * 6;
    ctx.beginPath();
    ctx.arc(earthX + Math.cos(angle) * radius, earthY + Math.sin(angle) * radius, 4.2, 0, Math.PI * 2);
    ctx.fill();
  }

  const earthGradient = ctx.createRadialGradient(earthX - 45, earthY - 60, 20, earthX, earthY, earthR);
  earthGradient.addColorStop(0, "#8bd8c9");
  earthGradient.addColorStop(.58, "#267da0");
  earthGradient.addColorStop(1, "#173d64");
  ctx.fillStyle = earthGradient;
  ctx.beginPath();
  ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#68b96b";
  ctx.beginPath();
  ctx.ellipse(earthX - 55, earthY - 30, 46, 82, -.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(earthX + 55, earthY - 40, 62, 42, .3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(earthX + 25, earthY + 72, 72, 34, -.2, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < heatLines; i += 1) {
    const startX = earthX - 110 + i * (220 / Math.max(1, heatLines - 1));
    const startY = earthY - earthR + 16;
    const endX = startX + Math.sin(animationTick * 4 + i) * 20;
    const endY = startY - 106 - state.retainedHeat * .7;
    drawArrow(startX, startY, endX, endY, "rgba(255,119,89,.86)", 5);
    if (i % 2 === 0 || state.retainedHeat > 56) {
      drawArrow(endX, endY + 4, startX + 18, startY + 50, "rgba(255,199,177,.82)", state.retainedHeat > 62 ? 6 : 4);
    }
  }
  queueLabel(`紅外線回射 ${state.retainedHeat}%`, earthX + 96, earthY - 138, {
    background: "rgba(96, 32, 26, .78)",
    color: "#ffd8cd"
  });

  if (state.saving >= 45) {
    queueLabel(`節能降低排放壓力 ${state.saving}%`, 28, h - 134, {
      background: "rgba(46, 122, 84, .82)",
      color: "#e9fff0"
    });
  } else {
    queueLabel(`節能比例 ${state.saving}%：排放壓力仍在`, 28, h - 134, {
      background: "rgba(127, 58, 44, .82)",
      color: "#ffe6dc"
    });
  }

  labels.forEach(label => drawLabel(label.text, label.x, label.y, label.options));

  ctx.fillStyle = "rgba(255,255,255,.92)";
  ctx.font = "700 20px Microsoft JhengHei, sans-serif";
  ctx.fillText(`CO2 ${state.co2} ppm`, 28, h - 78);
  ctx.fillText(`熱量保留 ${state.retainedHeat}%`, 28, h - 46);
}

function animate() {
  drawClimate();
  requestAnimationFrame(animate);
}

function renderActions() {
  const container = document.querySelector("#actionCards");
  container.innerHTML = actions.map((action, index) => `
    <button class="action-card ${selectedActions.has(index) ? "selected" : ""}" type="button" data-action="${index}">
      <span class="action-emoji" aria-hidden="true">${action.icon}</span>
      <span class="action-check" aria-hidden="true">✓</span>
      <h3>${action.title}</h3>
      <strong>🌿 減碳指數 +${action.impact}｜${action.effort}</strong>
      <p>${action.note}</p>
    </button>
  `).join("");

  const score = [...selectedActions].reduce((sum, index) => sum + actions[index].impact, 0);
  const limitedScore = Math.min(100, score);
  document.querySelector("#actionScore").textContent = limitedScore;
  document.querySelector("#scoreRing").style.background = `conic-gradient(var(--teal) ${limitedScore * 3.6}deg, #e5eeed 0deg)`;
  document.querySelector(".action-score").classList.toggle("active", selectedActions.size > 0);
  document.querySelector(".action-score").classList.toggle("complete", score >= 100 && selectedActions.size <= 4);
  const feedback = document.querySelector("#actionFeedback");
  if (selectedActions.size === 0) {
    feedback.textContent = "先挑選你想實作的方案。";
  } else if (selectedActions.size > 4) {
    feedback.textContent = "方案太多了，請刪到 4 個以內，讓計畫更容易執行。";
  } else if (score >= 100) {
    feedback.textContent = "達標！接著可以討論誰負責、何時記錄成效。";
  } else {
    feedback.textContent = `還差 ${100 - score} 點。試著平衡高效果與容易執行的行動。`;
  }
}

function renderClaims() {
  document.querySelector("#claimList").innerHTML = claims.map((claim, index) => `
    <button class="${activeClaimIndex === index ? "active" : ""}" type="button" data-claim="${index}">
      <span class="claim-number">${index + 1}</span>
      <span>${claim.text}</span>
      <strong>${claimStatus(index)}</strong>
    </button>
  `).join("");
}

function claimStatus(index) {
  const answer = evidenceAnswers.get(index);
  if (!answer) return "待判讀";
  return answer.correctType && answer.correctReason ? "完成" : "修正";
}

function selectClaim(index) {
  const claim = claims[index];
  const saved = evidenceAnswers.get(index);
  activeClaimIndex = index;
  selectedJudgement = saved?.judgement || "";
  selectedReason = saved?.reasonIndex ?? null;
  document.querySelector("#claimResult").classList.remove("has-evidence", "is-correct", "needs-revision");
  renderClaims();
  document.querySelector("#claimKicker").textContent = `第 ${index + 1} 題`;
  document.querySelector("#activeClaimText").textContent = claim.text;
  document.querySelector("#reasonOptions").innerHTML = claim.reasons.map((reason, reasonIndex) => `
    <button class="${selectedReason === reasonIndex ? "selected" : ""}" type="button" data-reason="${reasonIndex}">
      ${reason}
    </button>
  `).join("");
  document.querySelectorAll("[data-judge]").forEach(button => {
    button.classList.toggle("selected", button.dataset.judge === selectedJudgement);
  });
  updateEvidenceSubmit();
  renderEvidenceFeedback(saved);
}

function updateEvidenceSubmit() {
  document.querySelector("#submitEvidence").disabled = !selectedJudgement || selectedReason === null;
}

function renderEvidenceFeedback(answer) {
  const feedback = document.querySelector("#evidenceFeedback");
  if (!answer) {
    feedback.hidden = true;
    feedback.innerHTML = "";
    document.querySelector("#claimResult").classList.remove("has-evidence", "is-correct", "needs-revision");
    return;
  }
  const claim = claims[activeClaimIndex];
  const resultClass = answer.correctType && answer.correctReason ? "correct" : "revise";
  feedback.hidden = false;
  feedback.className = `evidence-feedback ${resultClass}`;
  feedback.innerHTML = `
    <span class="claim-badge ${claim.type === "myth" ? "myth" : ""}">${claim.title}</span>
    <p><strong>${answer.points} 分。</strong>${claim.explain}</p>
    <p>最有力的理由：${claim.reasons[claim.reason]}</p>
  `;
  document.querySelector("#claimResult").classList.add("has-evidence");
  document.querySelector("#claimResult").classList.toggle("is-correct", resultClass === "correct");
  document.querySelector("#claimResult").classList.toggle("needs-revision", resultClass !== "correct");
}

function submitEvidenceAnswer() {
  const claim = claims[activeClaimIndex];
  const correctType = selectedJudgement === claim.type;
  const correctReason = selectedReason === claim.reason;
  const points = (correctType ? 10 : 0) + (correctReason ? 15 : 0);
  evidenceAnswers.set(activeClaimIndex, {
    judgement: selectedJudgement,
    reasonIndex: selectedReason,
    correctType,
    correctReason,
    points
  });
  renderEvidenceStats();
  renderClaims();
  renderEvidenceFeedback(evidenceAnswers.get(activeClaimIndex));
}

function renderEvidenceStats() {
  const answers = [...evidenceAnswers.values()];
  const completed = answers.length;
  const score = answers.reduce((sum, answer) => sum + answer.points, 0);
  document.querySelector("#evidenceProgress").textContent = `${completed} / ${claims.length}`;
  document.querySelector("#evidenceScore").textContent = `${score} 分`;
  document.querySelector("#evidenceFill").style.width = `${(completed / claims.length) * 100}%`;
}

function resetEvidence() {
  selectedJudgement = "";
  selectedReason = null;
  evidenceAnswers = new Map();
  renderEvidenceStats();
  selectClaim(0);
}

function renderQuiz() {
  const item = questions[quizIndex];
  answered = false;
  document.querySelector("#quizProgress").textContent = `第 ${quizIndex + 1} / ${questions.length} 題`;
  document.querySelector("#quizScore").textContent = `${quizScore} 分`;
  document.querySelector("#questionText").textContent = item.q;
  document.querySelector(".quiz-card").classList.remove("answered");
  document.querySelector("#choices").innerHTML = item.choices.map((choice, index) => `
    <button class="choice-button" type="button" data-choice="${index}">${choice}</button>
  `).join("");
  document.querySelector("#quizFeedback").hidden = true;
  document.querySelector("#nextQuestion").disabled = true;
  document.querySelector("#nextQuestion").textContent = quizIndex === questions.length - 1 ? "查看結果" : "下一題";
}

function chooseAnswer(index) {
  if (answered) return;
  answered = true;
  const item = questions[quizIndex];
  const correct = index === item.answer;
  if (correct) quizScore += 10;

  document.querySelectorAll("[data-choice]").forEach(button => {
    const choiceIndex = Number(button.dataset.choice);
    button.disabled = true;
    button.classList.toggle("correct", choiceIndex === item.answer);
    button.classList.toggle("wrong", choiceIndex === index && !correct);
  });

  const feedback = document.querySelector("#quizFeedback");
  document.querySelector(".quiz-card").classList.add("answered");
  feedback.hidden = false;
  feedback.textContent = `${correct ? "答對了。" : "再想想。"} ${item.explain}`;
  document.querySelector("#quizScore").textContent = `${quizScore} 分`;
  document.querySelector("#nextQuestion").disabled = false;
}

function nextQuiz() {
  if (quizIndex < questions.length - 1) {
    quizIndex += 1;
    renderQuiz();
    return;
  }
  const title = quizScore >= 70 ? "取得氣候探究員徽章" : "完成挑戰，建議再探究一次";
  document.querySelector(".quiz-card").innerHTML = `
    <div class="quiz-topline"><span>闖關完成</span><strong>${quizScore} / ${questions.length * 10} 分</strong></div>
    <h3>${title}</h3>
    <p class="quiz-feedback">你已經完成溫室效應核心概念挑戰。可以回到模擬實驗，試著設計一組「高排放」和一組「減碳中」的對照實驗。</p>
    <button class="button primary" id="retryQuiz" type="button">重新挑戰</button>
  `;
  document.querySelector("#retryQuiz").addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;
    document.querySelector(".quiz-card").innerHTML = `
      <div class="quiz-topline">
        <span id="quizProgress"></span>
        <strong id="quizScore"></strong>
      </div>
      <h3 id="questionText"></h3>
      <div class="choices" id="choices"></div>
      <div class="quiz-feedback" id="quizFeedback" hidden></div>
      <button class="button primary" id="nextQuestion" type="button" disabled>下一題</button>
    `;
    bindQuizEvents();
    renderQuiz();
  });
}

function bindQuizEvents() {
  document.querySelector("#choices").addEventListener("click", event => {
    const button = event.target.closest("[data-choice]");
    if (button) chooseAnswer(Number(button.dataset.choice));
  });
  document.querySelector("#nextQuestion").addEventListener("click", nextQuiz);
}

document.querySelectorAll(".mode-tab").forEach(button => {
  button.addEventListener("click", () => updateCompare(button.dataset.mode));
});

document.querySelectorAll(".preset-row button").forEach(button => {
  button.addEventListener("click", () => {
    const preset = presets[button.dataset.preset];
    Object.entries(preset).forEach(([key, value]) => {
      inputs[key].value = value;
    });
    updateReadouts();
  });
});

Object.values(inputs).forEach(input => {
  input.addEventListener("input", updateReadouts);
});

document.querySelector("#actionCards").addEventListener("click", event => {
  const card = event.target.closest("[data-action]");
  if (!card) return;
  const index = Number(card.dataset.action);
  if (selectedActions.has(index)) {
    selectedActions.delete(index);
  } else {
    selectedActions.add(index);
  }
  renderActions();
});

document.querySelector("#resetActions").addEventListener("click", () => {
  selectedActions = new Set();
  renderActions();
});

document.querySelector("#claimList").addEventListener("click", event => {
  const button = event.target.closest("[data-claim]");
  if (button) selectClaim(Number(button.dataset.claim));
});

document.querySelector(".judgement-buttons").addEventListener("click", event => {
  const button = event.target.closest("[data-judge]");
  if (!button) return;
  selectedJudgement = button.dataset.judge;
  document.querySelectorAll("[data-judge]").forEach(item => {
    item.classList.toggle("selected", item === button);
  });
  renderEvidenceFeedback(null);
  updateEvidenceSubmit();
});

document.querySelector("#reasonOptions").addEventListener("click", event => {
  const button = event.target.closest("[data-reason]");
  if (!button) return;
  selectedReason = Number(button.dataset.reason);
  document.querySelectorAll("[data-reason]").forEach(item => {
    item.classList.toggle("selected", item === button);
  });
  renderEvidenceFeedback(null);
  updateEvidenceSubmit();
});

document.querySelector("#submitEvidence").addEventListener("click", submitEvidenceAnswer);
document.querySelector("#resetEvidence").addEventListener("click", resetEvidence);

updateCompare("natural");
updateReadouts();
renderActions();
renderClaims();
selectClaim(0);
bindQuizEvents();
renderQuiz();
setupTabs();
animate();
