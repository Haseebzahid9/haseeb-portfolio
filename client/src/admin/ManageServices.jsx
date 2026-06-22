import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { ICON_KEYS } from '../components/Services';

// Re-use the same inline SVG renderer from Services.jsx
// (copy of IconSVG so admin has no runtime CDN dependency)
function IconSVG({ name, size = 36 }) {
  const r = 8;
  const icons = {
    react: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#20232A"/><circle cx="24" cy="24" r="3.8" fill="#61DAFB"/><ellipse cx="24" cy="24" rx="19" ry="7.2" stroke="#61DAFB" strokeWidth="1.7" fill="none"/><ellipse cx="24" cy="24" rx="19" ry="7.2" stroke="#61DAFB" strokeWidth="1.7" fill="none" transform="rotate(60,24,24)"/><ellipse cx="24" cy="24" rx="19" ry="7.2" stroke="#61DAFB" strokeWidth="1.7" fill="none" transform="rotate(120,24,24)"/></svg>),
    reactnative: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#20232A"/><circle cx="24" cy="24" r="3.8" fill="#61DAFB"/><ellipse cx="24" cy="24" rx="19" ry="7.2" stroke="#61DAFB" strokeWidth="1.7" fill="none"/><ellipse cx="24" cy="24" rx="19" ry="7.2" stroke="#61DAFB" strokeWidth="1.7" fill="none" transform="rotate(60,24,24)"/><ellipse cx="24" cy="24" rx="19" ry="7.2" stroke="#61DAFB" strokeWidth="1.7" fill="none" transform="rotate(120,24,24)"/></svg>),
    nodejs: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1a1a1a"/><text x="24" y="20" textAnchor="middle" fill="#68a063" fontSize="9" fontFamily="Arial" fontWeight="700">NODE</text><text x="24" y="35" textAnchor="middle" fill="#68a063" fontSize="14" fontFamily="Arial" fontWeight="900">.JS</text></svg>),
    python: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1e415e"/><path d="M24 8 C18 8 14 11 14 15 L14 21 L24 21 L24 23 L10 23 C7 23 5 26 5 30 L5 33 C5 37 8 40 13 40 L16 40 L16 35 C16 31 19 28 24 28 C29 28 32 31 32 35 L32 40 L35 40 C40 40 43 37 43 33 L43 30 C43 26 41 23 38 23 L24 23 L24 21 L34 21 L34 15 C34 11 30 8 24 8Z" fill="#4B8BBE"/><path d="M24 40 C30 40 34 37 34 33 L34 27 L24 27 L24 25 L38 25 C41 25 43 22 43 18 L43 15 C43 11 40 8 35 8 L32 8 L32 13 C32 17 29 20 24 20 C19 20 16 17 16 13 L16 8 L13 8 C8 8 5 11 5 15 L5 18 C5 22 7 25 10 25 L24 25 L24 27 L14 27 L14 33 C14 37 18 40 24 40Z" fill="#FFD43B"/><circle cx="19" cy="14" r="1.8" fill="#1e415e"/><circle cx="29" cy="34" r="1.8" fill="#1e415e"/></svg>),
    mongodb: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1a1a1a"/><path d="M24 6 C24 6 33 15 33 26 C33 35 29 42 24 44 C19 42 15 35 15 26 C15 15 24 6 24 6Z" fill="#4DB33D"/><rect x="22.5" y="30" width="3" height="14" rx="1.5" fill="#4DB33D"/></svg>),
    mysql: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#00618A"/><text x="24" y="22" textAnchor="middle" fill="white" fontSize="9" fontFamily="Arial" fontWeight="700">My</text><text x="24" y="35" textAnchor="middle" fill="#F0A500" fontSize="12" fontFamily="Arial" fontWeight="900">SQL</text></svg>),
    postgresql: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#336791"/><text x="24" y="22" textAnchor="middle" fill="white" fontSize="7" fontFamily="Arial" fontWeight="700">Post</text><text x="24" y="35" textAnchor="middle" fill="white" fontSize="9" fontFamily="Arial" fontWeight="900">greSQL</text></svg>),
    javascript: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#F7DF1E"/><text x="24" y="34" textAnchor="middle" fill="#323330" fontSize="22" fontFamily="Arial" fontWeight="900">JS</text></svg>),
    typescript: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#3178C6"/><text x="24" y="34" textAnchor="middle" fill="white" fontSize="22" fontFamily="Arial" fontWeight="900">TS</text></svg>),
    html: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#E44D26"/><path d="M10 8 L13 38 L24 41 L35 38 L38 8Z" fill="#E44D26"/><path d="M24 11 L24 38.5 L33.5 36 L36 11Z" fill="#F16529"/><path d="M24 19 L17 19 L16.5 14 L24 14 L24 9 L11.5 9 L13 30 L24 30Z" fill="white"/><path d="M24 19 L31 19 L30.5 25 L24 26.5 L24 31.5 L30 30 L30.5 24 L36 24 L35 9 L24 9Z" fill="white"/></svg>),
    css: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1572B6"/><path d="M10 8 L13 38 L24 41 L35 38 L38 8Z" fill="#1572B6"/><path d="M24 11 L24 38.5 L33.5 36 L36 11Z" fill="#33A9DC"/><path d="M24 20 L17 20 L16.5 15 L24 15 L24 10 L11 10 L12.5 27 L24 27Z" fill="white"/><path d="M24 20 L31 20 L30.5 26 L24 27.5 L24 32.5 L30.5 31 L31 25 L36.5 25 L35 10 L24 10Z" fill="white"/></svg>),
    tailwind: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#0EA5E9"/><path d="M16 20 C17.3 15.3 20.7 13 24 13 C27.3 13 29.3 14.7 30 18 C31.3 13.3 34.7 11 38 11 C35.3 11 33.3 12.7 32 16 C34.7 18.7 34.7 22 32 24 C30.7 28.7 27.3 31 24 31 C20.7 31 18.7 29.3 18 26 C16.7 30.7 13.3 33 10 33 C12.7 33 14.7 31.3 16 28 C13.3 25.3 13.3 22 16 20Z" fill="white"/><path d="M16 28 C17.3 23.3 20.7 21 24 21 C27.3 21 29.3 22.7 30 26 C31.3 21.3 34.7 19 38 19 C35.3 19 33.3 20.7 32 24 C34.7 26.7 34.7 30 32 32 C30.7 36.7 27.3 39 24 39 C20.7 39 18.7 37.3 18 34 C16.7 38.7 13.3 41 10 41 C12.7 41 14.7 39.3 16 36 C13.3 33.3 13.3 30 16 28Z" fill="white" opacity="0.6"/></svg>),
    figma: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1e1e1e"/><rect x="15" y="6" width="10" height="10" rx="5" fill="#F24E1E"/><rect x="25" y="6" width="10" height="10" rx="5" fill="#FF7262"/><rect x="15" y="16" width="10" height="10" rx="0" fill="#A259FF"/><rect x="15" y="26" width="10" height="10" rx="0" fill="#1ABCFE"/><rect x="15" y="36" width="10" height="10" rx="5" fill="#0ACF83"/><circle cx="30" cy="21" r="5" fill="#FF7262"/></svg>),
    nextjs: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#000"/><circle cx="24" cy="24" r="16" fill="black" stroke="white" strokeWidth="1.5"/><text x="24" y="29" textAnchor="middle" fill="white" fontSize="14" fontFamily="Arial" fontWeight="900">N</text></svg>),
    vuejs: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#35495E"/><polygon points="24,38 8,10 16,10 24,24 32,10 40,10" fill="#41B883"/><polygon points="24,28 16,14 32,14" fill="#35495E"/></svg>),
    angular: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#DD0031"/><polygon points="24,8 39,13 36,34 24,40 12,34 9,13" fill="#C3002F"/><polygon points="24,8 39,13 36,34 24,40 12,34 9,13" fill="none" stroke="white" strokeWidth="1.5"/><polygon points="24,14 32,34 28,34 26,28 22,28 20,34 16,34" fill="white"/><rect x="22" y="22" width="4" height="4" fill="#C3002F"/></svg>),
    sass: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#CC6699"/><text x="24" y="31" textAnchor="middle" fill="white" fontSize="20" fontFamily="Georgia" fontWeight="900" fontStyle="italic">Sass</text></svg>),
    django: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#092E20"/><text x="24" y="32" textAnchor="middle" fill="#44B78B" fontSize="14" fontFamily="Arial" fontWeight="900">Django</text></svg>),
    flask: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1a1a1a"/><path d="M21 8 L21 20 L13 32 C11 35 12 40 16 41 L32 41 C36 40 37 35 35 32 L27 20 L27 8Z" fill="none" stroke="white" strokeWidth="2"/><path d="M14 34 Q24 30 34 34" stroke="#61DAFB" strokeWidth="1.5" fill="none"/><circle cx="17" cy="36" r="2" fill="#61DAFB" opacity="0.7"/></svg>),
    express: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1a1a1a"/><text x="24" y="28" textAnchor="middle" fill="white" fontSize="11" fontFamily="Arial" fontWeight="700">express</text></svg>),
    graphql: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#E10098"/><polygon points="24,10 36,17 36,31 24,38 12,31 12,17" fill="none" stroke="white" strokeWidth="2"/><circle cx="24" cy="10" r="3" fill="white"/><circle cx="36" cy="17" r="3" fill="white"/><circle cx="36" cy="31" r="3" fill="white"/><circle cx="24" cy="38" r="3" fill="white"/><circle cx="12" cy="31" r="3" fill="white"/><circle cx="12" cy="17" r="3" fill="white"/><circle cx="24" cy="24" r="4" fill="white"/></svg>),
    redis: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#D82C20"/><text x="24" y="29" textAnchor="middle" fill="white" fontSize="13" fontFamily="Arial" fontWeight="900">Redis</text></svg>),
    firebase: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1c1c1c"/><path d="M24 8 L13 28 L24 24 L24 8Z" fill="#FFA000"/><path d="M24 8 L24 24 L35 28 L24 8Z" fill="#F57F17" opacity="0.8"/><path d="M13 28 L24 24 L35 28 L24 40Z" fill="#FFCA28"/></svg>),
    sqlite: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#003B57"/><text x="24" y="22" textAnchor="middle" fill="white" fontSize="9" fontFamily="Arial" fontWeight="700">SQLite</text><ellipse cx="24" cy="30" rx="12" ry="5" fill="#68ABDF" opacity="0.6"/></svg>),
    tensorflow: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#FF6F00"/><path d="M24 8 L24 26 L32 21.5 L32 16.5Z" fill="white"/><path d="M24 8 L16 12.5 L16 21.5 L24 26Z" fill="white" opacity="0.7"/><path d="M24 26 L24 40 L32 35.5 L32 30.5Z" fill="white"/><path d="M24 26 L16 30.5 L16 35.5 L24 40Z" fill="white" opacity="0.7"/></svg>),
    pytorch: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#EE4C2C"/><circle cx="24" cy="24" r="13" stroke="white" strokeWidth="2" fill="none"/><circle cx="24" cy="13" r="3" fill="white"/><path d="M24 16 L24 32" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><path d="M17 20 L31 28" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>),
    opencv: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1a1a1a"/><circle cx="18" cy="20" r="7" fill="#4CAF50" opacity="0.9"/><circle cx="30" cy="20" r="7" fill="#2196F3" opacity="0.9"/><circle cx="24" cy="30" r="7" fill="#F44336" opacity="0.9"/></svg>),
    jupyter: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#F37626"/><circle cx="24" cy="10" r="3" fill="white"/><circle cx="36" cy="32" r="3" fill="#979797"/><circle cx="12" cy="32" r="3" fill="#F37626" opacity="0.6"/><text x="24" y="28" textAnchor="middle" fill="white" fontSize="10" fontFamily="Arial" fontWeight="700">Jupyter</text></svg>),
    numpy: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#4DABCF"/><text x="24" y="32" textAnchor="middle" fill="white" fontSize="14" fontFamily="Arial" fontWeight="900">NumPy</text></svg>),
    pandas: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#150458"/><text x="24" y="22" textAnchor="middle" fill="#E70488" fontSize="9" fontFamily="Arial" fontWeight="700">pandas</text><rect x="13" y="26" width="7" height="14" rx="2" fill="#E70488"/><rect x="22" y="26" width="7" height="14" rx="2" fill="white"/><rect x="31" y="26" width="7" height="14" rx="2" fill="#E70488"/></svg>),
    docker: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#0db7ed"/><rect x="8" y="22" width="6" height="5" rx="1" fill="white"/><rect x="16" y="22" width="6" height="5" rx="1" fill="white"/><rect x="24" y="22" width="6" height="5" rx="1" fill="white"/><rect x="16" y="15" width="6" height="5" rx="1" fill="white"/><rect x="24" y="15" width="6" height="5" rx="1" fill="white"/><rect x="24" y="8" width="6" height="5" rx="1" fill="white"/><path d="M8 29 C8 35 14 36 14 36 L34 36 C40 36 43 29 43 29 C40 27 37 27 35 27 C33 20 27 22 26 25 C24 21 18 21 18 25 C12 23 9 25 8 29Z" fill="white"/></svg>),
    linux: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1a1a1a"/><ellipse cx="24" cy="20" rx="10" ry="13" fill="#F5C518"/><circle cx="20" cy="18" r="2.5" fill="#1a1a1a"/><circle cx="28" cy="18" r="2.5" fill="#1a1a1a"/><path d="M20 24 Q24 27 28 24" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M16 32 C14 28 16 26 18 28 C19 25 21 24 24 24 C27 24 29 25 30 28 C32 26 34 28 32 32 C30 34 28 38 24 38 C20 38 18 34 16 32Z" fill="#F5C518"/></svg>),
    bash: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#293138"/><text x="20" y="28" textAnchor="middle" fill="#4EAA25" fontSize="16" fontFamily="monospace" fontWeight="900">$_</text></svg>),
    git: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#F05032"/><path d="M41 22.5 L25.5 7 C24.6 6.1 23.2 6.1 22.3 7 L19.1 10.2 L23.2 14.3 C24.2 14 25.3 14.2 26.1 15 C26.9 15.8 27.1 16.9 26.8 17.9 L30.7 21.8 C31.7 21.5 32.8 21.7 33.6 22.5 C34.8 23.7 34.8 25.7 33.6 26.9 C32.4 28.1 30.4 28.1 29.2 26.9 C28.3 26 28.1 24.7 28.6 23.6 L24.9 19.9 L24.9 30.3 C25.2 30.4 25.5 30.6 25.7 30.9 C26.9 32.1 26.9 34.1 25.7 35.3 C24.5 36.5 22.5 36.5 21.3 35.3 C20.1 34.1 20.1 32.1 21.3 30.9 C21.6 30.6 22 30.4 22.4 30.2 L22.4 19.7 C22 19.5 21.6 19.3 21.3 19 C20.4 18.1 20.2 16.8 20.6 15.7 L16.6 11.7 L7 21.3 C6.1 22.2 6.1 23.6 7 24.5 L22.5 40 C23.4 40.9 24.8 40.9 25.7 40 L41 24.7 C41.9 23.7 41.9 23.4 41 22.5Z" fill="white"/></svg>),
    github: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#24292e"/><path d="M24 7 C14.6 7 7 14.6 7 24 C7 31.6 11.9 38 18.8 40.3 C19.6 40.5 19.9 40 19.9 39.6 L19.9 36.7 C15.4 37.7 14.5 34.7 14.5 34.7 C13.8 32.9 12.7 32.4 12.7 32.4 C11.2 31.4 12.8 31.4 12.8 31.4 C14.4 31.5 15.3 33.1 15.3 33.1 C16.7 35.5 19 34.8 19.9 34.4 C20 33.3 20.5 32.6 21 32.2 C17.3 31.8 13.4 30.3 13.4 23.9 C13.4 22.2 14 20.8 15 19.7 C14.8 19.3 14.3 17.6 15.2 15.4 C15.2 15.4 16.6 15 19.9 17.1 C21.3 16.7 22.7 16.5 24 16.5 C25.3 16.5 26.7 16.7 28.1 17.1 C31.4 15 32.8 15.4 32.8 15.4 C33.7 17.6 33.2 19.3 33 19.7 C34 20.8 34.6 22.2 34.6 23.9 C34.6 30.3 30.7 31.8 27 32.2 C27.6 32.7 28.1 33.7 28.1 35.2 L28.1 39.6 C28.1 40 28.4 40.5 29.2 40.3 C36.1 38 41 31.6 41 24 C41 14.6 33.4 7 24 7Z" fill="white"/></svg>),
    nginx: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#009900"/><text x="24" y="29" textAnchor="middle" fill="white" fontSize="11" fontFamily="Arial" fontWeight="700">nginx</text></svg>),
    kubernetes: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#326CE5"/><polygon points="24,8 38,16 38,32 24,40 10,32 10,16" fill="none" stroke="white" strokeWidth="2"/><text x="24" y="28" textAnchor="middle" fill="white" fontSize="10" fontFamily="Arial" fontWeight="700">K8s</text></svg>),
    aws: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#232F3E"/><text x="24" y="22" textAnchor="middle" fill="#FF9900" fontSize="8" fontFamily="Arial" fontWeight="900">Amazon</text><text x="24" y="34" textAnchor="middle" fill="#FF9900" fontSize="12" fontFamily="Arial" fontWeight="900">AWS</text></svg>),
    flutter: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#1a1a2e"/><polygon points="12,24 24,12 36,24 30,30 24,24" fill="#54C5F8"/><polygon points="24,24 30,30 24,36 18,30" fill="#54C5F8"/><polygon points="24,36 30,30 36,36 30,42" fill="#01579B"/></svg>),
    android: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#3DDC84"/><rect x="16" y="22" width="16" height="14" rx="3" fill="white"/><circle cx="20" cy="26" r="1.5" fill="#3DDC84"/><circle cx="28" cy="26" r="1.5" fill="#3DDC84"/><rect x="14" y="24" width="3" height="8" rx="1.5" fill="white"/><rect x="31" y="24" width="3" height="8" rx="1.5" fill="white"/><path d="M18 22 C18 16 30 16 30 22" fill="none" stroke="white" strokeWidth="2"/></svg>),
    swift: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#F05138"/><path d="M36 14 C36 14 28 8 16 14 C10 17 8 24 12 30 C14 33 16 35 16 35 C16 35 14 32 15 29 C16 26 19 25 22 27 C28 31 38 28 40 20 C37 23 33 22 30 20 C26 17 24 12 36 14Z" fill="white"/></svg>),
    cpp: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#00599C"/><text x="22" y="30" textAnchor="middle" fill="white" fontSize="20" fontFamily="Arial" fontWeight="900">C</text><text x="37" y="24" textAnchor="middle" fill="white" fontSize="13" fontFamily="Arial" fontWeight="900">+</text><text x="37" y="34" textAnchor="middle" fill="white" fontSize="13" fontFamily="Arial" fontWeight="900">+</text></svg>),
    c: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#A8B9CC"/><text x="24" y="32" textAnchor="middle" fill="#003B6F" fontSize="28" fontFamily="Arial" fontWeight="900">C</text></svg>),
    java: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#007396"/><path d="M21 10 C19 15 14 17 14 22 C14 27 21 29 21 29 C17 27 17 23 17 23 C17 19 22 17 21 10Z" fill="white"/><path d="M17 32 C17 32 15 33 18 34 C21 35 27 35 30 34 C33 33 31 32 31 32 C28 33 23 33 20 32Z" fill="white"/><path d="M16 35 C14 36.5 17 37 21 38 C25 38.5 31 37 31 35 C28 36 23 36 19 35Z" fill="white"/></svg>),
    csharp: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#9B4F96"/><text x="18" y="30" textAnchor="middle" fill="white" fontSize="18" fontFamily="Arial" fontWeight="900">C</text><text x="33" y="24" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial" fontWeight="900">#</text></svg>),
    rust: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#CE412B"/><text x="24" y="32" textAnchor="middle" fill="white" fontSize="24" fontFamily="Arial" fontWeight="900">Rs</text></svg>),
    go: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#00ADD8"/><text x="24" y="32" textAnchor="middle" fill="white" fontSize="26" fontFamily="Arial" fontWeight="900">Go</text></svg>),
    php: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#777BB3"/><text x="24" y="32" textAnchor="middle" fill="white" fontSize="20" fontFamily="Arial" fontWeight="900">PHP</text></svg>),
    ruby: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#CC342D"/><text x="24" y="32" textAnchor="middle" fill="white" fontSize="20" fontFamily="Arial" fontWeight="900">rb</text></svg>),
    kotlin: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#7F52FF"/><polygon points="8,8 28,8 8,28" fill="white"/><polygon points="8,28 28,8 40,40 8,40" fill="white" opacity="0.75"/></svg>),
    kali: (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill="#268BEE"/><path d="M12 36 L24 12 L36 36 L30 36 L24 24 L18 36Z" fill="white"/><rect x="18" y="38" width="12" height="3" rx="1.5" fill="white"/></svg>),
  };

  if (icons[name]) return icons[name];
  const colors = ['#0dcaf0','#6f42c1','#fd7e14','#20c997','#0d6efd','#d63384'];
  const bg = colors[(name.charCodeAt(0) || 0) % colors.length];
  return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx={r} fill={bg}/><text x="24" y="31" textAnchor="middle" fill="white" fontSize="18" fontFamily="Arial" fontWeight="900">{name.slice(0,2).toUpperCase()}</text></svg>);
}

