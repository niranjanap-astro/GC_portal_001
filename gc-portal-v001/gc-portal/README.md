# GC Portal — v0.01

**Open Extragalactic Globular Cluster Portal**
EAT Group (UFRGS) + LIneA · [eat.ufrgs.br](https://eat.ufrgs.br)

A spectroscopically confirmed catalogue of extragalactic GCs, built as a training
set for LSST photometric classification.

---

## What this is

Static HTML prototype (v0.01) for handoff to LIneA for backend development.
All catalogue data in this version is **mock/demo data** to illustrate the intended
UX and data schema. LIneA will replace the JS data array with a real database API.

## File structure

```
gc-portal/
├── index.html          # Home page — statistics, description, download
├── catalogue.html      # Catalogue browser — filter, sort, paginate, CSV export
├── assets/
│   ├── css/
│   │   └── style.css   # Full design system
│   └── js/
│       └── app.js      # Mock data + client-side filter/sort/pagination
└── README.md
```

## Running locally

Just open `index.html` in a browser. No build step, no dependencies, no server needed.

```bash
# or use Python's built-in server if you prefer:
python3 -m http.server 8000
```

## Data schema

Each GC object has the following fields:

| Field      | Type    | Description                                      |
|------------|---------|--------------------------------------------------|
| id         | string  | Portal GC ID (format: `EGC-HHHH-NNNN`)          |
| host       | string  | Host galaxy name                                 |
| host_type  | string  | Morphological type                               |
| ra         | string  | Right ascension J2000 (HH:MM:SS.ss)             |
| dec        | string  | Declination J2000 (±DD:MM:SS.s)                 |
| type       | string  | `confirmed` or `candidate`                       |
| method     | string  | `spectroscopic`, `HST`, or `JWST`                |
| g, r, i, z | float  | AB magnitudes (SDSS/LSST filters)               |
| gi         | float   | g−i colour index                                 |
| feh        | float   | [Fe/H] metallicity (dex); null if not measured   |
| vr         | int     | Heliocentric radial velocity km/s; null if absent|
| instr      | string  | Instrument used                                  |
| ref        | string  | Primary reference (Author+Year)                  |

## Pages to be added (v0.1+)

- `host-galaxies.html` — host galaxy browser with GC system properties
- `spectra.html` — spectral viewer (MUSE, GMOS, VIMOS)
- `plots.html` — colour distributions, luminosity functions, spatial maps
- `query.html` — cone search / coordinate query interface
- `api.html` — API documentation

## For LIneA backend integration

The current `GC_DATA` array in `assets/js/app.js` should be replaced with an API
call to the backend. A minimal swap would be:

```javascript
// Replace the static array with:
const resp = await fetch('/api/v1/catalogue?limit=500');
const GC_DATA = await resp.json();
```

All filter, sort, and pagination logic is client-side and can remain as-is for
moderate catalogue sizes (~50k objects), or be moved server-side for larger loads.

## Contributors

- Niranjana Prashantha (UFRGS)
- A. Chies-Santos (UFRGS)
- R. S. de Souza
- J. Gschwend (LIneA)
- N. Schweder-Souza
- LSST Star Clusters community

## Citation

Prashantha N. et al. (2026), *The Open Extragalactic GC Portal*, A&A (submitted)
`arXiv:2026.XXXXX`
