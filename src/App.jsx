
import { useState, useEffect } from "react";
import nylaLogo from "./assets/nyla-logo.png";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --rose: #C8506A; --blush: #E8A0AF; --cream: #FBF7F4;
    --sand: #F2E8E0; --dark: #1E1218; --muted: #7A5F68; --white: #FFFFFF;
    --gold: #C9A96E; --green: #4A7C59; --cycle: #9B4F7A; --cycle-mid: #D4A0C0;
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--dark); }
  .app { min-height: 100vh; background: var(--cream); overflow-x: hidden; padding-bottom: 90px; }

  .nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 22px; background: var(--dark); position: sticky; top: 0; z-index: 100; }
  .logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--white); letter-spacing: 1px; }
  .logo em { font-style: italic; color: var(--blush); }
  .welcome-logo{
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 40px;
  margin-top: 40px;
  opacity: 0.98;
  filter: drop-shadow(0 0 25px rgba(255,180,210,0.18));
  background: transparent;
}
  .nav-right { display: flex; gap: 8px; align-items: center; }
  .week-badge { background: transparent; color: var(--blush); font-size: 12px; font-weight: 500; padding: 5px 12px; border-radius: 20px; border: 1px solid var(--blush); cursor: pointer; }
  .cycle-btn { background: var(--cycle); color: white; font-size: 11px; font-weight: 500; padding: 5px 11px; border-radius: 20px; border: none; cursor: pointer; }
  .cycle-btn.off { background: transparent; color: var(--cycle-mid); border: 1px solid var(--cycle-mid); }

  .overlay { position: fixed; inset: 0; background: #1E121888; z-index: 200; display: flex; align-items: flex-end; }
  .modal { background: var(--cream); border-radius: 28px 28px 0 0; padding: 28px; width: 100%; animation: slideUp 0.3s ease; max-height: 82vh; overflow-y: auto; }
  @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--dark); margin-bottom: 4px; }
  .modal-sub { font-size: 12px; color: var(--muted); margin-bottom: 18px; }
  .week-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
  .week-option { padding: 14px 6px; border-radius: 16px; border: 1.5px solid #EDE0D8; background: var(--white); cursor: pointer; text-align: center; transition: all 0.2s; }
  .week-option.active { background: var(--dark); border-color: var(--dark); }
  .week-option.active .wo-num,.week-option.active .wo-label,.week-option.active .wo-series,.week-option.active .wo-cardio { color: white; }
  .wo-num { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: var(--dark); }
  .wo-label { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-top: 2px; }
  .wo-series { font-size: 10px; font-weight: 600; color: var(--rose); margin-top: 3px; }
  .wo-cardio { font-size: 9px; color: var(--muted); margin-top: 1px; }
  .modal-close { width: 100%; padding: 14px; border-radius: 14px; background: var(--sand); color: var(--dark); font-family: 'DM Sans', sans-serif; font-size: 14px; border: none; cursor: pointer; }

  .hero { background: var(--dark); padding: 22px 22px 26px; position: relative; overflow: hidden; }
  .hero::after { content: 'N'; position: absolute; right: -10px; top: -20px; font-family: 'Cormorant Garamond', serif; font-size: 160px; color: rgba(255,255,255,0.03); font-weight: 700; }
  .hero-eyebrow { font-size: 10px; color: var(--blush); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
  .hero h1 { font-family: 'Cormorant Garamond', serif; font-size: 28px; line-height: 1.15; color: var(--white); margin-bottom: 14px; }
  .hero h1 em { font-style: italic; color: var(--blush); }
  .hero-stats { display: flex; gap: 18px; }
  .h-stat { text-align: center; }
  .h-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: var(--white); }
  .h-stat-label { font-size: 9px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
  .h-divider { width: 1px; background: rgba(255,255,255,0.1); }

  .cycle-hero { background: linear-gradient(135deg, #6B2850 0%, #9B4F7A 50%, #C8809A 100%); padding: 22px 22px 26px; position: relative; overflow: hidden; }
  .cycle-hero::after { content: '🌸'; position: absolute; right: 10px; top: 10px; font-size: 80px; opacity: 0.15; }
  .cycle-hero-eyebrow { font-size: 10px; color: rgba(255,255,255,0.6); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
  .cycle-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: 26px; line-height: 1.2; color: white; margin-bottom: 8px; }
  .cycle-hero h1 em { font-style: italic; color: #FFD6E8; }
  .cycle-hero-sub { font-size: 12px; color: rgba(255,255,255,0.65); line-height: 1.5; margin-bottom: 14px; }
  .cycle-day-pills { display: flex; gap: 8px; }
  .cdp { padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.25); font-size: 11px; color: rgba(255,255,255,0.6); cursor: pointer; background: transparent; transition: all 0.2s; }
  .cdp.active { background: white; color: var(--cycle); font-weight: 600; border-color: white; }

  .progress-wrap { padding: 14px 22px 4px; }
  .progress-track { height: 4px; background: #EDE0D8; border-radius: 10px; margin-top: 6px; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, var(--rose), var(--blush)); border-radius: 10px; transition: width 0.4s; }
  .progress-labels { display: flex; justify-content: space-between; font-size: 10px; color: var(--muted); }

  .week-strip { display: flex; gap: 8px; padding: 10px 22px 4px; overflow-x: auto; scrollbar-width: none; }
  .week-strip::-webkit-scrollbar { display: none; }
  .ws-dot { display: flex; flex-direction: column; align-items: center; gap: 3px; flex-shrink: 0; cursor: pointer; }
  .ws-circle { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid #EDE0D8; background: var(--white); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: var(--muted); transition: all 0.2s; }
  .ws-circle.current { background: var(--dark); border-color: var(--dark); color: white; }
  .ws-circle.done { background: #EAF4ED; border-color: var(--green); color: var(--green); }
  .ws-label { font-size: 9px; color: var(--muted); }

  .tab-nav { display: flex; padding: 12px 22px 0; gap: 0; overflow-x: auto; scrollbar-width: none; }
  .tab-nav::-webkit-scrollbar { display: none; }
  .tab-btn { flex-shrink: 0; padding: 10px 10px; background: none; border: none; border-bottom: 2px solid #EDE0D8; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; color: var(--muted); cursor: pointer; text-align: center; transition: all 0.2s; white-space: nowrap; }
  .tab-btn.active { border-bottom-color: var(--rose); color: var(--rose); font-weight: 600; }

  .days-scroll { display: flex; gap: 8px; padding: 14px 22px 6px; overflow-x: auto; scrollbar-width: none; }
  .days-scroll::-webkit-scrollbar { display: none; }
  .day-pill { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 9px 11px; border-radius: 14px; border: 1.5px solid #EDE0D8; background: var(--white); cursor: pointer; transition: all 0.2s; min-width: 54px; flex-shrink: 0; }
  .day-pill.active { background: var(--dark); border-color: var(--dark); }
  .day-pill.active .dp-name,.day-pill.active .dp-num { color: white; }
  .dp-name { font-size: 9px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--muted); }
  .dp-num { font-size: 15px; font-weight: 700; color: var(--dark); }

  .series-banner { margin: 12px 22px 0; background: var(--dark); border-radius: 16px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
  .sb-text { flex: 1; }
  .sb-title { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: white; margin-bottom: 3px; }
  .sb-sub { font-size: 11px; color: rgba(255,255,255,0.45); line-height: 1.4; }
  .sb-badge { background: var(--rose); color: white; font-size: 13px; font-weight: 700; padding: 7px 13px; border-radius: 12px; white-space: nowrap; text-align: center; line-height: 1.3; }
  .sb-badge small { display: block; font-size: 9px; font-weight: 400; opacity: 0.8; }

  .section { padding: 16px 22px 0; }
  .section-label { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }

  .block-card { background: var(--white); border-radius: 20px; overflow: hidden; border: 1px solid #EDE0D8; box-shadow: 0 2px 10px #00000006; margin-bottom: 12px; }
  .block-top { padding: 14px 18px; }
  .block-top-title { font-family: 'Cormorant Garamond', serif; font-size: 16px; margin-bottom: 3px; }
  .block-top-sub { font-size: 11px; }
  .block-body { padding: 6px 18px 8px; }

  .simple-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #F5EDE8; }
  .simple-row:last-child { border-bottom: none; }
  .simple-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .simple-info { flex: 1; }
  .simple-name { font-size: 13px; font-weight: 500; color: var(--dark); }
  .simple-tip { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .simple-reps { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 10px; white-space: nowrap; }

  .ex-block { border-bottom: 1px solid #F5EDE8; padding: 12px 0; }
  .ex-block:last-child { border-bottom: none; }
  .ex-header { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
  .ex-num { width: 25px; height: 25px; border-radius: 50%; background: var(--sand); color: var(--rose); font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .ex-info { flex: 1; }
  .ex-name { font-size: 13px; font-weight: 600; color: var(--dark); margin-bottom: 2px; }
  .ex-tip { font-size: 11px; color: var(--muted); line-height: 1.4; }
  .ex-sets-badge { font-size: 11px; font-weight: 700; color: var(--rose); background: #F5E0E4; padding: 4px 9px; border-radius: 10px; white-space: nowrap; flex-shrink: 0; }

  .weight-tracker { display: flex; align-items: center; gap: 10px; background: var(--sand); border-radius: 12px; padding: 9px 12px; }
  .wt-label { font-size: 11px; color: var(--muted); flex: 1; }
  .wt-prev { font-size: 10px; color: var(--muted); margin-top: 2px; }
  .w-pr { font-size: 10px; color: var(--green); font-weight: 600; background: #EAF4ED; padding: 1px 6px; border-radius: 8px; margin-left: 4px; }
  .weight-controls { display: flex; align-items: center; gap: 7px; }
  .w-btn { width: 30px; height: 30px; border-radius: 50%; background: var(--white); border: 1.5px solid var(--blush); color: var(--rose); font-size: 18px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
  .w-btn:active { background: var(--rose); color: white; border-color: var(--rose); }
  .w-val { font-size: 14px; font-weight: 700; color: var(--dark); min-width: 50px; text-align: center; }
  .w-unit { font-size: 10px; color: var(--muted); font-weight: 400; }

  /* CARDIO CARDS */
  .cardio-card { background: var(--dark); border-radius: 20px; padding: 20px; margin-bottom: 12px; position: relative; overflow: hidden; }
  .cardio-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: white; margin-bottom: 4px; }
  .cardio-duration { font-size: 32px; font-weight: 700; color: var(--blush); font-family: 'Cormorant Garamond', serif; line-height: 1; margin-bottom: 4px; }
  .cardio-sub { font-size: 11px; color: rgba(255,255,255,0.45); margin-bottom: 12px; }
  .cardio-options { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
  .cardio-tag { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.65); font-size: 11px; padding: 5px 11px; border-radius: 20px; }
  .cardio-progress-label { display: flex; justify-content: space-between; font-size: 10px; color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .cardio-track { height: 4px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
  .cardio-fill { height: 100%; background: linear-gradient(90deg, var(--blush), var(--rose)); border-radius: 10px; transition: width 0.4s; }

  /* TREADMILL CARD */
  .treadmill-card { background: var(--white); border-radius: 20px; overflow: hidden; border: 1px solid #EDE0D8; margin-bottom: 12px; }
  .treadmill-header { background: linear-gradient(135deg, #1E1218 0%, #3A2030 100%); padding: 16px 20px; display: flex; align-items: center; gap: 12px; }
  .th-icon { font-size: 28px; }
  .th-text { flex: 1; }
  .th-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; color: white; margin-bottom: 3px; }
  .th-sub { font-size: 11px; color: rgba(255,255,255,0.5); }
  .treadmill-stats { display: flex; padding: 14px 20px; gap: 0; border-bottom: 1px solid #F5EDE8; }
  .ts-item { flex: 1; text-align: center; }
  .ts-item + .ts-item { border-left: 1px solid #F5EDE8; }
  .ts-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: var(--dark); }
  .ts-label { font-size: 10px; color: var(--muted); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
  .ts-unit { font-size: 11px; color: var(--muted); font-weight: 400; }
  .treadmill-phases { padding: 12px 20px 16px; }
  .tp-label { font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
  .tp-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #F5EDE8; }
  .tp-row:last-child { border-bottom: none; }
  .tp-time { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; color: var(--dark); min-width: 60px; }
  .tp-info { flex: 1; }
  .tp-name { font-size: 12px; font-weight: 500; color: var(--dark); margin-bottom: 2px; }
  .tp-detail { font-size: 11px; color: var(--muted); }
  .tp-badge { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 10px; white-space: nowrap; }
  .tp-intensity { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  /* GREETING NAME */
  .name-setup { position: fixed; inset: 0; background: var(--dark); z-index: 500; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 28px; text-align: center; background-image: radial-gradient(ellipse at 80% 20%, #3A182820 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #C8506A12 0%, transparent 60%); }
  .ns-logo { font-family: 'Cormorant Garamond', serif; font-size: 24px; color: rgba(255,255,255,0.35); margin-bottom: 32px; letter-spacing: 2px; text-transform: uppercase; }
  .ns-logo em { font-style: italic; color: var(--blush); }
  .ns-emoji { font-size: 44px; margin-bottom: 20px; }
  .ns-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: white; line-height: 1.25; margin-bottom: 18px; }
  .ns-title em { font-style: italic; color: var(--blush); }
  .ns-sub { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.75; margin-bottom: 38px; max-width: 300px; }
  .ns-sub strong { color: rgba(255,255,255,0.75); font-weight: 500; }
  .ns-divider { width: 40px; height: 1px; background: rgba(255,255,255,0.15); margin: 0 auto 28px; }
  .ns-input { width: 100%; padding: 16px 20px; border-radius: 16px; border: 1.5px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); font-family: 'Cormorant Garamond', serif; font-size: 22px; color: white; outline: none; text-align: center; margin-bottom: 14px; transition: border-color 0.2s; }
  .ns-input::placeholder { color: rgba(255,255,255,0.2); }
  .ns-input:focus { border-color: var(--blush); background: rgba(255,255,255,0.09); }
  .ns-btn { width: 100%; padding: 16px; border-radius: 16px; background: linear-gradient(135deg, var(--rose) 0%, #9B4F7A 100%); color: white; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; border: none; cursor: pointer; box-shadow: 0 8px 28px #C8506A35; letter-spacing: 0.3px; }
  .ns-skip { margin-top: 16px; font-size: 12px; color: rgba(255,255,255,0.25); cursor: pointer; background: none; border: none; letter-spacing: 0.5px; }
  .hero-greeting { font-size: 13px; color: rgba(255,255,255,0.45); margin-bottom: 4px; font-style: italic; letter-spacing: 0.3px; }
  .hero-name-btn { background: none; border: none; cursor: pointer; }

  /* AFFIRMATIONS TAB */
  .affirmations-hero { background: linear-gradient(145deg, #1E1218 0%, #3A1828 50%, #C8506A22 100%); padding: 32px 22px 28px; position: relative; overflow: hidden; }
  .affirmations-hero::before { content: '✦'; position: absolute; right: 20px; top: 20px; font-size: 80px; color: rgba(232,160,175,0.08); }
  .affirmations-hero::after { content: '✦'; position: absolute; left: 10px; bottom: -10px; font-size: 50px; color: rgba(232,160,175,0.05); }
  .aff-eyebrow { font-size: 10px; color: var(--blush); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
  .aff-hero-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; line-height: 1.2; color: white; margin-bottom: 8px; }
  .aff-hero-title em { font-style: italic; color: var(--blush); }
  .aff-hero-sub { font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.6; }

  /* AFFIRMATION OF THE DAY */
  .aotd-card { margin: 16px 22px 0; background: linear-gradient(135deg, #C8506A 0%, #9B4F7A 100%); border-radius: 24px; padding: 28px 24px; position: relative; overflow: hidden; }
  .aotd-card::before { content: '"'; position: absolute; top: -10px; left: 16px; font-family: 'Cormorant Garamond', serif; font-size: 100px; color: rgba(255,255,255,0.08); line-height: 1; }
  .aotd-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 14px; }
  .aotd-text { font-family: 'Cormorant Garamond', serif; font-size: 24px; line-height: 1.35; color: white; font-style: italic; margin-bottom: 20px; }
  .aotd-footer { display: flex; justify-content: space-between; align-items: center; }
  .aotd-category { font-size: 10px; color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 20px; }
  .aotd-btn { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: white; font-size: 12px; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .aotd-btn:active { background: rgba(255,255,255,0.25); }

  /* AFF CATEGORIES */
  .aff-cat-scroll { display: flex; gap: 8px; padding: 16px 22px 4px; overflow-x: auto; scrollbar-width: none; }
  .aff-cat-scroll::-webkit-scrollbar { display: none; }
  .aff-cat-pill { padding: 7px 16px; border-radius: 20px; border: 1.5px solid #EDE0D8; background: var(--white); font-size: 12px; color: var(--muted); cursor: pointer; white-space: nowrap; transition: all 0.2s; flex-shrink: 0; }
  .aff-cat-pill.active { background: var(--dark); border-color: var(--dark); color: white; }

  /* AFF CARDS */
  .aff-grid { padding: 12px 22px 24px; display: flex; flex-direction: column; gap: 10px; }
  .aff-card { background: var(--white); border-radius: 18px; padding: 20px; border: 1px solid #EDE0D8; position: relative; overflow: hidden; cursor: pointer; transition: all 0.2s; }
  .aff-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; border-radius: 4px 0 0 4px; }
  .aff-card.love::before { background: var(--rose); }
  .aff-card.strength::before { background: var(--gold); }
  .aff-card.mindset::before { background: var(--green); }
  .aff-card.active-card { transform: scale(0.98); }
  .aff-card-text { font-family: 'Cormorant Garamond', serif; font-size: 18px; line-height: 1.4; color: var(--dark); font-style: italic; margin-bottom: 10px; padding-left: 4px; }
  .aff-card-footer { display: flex; align-items: center; gap: 8px; padding-left: 4px; }
  .aff-card-cat { font-size: 10px; font-weight: 500; padding: 3px 9px; border-radius: 10px; }
  .aff-card-cat.love { color: var(--rose); background: #F5E0E4; }
  .aff-card-cat.strength { color: #8B6914; background: #FDF3E0; }
  .aff-card-cat.mindset { color: var(--green); background: #EAF4ED; }
  .aff-fav { margin-left: auto; font-size: 18px; cursor: pointer; transition: transform 0.2s; }
  .aff-fav:active { transform: scale(1.3); }

  /* CYCLE */
  .cycle-info-card { background: linear-gradient(135deg, #6B2850 0%, #9B4F7A 100%); border-radius: 20px; padding: 20px; margin-bottom: 12px; }
  .cic-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; color: white; margin-bottom: 4px; }
  .cic-sub { font-size: 11px; color: rgba(255,255,255,0.6); line-height: 1.5; margin-bottom: 14px; }
  .cic-tips { display: flex; flex-direction: column; gap: 8px; }
  .cic-tip { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 10px 12px; }
  .cic-tip-icon { font-size: 16px; }
  .cic-tip-text { font-size: 12px; color: rgba(255,255,255,0.85); line-height: 1.4; }
  .cycle-block-card { background: var(--white); border-radius: 20px; overflow: hidden; border: 1px solid #E8C8DA; box-shadow: 0 2px 10px #9B4F7A10; margin-bottom: 12px; }
  .cycle-section-label { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--cycle); margin-bottom: 10px; }
  .cycle-walk-card { background: linear-gradient(135deg, #9B4F7A 0%, #C8809A 100%); border-radius: 20px; padding: 20px; margin-bottom: 12px; position: relative; overflow: hidden; }
  .cycle-walk-card::after { content: '🚶‍♀️'; position: absolute; right: 16px; top: 50%; transform: translateY(-50%); font-size: 40px; opacity: 0.2; }
  .cwc-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: white; margin-bottom: 4px; }
  .cwc-duration { font-size: 32px; font-weight: 700; color: #FFD6E8; font-family: 'Cormorant Garamond', serif; line-height: 1; margin-bottom: 4px; }
  .cwc-sub { font-size: 11px; color: rgba(255,255,255,0.55); margin-bottom: 12px; }
  .cwc-tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .cwc-tag { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.75); font-size: 11px; padding: 5px 11px; border-radius: 20px; }

  .wod-btn { width: 100%; margin-top: 14px; padding: 15px; border-radius: 14px; background: var(--rose); color: white; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; border: none; cursor: pointer; box-shadow: 0 6px 20px #C8506A28; transition: all 0.2s; }
  .wod-btn.done { background: var(--green); box-shadow: 0 6px 20px #4A7C5928; }
  .wod-btn.cycle { background: var(--cycle); box-shadow: 0 6px 20px #9B4F7A28; }
  .wod-btn.cycle.done { background: var(--green); }

  .protein-banner { background: var(--dark); border-radius: 16px; padding: 16px 18px; margin-bottom: 14px; display: flex; align-items: center; gap: 14px; }
  .pb-icon { font-size: 28px; }
  .pb-text { flex: 1; }
  .pb-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; color: white; margin-bottom: 3px; }
  .pb-sub { font-size: 11px; color: rgba(255,255,255,0.45); line-height: 1.4; }
  .pb-badge { background: var(--gold); color: white; font-size: 14px; font-weight: 700; padding: 8px 12px; border-radius: 12px; text-align: center; white-space: nowrap; line-height: 1.3; }
  .pb-badge small { display: block; font-size: 9px; font-weight: 400; opacity: 0.8; }
  .meal-card { background: var(--white); border-radius: 18px; overflow: hidden; border: 1px solid #EDE0D8; margin-bottom: 10px; }
  .meal-header { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-bottom: 1px solid #F5EDE8; }
  .meal-icon { font-size: 22px; }
  .meal-title { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: var(--dark); flex: 1; }
  .meal-protein { font-size: 11px; font-weight: 700; color: var(--rose); background: #F5E0E4; padding: 3px 9px; border-radius: 10px; }
  .meal-options { padding: 10px 16px 12px; }
  .meal-option { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid #F5EDE8; }
  .meal-option:last-child { border-bottom: none; }
  .mo-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); flex-shrink: 0; margin-top: 5px; }
  .mo-text { flex: 1; font-size: 12px; color: var(--dark); line-height: 1.5; }
  .mo-prot { font-size: 10px; font-weight: 600; color: var(--gold); white-space: nowrap; }
  .suppl-card { background: var(--white); border-radius: 18px; overflow: hidden; border: 1px solid #EDE0D8; margin-bottom: 10px; }
  .suppl-header { padding: 14px 16px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #F5EDE8; }
  .suppl-icon { font-size: 20px; }
  .suppl-title { font-family: 'Cormorant Garamond', serif; font-size: 15px; color: var(--dark); flex: 1; }
  .suppl-timing { font-size: 10px; color: var(--muted); background: var(--sand); padding: 3px 9px; border-radius: 10px; }
  .suppl-body { padding: 12px 16px; }
  .suppl-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .suppl-benefit { font-size: 11px; font-weight: 600; color: var(--green); margin-top: 4px; }

  /* GOAL BANNER */
  .goal-banner { margin: 14px 22px 0; background: linear-gradient(135deg, #1E1218 0%, #3A1828 100%); border-radius: 18px; padding: 16px 18px; display: flex; align-items: center; gap: 14px; cursor: pointer; }
  .gb-icon { font-size: 26px; }
  .gb-text { flex: 1; }
  .gb-label { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px; }
  .gb-goal { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: white; line-height: 1.3; }
  .gb-progress { margin-top: 10px; }
  .gb-bar-track { height: 4px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; margin-top: 6px; }
  .gb-bar-fill { height: 100%; background: linear-gradient(90deg, var(--rose), var(--blush)); border-radius: 10px; transition: width 0.5s ease; }
  .gb-bar-labels { display: flex; justify-content: space-between; font-size: 10px; color: rgba(255,255,255,0.35); }
  .gb-edit { font-size: 18px; opacity: 0.5; }

  /* GOAL MODAL */
  .goal-modal-content { padding: 0; }
  .goal-input-wrap { margin-bottom: 16px; }
  .goal-input-label { font-size: 12px; color: var(--muted); margin-bottom: 8px; display: block; }
  .goal-input { width: 100%; padding: 14px 16px; border-radius: 14px; border: 1.5px solid #EDE0D8; background: var(--white); font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--dark); outline: none; }
  .goal-input:focus { border-color: var(--rose); }
  .goal-save-btn { width: 100%; padding: 14px; border-radius: 14px; background: var(--rose); color: white; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; border: none; cursor: pointer; margin-top: 4px; }
  .goal-suggestions { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
  .goal-sug { padding: 7px 13px; border-radius: 20px; border: 1.5px solid #EDE0D8; background: var(--white); font-size: 12px; color: var(--muted); cursor: pointer; transition: all 0.2s; }
  .goal-sug:active { background: var(--rose); color: white; border-color: var(--rose); }

  /* REST TIMER */
  .rest-timer-overlay { position: fixed; inset: 0; background: #1E121895; z-index: 300; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .rest-timer-card { background: var(--dark); border-radius: 28px; padding: 36px 28px; width: 100%; max-width: 320px; text-align: center; position: relative; }
  .rt-label { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }
  .rt-ring { width: 160px; height: 160px; margin: 0 auto 20px; position: relative; }
  .rt-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .rt-track { fill: none; stroke: rgba(255,255,255,0.08); stroke-width: 8; }
  .rt-fill { fill: none; stroke: var(--rose); stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 1s linear; }
  .rt-time { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .rt-seconds { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 700; color: white; line-height: 1; }
  .rt-unit { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px; }
  .rt-exercise { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: rgba(255,255,255,0.7); margin-bottom: 6px; font-style: italic; }
  .rt-next { font-size: 11px; color: rgba(255,255,255,0.35); margin-bottom: 24px; }
  .rt-buttons { display: flex; gap: 10px; }
  .rt-btn { flex: 1; padding: 13px; border-radius: 14px; border: none; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
  .rt-btn.skip { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); }
  .rt-btn.pause { background: var(--rose); color: white; }
  .rt-done-text { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: var(--green); margin-bottom: 16px; }

  /* SERIES CHECKBOX */
  .series-checks { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; align-items: center; }
  .series-check-label { font-size: 11px; color: var(--muted); margin-right: 4px; }
  .serie-box { width: 32px; height: 32px; border-radius: 10px; border: 1.5px solid #EDE0D8; background: var(--white); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 13px; transition: all 0.2s; font-weight: 600; color: var(--muted); }
  .serie-box.checked { background: var(--rose); border-color: var(--rose); color: white; }
  .serie-box.last-done { background: var(--green); border-color: var(--green); color: white; }
  .plan-switcher { display: flex; margin: 14px 22px 0; background: var(--sand); border-radius: 14px; padding: 4px; gap: 4px; }
  .plan-btn { flex: 1; padding: 9px 6px; border-radius: 10px; border: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; color: var(--muted); cursor: pointer; transition: all 0.2s; text-align: center; }
  .plan-btn.active { background: var(--dark); color: white; box-shadow: 0 2px 8px #00000020; }
  .plan-tag { display: inline-block; font-size: 9px; background: var(--rose); color: white; border-radius: 8px; padding: 1px 6px; margin-left: 4px; vertical-align: middle; }

  /* 3-DAY DAY PILLS */
  .day3-pill { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 10px 14px; border-radius: 14px; border: 1.5px solid #EDE0D8; background: var(--white); cursor: pointer; transition: all 0.2s; flex: 1; }
  .day3-pill.active { background: var(--dark); border-color: var(--dark); }
  .day3-pill.active .dp-name, .day3-pill.active .dp-num { color: white; }
  .day3-pills-wrap { display: flex; gap: 8px; padding: 14px 22px 6px; }

  /* CORE FINISHER NOTE */
  .core-note { background: linear-gradient(135deg, #C9B8E8 0%, #EDE0FF 100%); border-radius: 16px; padding: 14px 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }
  .cn-icon { font-size: 22px; }
  .cn-text { flex: 1; font-size: 12px; color: #5B4080; line-height: 1.5; }
  .cn-text strong { display: block; font-size: 13px; margin-bottom: 2px; color: #3A2870; }

  .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; background: var(--white); border-top: 1px solid #EDE0D8; display: flex; padding: 10px 0 6px; z-index: 100; }
  .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 9px; color: var(--muted); background: none; border: none; cursor: pointer; padding: 4px 0; }
  .nav-item.active { color: var(--rose); }
  .nav-item.cycle-active { color: var(--cycle); }
  .nav-item-icon { font-size: 18px; }

  .setup-screen{
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(120,20,60,0.35), transparent 45%),
    linear-gradient(180deg,#160812 0%,#1d0b17 45%,#12060f 100%);

  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  padding:80px 24px 40px;
  text-align:center;
}

.welcome-logo{
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 40px;
  opacity: 0.98;
  filter: drop-shadow(0 0 25px rgba(255,180,210,0.18));
  background: transparent;
}

.setup-title{
  font-family:'Cormorant Garamond', serif;
  font-size:68px;
  line-height:1.05;
  color:#FFF7F2;
  max-width:900px;
  margin-bottom:28px;
  font-weight:600;
}

.setup-sub{
  font-size:20px;
  line-height:1.8;
  color:rgba(255,245,240,0.88);
  max-width:760px;
  margin-bottom:34px;
}

.setup-input{
  width:100%;
  max-width:980px;
  height:78px;

  border-radius:22px;
  border:1px solid rgba(255,190,220,0.35);

  background:rgba(255,255,255,0.04);

  color:white;
  font-size:36px;
  text-align:center;

  backdrop-filter:blur(10px);

  margin-top:20px;
}

.setup-button{
  width:100%;
  max-width:980px;
  height:72px;

  border:none;
  border-radius:20px;

  background:linear-gradient(90deg,#ff5f98,#ff82b2);

  color:white;
  font-size:24px;
  font-weight:700;

  margin-top:24px;

  cursor:pointer;

  transition:0.3s;
}

.setup-button:hover{
  transform:translateY(-2px);
  box-shadow:0 10px 30px rgba(255,105,160,0.35);
}


const getSeriesForWeek = (w) => w === 1 ? 2 : w === 2 ? 3 : 4;
const getCardioForWeek = (w) => w <= 2 ? 25 : w <= 4 ? 30 : w <= 6 ? 35 : 40;

// ── AFFIRMATIONS ──────────────────────────────────────────
const allAffirmations = [
  { id:1, text: "Mi cuerpo es poderoso, capaz y merece todo mi amor y cuidado.", cat:"love" },
  { id:2, text: "Soy suficiente exactamente como soy hoy, en este momento.", cat:"love" },
  { id:3, text: "Trato a mi cuerpo con la misma ternura que le daría a alguien que amo profundamente.", cat:"love" },
  { id:4, text: "Mi valor no depende de mi peso, mi talla ni de cómo me veo en el espejo.", cat:"love" },
  { id:5, text: "Me permito descansar sin culpa. El descanso también es parte del proceso.", cat:"love" },
  { id:6, text: "Celebro cada pequeño avance porque cada rep cuenta y cada día suma.", cat:"love" },
  { id:7, text: "Soy más fuerte de lo que creía ayer. Y mañana seré más fuerte que hoy.", cat:"strength" },
  { id:8, text: "La disciplina que construyo hoy es el regalo que me doy a mí misma en el futuro.", cat:"strength" },
  { id:9, text: "No compito con nadie más. Mi única rival es la versión de mí que se rinde.", cat:"strength" },
  { id:10, text: "Cada vez que llego al gym cuando no tenía ganas, estoy forjando mi carácter.", cat:"strength" },
  { id:11, text: "Mi fuerza no es solo física. Es mental, emocional y espiritual.", cat:"strength" },
  { id:12, text: "Me presento por mí misma, no para nadie más. Este proceso es completamente mío.", cat:"strength" },
  { id:13, text: "El progreso no es siempre visible, pero siempre está ocurriendo dentro de mí.", cat:"mindset" },
  { id:14, text: "No busco la perfección. Busco la consistencia, y eso es más que suficiente.", cat:"mindset" },
  { id:15, text: "Los días difíciles no son fracasos. Son parte del camino que me hace más resiliente.", cat:"mindset" },
  { id:16, text: "Me permito equivocarme y volver a empezar sin juzgarme. La compasión también es fuerza.", cat:"mindset" },
  { id:17, text: "Estoy construyendo un estilo de vida, no buscando resultados inmediatos. Confío en el proceso.", cat:"mindset" },
  { id:18, text: "Mi mente es mi aliada más poderosa. Elijo pensamientos que me elevan.", cat:"mindset" },
];

const catLabels = { love: "Amor propio", strength: "Fuerza", mindset: "Mentalidad" };

// ── TREADMILL PHASES ──────────────────────────────────────
const getTreadmillPhases = (totalMin) => {
  if (totalMin === 25) return [
    { time:"0–3 min",   name:"Calentamiento",      detail:"Velocidad 3.0 · Sin inclinación", speed:"3.0", incline:"0%",  color:"#4A7C59", intensity:"suave" },
    { time:"3–22 min",  name:"Zona principal",      detail:"Velocidad 3.5 · Inclinación 9%", speed:"3.5", incline:"9%",  color:"#C8506A", intensity:"moderada" },
    { time:"22–25 min", name:"Enfriamiento",        detail:"Velocidad 3.0 · Sin inclinación", speed:"3.0", incline:"0%",  color:"#4A7C59", intensity:"suave" },
  ];
  if (totalMin === 30) return [
    { time:"0–3 min",   name:"Calentamiento",      detail:"Velocidad 3.0 · Sin inclinación", speed:"3.0", incline:"0%",  color:"#4A7C59", intensity:"suave" },
    { time:"3–10 min",  name:"Progresión",         detail:"Velocidad 3.5 · Inclinación 6%",  speed:"3.5", incline:"6%",  color:"#C9A96E", intensity:"media" },
    { time:"10–27 min", name:"Zona principal",     detail:"Velocidad 3.5–4.5 · Inclinación 9%", speed:"3.5–4.5", incline:"9%", color:"#C8506A", intensity:"moderada" },
    { time:"27–30 min", name:"Enfriamiento",       detail:"Velocidad 3.0 · Sin inclinación", speed:"3.0", incline:"0%",  color:"#4A7C59", intensity:"suave" },
  ];
  if (totalMin === 35) return [
    { time:"0–3 min",   name:"Calentamiento",      detail:"Velocidad 3.0 · Sin inclinación",  speed:"3.0", incline:"0%",  color:"#4A7C59", intensity:"suave" },
    { time:"3–8 min",   name:"Progresión",         detail:"Velocidad 3.5 · Inclinación 6%",   speed:"3.5", incline:"6%",  color:"#C9A96E", intensity:"media" },
    { time:"8–32 min",  name:"Zona principal",     detail:"Velocidad 4.5 · Inclinación 9%",   speed:"4.5", incline:"9%",  color:"#C8506A", intensity:"alta" },
    { time:"32–35 min", name:"Enfriamiento",       detail:"Velocidad 3.0 · Sin inclinación",  speed:"3.0", incline:"0%",  color:"#4A7C59", intensity:"suave" },
  ];
  return [
    { time:"0–3 min",   name:"Calentamiento",      detail:"Velocidad 3.0 · Sin inclinación",  speed:"3.0", incline:"0%",  color:"#4A7C59", intensity:"suave" },
    { time:"3–8 min",   name:"Progresión",         detail:"Velocidad 3.5 · Inclinación 6%",   speed:"3.5", incline:"6%",  color:"#C9A96E", intensity:"media" },
    { time:"8–20 min",  name:"Zona de quema",      detail:"Velocidad 4.5 · Inclinación 9%",   speed:"4.5", incline:"9%",  color:"#C8506A", intensity:"alta" },
    { time:"20–35 min", name:"Intervalos",         detail:"Alt. 3.5 (1 min) / 4.5 (2 min) · 9%", speed:"3.5↔4.5", incline:"9%", color:"#9B4F7A", intensity:"intensa" },
    { time:"35–40 min", name:"Enfriamiento",       detail:"Velocidad 3.0 · Sin inclinación",  speed:"3.0", incline:"0%",  color:"#4A7C59", intensity:"suave" },
  ];
};

const intensityColor = { suave:"#EAF4ED", media:"#FDF3E0", moderada:"#FFF0F2", alta:"#FDE8EC", intensa:"#F5E0EE" };
const intensityDot = { suave:"#4A7C59", media:"#C9A96E", moderada:"#C8506A", alta:"#C8506A", intensa:"#9B4F7A" };

// ── CYCLE DATA ─────────────────────────────────────────────
const cycleDays = [
  { day:1, label:"Día 1", emoji:"🌑", subtitle:"Flujo alto · Máximo descanso activo",
    desc:"Tu cuerpo está trabajando fuerte por dentro. Hoy el movimiento es suave, sin impacto, sin carga.",
    tips:[
      { icon:"💧", text:"Hidratación extra — infusión de jengibre o manzanilla para la inflamación" },
      { icon:"🌡️", text:"Calor en el abdomen antes de moverte — relaja el útero y reduce calambres" },
      { icon:"🚫", text:"Evita ejercicio de alta intensidad, sentadillas profundas y peso elevado" },
    ],
    walk:{ duration:"20 min", intensity:"Muy suave", desc:"Paso lento, sin inclinación, al aire libre si puedes." },
    pilates:[
      { name:"Respiración abdominal profunda", tip:"Inhala 4s, mantén 2s, exhala 6s. Relaja el vientre", reps:"3 min" },
      { name:"Postura del niño (Child's pose)", tip:"Rodillas abiertas, frente al suelo, brazos extendidos", reps:"2 min" },
      { name:"Cat-Cow suave", tip:"Cuadrupedia, moviliza la columna lentamente sin forzar", reps:"2 × 10" },
      { name:"Piernas en la pared", tip:"Tumbada, piernas verticales en la pared — reduce congestión pélvica", reps:"3 min" },
      { name:"Torsión supina suave", tip:"Tumbada, rodilla al pecho y gira al lado. Muy gentil", reps:"3 reps c/lado" },
      { name:"Savasana consciente", tip:"Cierra los ojos, escáner corporal, suelta toda la tensión", reps:"5 min" },
    ]
  },
  { day:2, label:"Día 2", emoji:"🌒", subtitle:"Flujo activo · Movilidad suave",
    desc:"El flujo continúa. Escucha tu cuerpo — si hay calambres, reduce. Si te sientes bien, avanza suave.",
    tips:[
      { icon:"🫖", text:"Té de frambuesa roja o cúrcuma — antiinflamatorio natural para el ciclo" },
      { icon:"🧘‍♀️", text:"Hoy puedes añadir un poco más de movimiento si tu cuerpo lo pide" },
      { icon:"⚡", text:"Evita ejercicios de alto impacto y trabajo abdominal intenso" },
    ],
    walk:{ duration:"25 min", intensity:"Suave", desc:"Ritmo tranquilo, puedes ir un poco más animada que ayer." },
    pilates:[
      { name:"Respiración diafragmática", tip:"Mano en el pecho y otra en el vientre, siente la diferencia", reps:"2 min" },
      { name:"Puente de glúteo muy suave", tip:"Sin apretar fuerte, solo eleva lentamente y baja", reps:"2 × 10" },
      { name:"Apertura de cadera (Mariposa)", tip:"Sentada, plantas de los pies juntas, deja caer las rodillas", reps:"2 min" },
      { name:"Rotación de columna sentada", tip:"Sentada en el suelo, gira despacio de lado a lado", reps:"2 × 8 c/lado" },
      { name:"Estiramiento de psoas en zancada baja", tip:"Rodilla en el suelo, cadera hacia adelante, respira", reps:"45 seg c/lado" },
      { name:"Cat-Cow + extensión brazo-pierna", tip:"Cuadrupedia, extiende brazo y pierna opuestos suavemente", reps:"2 × 8 c/lado" },
    ]
  },
  { day:3, label:"Día 3", emoji:"🌓", subtitle:"Transición · Recuperando fuerza",
    desc:"El flujo empieza a reducirse. La energía vuelve poco a poco. Puedes hacer un poco más sin presionarte.",
    tips:[
      { icon:"🥩", text:"Aumenta el hierro hoy — carnes magras, espinacas, lentejas con vitamina C" },
      { icon:"💪", text:"Si te sientes con energía puedes agregar algo de glúteo ligero con banda" },
      { icon:"✅", text:"Mañana probablemente puedas volver a tu rutina normal con carga reducida" },
    ],
    walk:{ duration:"30 min", intensity:"Moderada", desc:"Puedes ir a paso más animado, ligera inclinación si te sientes bien." },
    pilates:[
      { name:"Calentamiento articular completo", tip:"Tobillos, rodillas, caderas, hombros — círculos suaves", reps:"3 min" },
      { name:"Puente de glúteo con banda ligera", tip:"Banda sobre rodillas, presiona hacia afuera al subir", reps:"3 × 12" },
      { name:"Clamshell con banda muy ligera", tip:"Tumbada, movimiento lento y controlado", reps:"2 × 15 c/lado" },
      { name:"Dead Bug suave", tip:"Espalda pegada, alterna brazo-pierna sin perder contacto lumbar", reps:"2 × 8 c/lado" },
      { name:"Estiramiento de cuádriceps de pie", tip:"Apoyada en pared, talón al glúteo, cadera al frente", reps:"45 seg c/lado" },
      { name:"Estiramiento global de espalda", tip:"Sentada, abraza las rodillas al pecho, rueda suavemente", reps:"1 min" },
    ]
  },
];

const pilatesCore = [
  { name:"Hundred", tip:"Piernas en mesa, brazos bombean, exhala en 5 pulsos", reps:"100 pulsos" },
  { name:"Roll Up", tip:"Vértebra a vértebra, sin impulso, control total", reps:"3 × 8" },
  { name:"Single Leg Stretch", tip:"Rodilla al pecho, pierna opuesta extendida, alterna", reps:"3 × 10 c/lado" },
  { name:"Plank lateral con apertura", tip:"Plancha lateral, eleva brazo al techo y baja", reps:"3 × 10 c/lado" },
  { name:"Dead Bug", tip:"Espalda pegada al suelo, alterna brazo-pierna opuestos", reps:"3 × 8 c/lado" },
  { name:"Spine Stretch", tip:"Sentada, estira columna hacia adelante exhalando", reps:"2 × 8" },
];

const meals = [
  { icon:"🌅", title:"Desayuno", time:"7–9 am", options:[
    { text:"3 huevos revueltos + 1 taza de avena con berries", prot:"~30g" },
    { text:"Yogur griego (200g) + granola sin azúcar + nueces", prot:"~28g" },
    { text:"Batido: 1 scoop proteína + plátano + leche + mantequilla de almendra", prot:"~32g" },
  ]},
  { icon:"☀️", title:"Almuerzo", time:"12–2 pm", options:[
    { text:"150g pechuga de pollo a la plancha + arroz integral + ensalada", prot:"~35g" },
    { text:"Atún (2 latas en agua) + aguacate + tostadas integrales", prot:"~30g" },
    { text:"150g salmón al horno + vegetales asados + quinoa", prot:"~32g" },
  ]},
  { icon:"🌿", title:"Merienda pre-entreno", time:"3–4 pm", options:[
    { text:"1 scoop proteína en agua + 1 manzana", prot:"~25g" },
    { text:"Cottage cheese (150g) + frutas + semillas de chía", prot:"~20g" },
    { text:"2 huevos duros + 1 rebanada pan integral + hummus", prot:"~22g" },
  ]},
  { icon:"🌙", title:"Cena post-entreno", time:"7–9 pm", options:[
    { text:"150g carne magra + camote al horno + brócoli", prot:"~35g" },
    { text:"150g pavo molido salteado + pasta integral + espinacas", prot:"~32g" },
    { text:"Tortilla de 4 claras + 1 yema + vegetales salteados", prot:"~28g" },
  ]},
];

const supplements = [
  { icon:"🥛", name:"Proteína de suero (Whey)", timing:"Post-entreno", desc:"25–30g disueltos en agua o leche dentro de los 30 min después de entrenar.", benefit:"✓ Recuperación · Crecimiento muscular" },
  { icon:"⚡", name:"Creatina monohidrato", timing:"Cualquier hora", desc:"5g diarios con agua. Los primeros 7 días: carga con 5g × 4 veces al día.", benefit:"✓ Fuerza · Potencia · Volumen muscular" },
  { icon:"🌊", name:"Omega-3 (aceite de pescado)", timing:"Con comidas", desc:"2–3g con el almuerzo o la cena. Reduce inflamación y apoya la salud cardiovascular.", benefit:"✓ Anti-inflamatorio · Salud articular" },
  { icon:"☀️", name:"Vitamina D3 + K2", timing:"Mañana", desc:"2000–4000 UI de D3 junto con 100mcg de K2 en el desayuno.", benefit:"✓ Huesos fuertes · Hormonal · Inmunidad" },
  { icon:"🌿", name:"Magnesio glicinato", timing:"Noche", desc:"300–400mg antes de dormir. Mejora el sueño, reduce calambres.", benefit:"✓ Sueño · Calambres · Recuperación" },
  { icon:"🫐", name:"Colágeno hidrolizado", timing:"En ayunas", desc:"10–15g en agua tibia en ayunas, idealmente con vitamina C.", benefit:"✓ Articulaciones · Piel · Tendones" },
];
const glutePlan = [
  {
    id: 0,
    short: "GL1",
    label: "Día 1",
    focus: "Glúteos Fuerza",
    exercises: [
      { name: "Abducciones en máquina" },
      { name: "Hip Thrust pesado" },
      { name: "Peso muerto con mancuernas" },
      { name: "Step Up" },
      { name: "Patada de glúteos" }
    ]
  },

  {
    id: 1,
    short: "GL2",
    label: "Día 2",
    focus: "Glúteos Volumen",
    exercises: [
      { name: "Aducciones en máquina" },
      { name: "Hip Thrust moderado" },
      { name: "Buenos días" },
      { name: "Sentadilla búlgara" },
      { name: "Patada de glúteos" }
    ]
  },

  {
    id: 2,
    short: "GL3",
    label: "Día 3",
    focus: "Glúteos Técnica",
    exercises: [
      { name: "Abducciones en máquina" },
      { name: "Puente de glúteos" },
      { name: "Peso muerto a una pierna" },
      { name: "Step Up" },
      { name: "Patada de glúteos" }
    ]
  }
];
const trainingDays = [
  { id:0, short:"LUN", label:"Lunes", focus:"Cuádriceps & Glúteos", emoji:"🍑", color:"linear-gradient(135deg, #C8506A 0%, #E8A0AF 100%)",
    activation:{ color:"linear-gradient(135deg, #F9BFCA 0%, #FDE0E6 100%)", textColor:"#1E1218", subColor:"#7A5F68", dotColor:"#E8A0AF", repsColor:"#C8506A", repsBg:"#F9BFCA50", title:"Activación de glúteos", sub:"8 min · Sin peso · Conexión mente-músculo",
      items:[{ name:"Clamshell con banda", tip:"Tumbada de lado, banda sobre rodillas, abre lento", reps:"3 × 15 c/lado" },{ name:"Puente de glúteo con pausa 2 seg", tip:"Aprieta fuerte arriba, baja sin tocar", reps:"3 × 15" },{ name:"Patada en cuadrupedia", tip:"Rodilla a 90°, empuja talón hacia el techo", reps:"3 × 12 c/lado" }]},
    exercises:[
      { name:"Abductores en máquina", tip:"Asiento ajustado, movimiento lento y controlado", bodyweight:true },
      { name:"Hip Thrust / Empuje de cadera con barra", tip:"Espalda en banco, máximo apriete de glúteo arriba", bodyweight:false },
      { name:"Sentadilla búlgara", tip:"Pie trasero elevado, tronco ligeramente inclinado", bodyweight:false },
      { name:"Sentadilla convencional o Prensa", tip:"Pies a lo ancho de caderas, baja a 90°", bodyweight:false },
      { name:"Extensión de piernas en máquina", tip:"Sube rápido, baja en 3 segundos", bodyweight:false },
    ]},
  { id:1, short:"MAR", label:"Martes", focus:"Espalda & Brazos", emoji:"💪", color:"linear-gradient(135deg, #5B4080 0%, #9B80C8 100%)",
    activation:{ color:"linear-gradient(135deg, #C9B8E8 0%, #EDE0FF 100%)", textColor:"#1E1218", subColor:"#6B5890", dotColor:"#C9B8E8", repsColor:"#5B4080", repsBg:"#EDE0FF", title:"Activación de torso con elásticos", sub:"8 min · Banda elástica",
      items:[{ name:"Pull apart con banda", tip:"Brazos al frente, abre apretando escápulas", reps:"3 × 15" },{ name:"Rotación externa con banda", tip:"Codo a 90°, gira el antebrazo hacia afuera", reps:"3 × 12 c/lado" },{ name:"Face pull con banda", tip:"A altura de cara, codos hacia atrás y arriba", reps:"3 × 15" }]},
    exercises:[
      { name:"Jalones al pecho en polea", tip:"Agarre amplio, lleva la barra hacia la clavícula", bodyweight:false },
      { name:"Face Pull en polea alta", tip:"Codos hacia atrás y arriba al final", bodyweight:false },
      { name:"Remo con barra", tip:"Espalda plana, codos hacia atrás, retrae escápulas", bodyweight:false },
      { name:"Curl de bíceps", tip:"Codos fijos a los costados, sube controlado, baja lento", bodyweight:false },
      { name:"Extensión de tríceps en polea", tip:"Codos pegados al cuerpo, extiende hasta el final", bodyweight:false },
    ]},
  { id:2, short:"MIÉ", label:"Miércoles", focus:"Glúteos & Femoral", emoji:"🔥", color:"linear-gradient(135deg, #C06830 0%, #E8A870 100%)",
    activation:{ color:"linear-gradient(135deg, #F9BFCA 0%, #FDE0E6 100%)", textColor:"#1E1218", subColor:"#7A5F68", dotColor:"#E8A0AF", repsColor:"#C8506A", repsBg:"#F9BFCA50", title:"Activación de glúteos", sub:"8 min · Sin peso · Descanso activo opcional",
      items:[{ name:"Clamshell con banda", tip:"Tumbada de lado, banda sobre rodillas, abre lento", reps:"3 × 15 c/lado" },{ name:"Puente de glúteo con pausa", tip:"Aprieta fuerte arriba, aguanta 2 seg", reps:"3 × 15" },{ name:"Patada lateral tumbada", tip:"Pierna recta, eleva hasta sentir glúteo medio", reps:"3 × 15 c/lado" }]},
    exercises:[
      { name:"Abducción en máquina", tip:"Asiento ajustado, no hagas rebotes, foco en glúteo medio", bodyweight:true },
      { name:"Hip Thrust con barra", tip:"Espalda en banco, empuja caderas fuerte, aprieta glúteo", bodyweight:false },
      { name:"Peso muerto con mancuerna", tip:"Espalda plana, caderas hacia atrás, siente el femoral", bodyweight:false },
      { name:"Step Up con mancuerna", tip:"Sube con un solo pie, no te impulses con el pie de abajo", bodyweight:false },
      { name:"Patada de glúteo en polea", tip:"Cuerpo estable, extiende la cadera completamente", bodyweight:true },
    ]},
  { id:3, short:"JUE", label:"Jueves", focus:"Espalda & Hombros", emoji:"✨", color:"linear-gradient(135deg, #1E6888 0%, #5AAEC8 100%)",
    activation:{ color:"linear-gradient(135deg, #A8D8EA 0%, #D6EEF8 100%)", textColor:"#1E1218", subColor:"#3A6878", dotColor:"#74C6E0", repsColor:"#1E6888", repsBg:"#D6EEF840", title:"Activación de torso con elásticos", sub:"8 min · Banda elástica · Prepara hombros y espalda",
      items:[{ name:"Pull apart con banda", tip:"Brazos al frente, abre apretando escápulas", reps:"3 × 15" },{ name:"Rotación externa de hombro", tip:"Codo a 90°, gira el antebrazo hacia afuera", reps:"3 × 12 c/lado" },{ name:"Press de banda sobre cabeza", tip:"Banda bajo pies, empuja sin arquear espalda", reps:"3 × 12" }]},
    exercises:[
      { name:"Jalones al pecho en polea", tip:"Agarre amplio, lleva la barra hacia la clavícula", bodyweight:false },
      { name:"Face Pull en polea", tip:"Cuerda en polea alta, codos hacia atrás y arriba", bodyweight:false },
      { name:"Remo con una mano en banco", tip:"Rodilla apoyada, codo hacia atrás, retrae escápula", bodyweight:false },
      { name:"Press militar con mancuernas", tip:"Sentada, empuja hacia arriba sin arquear la lumbar", bodyweight:false },
      { name:"Vuelos laterales", tip:"Mancuernas ligeras, no subas más allá del hombro", bodyweight:false },
      { name:"Vuelos frontales", tip:"Brazos casi rectos, sube hasta altura de hombros", bodyweight:false },
      { name:"Jalón al mentón", tip:"Agarre estrecho, codos siempre más altos que muñecas", bodyweight:false },
    ]},
  { id:4, short:"VIE", label:"Viernes", focus:"Glúteos & Femoral Unilateral", emoji:"🌸", color:"linear-gradient(135deg, #A04868 0%, #E090A8 100%)",
    activation:{ color:"linear-gradient(135deg, #F9BFCA 0%, #FDE0E6 100%)", textColor:"#1E1218", subColor:"#7A5F68", dotColor:"#E8A0AF", repsColor:"#C8506A", repsBg:"#F9BFCA50", title:"Activación de glúteos unilateral", sub:"8 min · Sin peso · Una pierna a la vez",
      items:[{ name:"Clamshell unilateral con banda", tip:"Énfasis en un lado a la vez", reps:"3 × 15 c/lado" },{ name:"Puente de glúteo unilateral", tip:"Una pierna extendida, aprieta fuerte arriba", reps:"3 × 12 c/lado" },{ name:"Patada en cuadrupedia unilateral", tip:"Rodilla a 90°, empuja talón al techo", reps:"3 × 12 c/lado" }]},
    exercises:[
      { name:"Abducción en máquina (unilateral)", tip:"Si la máquina lo permite, trabaja un lado a la vez", bodyweight:true },
      { name:"Hip Thrust unilateral", tip:"Una pierna extendida, máximo apriete de glúteo arriba", bodyweight:false },
      { name:"Peso muerto unilateral con mancuerna", tip:"Pierna libre hacia atrás, espalda plana", bodyweight:false },
      { name:"Step Up unilateral con mancuerna", tip:"Sube y baja con la misma pierna, no te impulses", bodyweight:false },
      { name:"Patada de glúteo en polea (unilateral)", tip:"Cuerpo estable, extiende la cadera completamente", bodyweight:true },
    ]},
];

const dayNums = ["1","2","3","4","5"];
const dayNums3 = ["Día 1","Día 2","Día 3"];
const STEP = 2.5;

// ── 3-DAY ROUTINE ─────────────────────────────────────────
const threeDays = [
  {
    id:0, short:"D1", label:"Día 1", focus:"Cuádriceps & Glúteos + Cardio", emoji:"🍑",
    color:"linear-gradient(135deg, #C8506A 0%, #E8A0AF 100%)",
    activation:{ color:"linear-gradient(135deg, #F9BFCA 0%, #FDE0E6 100%)", textColor:"#1E1218", subColor:"#7A5F68", dotColor:"#E8A0AF", repsColor:"#C8506A", repsBg:"#F9BFCA50",
      title:"Activación de glúteos", sub:"8 min · Sin peso · Conexión mente-músculo",
      items:[
        { name:"Clamshell con banda", tip:"Tumbada de lado, banda sobre rodillas, abre lento", reps:"3 × 15 c/lado" },
        { name:"Puente de glúteo con pausa 2 seg", tip:"Aprieta fuerte arriba, baja sin tocar", reps:"3 × 15" },
        { name:"Patada en cuadrupedia", tip:"Rodilla a 90°, empuja talón hacia el techo", reps:"3 × 12 c/lado" },
      ]},
    exercises:[
      { name:"Abductores en máquina", tip:"Asiento ajustado, movimiento lento y controlado", bodyweight:true },
      { name:"Hip Thrust con barra", tip:"Espalda en banco, máximo apriete de glúteo arriba", bodyweight:false },
      { name:"Sentadilla búlgara", tip:"Pie trasero elevado, tronco ligeramente inclinado", bodyweight:false },
      { name:"Sentadilla convencional o Prensa", tip:"Pies a lo ancho de caderas, baja a 90°", bodyweight:false },
      { name:"Extensión de piernas en máquina", tip:"Sube rápido, baja en 3 segundos para más tensión", bodyweight:false },
      { name:"Abducción en máquina (cierre)", tip:"Último ejercicio, agota el glúteo medio", bodyweight:true },
    ],
    hasCardio: true,
  },
  {
    id:1, short:"D2", label:"Día 2", focus:"Espalda · Hombros · Brazos · Core", emoji:"💪",
    color:"linear-gradient(135deg, #5B4080 0%, #9B80C8 100%)",
    activation:{ color:"linear-gradient(135deg, #C9B8E8 0%, #EDE0FF 100%)", textColor:"#1E1218", subColor:"#6B5890", dotColor:"#C9B8E8", repsColor:"#5B4080", repsBg:"#EDE0FF",
      title:"Activación de torso con elásticos", sub:"8 min · Banda elástica · Activa espalda y manguito",
      items:[
        { name:"Pull apart con banda", tip:"Brazos al frente, abre apretando escápulas", reps:"3 × 15" },
        { name:"Rotación externa con banda", tip:"Codo a 90°, gira el antebrazo hacia afuera", reps:"3 × 12 c/lado" },
        { name:"Face pull con banda", tip:"A altura de cara, codos hacia atrás y arriba", reps:"3 × 15" },
      ]},
    exercises:[
      { name:"Jalones al pecho en polea", tip:"Agarre amplio, lleva la barra hacia la clavícula", bodyweight:false },
      { name:"Face Pull en polea alta", tip:"Cuerda en polea alta, codos hacia atrás y arriba", bodyweight:false },
      { name:"Remo con una mano en banco", tip:"Rodilla apoyada, codo hacia atrás, retrae escápula", bodyweight:false },
      { name:"Press militar con mancuernas", tip:"Sentada, empuja hacia arriba sin arquear la lumbar", bodyweight:false },
      { name:"Vuelos laterales", tip:"Mancuernas ligeras, no subas más allá del hombro", bodyweight:false },
      { name:"Curl de bíceps", tip:"Codos fijos a los costados, sube controlado, baja lento", bodyweight:false },
      { name:"Extensión de tríceps en polea", tip:"Codos pegados al cuerpo, extiende hasta el final", bodyweight:false },
    ],
    hasCardio: false,
    core: true,
  },
  {
    id:2, short:"D3", label:"Día 3", focus:"Femorales & Glúteos", emoji:"🔥",
    color:"linear-gradient(135deg, #C06830 0%, #E8A870 100%)",
    activation:{ color:"linear-gradient(135deg, #F9BFCA 0%, #FDE0E6 100%)", textColor:"#1E1218", subColor:"#7A5F68", dotColor:"#E8A0AF", repsColor:"#C8506A", repsBg:"#F9BFCA50",
      title:"Activación de glúteos", sub:"8 min · Sin peso · Conexión mente-músculo",
      items:[
        { name:"Clamshell con banda", tip:"Tumbada de lado, banda sobre rodillas, abre lento", reps:"3 × 15 c/lado" },
        { name:"Puente de glúteo con pausa", tip:"Aprieta fuerte arriba, aguanta 2 seg", reps:"3 × 15" },
        { name:"Patada lateral tumbada", tip:"Pierna recta, eleva hasta sentir glúteo medio", reps:"3 × 15 c/lado" },
      ]},
    exercises:[
      { name:"Peso muerto rumano con barra", tip:"Caderas atrás, espalda plana, siente el estiramiento femoral", bodyweight:false },
      { name:"Curl femoral tumbada", tip:"Pies en flexión, no despegues las caderas, aprieta al contraer", bodyweight:false },
      { name:"Hip Thrust con barra", tip:"Espalda en banco, empuja caderas fuerte, aprieta glúteo arriba", bodyweight:false },
      { name:"Step Up con mancuerna", tip:"Sube con un solo pie, no te impulses con el pie de abajo", bodyweight:false },
      { name:"Patada de glúteo en polea", tip:"Cuerpo estable, extiende la cadera completamente", bodyweight:true },
      { name:"Sentadilla sumo con mancuerna", tip:"Punteras a 45°, activa aductores y glúteo medio", bodyweight:false },
    ],
    hasCardio: true,
  },
];

function WeightTracker({ exId, weights, setWeights, bodyweight }) {
  if (bodyweight) return (
    <div style={{ display:"flex", alignItems:"center", gap:8, background:"#F2E8E0", borderRadius:12, padding:"8px 12px" }}>
      <span style={{ fontSize:13 }}>🏋️</span>
      <span style={{ fontSize:12, color:"#7A5F68" }}>Peso corporal · banda · máquina</span>
    </div>
  );
  const val = weights[exId] ?? 10;
const prevKey = "prev_" + exId;
const prev = weights[prevKey] ?? null;
const isPR = prev !== null && val > prev;

const change = (delta) => {
  setWeights(w => {
    const cur = w[exId] ?? 10;
    const next = Math.max(0, Math.round((cur + delta) * 10) / 10);

    return {
      ...w,
      [prevKey]: cur,
      [exId]: next
    };
  });
};
  
  
  return (
    <div className="weight-tracker">
      <div className="wt-label">
        <div style={{ fontSize:11, color:"#7A5F68" }}>⚖️ Peso registrado</div>
        {prev !== null && <div className="wt-prev">Anterior: <strong>{prev} kg</strong>{isPR && <span className="w-pr">🏆 PR</span>}</div>}
      </div>
      <div className="weight-controls">
        <button className="w-btn" onClick={() => change(-STEP)}>−</button>
        <span className="w-val">{val} <span className="w-unit">kg</span></span>
        <button className="w-btn" onClick={() => change(+STEP)}>+</button>
      </div>
    </div>
  );
}

// ── NAME SETUP ────────────────────────────────────────────
function NameSetup({ onSave }) {
  const [name, setName] = useState("");
  const greetings = ["Hola", "Buenos días", "Bienvenida", "Hola de nuevo"];
  const [greet] = useState(greetings[Math.floor(Math.random() * greetings.length)]);

  return (
    <div className="name-setup">
     <div className="logo">
  <img
    src={nylaLogo}
    alt="Nyla Logo"
    className="nyla-logo"
  />
</div>
      
      <div className="ns-title">Si ya estás aquí,<br/>es porque quieres un <em>cambio real.</em></div>
      <p className="ns-sub">Un compromiso contigo misma, que es la puerta hacia una autoestima fuerte y un amor propio inquebrantable.<br/><br/>Bienvenida.</p>
      <div className="ns-divider" />
      <input
        className="ns-input"
        placeholder="¿Cómo te llamas?"
        value={name}
        onChange={e => setName(e.target.value)}
        maxLength={20}
        autoFocus
      />
      <button className="ns-btn" onClick={() => onSave(name.trim() || "Campeona")}>
        Empezar mi journey ✦
      </button>
      <button className="ns-skip" onClick={() => onSave("Campeona")}>
        Continuar sin nombre
      </button>
    </div>
  );
}

// ── REST TIMER ────────────────────────────────────────────
const REST_OPTIONS = [45, 60, 90, 120];
const CIRCUMFERENCE = 2 * Math.PI * 54; // r=54

function RestTimer({ onClose, exerciseName }) {
  const [duration, setDuration] = useState(90);
  const [timeLeft, setTimeLeft] = useState(null); // null = not started
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (timeLeft === null || paused || done) return;
    if (timeLeft <= 0) { setDone(true); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, paused, done]);

  const start = (d) => { setDuration(d); setTimeLeft(d); setDone(false); setPaused(false); };
  const progress = timeLeft === null ? 1 : timeLeft / duration;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const mins = timeLeft === null ? Math.floor(duration/60) : Math.floor(timeLeft/60);
  const secs = timeLeft === null ? duration%60 : timeLeft%60;

  return (
    <div className="rest-timer-overlay" onClick={(e) => e.target.className === "rest-timer-overlay" && onClose()}>
      <div className="rest-timer-card">
        <div className="rt-label">⏱ Timer de descanso</div>

        {/* Duration selector — only before starting */}
        {timeLeft === null && (
          <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:20 }}>
            {REST_OPTIONS.map(d => (
              <button key={d} onClick={() => setDuration(d)} style={{
                padding:"7px 12px",
borderRadius:12,
border: duration === d
  ? "1.5px solid var(--rose)"
  : "1.5px solid rgba(255,255,255,0.15)",
background: duration === d
  ? "var(--rose)"
  : "transparent",
color: duration === d
  ? "white"
  : "rgba(255,255,255,0.5)",
fontSize:12,
fontWeight:600,
cursor:"pointer",
fontFamily:"DM Sans, sans-serif"
              }}>{d}s</button>
            ))}
          </div>
        )}

        {/* Ring */}
        <div className="rt-ring">
          <svg className="rt-svg" viewBox="0 0 120 120">
            <circle className="rt-track" cx="60" cy="60" r="54" />
            <circle className="rt-fill" cx="60" cy="60" r="54"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={done ? CIRCUMFERENCE : dashOffset}
              style={{ stroke: done ? "#4A7C59" : "var(--rose)" }}
            />
          </svg>
          <div className="rt-time">
            {done ? (
              <div style={{ fontSize:36 }}>✅</div>
            ) : (
              <>
                <div className="rt-seconds">{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</div>
                <div className="rt-unit">{timeLeft === null ? "listo para empezar" : paused ? "pausado" : "descansando"}</div>
              </>
            )}
          </div>
        </div>

        <div className="rt-exercise">{exerciseName}</div>
        {done ? (
          <>
            <div className="rt-done-text">¡Descanso completo! 💪</div>
            <div className="rt-buttons">
              <button className="rt-btn skip" onClick={() => start(duration)}>Repetir</button>
              <button className="rt-btn pause" onClick={onClose}>Continuar</button>
            </div>
          </>
        ) : timeLeft === null ? (
          <div className="rt-buttons">
            <button className="rt-btn skip" onClick={onClose}>Cancelar</button>
            <button className="rt-btn pause" onClick={() => start(duration)}>▶ Iniciar</button>
          </div>
        ) : (
          <div className="rt-buttons">
            <button className="rt-btn skip" onClick={onClose}>Saltar</button>
            <button className="rt-btn pause" onClick={() => setPaused(p => !p)}>
              {paused ? "▶ Continuar" : "⏸ Pausar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── GOAL BANNER ───────────────────────────────────────────

const suggestions = [
  "Abdomen y cintura más definidos",
  "Glúteos con más forma y firmeza",
  "Piernas más tonificadas y menos celulitis",
  "Brazos más definidos sin flacidez",
  "Reducir grasa e hinchazón",
  "Mejorar postura y verse más elegante",
  "Verse fit, femenina y saludable"
];

function GoalBanner({ goal, onEdit, activeWeek }) {
  const pct = Math.round(((activeWeek - 1) / 8) * 100);
  return (
    <div className="goal-banner" onClick={onEdit}>
      <div className="gb-icon">🎯</div>
      <div className="gb-text">
        <div className="gb-label">Tu meta · Semana {activeWeek} de 8</div>
        <div className="gb-goal">{goal || "Toca para agregar tu meta personal"}</div>
        {goal && (
          <div className="gb-progress">
            <div className="gb-bar-labels">
              <span>Inicio</span>
              <span>{pct}% del camino ✦</span>
              <span>Semana 8</span>
            </div>
            <div className="gb-bar-track">
              <div className="gb-bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </div>
      <div className="gb-edit">✏️</div>
    </div>
  );
}

function GoalModal({ goal, onSave, onClose }) {
  const [text, setText] = useState(goal || "");
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Tu meta personal 🎯</div>
        <div className="modal-sub">Escríbela en positivo, en presente. Como si ya fuera tuya.</div>
        <div className="goal-modal-content">
          <div className="goal-input-wrap">
            <label className="goal-input-label">¿Cuál es tu meta para estas 8 semanas?</label>
            <input
              className="goal-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Ej: Completar las 8 semanas con fuerza y amor propio"
              maxLength={80}
            />
          </div>
          <div className="goal-input-label" style={{ marginBottom:8 }}>💡 Sugerencias:</div>
          <div className="goal-suggestions">
            {suggestions.map(s => (
              <button key={s} className="goal-sug" onClick={() => setText(s)}>{s}</button>
            ))}
          </div>
          <button className="goal-save-btn" onClick={() => { onSave(text); onClose(); }}>
            Guardar mi meta ✦
          </button>
        </div>
      </div>
    </div>
  );
}

// ── AFFIRMATIONS TAB ──────────────────────────────────────
function AffirmationsTab({ userName }) {
  const [todayIndex, setTodayIndex] = useState(() => Math.floor(Math.random() * allAffirmations.length));
  const [activeCat, setActiveCat] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const todayAff = allAffirmations[todayIndex];
  const nextAff = () => setTodayIndex(i => (i + 1) % allAffirmations.length);
  const toggleFav = (id) => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const filtered = activeCat === "all" ? allAffirmations : activeCat === "favorites" ? allAffirmations.filter(a => favorites.includes(a.id)) : allAffirmations.filter(a => a.cat === activeCat);

  return (
    <div style={{ paddingBottom:24 }}>
      <div className="affirmations-hero">
        <div className="aff-eyebrow">Nyla Method · Amor propio</div>
        <div className="aff-hero-title">{userName ? `${userName}, tus palabras` : "Tus palabras"} <em>crean</em> tu realidad</div>
        <div className="aff-hero-sub">Lee una afirmación cada día. Dila en voz alta. Siéntela en el cuerpo. El cambio empieza aquí.</div>
      </div>

      <div className="aotd-card">
        <div className="aotd-label">✦ Afirmación del día</div>
        <div className="aotd-text">"{todayAff.text}"</div>
        <div className="aotd-footer">
          <div className="aotd-category">{catLabels[todayAff.cat]}</div>
          <button className="aotd-btn" onClick={nextAff}>Nueva afirmación ↻</button>
        </div>
      </div>

      <div className="aff-cat-scroll">
        {[["all","Todas ✦"],["love","Amor propio 💗"],["strength","Fuerza 💪"],["mindset","Mentalidad 🌱"],["favorites","Favoritas ♡"]].map(([k,l]) => (
          <button key={k} className={`aff-cat-pill ${activeCat===k?"active":""}`} onClick={() => setActiveCat(k)}>{l}</button>
        ))}
      </div>

      <div className="aff-grid">
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"32px 16px", color:"var(--muted)", fontSize:13 }}>
            <div style={{ fontSize:32, marginBottom:10 }}>♡</div>
            Aún no tienes favoritas. Toca el ♡ en cualquier afirmación para guardarla.
          </div>
        ) : filtered.map(a => (
          <div key={a.id} className={`aff-card ${a.cat}`}>
            <div className="aff-card-text">"{a.text}"</div>
            <div className="aff-card-footer">
              <div className={`aff-card-cat ${a.cat}`}>{catLabels[a.cat]}</div>
              <div className="aff-fav" onClick={() => toggleFav(a.id)}>
                {favorites.includes(a.id) ? "♥" : "♡"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CYCLE TAB ─────────────────────────────────────────────
function CycleTab({ completedDays, setCompletedDays }) {
  const [cycleDay, setCycleDay] = useState(1);
  const cd = cycleDays[cycleDay - 1];
  const key = `cycle_d${cycleDay}`;
  const isDone = !!completedDays[key];

  return (
    <div style={{ paddingBottom:24 }}>
      <div className="cycle-hero">
        <div className="cycle-hero-eyebrow">Modo ciclo menstrual · Días 1-3</div>
        <h1>Tu cuerpo <em>merece</em> descanso con intención</h1>
        <p className="cycle-hero-sub">Movimiento suave, sin carga, sin presión. Escucha lo que necesitas hoy.</p>
        <div className="cycle-day-pills">
          {cycleDays.map(d => (
            <button key={d.day} className={`cdp ${cycleDay===d.day?"active":""}`} onClick={() => setCycleDay(d.day)}>
              {d.emoji} {d.label}
            </button>
          ))}
        </div>
      </div>
      <div className="section" style={{ marginTop:16 }}>
        <div className="cycle-info-card">
          <div className="cic-title">{cd.emoji} {cd.label} · {cd.subtitle}</div>
          <div className="cic-sub">{cd.desc}</div>
          <div className="cic-tips">
            {cd.tips.map((t,i) => (
              <div className="cic-tip" key={i}><div className="cic-tip-icon">{t.icon}</div><div style={{ fontSize:12, color:"rgba(255,255,255,0.85)", lineHeight:1.4 }}>{t.text}</div></div>
            ))}
          </div>
        </div>
        <div className="cycle-section-label">🚶‍♀️ Caminata suave</div>
        <div className="cycle-walk-card">
          <div className="cwc-title">Cardio de bajo impacto</div>
          <div className="cwc-duration">{cd.walk.duration}</div>
          <div className="cwc-sub">{cd.walk.intensity} · {cd.walk.desc}</div>
          <div className="cwc-tags">
            <span className="cwc-tag">🌿 Al aire libre</span>
            <span className="cwc-tag">🎵 Música suave</span>
            <span className="cwc-tag">❄️ Sin inclinación</span>
            <span className="cwc-tag">💧 Bien hidratada</span>
          </div>
        </div>
        <div className="cycle-section-label" style={{ marginTop:16 }}>🧘‍♀️ Pilates de suelo · Movilidad</div>
        <div className="cycle-block-card">
          <div style={{ background:"linear-gradient(135deg, #9B4F7A 0%, #D4A0C0 100%)", padding:"14px 18px" }}>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:16, color:"white", marginBottom:3 }}>Movilidad & Relajación</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)" }}>Sin impacto · Sin carga · Respira conscientemente</div>
          </div>
          <div className="block-body">
            {cd.pilates.map((e,i) => (
              <div className="simple-row" key={i}>
                <div className="simple-dot" style={{ background:"#D4A0C0" }} />
                <div className="simple-info"><div className="simple-name">{e.name}</div><div className="simple-tip">{e.tip}</div></div>
                <div className="simple-reps" style={{ color:"#9B4F7A", background:"#F5E0EE" }}>{e.reps}</div>
              </div>
            ))}
          </div>
        </div>
        <button className={`wod-btn cycle ${isDone?"done":""}`} onClick={() => setCompletedDays(prev => ({ ...prev, [key]: !prev[key] }))}>
          {isDone ? "✅ ¡Día de ciclo completado!" : "🌸 Marcar día como completado"}
        </button>
      </div>
    </div>
  );
}

// ── TRAINING TAB ──────────────────────────────────────────
function TrainingTab({ activeDay, setActiveDay, activeWeek, completedDays, setCompletedDays, weights, setWeights }) {
  const workout = trainingDays[activeDay];
  const series = getSeriesForWeek(activeWeek);
  const cardioMin = getCardioForWeek(activeWeek);
  const dayKey = `w${activeWeek}_d${activeDay}`;
  const isDone = !!completedDays[dayKey];
  const phases = getTreadmillPhases(cardioMin);
  const cardioProgress = ((cardioMin - 25) / 15) * 100;
  const [timer, setTimer] = useState(null); // { exerciseName }

  return (
    <>
      {timer && <RestTimer exerciseName={timer.exerciseName} onClose={() => setTimer(null)} />}
      <div className="days-scroll">
  {trainingDays.map((d, i) => (
    <button
      key={i}
      className={`day-pill ${activeDay === i ? "active" : ""}`}
      onClick={() => setActiveDay(i)}
    >
      <span className="dp-name">
        Día
      </span>

      <span className="dp-num">
        {i + 1}
      </span>

      <span style={{ fontSize: 12 }}>
        {completedDays[`w${activeWeek}_d${i}`]
          ? "✅"
          : d.emoji}
      </span>
    </button>
  ))}
</div>
      <div className="series-banner">
        <div className="sb-text">
          <div className="sb-title">{workout.label} · {workout.focus}</div>
          <div className="sb-sub">Semana {activeWeek} · 6–10 reps · Sube el peso al llegar a 10</div>
        </div>
        <div className="sb-badge">{series} series<small>× 6-10 reps</small></div>
      </div>
      <div className="section">
        <div className="section-label">⚡ Activación</div>
        <div className="block-card">
          <div className="block-top" style={{ background:workout.activation.color }}>
            <div className="block-top-title" style={{ color:workout.activation.textColor }}>{workout.activation.title}</div>
            <div className="block-top-sub" style={{ color:workout.activation.subColor }}>{workout.activation.sub}</div>
          </div>
          <div className="block-body">
            {workout.activation.items.map((e,i) => (
              <div className="simple-row" key={i}>
                <div className="simple-dot" style={{ background:workout.activation.dotColor }} />
                <div className="simple-info"><div className="simple-name">{e.name}</div><div className="simple-tip">{e.tip}</div></div>
                <div className="simple-reps" style={{ color:workout.activation.repsColor, background:workout.activation.repsBg }}>{e.reps}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section">
        <div className="section-label">💪 Entrenamiento principal</div>
        <div className="block-card">
          <div style={{ background:workout.color, padding:"18px 20px" }}>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, fontWeight:600, color:"white", marginBottom:6 }}>{workout.focus}</div>
            <div style={{ display:"flex", gap:12 }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.8)" }}>📋 {series} × 6-10 reps</span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.8)" }}>💪 {workout.exercises.length} ejerc.</span>
            </div>
          </div>
          <div style={{ padding:"4px 18px 8px" }}>
            {workout.exercises.map((e,i) => {
              const exId = `w${activeWeek}_d${activeDay}_e${i}`;
              return (
                <div className="ex-block" key={i}>
                  <div className="ex-header">
                    <div className="ex-num">{i+1}</div>
                    <div className="ex-info"><div className="ex-name">{e.name}</div><div className="ex-tip">{e.tip}</div></div>
                    <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"flex-end" }}>
                      <div className="ex-sets-badge">{series}×6-10</div>
                      <button onClick={() => setTimer({ exerciseName: e.name })} style={{
                        fontSize:10, color:"var(--muted)", background:"var(--sand)", border:"none",
                        borderRadius:8, padding:"3px 8px", cursor:"pointer", whiteSpace:"nowrap"
                      }}>⏱ Descanso</button>
                    </div>
                  </div>
                  <WeightTracker exId={exId} weights={weights} setWeights={setWeights} bodyweight={e.bodyweight} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="section">
        <div className="section-label">🧘‍♀️ Core Pilates · Finisher</div>
        <div className="block-card">
          <div className="block-top" style={{ background:"linear-gradient(135deg, #C9B8E8 0%, #EDE0FF 100%)" }}>
            <div className="block-top-title" style={{ color:"#1E1218" }}>Core profundo & control</div>
            <div className="block-top-sub" style={{ color:"#6B5890" }}>10 min · Al final del entreno · Respiración consciente</div>
          </div>
          <div className="block-body">
            {pilatesCore.map((e,i) => (
              <div className="simple-row" key={i}>
                <div className="simple-dot" style={{ background:"#C9B8E8" }} />
                <div className="simple-info"><div className="simple-name">{e.name}</div><div className="simple-tip">{e.tip}</div></div>
                <div className="simple-reps" style={{ color:"#5B4080", background:"#EDE0FF" }}>{e.reps}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CARDIO SECTION */}
      <div className="section" style={{ paddingBottom:24 }}>
        <div className="section-label">🏃‍♀️ Cardio progresivo · Post-entreno</div>

        {/* Duration card */}
        <div className="cardio-card" style={{ marginBottom:12 }}>
          <div style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", fontSize:40, opacity:0.12 }}>🏃‍♀️</div>
          <div className="cardio-title">Cardio semana {activeWeek}</div>
          <div className="cardio-duration">{cardioMin} min</div>
          <div className="cardio-sub">
            {activeWeek<=2 && "Sem 1-2 · Intensidad moderada · Zona 2"}
            {activeWeek>2&&activeWeek<=4 && "Sem 3-4 · Intensidad media · Empieza a sudar"}
            {activeWeek>4&&activeWeek<=6 && "Sem 5-6 · Media-alta · Intervalos opcionales"}
            {activeWeek>6 && "Sem 7-8 · Alta intensidad · HIIT opcional"}
          </div>
          <div className="cardio-options">
            {["Caminadora 🚶‍♀️","Elíptica 🔄","Bicicleta 🚴‍♀️","Escaladora 🧗‍♀️","Exterior 🌿"].map(o => <span className="cardio-tag" key={o}>{o}</span>)}
          </div>
          <div className="cardio-progress-label"><span>Sem 1-2: 25 min</span><span>Sem 7-8: 40 min</span></div>
          <div className="cardio-track"><div className="cardio-fill" style={{ width:`${25 + cardioProgress}%` }} /></div>
        </div>

        {/* TREADMILL GUIDE */}
        <div className="treadmill-card">
          <div className="treadmill-header">
            <div className="th-icon">🚶‍♀️</div>
            <div className="th-text">
              <div className="th-title">Guía de caminadora</div>
              <div className="th-sub">Inclinación 9% · Zona de quema de grasa óptima</div>
            </div>
          </div>
          <div className="treadmill-stats">
            <div className="ts-item">
              <div className="ts-val">9<span className="ts-unit">%</span></div>
              <div className="ts-label">Inclinación</div>
            </div>
            <div className="ts-item">
              <div className="ts-val">3.5–4.5<span className="ts-unit"> km/h</span></div>
              <div className="ts-label">Velocidad</div>
            </div>
            <div className="ts-item">
              <div className="ts-val">{cardioMin}<span className="ts-unit"> min</span></div>
              <div className="ts-label">Duración</div>
            </div>
          </div>
          <div className="treadmill-phases">
            <div className="tp-label">Fases del entreno</div>
            {phases.map((p,i) => (
              <div className="tp-row" key={i}>
                <div className="tp-time">{p.time}</div>
                <div className="tp-info">
                  <div className="tp-name">{p.name}</div>
                  <div className="tp-detail">{p.detail}</div>
                </div>
                <div className="tp-badge" style={{ background: intensityColor[p.intensity], color: intensityDot[p.intensity] }}>
                  {p.intensity}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className={`wod-btn ${isDone?"done":""}`} onClick={() => setCompletedDays(prev => ({ ...prev, [dayKey]: !prev[dayKey] }))}>
          {isDone ? "✅ ¡Día completado!" : "🚀 Marcar día como completado"}
        </button>
      </div>
    </>
  );
}

// ── NUTRITION TAB ─────────────────────────────────────────
function NutritionTab() {
  return (
    <div style={{ padding:"16px 0 24px" }}>
      <div className="section">
        <div className="protein-banner">
          <div className="pb-icon">🥩</div>
          <div className="pb-text">
            <div className="pb-title">Meta: 30g proteína por comida</div>
            <div className="pb-sub">4 comidas · Maximiza síntesis muscular · Mantiene saciedad todo el día</div>
          </div>
          <div className="pb-badge">~120g<small>proteína/día</small></div>
        </div>
        <div className="section-label" style={{ marginTop:16 }}>🍽 Ideas de comidas</div>
        {meals.map((m,i) => (
          <div className="meal-card" key={i}>
            <div className="meal-header">
              <div className="meal-icon">{m.icon}</div>
              <div className="meal-title">{m.title}</div>
              <div style={{ fontSize:10, color:"#7A5F68", marginRight:8 }}>{m.time}</div>
              <div className="meal-protein">~30g</div>
            </div>
            <div className="meal-options">
              {m.options.map((o,j) => (
                <div className="meal-option" key={j}>
                  <div className="mo-dot" />
                  <div className="mo-text">{o.text}</div>
                  <div className="mo-prot">{o.prot}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="section-label" style={{ marginTop:16 }}>💊 Suplementos</div>
        {supplements.map((s,i) => (
          <div className="suppl-card" key={i}>
            <div className="suppl-header">
              <div className="suppl-icon">{s.icon}</div>
              <div className="suppl-title">{s.name}</div>
              <div className="suppl-timing">{s.timing}</div>
            </div>
            <div className="suppl-body">
              <div className="suppl-desc">{s.desc}</div>
              <div className="suppl-benefit">{s.benefit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function GluteTab({ activeWeek, weights, setWeights }) {

  const series = activeWeek === 1 ? 2 : activeWeek === 2 ? 3 : 4;

  const [activeGluteDay, setActiveGluteDay] = useState(0);
  const [timer, setTimer] = useState(null);

  const gluteDays = [
      {
  label: "Día 1",
  focus: "Glúteos Fuerza",

  activation: [
    "Abducción con banda",
    "Puente de glúteo con banda"
  ],

  core: [
    "Dead Bug",
    "Plancha 30 segundos"
  ],

  exercises: [
        "Abducciones en máquina",
        "Hip Thrust pesado",
        "Peso muerto con mancuernas",
        "Step Up",
        "Patada de glúteos"
      ]
    },
   {
  label: "Día 2",
  focus: "Glúteos Fuerza",

  activation: [
    "Abducción con banda",
    "Puente de glúteo con banda"
  ],

  core: [
    "Dead Bug",
    "Plancha 30 segundos"
  ],

  exercises: [
        "Aducciones en máquina",
        "Hip Thrust peso moderado",
        "Buenos días",
        "Sentadilla búlgara",
        "Patada de glúteos"
      ]
    },
    {
  label: "Día 3",
  focus: "Glúteos Fuerza",

  activation: [
    "Abducción con banda",
    "Puente de glúteo con banda"
  ],

  core: [
    "Dead Bug",
    "Plancha 30 segundos"
  ],

  exercises: [
        "Abducciones en máquina",
        "Puente de glúteos",
        "Peso muerto a una pierna",
        "Step Up",
        "Patada de glúteos"
      ]
    }
  ];

  return (
    <>
    {timer && (
      <RestTimer
        exerciseName={timer.exerciseName}
        onClose={() => setTimer(null)}
      />
    )}

    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#1E1218", marginBottom: "10px" }}>
        🍑 Plan Glúteos · Semana {activeWeek}
      </h2>

      <p style={{ color: "#7A5F68", marginBottom: "18px" }}>
        Progresión automática: {series} series por ejercicio.
      </p>

      {gluteDays.map((day, index) => (
        <div
          key={index}
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "18px",
            marginBottom: "16px",
            border: "1px solid #EDE0D8"
          }}
        >
          <h3 style={{ color: "#C8506A", marginBottom: "4px" }}>
            {day.label}
          </h3>

          <p style={{ color: "#7A5F68", marginBottom: "12px" }}>
            {day.focus}
          </p>
{/* ACTIVACIÓN */}
<div style={{ marginBottom: "18px" }}>
  <h4 style={{ color: "#E38AAE" }}>Activación</h4>

  {day.activation?.map((item, i) => (
    <p key={i} style={{ margin: "6px 0", color: "#7A5F68" }}>
      🔥 {item}
    </p>
  ))}
</div>

{/* CORE */}
<div style={{ marginBottom: "18px" }}>
  <h4 style={{ color: "#E38AAE" }}>Core</h4>

  {day.core?.map((item, i) => (
    <p key={i} style={{ margin: "6px 0", color: "#7A5F68" }}>
      ✨ {item}
    </p>
  ))}
</div>
          {day.exercises.map((exercise, i) => (
            <div
              key={i}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #F5EDE8"
              }}
            >
              <strong>{i + 1}. {exercise}</strong>
              <p style={{ fontSize: "12px", color: "#7A5F68" }}>
                {series} series · 6–10 reps
              </p>
              <WeightTracker
  exId={`glute_w${activeWeek}_d${activeGluteDay}_e${i}`}
  weights={weights}
  setWeights={setWeights}
  bodyweight={false}
/>
<button
  onClick={() => setTimer({ exerciseName: exercise })}
  style={{
    marginTop: "8px",
    padding: "8px 12px",
    borderRadius: "10px",
    border: "none",
    background: "#F2E8E0",
    color: "#7A5F68",
    fontSize: "12px",
    cursor: "pointer"
  }}
>
  ⏱ Descanso
</button>

            </div>
          ))}
          <button
  className="wod-btn"
  onClick={() => alert("Día de glúteos completado 🍑✨")}
>
  ✅ Marcar Día {index + 1} como completado
</button>
        </div>
      ))}
    </div>
</>
);
}


// ── 3-DAY TAB ─────────────────────────────────────────────
function ThreeDayTab({ activeWeek, completedDays, setCompletedDays, weights, setWeights }) {
  const [activeDay, setActiveDay] = useState(0);
  const workout = threeDays[activeDay];
  const series = getSeriesForWeek(activeWeek);
  const cardioMin = getCardioForWeek(activeWeek);
  const dayKey = `w${activeWeek}_3d${activeDay}`;
  const isDone = !!completedDays[dayKey];
  const phases = getTreadmillPhases(cardioMin);
  const cardioProgress = ((cardioMin - 25) / 15) * 100;
  const [timer, setTimer] = useState(null);

  return (
    <>

      {timer && <RestTimer exerciseName={timer.exerciseName} onClose={() => setTimer(null)} />}
      {/* DAY SELECTOR */}
      <div className="day3-pills-wrap">
        {threeDays.map((d, i) => (
          <button key={i} className={`day3-pill ${activeDay===i?"active":""}`} onClick={() => setActiveDay(i)}>
            <span className="dp-name">Día</span>
<span className="dp-num">{dayNums[i]}</span>
            <span style={{ fontSize:18 }}>{completedDays[`w${activeWeek}_3d${i}`] ? "✅" : d.emoji}</span>
            <span style={{ fontSize:9, color: activeDay===i ? "rgba(255,255,255,0.7)" : "var(--muted)", textAlign:"center", lineHeight:1.3 }}>{d.focus.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="series-banner">
        <div className="sb-text">
          <div className="sb-title">{workout.label} · {workout.focus}</div>
          <div className="sb-sub">Semana {activeWeek} · 6–10 reps · Sube el peso al llegar a 10</div>
        </div>
        <div className="sb-badge">{series} series<small>× 6-10 reps</small></div>
      </div>

      {/* ACTIVATION */}
      <div className="section">
        <div className="section-label">⚡ Activación</div>
        <div className="block-card">
          <div className="block-top" style={{ background:workout.activation.color }}>
            <div className="block-top-title" style={{ color:workout.activation.textColor }}>{workout.activation.title}</div>
            <div className="block-top-sub" style={{ color:workout.activation.subColor }}>{workout.activation.sub}</div>
          </div>
          <div className="block-body">
            {workout.activation.items.map((e,i) => (
              <div className="simple-row" key={i}>
                <div className="simple-dot" style={{ background:workout.activation.dotColor }} />
                <div className="simple-info"><div className="simple-name">{e.name}</div><div className="simple-tip">{e.tip}</div></div>
                <div className="simple-reps" style={{ color:workout.activation.repsColor, background:workout.activation.repsBg }}>{e.reps}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN WORKOUT */}
      <div className="section">
        <div className="section-label">💪 Entrenamiento principal</div>
        <div className="block-card">
          <div style={{ background:workout.color, padding:"18px 20px" }}>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, fontWeight:600, color:"white", marginBottom:6 }}>{workout.focus}</div>
            <div style={{ display:"flex", gap:12 }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.8)" }}>📋 {series} × 6-10 reps</span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.8)" }}>💪 {workout.exercises.length} ejerc.</span>
            </div>
          </div>
          <div style={{ padding:"4px 18px 8px" }}>
            {workout.exercises.map((e,i) => {
              const exId = `w${activeWeek}_3d${activeDay}_e${i}`;
              return (
                <div className="ex-block" key={i}>
                  <div className="ex-header">
                    <div className="ex-num">{i+1}</div>
                    <div className="ex-info"><div className="ex-name">{e.name}</div><div className="ex-tip">{e.tip}</div></div>
                    <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"flex-end" }}>
                      <div className="ex-sets-badge">{series}×6-10</div>
                      <button onClick={() => setTimer({ exerciseName: e.name })} style={{
                        fontSize:10, color:"var(--muted)", background:"var(--sand)", border:"none",
                        borderRadius:8, padding:"3px 8px", cursor:"pointer", whiteSpace:"nowrap"
                      }}>⏱ Descanso</button>
                    </div>
                  </div>
                  <WeightTracker exId={exId} weights={weights} setWeights={setWeights} bodyweight={e.bodyweight} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CORE PILATES — only Day 2 */}
      {workout.core && (
        <div className="section">
          <div className="section-label">🧘‍♀️ Core Pilates · Incluido hoy</div>
          <div className="core-note">
            <div className="cn-icon">🧘‍♀️</div>
            <div className="cn-text">
              <strong>Core completo al final del Día 2</strong>
              Hundred · Roll Up · Single Leg Stretch · Plank lateral · Dead Bug · Spine Stretch — 10 min de trabajo profundo abdominal estilo Pilates.
            </div>
          </div>
          <div className="block-card">
            <div className="block-top" style={{ background:"linear-gradient(135deg, #C9B8E8 0%, #EDE0FF 100%)" }}>
              <div className="block-top-title" style={{ color:"#1E1218" }}>Core profundo & control</div>
              <div className="block-top-sub" style={{ color:"#6B5890" }}>10 min · Respiración consciente · Sin descanso entre ejercicios</div>
            </div>
            <div className="block-body">
              {pilatesCore.map((e,i) => (
                <div className="simple-row" key={i}>
                  <div className="simple-dot" style={{ background:"#C9B8E8" }} />
                  <div className="simple-info"><div className="simple-name">{e.name}</div><div className="simple-tip">{e.tip}</div></div>
                  <div className="simple-reps" style={{ color:"#5B4080", background:"#EDE0FF" }}>{e.reps}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CARDIO — Day 1 & 3 */}
      {workout.hasCardio ? (
        <div className="section" style={{ paddingBottom:24 }}>
          <div className="section-label">🏃‍♀️ Cardio progresivo · Post-entreno</div>
          <div className="cardio-card" style={{ marginBottom:12 }}>
            <div style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", fontSize:40, opacity:0.12 }}>🏃‍♀️</div>
            <div className="cardio-title">Cardio semana {activeWeek}</div>
            <div className="cardio-duration">{cardioMin} min</div>
            <div className="cardio-sub">
              {activeWeek<=2 && "Sem 1-2 · Intensidad moderada · Zona 2"}
              {activeWeek>2&&activeWeek<=4 && "Sem 3-4 · Intensidad media · Empieza a sudar"}
              {activeWeek>4&&activeWeek<=6 && "Sem 5-6 · Media-alta · Intervalos opcionales"}
              {activeWeek>6 && "Sem 7-8 · Alta intensidad · HIIT opcional"}
            </div>
            <div className="cardio-options">
              {["Caminadora 🚶‍♀️","Elíptica 🔄","Bicicleta 🚴‍♀️","Escaladora 🧗‍♀️","Exterior 🌿"].map(o => <span className="cardio-tag" key={o}>{o}</span>)}
            </div>
            <div className="cardio-progress-label"><span>Sem 1-2: 25 min</span><span>Sem 7-8: 40 min</span></div>
            <div className="cardio-track"><div className="cardio-fill" style={{ width:`${25+cardioProgress}%` }} /></div>
          </div>
          <div className="treadmill-card">
            <div className="treadmill-header">
              <div className="th-icon">🚶‍♀️</div>
              <div className="th-text">
                <div className="th-title">Guía de caminadora</div>
                <div className="th-sub">Inclinación 9% · Zona de quema de grasa óptima</div>
              </div>
            </div>
            <div className="treadmill-stats">
              <div className="ts-item"><div className="ts-val">9<span className="ts-unit">%</span></div><div className="ts-label">Inclinación</div></div>
              <div className="ts-item"><div className="ts-val">3.5–4.5<span className="ts-unit"> km/h</span></div><div className="ts-label">Velocidad</div></div>
              <div className="ts-item"><div className="ts-val">{cardioMin}<span className="ts-unit"> min</span></div><div className="ts-label">Duración</div></div>
            </div>
            <div className="treadmill-phases">
              <div className="tp-label">Fases del entreno</div>
              {phases.map((p,i) => (
                <div className="tp-row" key={i}>
                  <div className="tp-time">{p.time}</div>
                  <div className="tp-info"><div className="tp-name">{p.name}</div><div className="tp-detail">{p.detail}</div></div>
                  <div className="tp-badge" style={{ background:intensityColor[p.intensity], color:intensityDot[p.intensity] }}>{p.intensity}</div>
                </div>
              ))}
            </div>
          </div>
          <button className={`wod-btn ${isDone?"done":""}`} onClick={() => setCompletedDays(prev => ({ ...prev, [dayKey]: !prev[dayKey] }))}>
            {isDone ? "✅ ¡Día completado!" : "🚀 Marcar día como completado"}
          </button>
        </div>
      ) : (
        <div className="section" style={{ paddingBottom:24 }}>
          <div style={{ background:"var(--sand)", borderRadius:16, padding:"14px 18px", marginTop:4, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:22 }}>🚫</span>
            <div style={{ fontSize:12, color:"var(--muted)", lineHeight:1.5 }}>
              <strong style={{ color:"var(--dark)", display:"block", marginBottom:2 }}>Sin cardio el Día 2</strong>
              El enfoque es fuerza de tren superior y core. Descansa o haz 10 min de caminata suave si quieres movimiento extra.
            </div>
          </div>
          <button className={`wod-btn ${isDone?"done":""}`} style={{ marginTop:14 }} onClick={() => setCompletedDays(prev => ({ ...prev, [dayKey]: !prev[dayKey] }))}>
            {isDone ? "✅ ¡Día completado!" : "🚀 Marcar día como completado"}
          </button>
        </div>
      )}
    
    </>
  );
}

// ── MAIN APP ──────────────────────────────────────────────
export default function NylaMethod() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeWeek, setActiveWeek] = useState(1);
  const [completedDays, setCompletedDays] = useState({});
  const [weights, setWeights] = useState({});
  const [showWeekPicker, setShowWeekPicker] = useState(false);
  const [mainTab, setMainTab] = useState("training");
  const [cycleMode, setCycleMode] = useState(false);
  const [activePlan, setActivePlan] = useState("5days");
  const [goal, setGoal] = useState("");
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [userName, setUserName] = useState(""); // empty = show setup screen

  const series = getSeriesForWeek(activeWeek);
  const cardioMin = getCardioForWeek(activeWeek);
  const completedWeeks = [1,2,3,4,5,6,7,8].filter(w => trainingDays.every((_,di) => completedDays[`w${w}_d${di}`]));
  const totalDone = trainingDays.filter((_,i) => completedDays[`w${activeWeek}_d${i}`]).length;
  const progressPct = ((activeWeek-1)/8 + totalDone/(trainingDays.length*8)) * 100;

  const goTo = (tab) => { setMainTab(tab); if(tab !== "cycle") setCycleMode(false); else setCycleMode(true); };

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* FIRST-TIME NAME SETUP */}

        {!userName && <NameSetup onSave={setUserName} />}

        <nav className="nav">
          <div className="logo">Nyla <em>Method</em></div>
          <div className="nav-right">
            <button className={`cycle-btn ${cycleMode?"":"off"}`} onClick={() => goTo(cycleMode ? "training" : "cycle")}>
              {cycleMode ? "🌸 Ciclo ON" : "🌸 Ciclo"}
            </button>
            <button className="week-badge" onClick={() => setShowWeekPicker(true)}>Sem {activeWeek}/8 ▾</button>
          </div>
        </nav>

        {showWeekPicker && (
          <div className="overlay" onClick={() => setShowWeekPicker(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-title">Plan de 8 semanas</div>
              <div className="modal-sub">Series y cardio aumentan automáticamente cada semana</div>
              <div className="week-grid">
                {[1,2,3,4,5,6,7,8].map(w => (
                  <div key={w} className={`week-option ${activeWeek===w?"active":""}`} onClick={() => { setActiveWeek(w); setShowWeekPicker(false); }}>
                    <div className="wo-num">{completedWeeks.includes(w) ? "✓" : w}</div>
                    <div className="wo-label">Sem {w}</div>
                    <div className="wo-series">{getSeriesForWeek(w)} series</div>
                    <div className="wo-cardio">{getCardioForWeek(w)} min · cardio</div>
                  </div>
                ))}
              </div>
              <button className="modal-close" onClick={() => setShowWeekPicker(false)}>Cerrar</button>
            </div>
          </div>
        )}

        {showGoalModal && (
          <GoalModal goal={goal} onSave={setGoal} onClose={() => setShowGoalModal(false)} />
        )}

        {mainTab === "affirmations" ? (
          <AffirmationsTab userName={userName} />
        ) : mainTab === "cycle" ? (
          <CycleTab completedDays={completedDays} setCompletedDays={setCompletedDays} />
        ) : (
          <>
            <div className="hero">
              <div className="hero-eyebrow">Tu método · 8 semanas</div>
              <div className="hero-greeting">
                {userName ? `Hola, ${userName} 🌸` : "Bienvenida 🌸"}
                <button className="hero-name-btn" onClick={() => setUserName("")} title="Cambiar nombre">
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginLeft:6 }}>✏️</span>
                </button>
              </div>
              <h1>Semana <em>{activeWeek}</em> — <em>{series}</em> series · <em>{cardioMin}</em> min</h1>
              <div className="hero-stats">
                <div className="h-stat"><div className="h-stat-val">{series}</div><div className="h-stat-label">Series</div></div>
                <div className="h-divider" />
                <div className="h-stat"><div className="h-stat-val">6-10</div><div className="h-stat-label">Reps</div></div>
                <div className="h-divider" />
                <div className="h-stat"><div className="h-stat-val">{cardioMin}'</div><div className="h-stat-label">Cardio</div></div>
                <div className="h-divider" />
                <div className="h-stat"><div className="h-stat-val">{totalDone}/{trainingDays.length}</div><div className="h-stat-label">Días</div></div>
              </div>
            </div>
            <div className="progress-wrap">
              <div className="progress-labels"><span>Semana {activeWeek} de 8</span><span>{Math.round(progressPct)}% completado</span></div>
              <div className="progress-track"><div className="progress-fill" style={{ width:`${progressPct}%` }} /></div>
            </div>
            <GoalBanner goal={goal} onEdit={() => setShowGoalModal(true)} activeWeek={activeWeek} />
            <div className="week-strip">
              {[1,2,3,4,5,6,7,8].map(w => (
                <div className="ws-dot" key={w} onClick={() => setActiveWeek(w)}>
                  <div className={`ws-circle ${activeWeek===w?"current":""} ${completedWeeks.includes(w)?"done":""}`}>{completedWeeks.includes(w)?"✓":w}</div>
                  <div className="ws-label">{getSeriesForWeek(w)}s·{getCardioForWeek(w)}'</div>
                </div>
              ))}
            </div>
            <div className="tab-nav">
              <button className={`tab-btn ${mainTab==="training"?"active":""}`} onClick={() => setMainTab("training")}>💪 Entreno</button>
            
            </div>
            {mainTab === "training" ? (
              <>
                {/* PLAN SWITCHER */}
                <div className="plan-switcher">
                  <button className={`plan-btn ${activePlan==="5days"?"active":""}`} onClick={() => setActivePlan("5days")}>
                    🗓 Plan 5 días
                  </button>
                  <button className={`plan-btn ${activePlan==="3days"?"active":""}`} onClick={() => setActivePlan("3days")}>
                    ⚡ Plan 3 días<span className="plan-tag">nuevo</span>
                  </button>
                  <button
  className={`plan-btn ${activePlan==="glutes" ? "active" : ""}`}
  onClick={() => setActivePlan("glutes")}
>
  🍑 Plan Glúteos
</button>
                </div>
   {activePlan === "5days" ? (
  <TrainingTab
    activeDay={activeDay}
    setActiveDay={setActiveDay}
    activeWeek={activeWeek}
    completedDays={completedDays}
    setCompletedDays={setCompletedDays}
    weights={weights}
    setWeights={setWeights}
  />
) : activePlan === "3days" ? (
  <ThreeDayTab
    activeWeek={activeWeek}
    completedDays={completedDays}
    setCompletedDays={setCompletedDays}
    weights={weights}
    setWeights={setWeights}
  />
) : (
  <GluteTab
  activeWeek={activeWeek}
  weights={weights}
  setWeights={setWeights}
/>
)}

   
              </>
            ) : (
              <NutritionTab />
            )}
          </>
        )}

        <nav className="bottom-nav">
          <button className={`nav-item ${mainTab==="training"&&!cycleMode?"active":""}`} onClick={() => goTo("training")}><span className="nav-item-icon">🏠</span>Inicio</button>
          <button className={`nav-item ${mainTab==="affirmations"?"active":""}`} onClick={() => goTo("affirmations")}><span className="nav-item-icon">✦</span>Afirmaciones</button>
          <button className={`nav-item ${mainTab==="nutrition"?"active":""}`} onClick={() => goTo("nutrition")}><span className="nav-item-icon">🥗</span>Nutrición</button>
          <button className={`nav-item ${cycleMode?"cycle-active":""}`} onClick={() => goTo("cycle")}><span className="nav-item-icon">🌸</span>Ciclo</button>
        </nav>
      </div>
    </>
  );
}
