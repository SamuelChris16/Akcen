
import React from 'react';
import { 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
  Label
} from 'recharts';
import { Star, Trophy } from 'lucide-react';

interface ProgressSCurveProps {
  data: any[];
  mode: 'daily' | 'weekly' | 'cumulative';
}

// Level Thresholds Configuration
const MASTERY_LEVELS = [
  { value: 25, label: 'Lvl 3: Varsity Senior', color: '#8FB386' }, // Green-ish
  { value: 50, label: 'Lvl 4: Uni Freshman', color: '#F4D35E' },  // Yellow/Gold
  { value: 100, label: 'Lvl 5: Research Fellow', color: '#4A6FA5' } // Blue
];

const CustomTooltip = ({ active, payload, label, mode }: any) => {
  if (active && payload && payload.length) {
    if (mode === 'cumulative') {
        const actual = payload.find((p: any) => p.dataKey === 'actual');
        const min = payload.find((p: any) => p.dataKey === 'plannedMin');
        const max = payload.find((p: any) => p.dataKey === 'plannedMax');
        const levelUp = payload[0]?.payload?.levelUpEvent;

        let status = '';
        let statusColor = '';
        
        if (actual) {
            if (actual.value > max.value) {
                status = 'Ahead';
                statusColor = 'text-akcen-green';
            } else if (actual.value < min.value) {
                status = 'Behind';
                statusColor = 'text-red-500';
            } else {
                status = 'On Track';
                statusColor = 'text-akcen-blue';
            }
        }

        return (
            <div className="bg-white border border-akcen-gray p-4 rounded-xl shadow-soft min-w-[180px]">
                <p className="text-akcen-muted text-xs mb-2 font-serif italic">{label}</p>
                {actual && (
                    <div className="mb-2">
                        <p className="text-xs text-akcen-muted">Cumulative</p>
                        <p className="font-bold text-lg text-akcen-text">{actual.value} <span className="text-xs font-normal text-akcen-muted">/ {max.value} Planned</span></p>
                        <p className={`text-xs font-bold ${statusColor} mt-1 uppercase`}>• {status}</p>
                    </div>
                )}
                {levelUp && (
                    <div className="mt-3 pt-3 border-t border-akcen-gray/50 animate-in slide-in-from-bottom-2 fade-in">
                        <div className="flex items-center gap-2 text-akcen-yellow mb-1">
                            <Trophy size={14} fill="currentColor" />
                            <span className="text-xs font-bold uppercase tracking-wider">Level Up!</span>
                        </div>
                        <p className="text-sm font-serif font-bold text-akcen-text">{levelUp.label}</p>
                    </div>
                )}
            </div>
        );
    } else if (mode === 'daily') {
        const actual = payload.find((p: any) => p.dataKey === 'worksheets');
        const target = payload.find((p: any) => p.dataKey === 'target');
        const isToday = payload[0].payload.isToday;
        
        return (
             <div className="bg-white border border-akcen-gray p-3 rounded-xl shadow-soft">
                <p className="text-akcen-muted text-xs mb-1 font-serif italic">
                    {label} {isToday && <span className="text-akcen-blue font-bold not-italic ml-1">(Today)</span>}
                </p>
                <div className="flex flex-col gap-1">
                    <p className="text-akcen-text font-bold text-sm">
                        Did: <span className="text-lg">{actual.value}</span>
                    </p>
                    <p className="text-akcen-muted text-xs">
                        Target: <span className="font-semibold">{target.value}</span>
                    </p>
                    {actual.value < target.value && (
                        <p className={`text-[10px] font-bold uppercase mt-1 ${isToday ? 'text-akcen-blue' : 'text-red-500'}`}>
                            {isToday ? 'In Progress' : 'Missed Goal'}
                        </p>
                    )}
                </div>
             </div>
        );
    } else if (mode === 'weekly') {
        return (
             <div className="bg-white border border-akcen-gray p-3 rounded-xl shadow-soft">
                <p className="text-akcen-muted text-xs mb-1 font-serif italic">{label}</p>
                <p className="font-bold text-lg text-akcen-text">{payload[0].value} <span className="text-xs font-normal text-akcen-muted">Worksheets</span></p>
             </div>
        );
    }
  }
  return null;
};

// Custom Dot Component for Level Ups
const LevelUpDot = (props: any) => {
    const { cx, cy, payload } = props;
    
    if (payload.levelUpEvent) {
        return (
            <g>
                <circle cx={cx} cy={cy} r={10} fill={payload.levelUpEvent.color} opacity={0.2} className="animate-pulse" />
                <circle cx={cx} cy={cy} r={6} fill={payload.levelUpEvent.color} stroke="white" strokeWidth={2} />
                <path 
                    d={`M${cx-3} ${cy-3} L${cx} ${cy+3} L${cx+3} ${cy-3}`} // Simple chevron-like shape or just use the circle
                    fill="white"
                />
            </g>
        );
    }
    
    // Standard dot for actual progress
    return (
        <circle cx={cx} cy={cy} r={4} stroke="#1E293B" strokeWidth={2} fill="#fff" />
    );
};

