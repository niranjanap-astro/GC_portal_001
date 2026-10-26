/* ==========================================================
   GC Portal — Client-side catalogue browser
   v0.01 · EAT Group, UFRGS · LIneA
   ========================================================== */

/* ----------------------------------------------------------
   Mock catalogue data
   Columns: id, host, host_type, ra, dec, type, method,
            g, r, i, z, gi_color, feh, vr, instrument, ref
   ---------------------------------------------------------- */
const GC_DATA = [
  /* ── NGC 4486 (M87) · Virgo · d=16.4 Mpc · v_sys=1307 km/s ── */
  { id:"EGC-4486-0001", host:"NGC 4486",  host_type:"E0p",  ra:"12:30:46.83", dec:"+12:23:09.2", type:"confirmed", method:"spectroscopic", g:23.41, r:22.89, i:22.61, z:22.43, gi:0.80, feh:-1.54, vr:1089, instr:"VLT/MUSE",    ref:"Prashantha+2026" },
  { id:"EGC-4486-0002", host:"NGC 4486",  host_type:"E0p",  ra:"12:30:52.17", dec:"+12:24:31.5", type:"confirmed", method:"spectroscopic", g:23.88, r:23.22, i:22.85, z:22.70, gi:1.03, feh:-0.51, vr:1421, instr:"VLT/MUSE",    ref:"Prashantha+2026" },
  { id:"EGC-4486-0003", host:"NGC 4486",  host_type:"E0p",  ra:"12:30:44.02", dec:"+12:22:58.7", type:"confirmed", method:"spectroscopic", g:24.12, r:23.51, i:23.21, z:23.03, gi:0.91, feh:-1.12, vr:1673, instr:"VLT/MUSE",    ref:"Prashantha+2026" },
  { id:"EGC-4486-0004", host:"NGC 4486",  host_type:"E0p",  ra:"12:30:58.44", dec:"+12:23:47.0", type:"confirmed", method:"spectroscopic", g:22.97, r:22.36, i:22.07, z:21.91, gi:0.90, feh:-0.72, vr:954,  instr:"Keck/DEIMOS",  ref:"Zhang+2015"      },
  { id:"EGC-4486-0005", host:"NGC 4486",  host_type:"E0p",  ra:"12:30:40.91", dec:"+12:25:14.2", type:"confirmed", method:"spectroscopic", g:24.55, r:23.87, i:23.54, z:23.38, gi:1.01, feh:-0.63, vr:1185, instr:"Gemini/GMOS",  ref:"Strader+2011"    },
  { id:"EGC-4486-0006", host:"NGC 4486",  host_type:"E0p",  ra:"12:31:02.33", dec:"+12:21:55.3", type:"confirmed", method:"spectroscopic", g:23.62, r:23.03, i:22.78, z:22.60, gi:0.84, feh:-1.43, vr:1882, instr:"VLT/MUSE",    ref:"Prashantha+2026" },
  { id:"EGC-4486-0007", host:"NGC 4486",  host_type:"E0p",  ra:"12:30:49.77", dec:"+12:26:08.8", type:"candidate", method:"HST",          g:25.01, r:24.42, i:24.17, z:24.02, gi:0.84, feh:null,  vr:null, instr:"HST/ACS",    ref:"Jordan+2009"     },
  { id:"EGC-4486-0008", host:"NGC 4486",  host_type:"E0p",  ra:"12:30:36.18", dec:"+12:22:30.1", type:"confirmed", method:"spectroscopic", g:24.28, r:23.67, i:23.35, z:23.17, gi:0.93, feh:-0.90, vr:719,  instr:"VLT/FORS2",  ref:"Hanes+2001"      },
  { id:"EGC-4486-0009", host:"NGC 4486",  host_type:"E0p",  ra:"12:30:55.61", dec:"+12:20:42.6", type:"candidate", method:"JWST",         g:25.34, r:24.73, i:24.45, z:24.28, gi:0.89, feh:null,  vr:null, instr:"JWST/NIRCam", ref:"Lim+2024"        },
  { id:"EGC-4486-0010", host:"NGC 4486",  host_type:"E0p",  ra:"12:30:43.55", dec:"+12:24:55.0", type:"confirmed", method:"spectroscopic", g:23.77, r:23.18, i:22.88, z:22.70, gi:0.89, feh:-1.20, vr:1540, instr:"VLT/MUSE",    ref:"Prashantha+2026" },

  /* ── NGC 1399 · Fornax Cluster · d=20.0 Mpc · v_sys=1425 km/s ── */
  { id:"EGC-1399-0001", host:"NGC 1399",  host_type:"E1",   ra:"03:38:25.14", dec:"-35:27:44.2", type:"confirmed", method:"spectroscopic", g:24.05, r:23.41, i:23.10, z:22.93, gi:0.95, feh:-0.82, vr:1213, instr:"VLT/FORS2",  ref:"Richtler+2008"   },
  { id:"EGC-1399-0002", host:"NGC 1399",  host_type:"E1",   ra:"03:38:33.79", dec:"-35:26:31.0", type:"confirmed", method:"spectroscopic", g:23.81, r:23.20, i:22.94, z:22.78, gi:0.87, feh:-1.31, vr:1688, instr:"VLT/FORS2",  ref:"Richtler+2008"   },
  { id:"EGC-1399-0003", host:"NGC 1399",  host_type:"E1",   ra:"03:38:19.06", dec:"-35:28:17.5", type:"confirmed", method:"spectroscopic", g:24.39, r:23.74, i:23.43, z:23.26, gi:0.96, feh:-0.67, vr:1071, instr:"Gemini/GMOS",  ref:"Pota+2018"      },
  { id:"EGC-1399-0004", host:"NGC 1399",  host_type:"E1",   ra:"03:38:41.22", dec:"-35:29:05.8", type:"confirmed", method:"spectroscopic", g:23.57, r:22.95, i:22.66, z:22.50, gi:0.91, feh:-0.98, vr:1530, instr:"VLT/MUSE",    ref:"Fahrion+2020"    },
  { id:"EGC-1399-0005", host:"NGC 1399",  host_type:"E1",   ra:"03:38:28.55", dec:"-35:25:49.3", type:"candidate", method:"HST",          g:24.90, r:24.28, i:24.02, z:23.86, gi:0.88, feh:null,  vr:null, instr:"HST/ACS",    ref:"Jordan+2007"     },
  { id:"EGC-1399-0006", host:"NGC 1399",  host_type:"E1",   ra:"03:38:22.88", dec:"-35:27:02.1", type:"confirmed", method:"spectroscopic", g:24.62, r:24.01, i:23.72, z:23.56, gi:0.90, feh:-1.10, vr:1840, instr:"VLT/MUSE",    ref:"Fahrion+2020"    },
  { id:"EGC-1399-0007", host:"NGC 1399",  host_type:"E1",   ra:"03:38:36.40", dec:"-35:26:10.4", type:"confirmed", method:"spectroscopic", g:23.44, r:22.81, i:22.50, z:22.33, gi:0.94, feh:-0.45, vr:1104, instr:"VLT/FORS2",  ref:"Richtler+2008"   },
  { id:"EGC-1399-0008", host:"NGC 1399",  host_type:"E1",   ra:"03:38:14.71", dec:"-35:28:54.6", type:"candidate", method:"HST",          g:25.18, r:24.55, i:24.25, z:24.08, gi:0.93, feh:null,  vr:null, instr:"HST/WFC3",   ref:"Puzia+2014"      },

  /* ── NGC 5128 (Cen A) · d=3.8 Mpc · v_sys=547 km/s ── */
  { id:"EGC-5128-0001", host:"NGC 5128",  host_type:"S0p",  ra:"13:25:18.42", dec:"-43:01:50.3", type:"confirmed", method:"spectroscopic", g:19.34, r:18.77, i:18.49, z:18.32, gi:0.85, feh:-1.47, vr:389,  instr:"AAT/2dF",    ref:"Woodley+2010"    },
  { id:"EGC-5128-0002", host:"NGC 5128",  host_type:"S0p",  ra:"13:25:31.18", dec:"-43:00:22.7", type:"confirmed", method:"spectroscopic", g:20.12, r:19.49, i:19.18, z:19.00, gi:0.94, feh:-0.58, vr:694,  instr:"VLT/VIMOS",  ref:"Beasley+2008"    },
  { id:"EGC-5128-0003", host:"NGC 5128",  host_type:"S0p",  ra:"13:25:24.77", dec:"-43:02:38.1", type:"confirmed", method:"spectroscopic", g:19.88, r:19.26, i:18.97, z:18.80, gi:0.91, feh:-0.83, vr:511,  instr:"AAT/2dF",    ref:"Woodley+2010"    },
  { id:"EGC-5128-0004", host:"NGC 5128",  host_type:"S0p",  ra:"13:25:09.63", dec:"-43:01:14.9", type:"confirmed", method:"spectroscopic", g:20.56, r:19.95, i:19.67, z:19.51, gi:0.89, feh:-1.18, vr:801,  instr:"VLT/VIMOS",  ref:"Beasley+2008"    },
  { id:"EGC-5128-0005", host:"NGC 5128",  host_type:"S0p",  ra:"13:25:38.02", dec:"-43:00:55.2", type:"confirmed", method:"spectroscopic", g:18.91, r:18.30, i:18.01, z:17.85, gi:0.90, feh:-0.73, vr:417,  instr:"Gemini/GMOS",  ref:"Rejkuba+2007"  },
  { id:"EGC-5128-0006", host:"NGC 5128",  host_type:"S0p",  ra:"13:25:15.89", dec:"-43:03:01.4", type:"candidate", method:"HST",          g:21.30, r:20.70, i:20.43, z:20.27, gi:0.87, feh:null,  vr:null, instr:"HST/ACS",    ref:"Harris+2002"     },
  { id:"EGC-5128-0007", host:"NGC 5128",  host_type:"S0p",  ra:"13:25:44.31", dec:"-42:59:38.8", type:"confirmed", method:"spectroscopic", g:20.83, r:20.22, i:19.93, z:19.76, gi:0.90, feh:-1.01, vr:563,  instr:"AAT/2dF",    ref:"Woodley+2010"    },
  { id:"EGC-5128-0008", host:"NGC 5128",  host_type:"S0p",  ra:"13:25:27.55", dec:"-43:01:29.7", type:"candidate", method:"JWST",         g:21.67, r:21.05, i:20.76, z:20.59, gi:0.91, feh:null,  vr:null, instr:"JWST/NIRCam", ref:"Lim+2024"        },

  /* ── M31 (NGC 224) · Local Group · d=0.78 Mpc · v_sys=−301 km/s ── */
  { id:"EGC-0224-0001", host:"M31",       host_type:"SAb",  ra:"00:42:43.87", dec:"+41:15:09.0", type:"confirmed", method:"spectroscopic", g:16.14, r:15.51, i:15.21, z:15.04, gi:0.93, feh:-0.55, vr:-239, instr:"MMT/Hectospec",ref:"Caldwell+2011"  },
  { id:"EGC-0224-0002", host:"M31",       host_type:"SAb",  ra:"00:43:02.11", dec:"+41:17:44.3", type:"confirmed", method:"spectroscopic", g:17.38, r:16.77, i:16.48, z:16.31, gi:0.90, feh:-1.60, vr:-312, instr:"MMT/Hectospec",ref:"Caldwell+2011"  },
  { id:"EGC-0224-0003", host:"M31",       host_type:"SAb",  ra:"00:42:31.54", dec:"+41:16:25.8", type:"confirmed", method:"spectroscopic", g:15.78, r:15.15, i:14.85, z:14.68, gi:0.93, feh:-0.42, vr:-188, instr:"Keck/DEIMOS",  ref:"Perrett+2002"  },
  { id:"EGC-0224-0004", host:"M31",       host_type:"SAb",  ra:"00:42:58.77", dec:"+41:14:52.5", type:"confirmed", method:"spectroscopic", g:17.81, r:17.18, i:16.87, z:16.69, gi:0.94, feh:-1.23, vr:-405, instr:"MMT/Hectospec",ref:"Caldwell+2011"  },
  { id:"EGC-0224-0005", host:"M31",       host_type:"SAb",  ra:"00:42:18.23", dec:"+41:18:37.1", type:"confirmed", method:"spectroscopic", g:16.55, r:15.92, i:15.61, z:15.43, gi:0.94, feh:-0.78, vr:-271, instr:"Keck/DEIMOS",  ref:"Veljanoski+2014"},

  /* ── NGC 3115 · d=9.4 Mpc · v_sys=720 km/s ── */
  { id:"EGC-3115-0001", host:"NGC 3115",  host_type:"S0",   ra:"10:05:10.55", dec:"-07:43:22.4", type:"confirmed", method:"spectroscopic", g:22.15, r:21.55, i:21.27, z:21.11, gi:0.88, feh:-1.39, vr:612,  instr:"Keck/DEIMOS",  ref:"Usher+2015"    },
  { id:"EGC-3115-0002", host:"NGC 3115",  host_type:"S0",   ra:"10:05:18.33", dec:"-07:42:55.0", type:"confirmed", method:"spectroscopic", g:22.67, r:22.06, i:21.77, z:21.60, gi:0.90, feh:-0.66, vr:835,  instr:"Keck/DEIMOS",  ref:"Usher+2015"    },
  { id:"EGC-3115-0003", host:"NGC 3115",  host_type:"S0",   ra:"10:05:06.21", dec:"-07:44:01.7", type:"confirmed", method:"spectroscopic", g:21.88, r:21.27, i:20.97, z:20.80, gi:0.91, feh:-0.49, vr:544,  instr:"VLT/MUSE",    ref:"Pinna+2019"    },
  { id:"EGC-3115-0004", host:"NGC 3115",  host_type:"S0",   ra:"10:05:22.87", dec:"-07:43:38.9", type:"candidate", method:"HST",          g:23.44, r:22.82, i:22.53, z:22.36, gi:0.91, feh:null,  vr:null, instr:"HST/ACS",    ref:"Jennings+2014"  },

  /* ── NGC 4472 (M49) · Virgo · d=16.7 Mpc · v_sys=952 km/s ── */
  { id:"EGC-4472-0001", host:"NGC 4472",  host_type:"E2",   ra:"12:29:45.32", dec:"+08:00:20.5", type:"confirmed", method:"spectroscopic", g:23.52, r:22.89, i:22.58, z:22.40, gi:0.94, feh:-0.61, vr:812,  instr:"Keck/LRIS",   ref:"Côté+2003"     },
  { id:"EGC-4472-0002", host:"NGC 4472",  host_type:"E2",   ra:"12:29:53.71", dec:"+07:59:33.0", type:"confirmed", method:"spectroscopic", g:23.94, r:23.31, i:23.01, z:22.83, gi:0.93, feh:-0.76, vr:1092, instr:"Keck/LRIS",   ref:"Côté+2003"     },
  { id:"EGC-4472-0003", host:"NGC 4472",  host_type:"E2",   ra:"12:29:40.18", dec:"+08:01:14.8", type:"confirmed", method:"spectroscopic", g:24.27, r:23.66, i:23.38, z:23.22, gi:0.89, feh:-1.25, vr:1348, instr:"Gemini/GMOS",  ref:"Strader+2007"  },
  { id:"EGC-4472-0004", host:"NGC 4472",  host_type:"E2",   ra:"12:29:58.43", dec:"+08:00:47.3", type:"candidate", method:"HST",          g:24.78, r:24.17, i:23.89, z:23.73, gi:0.89, feh:null,  vr:null, instr:"HST/ACS",    ref:"Jordan+2009"    },

  /* ── NGC 1052 · d=19.4 Mpc · v_sys=1510 km/s ── */
  { id:"EGC-1052-0001", host:"NGC 1052",  host_type:"E4",   ra:"02:41:06.22", dec:"-08:15:23.7", type:"confirmed", method:"spectroscopic", g:24.18, r:23.55, i:23.25, z:23.08, gi:0.93, feh:-0.82, vr:1348, instr:"Keck/DEIMOS",  ref:"Forbes+2001"   },
  { id:"EGC-1052-0002", host:"NGC 1052",  host_type:"E4",   ra:"02:41:11.85", dec:"-08:14:50.2", type:"confirmed", method:"spectroscopic", g:24.56, r:23.93, i:23.63, z:23.46, gi:0.93, feh:-1.05, vr:1701, instr:"Keck/DEIMOS",  ref:"Forbes+2001"   },
  { id:"EGC-1052-0003", host:"NGC 1052",  host_type:"E4",   ra:"02:40:59.77", dec:"-08:15:58.3", type:"candidate", method:"HST",          g:25.12, r:24.49, i:24.19, z:24.02, gi:0.93, feh:null,  vr:null, instr:"HST/ACS",    ref:"vanDokkum+2018" },

  /* ── NGC 4552 (M89) · Virgo · d=15.4 Mpc · v_sys=340 km/s ── */
  { id:"EGC-4552-0001", host:"NGC 4552",  host_type:"E0",   ra:"12:35:40.05", dec:"+12:33:22.4", type:"confirmed", method:"spectroscopic", g:23.17, r:22.56, i:22.28, z:22.12, gi:0.89, feh:-1.34, vr:218,  instr:"VLT/MUSE",    ref:"Prashantha+2026"},
  { id:"EGC-4552-0002", host:"NGC 4552",  host_type:"E0",   ra:"12:35:44.62", dec:"+12:34:11.7", type:"confirmed", method:"spectroscopic", g:23.70, r:23.08, i:22.79, z:22.62, gi:0.91, feh:-0.59, vr:462,  instr:"VLT/MUSE",    ref:"Prashantha+2026"},
  { id:"EGC-4552-0003", host:"NGC 4552",  host_type:"E0",   ra:"12:35:35.18", dec:"+12:32:44.0", type:"candidate", method:"JWST",         g:24.91, r:24.29, i:24.00, z:23.83, gi:0.91, feh:null,  vr:null, instr:"JWST/NIRCam", ref:"Lim+2024"        },
];

