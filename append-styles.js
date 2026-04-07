const fs = require('fs');
const css = `
/* --- Admin Dashboard & Success UI Layouts --- */
.admin-layout-main { padding-top: 100px; min-height: 100vh; background: var(--off-white); }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.admin-title { font-size: 2rem; }
.admin-grid-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
.admin-stat-box { background: var(--white); padding: 24px; border-radius: 12px; border: 1px solid var(--border); }
.admin-stat-label { color: var(--text-secondary); font-size: 14px; margin-bottom: 8px; }
.admin-stat-value { font-size: 24px; font-weight: 700; }

.admin-sections-wrap { display: grid; gap: 40px; }
.admin-panel-section { background: var(--white); padding: 32px; border-radius: 16px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.admin-panel-title { font-size: 20px; margin-bottom: 24px; }

.admin-table-wrap { overflow-x: auto; }
.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th { padding: 12px; color: var(--text-secondary); font-weight: 600; text-align: left; border-bottom: 2px solid var(--off-white); }
.admin-table td { padding: 12px; border-bottom: 1px solid var(--border); vertical-align: middle; }
.admin-table tr:last-child td { border-bottom: none; }

.admin-status-badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; }
.admin-status--success { background: #dcfce7; color: #166534; }
.admin-status--warning { background: #fef9c3; color: #854d0e; }
.admin-status--danger { background: #fee2e2; color: #991b1b; }
.admin-status--neutral { background: #f1f5f9; color: #64748b; }

.admin-inv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.admin-inv-card { display: flex; gap: 16px; padding: 16px; border: 1px solid var(--border); border-radius: 12px; background: var(--white); }
.admin-inv-img { width: 80px; height: 80px; background: var(--off-white); border-radius: 8px; position: relative; overflow: hidden; flex-shrink: 0; }
.admin-inv-info { flex: 1; }
.admin-inv-title { font-size: 15px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary); }
.admin-inv-meta { font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; }
.admin-inv-actions { display: flex; gap: 8px; align-items: center; }

/* Admin New Product */
.admin-form-container { max-width: 600px; }
.admin-form-wrap { background: var(--white); padding: 32px; border-radius: 16px; border: 1px solid var(--border); }
.admin-form-grid { display: grid; gap: 20px; }

/* Success Page */
.success-main { padding-top: 72px; min-height: 100vh; background: var(--off-white); display: flex; align-items: center; justify-content: center; }
.success-container { text-align: center; max-width: 540px; padding: 40px; margin: 0 auto; }
.success-icon { font-size: 4rem; margin-bottom: 24px; }
.success-title { font-size: 2.5rem; color: var(--blue-deep); margin-bottom: 16px; }
.success-message { font-size: 1.1rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 32px; }
.success-next-steps { background: var(--blue-ghost); border: 1.5px solid var(--border); border-radius: 16px; padding: 24px; margin-bottom: 32px; text-align: left; }
.success-next-title { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
.success-next-list { display: flex; flex-direction: column; gap: 10px; }
.success-next-item { font-size: 14px; color: var(--text-secondary); }
`;
fs.appendFileSync('./src/app/globals.css', css);
console.log('Appended styles to globals.css');