const iconGroups = [
  { label: 'Frontend',   keys: ['react','html','css','javascript','typescript','tailwind','figma','nextjs','vuejs','angular','sass'] },
  { label: 'Backend',    keys: ['nodejs','python','django','flask','express','graphql'] },
  { label: 'Database',   keys: ['mongodb','mysql','postgresql','redis','firebase','sqlite'] },
  { label: 'AI / ML',   keys: ['tensorflow','pytorch','opencv','jupyter','numpy','pandas'] },
  { label: 'DevOps',    keys: ['docker','linux','bash','git','github','nginx','kubernetes','aws'] },
  { label: 'Mobile',    keys: ['flutter','android','swift','reactnative'] },
  { label: 'Languages', keys: ['cpp','c','java','csharp','rust','go','php','ruby','kotlin'] },
  { label: 'Security',  keys: ['kali'] },
];

const empty = { title: '', description: '', icon: 'react', tags: '' };

const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', marginBottom: 14, boxSizing: 'border-box' };

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [form, setForm]         = useState(empty);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => api.get('/services').then(({ data }) => setServices(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editing) { await api.put(`/services/${editing}`, payload); toast.success('Updated'); }
      else         { await api.post('/services', payload);           toast.success('Added'); }
      setForm(empty); setEditing(null); setShowForm(false); load();
    } catch { toast.error('Save failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/services/${id}`); toast.success('Deleted'); load();
  };

  const handleEdit = (s) => {
    setForm({ title: s.title, description: s.description, icon: s.icon, tags: (s.tags || []).join(', ') });
    setEditing(s._id); setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Manage Services</h2>
        <button className="btn-primary" onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}>
          <i className={`fas fa-${showForm ? 'times' : 'plus'}`} /> {showForm ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: '1rem' }}>{editing ? 'Edit Service' : 'New Service'}</h3>
          <form onSubmit={handleSubmit}>
            <input style={inputStyle} placeholder="Service title *" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} placeholder="Description *"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.82rem', color: '#555', display: 'block', marginBottom: 5 }}>
                Tags <span style={{ color: '#aaa' }}>(comma separated)</span>
              </label>
              <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="React.js, Tailwind CSS, JavaScript"
                value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              {form.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                    <span key={tag} style={{ padding: '2px 10px', border: '1px solid var(--primary)', borderRadius: 20, color: 'var(--primary)', fontSize: '0.75rem', background: 'rgba(13,202,240,0.05)' }}>{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Icon picker — real SVG logos */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: '0.85rem', color: '#555', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                Icon:
                <IconSVG name={form.icon} size={30} />
                <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.82rem' }}>{form.icon}</span>
              </label>

              {iconGroups.map(({ label, keys }) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: 700, letterSpacing: 0.6, marginBottom: 6, textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {keys.map((ic) => (
                      <button type="button" key={ic} title={ic}
                        onClick={() => setForm({ ...form, icon: ic })}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                          padding: '8px 10px', borderRadius: 10, cursor: 'pointer', minWidth: 62,
                          border: form.icon === ic ? '2px solid var(--primary)' : '2px solid #ececec',
                          background: form.icon === ic ? 'rgba(13,202,240,0.06)' : '#fafafa',
                          boxShadow: form.icon === ic ? '0 0 0 3px rgba(13,202,240,0.12)' : 'none',
                          transition: 'all 0.15s',
                        }}
                      >
                        <IconSVG name={ic} size={34} />
                        <span style={{ fontSize: '0.6rem', color: form.icon === ic ? 'var(--primary)' : '#888', fontWeight: form.icon === ic ? 700 : 400, fontFamily: 'Poppins' }}>
                          {ic}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" className="btn-primary"><i className="fas fa-save" /> Save</button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {services.map((s) => (
          <div key={s._id} style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderLeft: '3px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <IconSVG name={s.icon} size={36} />
                <h3 style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{s.title}</h3>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => handleEdit(s)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><i className="fas fa-edit" /></button>
                <button onClick={() => handleDelete(s._id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}><i className="fas fa-trash" /></button>
              </div>
            </div>
            <p style={{ color: '#777', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: 10 }}>{s.description}</p>
            {s.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.tags.map(tag => (
                  <span key={tag} style={{ padding: '2px 10px', border: '1px solid var(--primary)', borderRadius: 20, color: 'var(--primary)', fontSize: '0.73rem', background: 'rgba(13,202,240,0.05)' }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
