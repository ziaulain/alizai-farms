(function () {
  const toggle = document.querySelector('[data-mobile-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('mobile-open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('mobile-open') ? 'true' : 'false');
    });
  }

  // Contact form -> opens WhatsApp message (static-site friendly)
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);

      const name = fd.get('name')?.toString().trim() || '';
      const phone = fd.get('phone')?.toString().trim() || '';
      const topic = fd.get('topic')?.toString().trim() || 'General';
      const message = fd.get('message')?.toString().trim() || '';

      // Replace with your WhatsApp number in international format without + or spaces
      const whatsappNumber = "923001234567"; // <-- CHANGE THIS

      const text =
        `Assalam o Alaikum, I am ${name}.` +
        (phone ? ` My number: ${phone}.` : '') +
        `\nTopic: ${topic}\nMessage: ${message}`;

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }
})();

// ROI Calculator (Investment page)
(function () {
  const root = document.querySelector('[data-roi-calc]');
  if (!root) return;

  const $ = (sel) => root.querySelector(sel);

  const fmtPKR = (n) => {
    if (!isFinite(n)) return "—";
    return "PKR " + Math.round(n).toLocaleString("en-PK");
  };

  const fmtPct = (n) => {
    if (!isFinite(n)) return "—";
    return (n * 100).toFixed(1) + "%";
  };

  const readNumber = (el) => {
    const v = parseFloat((el.value || "").toString().replace(/,/g, ""));
    return isFinite(v) ? v : 0;
  };

  function calc(){
    const capital = readNumber($('#capital'));
    const cycleMonths = Math.max(1, readNumber($('#cycleMonths')));
    const purchase = readNumber($('#purchase'));
    const feed = readNumber($('#feed'));
    const health = readNumber($('#health'));
    const other = readNumber($('#other'));
    const sale = readNumber($('#sale'));
    const investorSharePct = Math.min(100, Math.max(0, readNumber($('#investorShare')))) / 100;

    const totalCost = purchase + feed + health + other;
    const grossProfit = sale - totalCost;

    // If user enters capital separately, treat capital as the investor contribution.
    // If capital is 0, default to totalCost as the invested amount.
    const invested = capital > 0 ? capital : totalCost;

    const investorProfit = grossProfit * investorSharePct;
    const farmProfit = grossProfit - investorProfit;

    const roi = invested > 0 ? (investorProfit / invested) : 0;
    const annualized = cycleMonths > 0 ? (Math.pow(1 + roi, 12 / cycleMonths) - 1) : 0;

    // Update KPI
    $('[data-kpi="cycle"]').textContent = cycleMonths.toFixed(0) + " months";
    $('[data-kpi="profit"]').textContent = fmtPKR(investorProfit);
    $('[data-kpi="roi"]').textContent = fmtPct(roi);
    $('[data-kpi="annual"]').textContent = fmtPct(annualized);

    // Breakdown table
    $('[data-out="totalCost"]').textContent = fmtPKR(totalCost);
    $('[data-out="grossProfit"]').textContent = fmtPKR(grossProfit);
    $('[data-out="invested"]').textContent = fmtPKR(invested);
    $('[data-out="investorShare"]').textContent = (investorSharePct*100).toFixed(0) + "%";
    $('[data-out="investorProfit"]').textContent = fmtPKR(investorProfit);
    $('[data-out="farmProfit"]').textContent = fmtPKR(farmProfit);

    // warnings
    const warn = $('[data-warn]');
    if (sale <= 0 || purchase <= 0) {
      warn.textContent = "Tip: fill Purchase Price and Expected Sale Price for a meaningful estimate.";
      warn.style.display = "block";
    } else if (grossProfit < 0) {
      warn.textContent = "Warning: With current inputs, the cycle is negative profit. Adjust costs / sale estimate.";
      warn.style.display = "block";
    } else {
      warn.style.display = "none";
    }
  }

  // Auto presets by animal type (very rough starting points)
  const preset = (type) => {
    if (type === "goat") {
      $('#cycleMonths').value = 4;
      $('#purchase').value = 40000;
      $('#feed').value = 20000;
      $('#health').value = 2000;
      $('#other').value = 2000;
      $('#sale').value = 75000;
      $('#investorShare').value = 50;
      $('#capital').value = "";
    } else if (type === "bull") {
      $('#cycleMonths').value = 6;
      $('#purchase').value = 160000;
      $('#feed').value = 60000;
      $('#health').value = 5000;
      $('#other').value = 5000;
      $('#sale').value = 280000;
      $('#investorShare').value = 50;
      $('#capital').value = "";
    } else if (type === "premium_goat") {
      $('#cycleMonths').value = 4;
      $('#purchase').value = 80000;
      $('#feed').value = 20000;
      $('#health').value = 2000;
      $('#other').value = 2000;
      $('#sale').value = 120000;
      $('#investorShare').value = 50;
      $('#capital').value = "";
    }
    calc();
  };

  const typeSel = $('#animalType');
  if (typeSel) {
    typeSel.addEventListener('change', () => preset(typeSel.value));
  }

  root.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });

  const presetBtn = $('[data-preset]');
  if (presetBtn) presetBtn.addEventListener('click', () => preset(typeSel.value));

  // initial calc
  calc();
})();
