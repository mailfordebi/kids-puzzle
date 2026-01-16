// --- SVG Images (outlines for coloring) ---
const svgImages = [
  // 1. House
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="90" width="120" height="70" fill="#fff" stroke="#888" stroke-width="3"/>
    <polygon points="30,90 100,40 170,90" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="80" y="120" width="40" height="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="55" y="110" width="20" height="20" fill="#fff" stroke="#888" stroke-width="2"/>
    <rect x="125" y="110" width="20" height="20" fill="#fff" stroke="#888" stroke-width="2"/>
  </svg>`,
  // 4. Sun (simple)
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="50" fill="#fff" stroke="#888" stroke-width="3"/>
    <g stroke="#888" stroke-width="3">
      <line x1="100" y1="10" x2="100" y2="40"/>
      <line x1="100" y1="160" x2="100" y2="190"/>
      <line x1="10" y1="100" x2="40" y2="100"/>
      <line x1="160" y1="100" x2="190" y2="100"/>
      <line x1="40" y1="40" x2="60" y2="60"/>
      <line x1="160" y1="40" x2="140" y2="60"/>
      <line x1="40" y1="160" x2="60" y2="140"/>
      <line x1="160" y1="160" x2="140" y2="140"/>
    </g>
    <circle cx="100" cy="100" r="40" fill="#fff" stroke="#888" stroke-width="2"/>
    <circle cx="100" cy="100" r="25" fill="#fff" stroke="#888" stroke-width="2"/>
  </svg>`,

  // 9. Cat
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="120" rx="50" ry="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <polygon points="60,80 80,40 100,80" fill="#fff" stroke="#888" stroke-width="3"/>
    <polygon points="140,80 120,40 100,80" fill="#fff" stroke="#888" stroke-width="3"/>
    <ellipse cx="85" cy="120" rx="8" ry="12" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="115" cy="120" rx="8" ry="12" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="100" cy="145" rx="18" ry="8" fill="#fff" stroke="#888" stroke-width="2"/>
  </svg>`,
  // 10. Dog
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="120" rx="50" ry="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <ellipse cx="80" cy="100" rx="10" ry="18" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="120" cy="100" rx="10" ry="18" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="100" cy="145" rx="18" ry="8" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="70" cy="80" rx="12" ry="18" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="130" cy="80" rx="12" ry="18" fill="#fff" stroke="#888" stroke-width="2"/>
  </svg>`,

  // 15. Train (bigger, more buggies, more windows)
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- Engine -->
    <rect x="30" y="100" width="40" height="50" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="40" y="110" width="20" height="20" fill="#fff" stroke="#888" stroke-width="2"/>
    <!-- Engine window -->
    <rect x="45" y="115" width="10" height="10" fill="#fff" stroke="#888" stroke-width="2"/>
    <!-- Buggy 1 -->
    <rect x="75" y="110" width="30" height="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="82" y="120" width="8" height="10" fill="#fff" stroke="#888" stroke-width="2"/>
    <rect x="90" y="120" width="8" height="10" fill="#fff" stroke="#888" stroke-width="2"/>
    <!-- Buggy 2 -->
    <rect x="110" y="110" width="30" height="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="117" y="120" width="8" height="10" fill="#fff" stroke="#888" stroke-width="2"/>
    <rect x="125" y="120" width="8" height="10" fill="#fff" stroke="#888" stroke-width="2"/>
    <!-- Buggy 3 -->
    <rect x="145" y="110" width="30" height="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="152" y="120" width="8" height="10" fill="#fff" stroke="#888" stroke-width="2"/>
    <rect x="160" y="120" width="8" height="10" fill="#fff" stroke="#888" stroke-width="2"/>
    <!-- Wheels -->
    <circle cx="45" cy="160" r="10" fill="#fff" stroke="#888" stroke-width="3"/>
    <circle cx="85" cy="160" r="10" fill="#fff" stroke="#888" stroke-width="3"/>
    <circle cx="120" cy="160" r="10" fill="#fff" stroke="#888" stroke-width="3"/>
    <circle cx="155" cy="160" r="10" fill="#fff" stroke="#888" stroke-width="3"/>
    <circle cx="175" cy="160" r="10" fill="#fff" stroke="#888" stroke-width="3"/>
    <!-- Chimney -->
    <rect x="55" y="90" width="8" height="18" fill="#fff" stroke="#888" stroke-width="2"/>
    <!-- Track -->
    <rect x="20" y="170" width="160" height="8" fill="#fff" stroke="#888" stroke-width="2"/>
  </svg>`,
  // 16. Castle (complex)
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="100" width="120" height="60" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="60" y="70" width="20" height="30" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="120" y="70" width="20" height="30" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="90" y="120" width="20" height="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <polygon points="60,70 70,40 80,70" fill="#fff" stroke="#888" stroke-width="2"/>
    <polygon points="120,70 130,40 140,70" fill="#fff" stroke="#888" stroke-width="2"/>
    <rect x="100" y="100" width="20" height="20" fill="#fff" stroke="#888" stroke-width="2"/>
  </svg>`,

  // 18. Robot (bigger, more square/circle/rectangle)
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- Body -->
    <rect x="50" y="70" width="100" height="80" fill="#fff" stroke="#888" stroke-width="4"/>
    <!-- Head -->
    <rect x="65" y="30" width="70" height="40" fill="#fff" stroke="#888" stroke-width="4"/>
    <!-- Eyes -->
    <circle cx="85" cy="50" r="10" fill="#fff" stroke="#888" stroke-width="3"/>
    <circle cx="115" cy="50" r="10" fill="#fff" stroke="#888" stroke-width="3"/>
    <!-- Mouth -->
    <rect x="90" y="60" width="20" height="6" fill="#fff" stroke="#888" stroke-width="2"/>
    <!-- Arms -->
    <rect x="30" y="90" width="20" height="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="150" y="90" width="20" height="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <!-- Legs -->
    <rect x="70" y="150" width="18" height="25" fill="#fff" stroke="#888" stroke-width="3"/>
    <rect x="112" y="150" width="18" height="25" fill="#fff" stroke="#888" stroke-width="3"/>
    <!-- Buttons -->
    <circle cx="100" cy="100" r="8" fill="#fff" stroke="#888" stroke-width="2"/>
    <circle cx="100" cy="120" r="8" fill="#fff" stroke="#888" stroke-width="2"/>
    <circle cx="100" cy="140" r="8" fill="#fff" stroke="#888" stroke-width="2"/>
  </svg>`,
  // 19. Cake (bigger, with oval, square, and rectangle)
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- Cake base (oval) -->
    <ellipse cx="100" cy="170" rx="70" ry="20" fill="#fff" stroke="#888" stroke-width="3"/>
    <!-- Main cake body (rectangle) -->
    <rect x="40" y="90" width="120" height="80" fill="#fff" stroke="#888" stroke-width="4"/>
    <!-- Cake layer (square) -->
    <rect x="80" y="60" width="40" height="40" fill="#fff" stroke="#888" stroke-width="3"/>
    <!-- Top decoration (small oval) -->
    <ellipse cx="100" cy="60" rx="20" ry="8" fill="#fff" stroke="#888" stroke-width="2"/>
    <!-- Candle -->
    <rect x="97" y="40" width="6" height="20" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="100" cy="38" rx="4" ry="4" fill="#fff" stroke="#888" stroke-width="2"/>
  </svg>`,
  // 20. Star
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <polygon points="100,20 120,80 180,80 130,120 150,180 100,140 50,180 70,120 20,80 80,80" fill="#fff" stroke="#888" stroke-width="3"/>
  </svg>`,
  // 21. Rainbow (7 very big, closely packed semi-circles with visible 3px dark grey line, clouds far from rainbow)
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- Rainbow arcs and visible dark grey lines between -->
    <path d="M10 130 A90 90 0 0 1 190 130" fill="none" stroke="#fff" stroke-width="10"/>
    <path d="M16 130 A84 84 0 0 1 184 130" fill="none" stroke="grey" stroke-width="6.5"/>
    <path d="M18 130 A82 82 0 0 1 182 130" fill="none" stroke="#fff" stroke-width="10"/>
    <path d="M24 130 A76 76 0 0 1 176 130" fill="none" stroke="grey" stroke-width="6.5"/>
    <path d="M26 130 A74 74 0 0 1 174 130" fill="none" stroke="#fff" stroke-width="10"/>
    <path d="M32 130 A68 68 0 0 1 168 130" fill="none" stroke="grey" stroke-width="6.5"/>
    <path d="M34 130 A66 66 0 0 1 166 130" fill="none" stroke="#fff" stroke-width="10"/>
    <path d="M40 130 A60 60 0 0 1 160 130" fill="none" stroke="grey" stroke-width="6.5"/>
    <path d="M42 130 A58 58 0 0 1 158 130" fill="none" stroke="#fff" stroke-width="10"/>
    <path d="M48 130 A52 52 0 0 1 152 130" fill="none" stroke="grey" stroke-width="6.5"/>
    <path d="M50 130 A50 50 0 0 1 150 130" fill="none" stroke="#fff" stroke-width="10"/>
    <path d="M56 130 A44 44 0 0 1 144 130" fill="none" stroke="grey" stroke-width="6.5"/>
    <path d="M58 130 A42 42 0 0 1 142 130" fill="none" stroke="#fff" stroke-width="10"/>
    <!-- Left cloud (3 ellipses, far from rainbow) -->
    <ellipse cx="25" cy="170" rx="18" ry="12" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="45" cy="175" rx="14" ry="9" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="35" cy="182" rx="12" ry="8" fill="#fff" stroke="#888" stroke-width="2"/>
    <!-- Right cloud (3 ellipses, far from rainbow) -->
    <ellipse cx="175" cy="170" rx="18" ry="12" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="155" cy="175" rx="14" ry="9" fill="#fff" stroke="#888" stroke-width="2"/>
    <ellipse cx="165" cy="182" rx="12" ry="8" fill="#fff" stroke="#888" stroke-width="2"/>
  </svg>`,
    // 23. Detailed Flower (more elements)
  `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
     <g fill="#fff" stroke="#888" stroke-width="3" stroke-linejoin="round">
       <!-- Head -->
       <rect x="60" y="25" width="80" height="55" rx="10" ry="10"/>
       <!-- Antenna -->
       <rect x="98" y="10" width="4" height="15"/>
       <circle cx="100" cy="8" r="6"/>

       <!-- Eyes -->
       <circle cx="85" cy="50" r="8"/>
       <circle cx="115" cy="50" r="8"/>
       <!-- Mouth -->
       <rect x="80" y="65" width="40" height="8" rx="4" ry="4"/>

       <!-- Body -->
       <rect x="50" y="85" width="100" height="70" rx="12" ry="12"/>
       <!-- Buttons -->
       <circle cx="80" cy="115" r="6"/>
       <circle cx="100" cy="115" r="6"/>
       <circle cx="120" cy="115" r="6"/>
       <rect x="75" y="130" width="50" height="15" rx="6" ry="6"/>

       <!-- Arms -->
       <rect x="25" y="95" width="25" height="15" rx="6" ry="6"/>
       <rect x="150" y="95" width="25" height="15" rx="6" ry="6"/>
       <rect x="18" y="110" width="18" height="35" rx="6" ry="6"/>
       <rect x="164" y="110" width="18" height="35" rx="6" ry="6"/>

       <!-- Legs -->
       <rect x="70" y="155" width="20" height="30" rx="6" ry="6"/>
       <rect x="110" y="155" width="20" height="30" rx="6" ry="6"/>
       <!-- Feet -->
       <rect x="60" y="182" width="40" height="10" rx="6" ry="6"/>
       <rect x="100" y="182" width="40" height="10" rx="6" ry="6"/>
     </g>
   </svg>
`,
`<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
   <g fill="#fff" stroke="#aaa" stroke-width="1.5">
     <circle cx="100" cy="100" r="90"/>

     <!-- Petal circles -->
     <circle cx="100" cy="45" r="45"/>
     <circle cx="135" cy="65" r="45"/>
     <circle cx="155" cy="100" r="45"/>
     <circle cx="135" cy="135" r="45"/>
     <circle cx="100" cy="155" r="45"/>
     <circle cx="65" cy="135" r="45"/>
     <circle cx="45" cy="100" r="45"/>
     <circle cx="65" cy="65" r="45"/>

     <!-- Inner layer -->
     <circle cx="100" cy="70" r="28"/>
     <circle cx="130" cy="100" r="28"/>
     <circle cx="100" cy="130" r="28"/>
     <circle cx="70" cy="100" r="28"/>

     <circle cx="100" cy="100" r="18"/>
   </g>
 </svg>
`,
`<svg viewBox="0 0 200 200"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg">

   <g fill="#fff" stroke="#bbb" stroke-width="0.5">

     <!-- 18 concentric circles -->
     <circle cx="100" cy="100" r="95"/>
     <circle cx="100" cy="100" r="88"/>
     <circle cx="100" cy="100" r="82"/>
     <circle cx="100" cy="100" r="76"/>
     <circle cx="100" cy="100" r="70"/>
     <circle cx="100" cy="100" r="64"/>
     <circle cx="100" cy="100" r="58"/>
     <circle cx="100" cy="100" r="52"/>
     <circle cx="100" cy="100" r="46"/>
     <circle cx="100" cy="100" r="40"/>
     <circle cx="100" cy="100" r="34"/>
     <circle cx="100" cy="100" r="28"/>
     <circle cx="100" cy="100" r="22"/>
     <circle cx="100" cy="100" r="16"/>
     <circle cx="100" cy="100" r="12"/>
     <circle cx="100" cy="100" r="9"/>
     <circle cx="100" cy="100" r="6"/>
     <circle cx="100" cy="100" r="3"/>

   </g>
 </svg>
`,
`<svg viewBox="0 0 200 200"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg">

   <g fill="#fff" stroke="#bbb" stroke-width="1.6" stroke-linejoin="round">

     <!-- Outer aura -->
     <circle cx="100" cy="100" r="95"/>
     <circle cx="100" cy="100" r="85"/>

     <!-- Face base -->
     <circle cx="100" cy="110" r="65"/>

     <!-- Crown -->
     <rect x="50" y="25" width="100" height="40" rx="8" ry="8"/>
     <circle cx="60" cy="25" r="6"/>
     <circle cx="80" cy="25" r="6"/>
     <circle cx="100" cy="25" r="6"/>
     <circle cx="120" cy="25" r="6"/>
     <circle cx="140" cy="25" r="6"/>

     <!-- Crown decorations -->
     <circle cx="70" cy="45" r="6"/>
     <circle cx="100" cy="45" r="6"/>
     <circle cx="130" cy="45" r="6"/>

     <!-- Big Eyes -->
     <circle cx="70" cy="110" r="22"/>
     <circle cx="130" cy="110" r="22"/>

     <!-- Inner eye circles -->
     <circle cx="70" cy="110" r="12"/>
     <circle cx="130" cy="110" r="12"/>

     <!-- Eye pupils -->
     <circle cx="70" cy="110" r="5"/>
     <circle cx="130" cy="110" r="5"/>

     <!-- Nose / tilak -->
     <rect x="96" y="120" width="8" height="20"/>
     <circle cx="100" cy="145" r="4"/>

     <!-- Mouth -->
     <ellipse cx="100" cy="155" rx="22" ry="10"/>

     <!-- Face ornaments -->
     <circle cx="40" cy="120" r="10"/>
     <circle cx="160" cy="120" r="10"/>

     <!-- Neck -->
     <rect x="75" y="165" width="50" height="20" rx="8" ry="8"/>

     <!-- Shoulder decorations -->
     <circle cx="55" cy="180" r="10"/>
     <circle cx="145" cy="180" r="10"/>

     <!-- Side patterns -->
     <circle cx="30" cy="100" r="6"/>
     <circle cx="170" cy="100" r="6"/>
     <circle cx="30" cy="130" r="6"/>
     <circle cx="170" cy="130" r="6"/>

   </g>
 </svg>
`,
`<svg viewBox="0 0 300 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
   <g fill="#fff" stroke="#aaa" stroke-width="1.6" stroke-linejoin="round">

     <!-- Outer circle -->
     <circle cx="150" cy="150" r="140"/>

     <!-- Sun rays (16) -->
     <polygon points="150,8 140,42 160,42"/>
     <polygon points="195,16 176,45 204,52"/>
     <polygon points="235,40 212,60 236,76"/>
     <polygon points="265,80 235,86 252,110"/>
     <polygon points="292,150 258,140 258,160"/>
     <polygon points="265,220 252,190 235,214"/>
     <polygon points="235,260 236,224 212,240"/>
     <polygon points="195,284 204,248 176,255"/>
     <polygon points="150,292 160,258 140,258"/>
     <polygon points="105,284 124,255 96,248"/>
     <polygon points="65,260 88,240 64,224"/>
     <polygon points="35,220 65,214 48,190"/>
     <polygon points="8,150 42,160 42,140"/>
     <polygon points="35,80 48,110 65,86"/>
     <polygon points="65,40 64,76 88,60"/>
     <polygon points="105,16 96,52 124,45"/>

     <!-- Outer dots -->
     <circle cx="150" cy="22" r="6"/>
     <circle cx="210" cy="40" r="6"/>
     <circle cx="255" cy="85" r="6"/>
     <circle cx="278" cy="150" r="6"/>
     <circle cx="255" cy="215" r="6"/>
     <circle cx="210" cy="260" r="6"/>
     <circle cx="150" cy="278" r="6"/>
     <circle cx="90" cy="260" r="6"/>
     <circle cx="45" cy="215" r="6"/>
     <circle cx="22" cy="150" r="6"/>
     <circle cx="45" cy="85" r="6"/>
     <circle cx="90" cy="40" r="6"/>

     <!-- Face base -->
     <circle cx="150" cy="150" r="95"/>

     <!-- Red ring area (kept white for coloring; outline only) -->
     <circle cx="150" cy="150" r="78"/>
     <circle cx="150" cy="150" r="70"/>

     <!-- Dot ring around face -->
     <circle cx="150" cy="72" r="3"/>
     <circle cx="180" cy="80" r="3"/>
     <circle cx="205" cy="102" r="3"/>
     <circle cx="214" cy="130" r="3"/>
     <circle cx="214" cy="170" r="3"/>
     <circle cx="205" cy="198" r="3"/>
     <circle cx="180" cy="220" r="3"/>
     <circle cx="150" cy="228" r="3"/>
     <circle cx="120" cy="220" r="3"/>
     <circle cx="95" cy="198" r="3"/>
     <circle cx="86" cy="170" r="3"/>
     <circle cx="86" cy="130" r="3"/>
     <circle cx="95" cy="102" r="3"/>
     <circle cx="120" cy="80" r="3"/>

     <!-- Eyes -->
     <circle cx="118" cy="150" r="28"/>
     <circle cx="182" cy="150" r="28"/>
     <circle cx="118" cy="150" r="14"/>
     <circle cx="182" cy="150" r="14"/>
     <circle cx="118" cy="150" r="6"/>
     <circle cx="182" cy="150" r="6"/>

     <!-- Nose / symbol -->
     <path d="M150 118 Q145 130 150 142 Q155 130 150 118" fill="none"/>
     <circle cx="150" cy="150" r="5"/>

     <!-- Mouth -->
     <path d="M112 195 Q150 218 188 195" fill="none"/>
     <path d="M122 200 Q150 190 178 200" fill="none"/>

     <!-- Side cheek symbols -->
     <circle cx="90" cy="165" r="7"/>
     <circle cx="210" cy="165" r="7"/>

   </g>
 </svg>
`

];

