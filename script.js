/* ==========================================================================
   BİYOATLAS - MOTOR VE İNTERAKTİF SİMÜLASYON YÖNETİCİSİ (VANILLA JS ENGINE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. TEMA YÖNETİMİ VE MOBİL NAVİGASYON MOTORU
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);

      if (themeIcon) {
        if (newTheme === 'dark') {
          themeIcon.innerHTML = `
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          `;
        } else {
          themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        }
      }
    });
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });
  }


  /* ==========================================================================
     2. GÜNÜN TERİMİ (JS STATE İLE RASTGELE SEÇİM)
     ========================================================================== */
  const dailyTerms = [
    { term: "ATP (Adenozin Trifosfat)", category: "Hücresel Enerji", def: "Hücre içindeki temel enerji taşıyıcı moleküldür. Fosfat bağlarında depolanan enerjiyi hücresel işler için serbest bırakır." },
    { term: "Mitoz", category: "Hücre Bölünmesi", def: "Ökaryotik bir hücrenin kromozomlarını eşleyerek iki özdeş yavru çekirdek oluşturduğu evre." },
    { term: "Transkripsiyon", category: "Moleküler Genetik", def: "DNA kalıbından RNA sentezlenmesi süreci; genetik bilginin aktarımının ilk adımıdır." },
    { term: "Translasyon", category: "Moleküler Genetik", def: "Ribozomda mRNA dizisindeki kodonlara uygun olarak amino asit zincirinin (protein) oluşturulması." },
    { term: "Endosimbiyoz Teorisi", category: "Evrimsel Biyoloji", def: "Mitozom ve kloroplast organellerinin ilkel ökaryotik hücreler tarafından yutulan prokaryotlardan türediğini savunur." },
    { term: "Krossing-over", category: "Genetik", def: "Mayoz I profazında homolog kromozomların kardeş olmayan kromatitleri arasındaki gen alışverişi." },
    { term: "Ozmoz", category: "Hücre Zarı", def: "Su moleküllerinin yarı geçirgen bir zardan pasif geçişi." },
    { term: "Homeostazi", category: "Fizyoloji", def: "Organizmanın dış ortam değişikliklerine rağmen iç dengesini sabit tutma eğilimi." }
  ];

  const termTitleEl = document.getElementById('termTitle');
  const termCategoryEl = document.getElementById('termCategory');
  const termDefinitionEl = document.getElementById('termDefinition');
  const refreshTermBtn = document.getElementById('refreshTermBtn');

  function displayRandomTerm() {
    if (!termTitleEl || !termCategoryEl || !termDefinitionEl) return;
    const selected = dailyTerms[Math.floor(Math.random() * dailyTerms.length)];
    termTitleEl.textContent = selected.term;
    termCategoryEl.textContent = `Kategori: ${selected.category}`;
    termDefinitionEl.textContent = selected.def;
  }

  if (refreshTermBtn) {
    refreshTermBtn.addEventListener('click', displayRandomTerm);
  }
  displayRandomTerm();


  /* ==========================================================================
     3. HÜCRE BİYOLOJİSİ: ORGANEL TIKLAMA & HÜCRE ZARI CANVAS
     ========================================================================== */
  const organelleData = {
    'org-nucleus': { title: "Çekirdek (Nucleus)", tag: "Yönetim Merkezi", desc: "Hücrenin genetik bilgisini (DNA) barındırır. Hücrenin büyümesini ve bölünmesini denetler." },
    'org-mitochondria': { title: "Mitokondri", tag: "Enerji Santrali", desc: "Oksijenli solunum ile ATP üretir. Kendine ait DNA ve ribozomları bulunur." },
    'org-er': { title: "Endoplazmik Retikulum", tag: "Taşıma Kanalı", desc: "Hücre içi madde taşınmasında ve lipid/protein sentezinde görev alır." },
    'org-golgi': { title: "Golgi Aygıtı", tag: "Paketleme Merkezi", desc: "Protein ve lipidleri işler, paketler ve hücre dışına salgılar." },
    'org-lysosome': { title: "Lizozom", tag: "Sindirim Torbası", desc: "İçerdiği hidrolitik enzimlerle hücre içi sindirimi gerçekleştirir." }
  };

  const orgTitle = document.getElementById('orgTitle');
  const orgTag = document.getElementById('orgTag');
  const orgDesc = document.getElementById('orgDesc');

  document.querySelectorAll('.organelle').forEach(el => {
    el.addEventListener('click', () => {
      const data = organelleData[el.id];
      if (data && orgTitle && orgTag && orgDesc) {
        orgTitle.textContent = data.title;
        orgTag.textContent = data.tag;
        orgDesc.textContent = data.desc;
      }
    });
  });

  // Pasif Difüzyon Canvas Simülasyonu
  const diffCanvas = document.getElementById('diffusionCanvas');
  if (diffCanvas) {
    const dCtx = diffCanvas.getContext('2d');
    let particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * (diffCanvas.width / 2 - 10),
      y: Math.random() * diffCanvas.height,
      vx: (Math.random() - 0.2) * 2,
      vy: (Math.random() - 0.5) * 2
    }));

    function drawDiffusion() {
      dCtx.clearRect(0, 0, diffCanvas.width, diffCanvas.height);
      dCtx.strokeStyle = '#10b981';
      dCtx.lineWidth = 3;
      dCtx.setLineDash([6, 6]);
      dCtx.beginPath();
      dCtx.moveTo(diffCanvas.width / 2, 0);
      dCtx.lineTo(diffCanvas.width / 2, diffCanvas.height);
      dCtx.stroke();
      dCtx.setLineDash([]);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > diffCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > diffCanvas.height) p.vy *= -1;
        dCtx.fillStyle = '#38bdf8';
        dCtx.beginPath();
        dCtx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        dCtx.fill();
      });
      requestAnimationFrame(drawDiffusion);
    }
    drawDiffusion();
  }


  /* ==========================================================================
     4. GENETİK: PUNNETT KARESI HESAPLAYICISI
     ========================================================================== */
  const p1Input = document.getElementById('parent1');
  const p2Input = document.getElementById('parent2');
  const btnCalcPunnett = document.getElementById('btnCalculatePunnett');
  const punnettResults = document.getElementById('punnettResults');

  function calculatePunnett() {
    if (!p1Input || !p2Input || !punnettResults) return;
    const p1 = p1Input.value.trim();
    const p2 = p2Input.value.trim();

    if (p1.length !== 2 || p2.length !== 2) {
      alert('Lütfen ebeveyn genotiplerini 2 harfli olarak girin (Örn: Aa).');
      return;
    }

    const a1 = p1[0], a2 = p1[1];
    const b1 = p2[0], b2 = p2[1];

    document.getElementById('p1_allele1').textContent = a1;
    document.getElementById('p1_allele2').textContent = a2;
    document.getElementById('p2_allele1').textContent = b1;
    document.getElementById('p2_allele2').textContent = b2;

    const fmt = (x, y) => (x.toLowerCase() === y.toLowerCase() && x !== y) ? (x === x.toUpperCase() ? x + y : y + x) : x + y;
    
    const c00 = fmt(a1, b1), c01 = fmt(a1, b2), c10 = fmt(a2, b1), c11 = fmt(a2, b2);

    document.getElementById('cell_00').textContent = c00;
    document.getElementById('cell_01').textContent = c01;
    document.getElementById('cell_10').textContent = c10;
    document.getElementById('cell_11').textContent = c11;

    const outcomes = [c00, c01, c10, c11];
    const counts = {};
    outcomes.forEach(o => counts[o] = (counts[o] || 0) + 1);

    let resHTML = `<strong>Genotip Oranları:</strong><br>`;
    for (let g in counts) {
      resHTML += `• <strong>${g}</strong>: %${(counts[g] / 4) * 100} (${counts[g]}/4)<br>`;
    }
    punnettResults.innerHTML = resHTML;
  }

  if (btnCalcPunnett) {
    btnCalcPunnett.addEventListener('click', calculatePunnett);
  }


  /* ==========================================================================
     5. EKOLOJİ: LOGİSTİK BÜYÜME GRAFİK MOTORU (SAF MATH CANVAS)
     ========================================================================== */
  const popCanvas = document.getElementById('popGraphCanvas');
  if (popCanvas) {
    const pCtx = popCanvas.getContext('2d');
    const sliderK = document.getElementById('sliderK');
    const sliderR = document.getElementById('sliderR');
    const sliderN0 = document.getElementById('sliderN0');

    function drawLogisticGraph() {
      if (!sliderK || !sliderR || !sliderN0) return;
      const K = parseFloat(sliderK.value);
      const r = parseFloat(sliderR.value);
      const N0 = parseFloat(sliderN0.value);

      document.getElementById('valK').textContent = K;
      document.getElementById('valR').textContent = r;
      document.getElementById('valN0').textContent = N0;

      pCtx.clearRect(0, 0, popCanvas.width, popCanvas.height);

      // Eksenler
      pCtx.strokeStyle = '#64748b';
      pCtx.lineWidth = 2;
      pCtx.beginPath();
      pCtx.moveTo(40, 10);
      pCtx.lineTo(40, popCanvas.height - 30);
      pCtx.lineTo(popCanvas.width - 10, popCanvas.height - 30);
      pCtx.stroke();

      // Taşıma Kapasitesi (K Çizgisi)
      const kY = (popCanvas.height - 30) - (K / 1000) * (popCanvas.height - 50);
      pCtx.strokeStyle = '#ef4444';
      pCtx.setLineDash([5, 5]);
      pCtx.beginPath();
      pCtx.moveTo(40, kY);
      pCtx.lineTo(popCanvas.width - 10, kY);
      pCtx.stroke();
      pCtx.setLineDash([]);

      // Logistik Eğri Çizimi: N(t) = K / (1 + ((K - N0)/N0) * e^(-r*t))
      pCtx.strokeStyle = '#10b981';
      pCtx.lineWidth = 3;
      pCtx.beginPath();
      const maxT = 100;
      for (let t = 0; t <= maxT; t += 0.5) {
        const N = K / (1 + ((K - N0) / N0) * Math.exp(-r * t));
        const screenX = 40 + (t / maxT) * (popCanvas.width - 50);
        const screenY = (popCanvas.height - 30) - (N / 1000) * (popCanvas.height - 50);
        if (t === 0) pCtx.moveTo(screenX, screenY);
        else pCtx.lineTo(screenX, screenY);
      }
      pCtx.stroke();
    }

    [sliderK, sliderR, sliderN0].forEach(s => s && s.addEventListener('input', drawLogisticGraph));
    drawLogisticGraph();
  }


  /* ==========================================================================
     6. SÖZLÜK: CANLI ARAMA VE HARF FİLTRELEME MOTORU
     ========================================================================== */
  const dictionaryDatabase = [
    { term: "ATP (Adenozin Trifosfat)", cat: "Hücre Biyolojisi", def: "Hücre içi enerji transferinde kullanılan evrensel kimyasal enerji molekülüdür." },
    { term: "Aktif Taşıma", cat: "Hücre Biyolojisi", def: "Maddelerin az yoğundan çok yoğuna ATP harcanarak geçişi." },
    { term: "Alelen Gen", cat: "Genetik", def: "Bir genin kromozomlardaki aynı lokusta bulunan alternatif biçimleridir." },
    { term: "Apoptoz", cat: "Hücre Biyolojisi", def: "Programlanmış hücresel ölüm mekanizması." },
    { term: "Biyom", cat: "Ekoloji", def: "Geniş coğrafi alanlardaki iklim ve canlı topluluğu birimleri." },
    { term: "Endosimbiyoz", cat: "Evrim", def: "Mitozom ve kloroplastın bakterilerden evrimleştiğini savunan teori." },
    { term: "Homeostazi", cat: "İnsan Anatomisi", def: "Organizmanın iç ortamını sabit ve dengeli tutma yeteneği." },
    { term: "Krossing-over", cat: "Genetik", def: "Homolog kromozomlar arası gen alışverişi." }
  ];

  const dictSearchInput = document.getElementById('dictSearchInput');
  const dictGridContainer = document.getElementById('dictGridContainer');
  const resultsCount = document.getElementById('resultsCount');

  function renderDictionary(filterText = '') {
    if (!dictGridContainer || !resultsCount) return;
    const query = filterText.toLowerCase().trim();
    
    const filtered = dictionaryDatabase.filter(item => 
      item.term.toLowerCase().includes(query) || 
      item.cat.toLowerCase().includes(query) || 
      item.def.toLowerCase().includes(query)
    );

    dictGridContainer.innerHTML = '';
    resultsCount.textContent = `Toplam ${filtered.length} terim listeleniyor`;

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'dict-card';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <h3 style="color:var(--text-primary); font-size:1.15rem;">${item.term}</h3>
          <span style="font-size:0.75rem; background:rgba(6,182,212,0.15); color:var(--accent-cyan); padding:0.2rem 0.5rem; border-radius:4px; font-weight:700;">${item.cat}</span>
        </div>
        <p style="color:var(--text-secondary); font-size:0.9rem;">${item.def}</p>
      `;
      dictGridContainer.appendChild(card);
    });
  }

  if (dictSearchInput) {
    dictSearchInput.addEventListener('input', (e) => renderDictionary(e.target.value));
    renderDictionary();
  }

});
/* ==========================================================================
   BİYOATLAS - MODAL POPUP & DİNAMİK ETKİLEŞİM MOTORU
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. MAKALELER VE CANLI TÜRLERİ DETAY VERİ SETİ
  const speciesData = [
    {
      id: "tardigrad",
      title: "Tardigrada (Su Ayısı)",
      species: "Milnesium tardigradum",
      desc: "Uzay vakumunda, mutlak sıfıra yakın sıcaklıklarda ve yüksek radyasyonda hayatta kalabilen anahidrobiyoz ustası mikro-hayvan.",
      details: "Tardigratlar, metabolizmalarını neredeyse %0.01 seviyesine kadar yavaşlatarak 'Tun' adı verilen koruyucu bir yapıya bürünürler. Bu sayede susuzluğa onlarca yıl dayanabilirler."
    },
    {
      id: "axolotl",
      title: "Aksolotl (Semender)",
      species: "Ambystoma mexicanum",
      desc: "Kayıp organlarını, beyin parçalarını ve kalbini kusursuz şekilde yeniden üretebilen canlı türü.",
      details: "Aksolotllar kök hücre rejenerasyon kapasiteleri sayesinde yara dokusu oluşmadan organlarını tam boyutuyla yeniden uzatabilirler."
    },
    {
      id: "turritopsis",
      title: "Ölümsüz Denizanası",
      species: "Turritopsis dohrnii",
      desc: "Stres anında hücresel olarak polip evresine dönüp yaşını sıfırlayabilen tek tür.",
      details: "Transdiferansiyasyon denilen süreçle yetişkin hücrelerini tekrar kök hücreye dönüştürerek sonsuz döngüye girer."
    }
  ];

  // 2. KARTLARI DİNAMİK OLUŞTURMA
  const articlesGrid = document.getElementById('articlesGrid');

  if (articlesGrid) {
    speciesData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'article-card';
      card.innerHTML = `
        <span style="color: var(--accent-cyan); font-weight:700; font-style:italic; font-size:0.85rem;">${item.species}</span>
        <h3 style="margin: 0.5rem 0;">${item.title}</h3>
        <p style="color: var(--text-secondary); font-size:0.95rem; flex-grow:1;">${item.desc}</p>
        <button class="btn-detail" data-id="${item.id}">Detaylı İncele</button>
      `;
      articlesGrid.appendChild(card);
    });
  }

  // 3. POP-UP MODAL MOTORU (DETAYLARI GÖSTER BUTONLARI İÇİN)
  const articleModal = document.getElementById('articleModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btn-detail')) {
      const speciesId = e.target.getAttribute('data-id');
      const selected = speciesData.find(s => s.id === speciesId);

      if (selected && articleModal && modalBody) {
        modalBody.innerHTML = `
          <span style="color: var(--accent-emerald); font-weight:bold;">${selected.species}</span>
          <h2 style="margin: 0.5rem 0; color: var(--text-primary);">${selected.title}</h2>
          <p style="color: var(--text-secondary); margin-bottom: 1rem;">${selected.desc}</p>
          <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-left: 4px solid var(--accent-emerald); border-radius: 8px;">
            <strong>Akademik İnceleme:</strong><br>${selected.details}
          </div>
        `;
        articleModal.classList.add('active');
      }
    }
  });

  // Modal Kapatma Olayları
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      articleModal.classList.remove('active');
    });
  }

  if (articleModal) {
    articleModal.addEventListener('click', (e) => {
      if (e.target === articleModal) {
        articleModal.classList.remove('active');
      }
    });
  }

});