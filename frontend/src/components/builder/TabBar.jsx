import { COLORS as C } from '../../utils/constants.js';

export const TABS = [
  { id: 'contact',    label: 'Contact',    step: '1' },
  { id: 'summary',    label: 'Summary',    step: '2' },
  { id: 'skills',     label: 'Skills',     step: '3' },
  { id: 'experience', label: 'Experience', step: '4' },
  { id: 'education',  label: 'Education',  step: '5' },
];

/**
 * Step-indicator tab bar for the resume builder.
 * @param {{ activeTab: string, onTabChange: function }} props
 */
export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div style={{ display: 'flex', gap: 3, background: C.cream, borderRadius: 12, padding: 4, marginBottom: 26 }}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => onTabChange(tab.id)} style={{
            flex: 1, padding: '7px 4px', border: 'none', borderRadius: 9, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11.5,
            transition: 'all .2s',
            background: isActive ? C.white     : 'transparent',
            color:      isActive ? C.purple    : '#aaa',
            boxShadow:  isActive ? '0 2px 10px rgba(54,43,85,.1)' : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          }}>
            <span style={{
              width: 20, height: 20, borderRadius: '50%', fontSize: 10, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isActive ? C.purple    : '#e0dce8',
              color:      isActive ? C.white     : '#aaa',
            }}>
              {tab.step}
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