// --- Color Palette ---
const paletteColors = [
  // 7 rainbow colors
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#69F0AE', // Mint Green
  '#4B0082', // Indigo
  '#FF6EC7', // Pink
  '#8B00FF', // Violet
  // 8 more bright, kid-friendly colors
  '#FFB300', // Vivid Orange
  '#FFD600', // Vivid Yellow
  '#40C4FF', // Sky Blue
  '#7C4DFF', // Purple
   '#FFFF00', // Yellow
  '#FF8A65', // Peach
  '#FF7F00', // Orange
  '#000000'  // Black
];

let currentImageIdx = 0;
let selectedColor = paletteColors[0];
let originalSVG = '';

const paletteDiv = document.getElementById('color-palette');
const svgContainer = document.getElementById('svg-container');
const clearBtn = document.getElementById('clear-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

function renderPalette() {
  paletteDiv.innerHTML = '';
  paletteColors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch' + (color === selectedColor ? ' selected' : '');
    swatch.style.background = color;
    swatch.setAttribute('tabindex', '0');
    swatch.setAttribute('aria-label', color);
    swatch.addEventListener('click', () => {
      selectedColor = color;
      renderPalette();
    });
    swatch.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        selectedColor = color;
        renderPalette();
      }
    });
    paletteDiv.appendChild(swatch);
  });
}

function renderSVG() {
  svgContainer.innerHTML = svgImages[currentImageIdx];
  originalSVG = svgImages[currentImageIdx];
  const svg = svgContainer.querySelector('svg');
  // Make all fillable shapes clickable (now includes rect)
  const fillable = Array.from(svg.querySelectorAll('ellipse, circle, polygon, path, rect'));
  fillable.forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(e) {
      if (el.tagName === 'path') {
        el.setAttribute('stroke', selectedColor);
      } else {
        el.setAttribute('fill', selectedColor);
      }
    });
    // Touch support
    el.addEventListener('touchstart', function(e) {
      e.preventDefault();
      if (el.tagName === 'path') {
        el.setAttribute('stroke', selectedColor);
      } else {
        el.setAttribute('fill', selectedColor);
      }
    });
  });
}

clearBtn.addEventListener('click', () => {
  renderSVG();
});

nextBtn.addEventListener('click', () => {
  currentImageIdx = (currentImageIdx + 1) % svgImages.length;
  renderSVG();
});

prevBtn.addEventListener('click', () => {
  currentImageIdx = (currentImageIdx - 1 + svgImages.length) % svgImages.length;
  renderSVG();
});

// Initial render
renderPalette();
renderSVG();