/* ----------------------------------------------------------
   State
   ---------------------------------------------------------- */
let filtered = [...GC_DATA];
let sortCol  = null;
let sortDir  = 'asc';
let page     = 1;
const PER_PAGE = 15;

/* ----------------------------------------------------------
   Format helpers
   ---------------------------------------------------------- */
function fmtNum(v, dec=2) {
  if (v === null || v === undefined) return '<span style="color:#9198a1">—</span>';
  return Number(v).toFixed(dec);
}

function typeBadge(t) {
  return t === 'confirmed'
    ? '<span class="badge badge-confirmed">Confirmed</span>'
    : '<span class="badge badge-candidate">Candidate</span>';
}

function methodBadge(m) {
  if (m === 'spectroscopic') return '<span class="badge badge-spectro">Spectroscopic</span>';
  if (m === 'HST')           return '<span class="badge badge-hst">HST</span>';
  if (m === 'JWST')          return '<span class="badge badge-jwst">JWST</span>';
  return m;
}

/* ----------------------------------------------------------
   Filter
   ---------------------------------------------------------- */
function applyFilters() {
  const q     = document.getElementById('q-search').value.trim().toLowerCase();
  const fType = document.getElementById('f-type').value;
  const fMeth = document.getElementById('f-method').value;
  const fHost = document.getElementById('f-host').value;

  filtered = GC_DATA.filter(d => {
    if (fType && d.type !== fType) return false;
    if (fMeth && d.method !== fMeth) return false;
    if (fHost && d.host !== fHost) return false;
    if (q) {
      const hay = [d.id, d.host, d.ra, d.dec, d.instr, d.ref].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (sortCol) doSort(sortCol, false);
  page = 1;
  render();
}

/* ----------------------------------------------------------
   Sort
   ---------------------------------------------------------- */
function doSort(col, toggle=true) {
  if (toggle) {
    if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    else { sortCol = col; sortDir = 'asc'; }
  }
  filtered.sort((a, b) => {
    let va = a[col], vb = b[col];
    if (va === null || va === undefined) va = sortDir === 'asc' ?  Infinity : -Infinity;
    if (vb === null || vb === undefined) vb = sortDir === 'asc' ?  Infinity : -Infinity;
    if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    return sortDir === 'asc' ? va - vb : vb - va;
  });
  render();
}

/* ----------------------------------------------------------
   Render table
   ---------------------------------------------------------- */
function render() {
  const tbody = document.getElementById('gc-tbody');
  const start = (page - 1) * PER_PAGE;
  const slice = filtered.slice(start, start + PER_PAGE);

  if (slice.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" class="no-results">No objects match the current filter criteria.</td></tr>';
  } else {
    tbody.innerHTML = slice.map(d => `
      <tr>
        <td class="id-cell">${d.id}</td>
        <td><a href="#">${d.host}</a></td>
        <td class="mono">${d.ra}</td>
        <td class="mono">${d.dec}</td>
        <td>${typeBadge(d.type)}</td>
        <td>${methodBadge(d.method)}</td>
        <td class="num">${fmtNum(d.g)}</td>
        <td class="num">${fmtNum(d.r)}</td>
        <td class="num">${fmtNum(d.i)}</td>
        <td class="num">${fmtNum(d.gi)}</td>
        <td class="num">${fmtNum(d.feh)}</td>
        <td class="num">${d.vr !== null ? d.vr : '<span style="color:#9198a1">—</span>'}</td>
        <td style="font-size:11.5px;color:var(--text-secondary)">${d.instr}</td>
        <td style="font-size:11px;color:var(--text-secondary)">${d.ref}</td>
      </tr>`).join('');
  }

  // Results count
  document.getElementById('results-count').textContent =
    `${filtered.length} object${filtered.length !== 1 ? 's' : ''}`;

  // Sort indicators
  document.querySelectorAll('.data-table thead th[data-col]').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
    if (th.dataset.col === sortCol)
      th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
  });

  renderPagination();
}

/* ----------------------------------------------------------
   Pagination
   ---------------------------------------------------------- */
function renderPagination() {
  const total = Math.ceil(filtered.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE + 1;
  const end   = Math.min(page * PER_PAGE, filtered.length);

  document.getElementById('page-info').textContent =
    filtered.length === 0 ? 'No results' : `Showing ${start}–${end} of ${filtered.length}`;

  const btns = document.getElementById('page-btns');
  let html = `<button class="page-btn" id="pg-prev" ${page===1?'disabled':''}>‹</button>`;
  for (let p = 1; p <= total; p++) {
    html += `<button class="page-btn ${p===page?'active':''}" data-pg="${p}">${p}</button>`;
  }
  html += `<button class="page-btn" id="pg-next" ${page===total||total===0?'disabled':''}>›</button>`;
  btns.innerHTML = html;

  btns.querySelectorAll('[data-pg]').forEach(b =>
    b.addEventListener('click', () => { page = +b.dataset.pg; render(); }));
  const prev = btns.querySelector('#pg-prev');
  const next = btns.querySelector('#pg-next');
  if (prev) prev.addEventListener('click', () => { page--; render(); });
  if (next) next.addEventListener('click', () => { page++; render(); });
}

/* ----------------------------------------------------------
   Download visible data as CSV
   ---------------------------------------------------------- */
function downloadCSV() {
  const cols = ['id','host','host_type','ra','dec','type','method','g','r','i','z','gi','feh','vr','instr','ref'];
  const header = ['GC_ID','Host_Galaxy','Galaxy_Type','RA_J2000','Dec_J2000',
                  'Classification','Detection_Method','g_mag','r_mag','i_mag','z_mag',
                  'g_minus_i','[Fe_H]','v_r_km_s','Instrument','Reference'];
  const rows = filtered.map(d => cols.map(c => d[c] ?? '').join(','));
  const csv  = [header.join(','), ...rows].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], {type:'text/csv'}));
  a.download = 'gc-portal-catalogue-v001.csv';
  a.click();
}

/* ----------------------------------------------------------
   Populate host galaxy dropdown
   ---------------------------------------------------------- */
function populateHostFilter() {
  const hosts = [...new Set(GC_DATA.map(d => d.host))].sort();
  const sel = document.getElementById('f-host');
  hosts.forEach(h => {
    const o = document.createElement('option');
    o.value = h; o.textContent = h;
    sel.appendChild(o);
  });
}

/* ----------------------------------------------------------
   Init
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('gc-tbody')) return; // not catalogue page

  populateHostFilter();

  document.getElementById('q-search').addEventListener('input',  applyFilters);
  document.getElementById('f-type').addEventListener('change',   applyFilters);
  document.getElementById('f-method').addEventListener('change', applyFilters);
  document.getElementById('f-host').addEventListener('change',   applyFilters);

  document.querySelectorAll('.data-table thead th[data-col]').forEach(th =>
    th.addEventListener('click', () => doSort(th.dataset.col)));

  document.getElementById('btn-download').addEventListener('click', downloadCSV);

  render();
});