const ProgressSCurve: React.FC<ProgressSCurveProps> = ({ data, mode }) => {
  
  // Render Logic for S-Curve (Cumulative)
  if (mode === 'cumulative') {
      const lastActual = data.filter(d => d.actual !== null).pop();
      let status = 'Unknown';
      let statusColor = 'text-akcen-muted';
      
      if (lastActual) {
          if (lastActual.actual > lastActual.plannedMax) {
              status = 'Ahead';
              statusColor = 'text-akcen-green';
          } else if (lastActual.actual < lastActual.plannedMin) {
              status = 'Behind';
              statusColor = 'text-red-500';
          } else {
              status = 'On Track';
              statusColor = 'text-akcen-blue';
          }
      }

      // Pre-process data to identify Level Up events
      let currentMax = 0;
      const chartData = data.map(d => {
          if (d.actual === null || d.actual === undefined) return d;
          
          let levelUpEvent = null;
          // Check if this point crosses a threshold that hasn't been crossed yet by previous points
          // Logic: If actual >= level AND the previous max was < level
          MASTERY_LEVELS.forEach(level => {
              if (d.actual >= level.value && currentMax < level.value) {
                  levelUpEvent = level;
              }
          });
          
          if (d.actual > currentMax) currentMax = d.actual;
          
          return { ...d, levelUpEvent };
      });

      return (
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
             <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor.replace('text-', 'border-').replace('500', '200')} bg-white text-akcen-text`}>
                {status}
            </span>
          </div>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="plannedZone" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4A6FA5" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#4A6FA5" stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E7EB" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter' }} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter' }} dx={-10} />
                    <Tooltip content={<CustomTooltip mode={mode} />} />
                    
                    {/* Level Threshold Lines */}
                    {MASTERY_LEVELS.map((level) => (
                        <ReferenceLine 
                            key={level.label} 
                            y={level.value} 
                            stroke={level.color} 
                            strokeDasharray="3 3" 
                            strokeOpacity={0.6}
                        >
                            <Label 
                                value={level.label} 
                                position="insideBottomRight" 
                                fill={level.color} 
                                fontSize={10} 
                                fontWeight="bold"
                                className="hidden sm:block"
                            />
                        </ReferenceLine>
                    ))}

                    <Area type="monotone" dataKey="plannedMax" stroke="#4A6FA5" strokeDasharray="4 4" strokeWidth={1} fill="url(#plannedZone)" activeDot={false} />
                    <Area type="monotone" dataKey="plannedMin" stroke="#4A6FA5" strokeDasharray="4 4" strokeWidth={1} fill="#FFFFFF" fillOpacity={1} activeDot={false} />
                    
                    <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#1E293B" 
                        strokeWidth={3} 
                        dot={<LevelUpDot />}
                        activeDot={{ r: 6 }} 
                    />
                </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
  }

  // Render Logic for Daily (Composed Chart with Target Line)
  if (mode === 'daily') {
      return (
        <div className="flex flex-col h-full pt-8">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E7EB" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter' }} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter' }} dx={-10} />
                    <Tooltip content={<CustomTooltip mode={mode} />} cursor={{fill: '#F8F9FB'}} />
                    
                    {/* Actual Worksheets Bar */}
                    <Bar dataKey="worksheets" radius={[4, 4, 0, 0]} barSize={30}>
                        {data.map((entry, index) => {
                            let fillColor = '#4A6FA5'; // Akcen Blue
                            if (entry.isToday) {
                                fillColor = '#1E293B'; // Akcen Slate (Today/Active)
                            } else if (entry.worksheets < entry.target) {
                                fillColor = '#EF4444'; // Red for Missed
                            }

                            return (
                                <Cell key={`cell-${index}`} fill={fillColor} />
                            );
                        })}
                    </Bar>
                    
                    {/* Target Line */}
                    <Line 
                        type="step" 
                        dataKey="target" 
                        stroke="#64748B" 
                        strokeWidth={2} 
                        strokeDasharray="4 4" 
                        dot={false}
                        activeDot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
      );
  }

  // Render Logic for Weekly (Bar Chart)
  if (mode === 'weekly') {
      return (
        <div className="flex flex-col h-full pt-8">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E7EB" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter' }} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter' }} dx={-10} />
                    <Tooltip content={<CustomTooltip mode={mode} />} cursor={{fill: '#F8F9FB'}} />
                    <Bar dataKey="worksheets" fill="#4A6FA5" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      );
  }

  return null;
};

export default ProgressSCurve;
