
import { useState, useEffect } from "react";

// â”€â”€ PALETTE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const C = {
  navy:    "#0B1C3F",
  navyD:   "#060E21",
  blue:    "#1D4ED8",
  blueL:   "#3B82F6",
  blueSoft:"#EFF6FF",
  cyan:    "#06B6D4",
  teal:    "#0F766E",
  green:   "#16A34A",
  greenS:  "#DCFCE7",
  amber:   "#D97706",
  amberS:  "#FEF3C7",
  red:     "#DC2626",
  redS:    "#FEE2E2",
  purple:  "#7C3AED",
  purpleS: "#EDE9FE",
  slate:   "#64748B",
  slateL:  "#CBD5E1",
  paper:   "#F8FAFC",
  white:   "#FFFFFF",
  ink:     "#0F172A",
  muted:   "#475569",
};

const TABS = [
  { id:"overview",    icon:"ðŸ ", label:"Overview"        },
  { id:"profile",     icon:"ðŸ‘¤", label:"Profile"         },
  { id:"agency",      icon:"ðŸ¢", label:"Agency"          },
  { id:"fees",        icon:"ðŸ’°", label:"Fees (Verified)" },
  { id:"jobeval",     icon:"ðŸŽ¯", label:"Job Eval"        },
  { id:"proposals",   icon:"âœ‰ï¸",  label:"Proposals"       },
  { id:"connects",    icon:"âš¡", label:"Connects"        },
  { id:"growth",      icon:"ðŸ“ˆ", label:"Growth"          },
  { id:"dailylogs",   icon:"ðŸ“‹", label:"Daily Logs"      },
  { id:"commission",  icon:"ðŸ’Ž", label:"Commission"      },
  { id:"projects",    icon:"ðŸ“‚", label:"Projects"        },
  { id:"attendance",  icon:"âœ…", label:"Attendance"      },
  { id:"companies",   icon:"ðŸ†", label:"Top Companies"   },
  { id:"status",      icon:"ðŸš¦", label:"Status"          },
  { id:"ailearn",     icon:"ðŸŽ“", label:"AI Learning"     },
  { id:"brand",       icon:"ðŸŽ¨", label:"Brand Assets"    },
];

// â”€â”€ SHARED UI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Card = ({ children, style={} }) => (
  <div style={{ background:C.white, border:`1px solid ${C.slateL}`, borderRadius:12, padding:"20px 22px", marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,.06)", ...style }}>
    {children}
  </div>
);
const Badge = ({ label, color=C.blueL, bg=C.blueSoft }) => (
  <span style={{ background:bg, color, border:`1px solid ${color}30`, borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:700, letterSpacing:.3 }}>{label}</span>
);
const Stat = ({ label, value, color=C.blue }) => (
  <div style={{ textAlign:"center", padding:"14px 10px", background:C.paper, borderRadius:10, border:`1px solid ${C.slateL}` }}>
    <div style={{ fontSize:22, fontWeight:800, color }}>{value}</div>
    <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{label}</div>
  </div>
);
const Section = ({ title, children, accent=C.blue }) => (
  <div style={{ marginBottom:22 }}>
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
      <div style={{ width:4, height:20, background:accent, borderRadius:4 }} />
      <span style={{ fontWeight:700, fontSize:15, color:C.ink }}>{title}</span>
    </div>
    {children}
  </div>
);
const Row = ({ label, value, ok }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.paper}` }}>
    <span style={{ color:C.muted, fontSize:13 }}>{label}</span>
    <span style={{ fontWeight:600, fontSize:13, color: ok===true?C.green:ok===false?C.red:C.ink }}>{value}</span>
  </div>
);

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// TAB CONTENT COMPONENTS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// â”€â”€ 1. OVERVIEW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function OverviewTab() {
  const members = [
    { name:"Saqib Shahzad",    role:"Technical Director / Principal AI Eng",  badge:"Rising Talent â­5.0", rate:"$55/hr â†’ $75",  status:"ðŸŸ¢ Active" },
    { name:"Usman Buttar",      role:"QA Lead / Enterprise Testing",            badge:"Senior",             rate:"PKT 6pmâ€“3am",    status:"ðŸŸ¢ Active" },
    { name:"Subhan Asif",       role:"Profile Ops / Content / SEO",             badge:"Full-time",          rate:"â€”",              status:"ðŸŸ¡ Building" },
    { name:"Hamza Nadeem",      role:"Full-Stack AI Engineer",                  badge:"Personal + Agency",  rate:"PKT 7pmâ€“9pm",    status:"ðŸŸ¢ Active" },
    { name:"Fiza Nadeem",       role:"AutoLead AI / Customer Support",          badge:"Agency",             rate:"PKT 7pmâ€“8pm",    status:"ðŸŸ¢ Active" },
    { name:"Sadia Ijaz",        role:"B2B Lead Gen / AI Automation",            badge:"Coordinator",        rate:"Full-time",      status:"ðŸŸ¡ Proposals" },
    { name:"Jahanzaib (Zeb)",   role:"Senior Manager / Systems Engineer",       badge:"Builder",            rate:"QA @CVS +AI Ops", status:"ðŸŸ¢ Active" },
    { name:"Kaleem Ullah",      role:"Integration Testing",                     badge:"Trainee",            rate:"â€”",              status:"ðŸ”´ Absent" },
  ];
  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,${C.navy},${C.navyD})`, color:C.white, border:"none" }}>
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800, letterSpacing:-.5 }}>AI ADVOCATE AGENCY</div>
            <div style={{ color:C.blueL, fontSize:13, marginTop:4 }}>AI ADVOCATE HOLDING LLC Â· Sugar Land, TX USA Â· Founded 2010</div>
            <div style={{ fontSize:12, color:"#94A3B8", marginTop:2 }}>upwork-ai-advocate-agency.vercel.app</div>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <Badge label="Agency Rate $45-55/hr â†’ $65-85/hr" color={C.cyan} bg={"#164E63"} />
            <Badge label="0 Jobs â†’ Need 5+" color={C.amber} bg={"#78350F"} />
            <Badge label="Rising Talent" color={C.green} bg={"#14532D"} />
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginTop:20 }}>
          {[["Team Members","8+"],["Proposals Sent","14"],["Approved","6"],["In Review","5"]].map(([l,v])=>(
            <div key={l} style={{ textAlign:"center", background:"rgba(255,255,255,.08)", borderRadius:10, padding:"12px 8px" }}>
              <div style={{ fontSize:20, fontWeight:800, color:C.cyan }}>{v}</div>
              <div style={{ fontSize:11, color:"#94A3B8", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <Section title="Team Members" accent={C.blue}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:C.navy, color:C.white }}>
                {["Name","Role","Badge","Rate/Hours","Status"].map(h=>(
                  <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontWeight:600, fontSize:12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m,i)=>(
                <tr key={m.name} style={{ background:i%2===0?C.white:C.paper }}>
                  <td style={{ padding:"9px 12px", fontWeight:700, color:C.navy }}>{m.name}</td>
                  <td style={{ padding:"9px 12px", color:C.muted }}>{m.role}</td>
                  <td style={{ padding:"9px 12px" }}><Badge label={m.badge} /></td>
                  <td style={{ padding:"9px 12px", color:C.muted, fontSize:12 }}>{m.rate}</td>
                  <td style={{ padding:"9px 12px" }}>{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="System Resources" accent={C.teal}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
          {[
            ["ðŸŒ Live App","upwork-ai-advocate-agency.vercel.app","Main Operations Hub (16 tabs)"],
            ["ðŸ“Š Google Sheet","20-tab master tracker","Daily logs + commissions auto-sync"],
            ["ðŸ“ Drive Folder","23 research documents","Proposals, guides, playbooks"],
            ["ðŸ¢ Upwork Agency","AI ADVOCATE HOLDING LLC","Profile optimization in progress"],
          ].map(([icon,title,desc])=>(
            <Card key={title} style={{ padding:"14px 16px", marginBottom:0 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:4 }}>{icon} {title}</div>
              <div style={{ fontSize:12, color:C.muted }}>{desc}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="ðŸ”¥ Critical Actions (Do TODAY)" accent={C.red}>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            {task:"Send proposals TODAY â€” 0 jobs is #1 blocker",who:"Sadia",urgency:"ðŸ”´ CRITICAL"},
            {task:"Raise Saqib hourly rate $35 â†’ $55/hr immediately",who:"Saqib",urgency:"ðŸ”´ CRITICAL"},
            {task:"Zeb â€” ID verification on Upwork (boosts ranking 15-20%)",who:"Jahanzaib",urgency:"ðŸ”´ CRITICAL"},
            {task:"Add LangGraph + CrewAI to Saqib's Upwork skills (15th slot)",who:"Subhan",urgency:"ðŸ”´ TODAY"},
            {task:"Change agency size 11-50 â†’ 2-10 (more credible for new agency)",who:"Saqib",urgency:"âš ï¸ TODAY"},
            {task:"Change year founded 2026 â†’ 2010 (reflects 15+ years experience)",who:"Saqib",urgency:"âš ï¸ TODAY"},
            {task:"Add Startup to client focus in agency settings",who:"Saqib",urgency:"âš ï¸ TODAY"},
            {task:"Reorder portfolio: first 3 must be LLM/RAG/GenAI projects",who:"Subhan",urgency:"âš ï¸ TODAY"},
          ].map(item=>(
            <div key={item.task} style={{ display:"flex", gap:12, alignItems:"flex-start", background:C.white, border:`1px solid ${C.slateL}`, borderRadius:8, padding:"10px 14px" }}>
              <span style={{ fontSize:11, fontWeight:700, color:item.urgency.includes("CRITICAL")?C.red:C.amber, whiteSpace:"nowrap" }}>{item.urgency}</span>
              <span style={{ fontSize:13, color:C.ink, flex:1 }}>{item.task}</span>
              <Badge label={item.who} color={C.purple} bg={C.purpleS} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// â”€â”€ 2. PROFILE (SAQIB) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProfileTab() {
  const [copied,setCopied] = useState("");
  const copy = (text,key) => { navigator.clipboard?.writeText(text); setCopied(key); setTimeout(()=>setCopied(""),2000); };
  const hookBio = `I build AI systems that ship to production and stay there.

10+ years delivering production ML/GenAI systems for Fortune 500 clients. MS Data Science. Specialist in LangGraph agentic pipelines, RAG architectures, and FastAPI backends that handle real-world load.

Recent work:
â€¢ Real-time earnings call intelligence (audio-to-insight <90 seconds, 10+ concurrent calls)
â€¢ AI billing compliance engine recovering 15% lost revenue for top-tier law firm
â€¢ Production ML systems running at 1M+ decisions/day

Stack: LangGraph Â· LangChain Â· CrewAI Â· RAG Â· OpenAI/Claude API Â· FastAPI Â· React Â· PostgreSQL Â· Docker Â· SageMaker Â· MLflow

I work exclusively on remote contracts. Rising Talent badge. 5.0â˜… across all completed work.`;

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,#1E3A5F,#0B1C3F)`, color:C.white, border:"none" }}>
        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:`linear-gradient(135deg,${C.blueL},${C.cyan})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:800, color:C.white, flexShrink:0 }}>S</div>
          <div>
            <div style={{ fontSize:18, fontWeight:800 }}>Saqib Shahzad</div>
            <div style={{ color:C.blueL, fontSize:13 }}>Senior AI/ML Engineer | LangGraph Â· RAG Â· GenAI Â· FastAPI</div>
            <div style={{ display:"flex", gap:8, marginTop:6, flexWrap:"wrap" }}>
              <Badge label="Rising Talent" color={C.cyan} bg={"#164E63"} />
              <Badge label="â­ 5.0 Rating" color={C.green} bg={"#14532D"} />
              <Badge label="3 Jobs Done" color={C.amber} bg={"#78350F"} />
            </div>
          </div>
        </div>
      </Card>

      <Section title="Profile Audit â€” Actions Required" accent={C.red}>
        {[
          {item:"Profile Title",cur:"Senior Full Stack Engineer | SaaS GenAI LLMs",req:"Senior AI/ML Engineer | LangGraph Â· RAG Â· GenAI Â· FastAPI | 10+ Years",priority:"âš ï¸ UPDATE",who:"Subhan",done:false},
          {item:"Hourly Rate",cur:"$35/hr",req:"$55/hr now â†’ $75/hr after Top Rated",priority:"ðŸ”´ CRITICAL",who:"Saqib",done:false},
          {item:"Badge",cur:"Rising Talent",req:"Keep â€” path to Top Rated",priority:"âœ… KEEP",who:"â€”",done:true},
          {item:"Rating",cur:"5.0â˜…",req:"5.0â˜… â€” perfect",priority:"âœ… PERFECT",who:"â€”",done:true},
          {item:"Jobs Completed",cur:"3",req:"5+ to strengthen profile",priority:"âš ï¸ MORE",who:"Sadia",done:false},
          {item:"Skills Used",cur:"13/15",req:"Add LangGraph (15th) + CrewAI",priority:"ðŸ”´ MISSING",who:"Subhan",done:false},
          {item:"Portfolio Items",cur:"49 items",req:"First 3 MUST be AI/LLM projects",priority:"âš ï¸ REORDER",who:"Subhan",done:false},
          {item:"Bio Hook",cur:"Not verified",req:"'I build AI systems that ship to production'",priority:"âš ï¸ CHECK",who:"Subhan",done:false},
          {item:"Availability",cur:"Not verified",req:"Set to Available + instant booking",priority:"âš ï¸ VERIFY",who:"Subhan",done:false},
          {item:"ID Verification",cur:"Verified",req:"Verified",priority:"âœ… DONE",who:"â€”",done:true},
          {item:"Specialized Profiles",cur:"None",req:"2: LLM+Agentic AI | Full Stack",priority:"âš ï¸ CREATE",who:"Saqib",done:false},
        ].map(r=>(
          <div key={r.item} style={{ display:"grid", gridTemplateColumns:"1.5fr 1.5fr 1fr .8fr", gap:8, alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${C.paper}` }}>
            <span style={{ fontWeight:600, fontSize:12, color:C.navy }}>{r.item}</span>
            <span style={{ fontSize:11, color:r.done?C.green:C.red }}>{r.done?"âœ… "+r.cur:r.cur + " â†’ " + r.req.substring(0,40)}</span>
            <span style={{ fontSize:11, fontWeight:700, color:r.priority.includes("CRITICAL")?C.red:r.priority.includes("KEEP")||r.priority.includes("DONE")||r.priority.includes("PERFECT")?C.green:C.amber }}>{r.priority}</span>
            <Badge label={r.who} color={C.purple} bg={C.purpleS} />
          </div>
        ))}
      </Section>

      <Section title="ðŸ“‹ Bio Hook â€” Copy Ready" accent={C.teal}>
        <Card>
          <div style={{ fontFamily:"monospace", fontSize:12, color:C.ink, whiteSpace:"pre-wrap", lineHeight:1.7, background:C.paper, borderRadius:8, padding:16 }}>{hookBio}</div>
          <button onClick={()=>copy(hookBio,"bio")} style={{ marginTop:12, background:copied==="bio"?C.green:C.blue, color:C.white, border:"none", borderRadius:8, padding:"8px 20px", cursor:"pointer", fontWeight:700, fontSize:13 }}>
            {copied==="bio"?"âœ“ Copied!":"ðŸ“‹ Copy Bio"}
          </button>
        </Card>
      </Section>

      <Section title="ðŸ”‘ Top SEO Keywords for Profile" accent={C.purple}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {[
            {kw:"LangGraph",vol:"ðŸ”¥ 340% â†‘",use:"Title+Skills+Bio"},
            {kw:"LangChain",vol:"ðŸ”¥ Very High",use:"Skills+Bio"},
            {kw:"RAG pipeline",vol:"ðŸ”¥ High",use:"Title+Bio"},
            {kw:"AI agent",vol:"ðŸ”¥ Very High",use:"Title+Bio"},
            {kw:"FastAPI",vol:"ðŸ”¥ High",use:"Title+Skills"},
            {kw:"OpenAI API",vol:"ðŸ”¥ Very High",use:"Skills+Bio"},
            {kw:"CrewAI",vol:"ðŸ“ˆ Medium-High",use:"Skills"},
            {kw:"n8n automation",vol:"ðŸ“ˆ Medium",use:"Title+Skills"},
            {kw:"MLOps",vol:"ðŸ”¥ High",use:"Skills+Bio"},
            {kw:"Claude API",vol:"ðŸ“ˆ Growing",use:"Bio"},
            {kw:"Pinecone",vol:"ðŸ“ˆ Medium",use:"Skills"},
            {kw:"React SaaS",vol:"ðŸ”¥ High",use:"Title+Skills"},
          ].map(k=>(
            <div key={k.kw} style={{ background:C.purpleS, borderRadius:8, padding:"10px 12px", border:`1px solid ${C.purple}30` }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.purple }}>{k.kw}</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{k.vol} Â· {k.use}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// â”€â”€ 3. AGENCY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AgencyTab() {
  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,${C.teal},#0A4944)`, color:C.white, border:"none" }}>
        <div style={{ fontSize:18, fontWeight:800 }}>AI ADVOCATE HOLDING LLC</div>
        <div style={{ color:"#6EE7B7", fontSize:13, marginTop:4 }}>US-Based AI Engineering & Automation Agency Â· Sugar Land, TX</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginTop:16 }}>
          {[["Rate","$45-55/hr â†’ $65-85"],["Jobs","0 â†’ Need 5+"],["Size","2-10 workers"]].map(([l,v])=>(
            <div key={l} style={{ background:"rgba(255,255,255,.1)", borderRadius:8, padding:"10px 12px", textAlign:"center" }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#6EE7B7" }}>{v}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.7)" }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <Section title="Agency Profile Audit" accent={C.teal}>
        {[
          {item:"Agency Name",cur:"AI ADVOCATE HOLDING LLC",status:"âœ… KEEP",done:true},
          {item:"Tagline",cur:"AI Development | LLM Engineering | Automation | SaaS | QA",status:"âš ï¸ Update to this",done:false},
          {item:"Rate",cur:"$45-55/hr",req:"$65-85/hr after 1st contract",status:"âš ï¸ RAISE",done:false},
          {item:"Total Jobs",cur:"0",req:"5+ to establish trust",status:"ðŸ”´ CRITICAL â€” Send proposals TODAY",done:false},
          {item:"Overview Bio",cur:"Generic ~400 words",req:"700+ words with flagship projects + metrics",status:"âš ï¸ REWRITE",done:false},
          {item:"Logo",cur:"Not finalized",req:"Professional navy/white design",status:"âš ï¸ Sana finalizing",done:false},
          {item:"Agency Size",cur:"11-50 (WRONG)",req:"2-10",status:"ðŸ”´ FIX TODAY",done:false},
          {item:"Year Founded",cur:"2026 (WRONG)",req:"2010 (team 15+ yrs experience)",status:"ðŸ”´ FIX TODAY",done:false},
          {item:"Portfolio",cur:"2 items",req:"5-10 high-quality items",status:"âš ï¸ Add 3 more",done:false},
          {item:"Services",cur:"6 services updated June 8",req:"All 6 optimized",status:"âœ… DONE",done:true},
          {item:"Skills",cur:"15 skills",req:"Verify LangGraph+CrewAI listed",status:"âš ï¸ CHECK",done:false},
          {item:"Website",cur:"Not set",req:"upwork-ai-advocate-agency.vercel.app",status:"âš ï¸ ADD TODAY",done:false},
          {item:"Location",cur:"Sugar Land TX USA",req:"Correct",status:"âœ… CORRECT",done:true},
          {item:"Client Focus",cur:"Medium + Small",req:"Add Startup",status:"âš ï¸ ADD TODAY",done:false},
        ].map(r=>(
          <Row key={r.item} label={r.item} value={r.status} ok={r.done} />
        ))}
      </Section>

      <Section title="Agency Bio â€” Copy Ready for Upwork" accent={C.blue}>
        <Card>
          <div style={{ fontSize:12, color:C.ink, lineHeight:1.8, background:C.paper, borderRadius:8, padding:16 }}>
            <strong>AI Advocate</strong> is a US-based AI engineering and automation agency that builds production-grade systems for startups and enterprise clients worldwide. We have delivered 100+ projects over 15+ years across AI development, automation, SaaS, QA, and data science.<br/><br/>
            <strong>Core specializations:</strong><br/>
            â€¢ LLM Engineering & Agentic AI (LangChain, LangGraph, CrewAI, RAG pipelines, OpenAI, Claude API)<br/>
            â€¢ MLOps & ML Platform Architecture (SageMaker, Kubernetes, MLflow, Prometheus)<br/>
            â€¢ GenAI Product Development (conversational AI, semantic search, financial narratives)<br/>
            â€¢ Full Stack SaaS (FastAPI, React, Next.js, Node.js, PostgreSQL, Docker)<br/>
            â€¢ Workflow Automation (n8n, Make.com, Zapier, API integrations)<br/>
            â€¢ QA Automation & Testing (Selenium, Cypress, Playwright, API testing)<br/>
            â€¢ Data Science & Analytics (forecasting, recommendation systems, Power BI, Tableau)<br/><br/>
            We have delivered $50M+ in verified business value for Fortune 500 clients in healthcare, finance, energy, and technology. Flagship projects include a real-time earnings call intelligence platform (audio-to-insight under 90 seconds) and an AI billing compliance engine recovering 15% of lost revenue.
          </div>
        </Card>
      </Section>

      <Section title="Jahanzaib (Zeb) Profile Audit" accent={C.purple}>
        {[
          {item:"Hourly Rate",cur:"$18/hr (WRONG)",req:"$35/hr minimum â€” justify with n8n portfolio",status:"ðŸ”´ RAISE NOW"},
          {item:"ID Verification",cur:"UNVERIFIED",req:"Verified â€” boosts ranking 15-20%",status:"ðŸ”´ CRITICAL â€” DO TODAY"},
          {item:"Work History",cur:"0 jobs",req:"1+ completed job ASAP",status:"ðŸ”´ CRITICAL"},
          {item:"Portfolio",cur:"3 items",req:"8-10 items from n8n portfolio",status:"âš ï¸ ADD"},
          {item:"Connects",cur:"9 remaining",req:"Buy 80-connect pack ($12)",status:"âš ï¸ LOW â€” Buy Now"},
          {item:"Skills",cur:"20 skills",req:"Trim to 15 max â€” keep AI/automation focus",status:"âš ï¸ TRIM"},
          {item:"Bio",cur:"Well-written with metrics",req:"Keep â€” very strong",status:"âœ… EXCELLENT"},
          {item:"Title",cur:"AI Automation Engineer | n8n | Integration Testing",status:"âš ï¸ Minor update",req:"Add n8n explicitly"},
        ].map(r=>(
          <Row key={r.item} label={r.item} value={r.status} ok={r.status.includes("âœ…")} />
        ))}
      </Section>
    </div>
  );
}

// â”€â”€ 4. FEES (VERIFIED) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FeesTab() {
  const [calc, setCalc] = useState({ rate:50, fee:10 });
  const net = (calc.rate * (1 - calc.fee/100)).toFixed(2);
  const grossUp = (calc.rate / (1 - calc.fee/100)).toFixed(2);

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,#0F766E,#0A4944)`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸ’° Upwork Fee Structure â€” June 2026 (Verified)</div>
        <div style={{ color:"#6EE7B7", fontSize:12, marginTop:4 }}>All figures cross-verified against official Upwork documentation. Last audit: June 13, 2026</div>
      </Card>

      <Section title="Freelancer Service Fee (The Big Change)" accent={C.teal}>
        <Card>
          <div style={{ background:C.amberS, border:`1px solid ${C.amber}`, borderRadius:8, padding:14, marginBottom:12 }}>
            <strong>âš ï¸ KEY FACT:</strong> The old 20%/10%/5% tiered fee is DEAD (retired May 3, 2023). As of June 2026, Upwork charges a <strong>variable 0â€“15% per-contract fee</strong>.
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            <div style={{ background:C.redS, borderRadius:8, padding:12, textAlign:"center" }}>
              <div style={{ fontWeight:800, fontSize:13, color:C.red }}>âŒ DEAD</div>
              <div style={{ fontSize:12, color:C.ink, marginTop:4 }}>20%/10%/5% tiers<br/>(retired May 2023)</div>
            </div>
            <div style={{ background:C.amberS, borderRadius:8, padding:12, textAlign:"center" }}>
              <div style={{ fontWeight:800, fontSize:13, color:C.amber }}>âš ï¸ GONE</div>
              <div style={{ fontSize:12, color:C.ink, marginTop:4 }}>Flat 10%<br/>(May 2023 â€“ Apr 2025)</div>
            </div>
            <div style={{ background:C.greenS, borderRadius:8, padding:12, textAlign:"center" }}>
              <div style={{ fontWeight:800, fontSize:13, color:C.green }}>âœ… CURRENT</div>
              <div style={{ fontSize:12, color:C.ink, marginTop:4 }}>Variable 0â€“15%<br/>(May 1, 2025 â†’ now)</div>
            </div>
          </div>
          <div style={{ marginTop:14, fontSize:13, color:C.ink, lineHeight:1.8 }}>
            <strong>How it works:</strong> Fee is set per-contract at proposal/offer time, locked for contract life. Average in practice: ~10%. Formula is unpublished. Cannot be known until you bid.<br/>
            <strong>Source:</strong> support.upwork.com/hc/en-us/articles/211062538
          </div>
        </Card>
      </Section>

      <Section title="All Fees Quick Reference" accent={C.blue}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:C.navy, color:C.white }}>
                {["Fee Type","Amount","Notes","Verified"].map(h=>(
                  <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontSize:12, fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Freelancer Service Fee","0â€“15% per contract","~10% average, set per contract","âœ… Official"],
                ["Client Basic Fee","5% (up to 7.99% non-ACH)","Card/PayPal = up to 7.99%","âœ… Verified"],
                ["Client Business Plus","10% (8% with ACH)","ACH needs $1K+ spent + 90 days","âœ… Verified"],
                ["Contract Initiation Fee","$0.99â€“$14.99 one-time","Per new contract, non-refundable","âœ… Official"],
                ["Connects Price","$0.15 each","10 minimum purchase","âœ… Official"],
                ["Standard Job Cost","~6 Connects (~$0.90)","4â€“16 range, dynamic per job","âœ… Verified"],
                ["Freelancer Plus (Web)","$19.99/month","100 Connects/month + perks","âœ… Official"],
                ["Freelancer Plus (Apple)","$27/month","$84/yr more than web â€” use web!","âœ… Official"],
                ["Free Connects (Basic)","10/month","Plus one-time signup bonus ~40-50","âœ… Official"],
                ["Wire Transfer Fee","$50 flat","For USD withdrawals via wire","âœ… Official"],
                ["Instant Pay Fee","$2.00","US freelancers only","âœ… Official"],
                ["Local Bank Transfer","$0.99","Direct to local bank","âœ… Official"],
                ["ACH (US Bank) Transfer","FREE","Best withdrawal method","âœ… Official"],
                ["Conversion Fee","13.5% of annual earnings","To take client off-platform","âš ï¸ Important"],
                ["Currency Conversion","~2â€“4% markup","Rate not published by Upwork","ðŸ“Š Estimate"],
                ["Direct Contract (Plus)","0% freelancer fee","Free if you bring new client","âœ… Official"],
              ].map(([type,amount,notes,ver],i)=>(
                <tr key={type} style={{ background:i%2===0?C.white:C.paper }}>
                  <td style={{ padding:"8px 12px", fontWeight:600, color:C.navy, fontSize:12 }}>{type}</td>
                  <td style={{ padding:"8px 12px", color:C.blue, fontWeight:700, fontSize:13 }}>{amount}</td>
                  <td style={{ padding:"8px 12px", color:C.muted, fontSize:12 }}>{notes}</td>
                  <td style={{ padding:"8px 12px" }}><Badge label={ver} color={ver.includes("âœ…")?C.green:ver.includes("âš ï¸")?C.amber:C.slate} bg={ver.includes("âœ…")?C.greenS:ver.includes("âš ï¸")?C.amberS:C.paper} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="âš¡ Live Fee Calculator" accent={C.green}>
        <Card>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Your Rate ($/hr)</label>
              <input type="number" value={calc.rate} onChange={e=>setCalc(p=>({...p,rate:+e.target.value}))}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:15, fontWeight:700 }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Fee % (0â€“15)</label>
              <input type="number" value={calc.fee} onChange={e=>setCalc(p=>({...p,fee:+e.target.value}))} min={0} max={15}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:15, fontWeight:700 }} />
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            <Stat label="You charge" value={`$${calc.rate}/hr`} color={C.navy} />
            <Stat label="You receive (net)" value={`$${net}/hr`} color={C.green} />
            <Stat label="Gross up to net $" value={`$${grossUp}`} color={C.amber} />
          </div>
          <div style={{ marginTop:12, fontSize:12, color:C.muted, background:C.paper, borderRadius:8, padding:10 }}>
            ðŸ’¡ <strong>Rule:</strong> To receive ${calc.rate}/hr net, charge ${grossUp}/hr. Never calculate manually â€” use Upwork's Fee Calculator tool.
          </div>
        </Card>
      </Section>

      <Section title="âš ï¸ ACH Discount â€” Hidden Eligibility Requirements" accent={C.amber}>
        <Card>
          <div style={{ background:C.amberS, borderRadius:8, padding:14, fontSize:13, lineHeight:1.8 }}>
            The 3% client rate (vs 5%) for ACH requires ALL of these:<br/>
            âœ¦ Spent over <strong>$1,000 in the past 12 months</strong><br/>
            âœ¦ On the platform for <strong>more than 90 days</strong><br/>
            âœ¦ Made a payment <strong>over 90 days ago</strong><br/>
            âœ¦ Account in good standing (not on hold)<br/>
            âœ¦ US bank account + backup billing method<br/>
            <strong>â†’ New clients cannot access this rate.</strong>
          </div>
        </Card>
      </Section>
    </div>
  );
}

// â”€â”€ 5. JOB EVAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function JobEvalTab() {
  const [scores, setScores] = useState({});
  const criteria = [
    {id:"budget",   label:"Budget Fit",        max:15, hint:"Fixed >$500 or hourly >$25/hr"},
    {id:"skills",   label:"Skill Match",        max:15, hint:"80%+ of required skills present"},
    {id:"payment",  label:"Payment Verified",   max:12, hint:"Payment method verified = safer"},
    {id:"history",  label:"Client History",     max:12, hint:"Multiple past hires, good reviews"},
    {id:"intent",   label:"Search Intent",      max:10, hint:"Informational, Commercial, Transactional"},
    {id:"clarity",  label:"Job Clarity",        max:10, hint:"Clear deliverables & timeline"},
    {id:"compete",  label:"Competition Level",  max:10, hint:"Under 10 proposals = gold, 10-20 = OK"},
    {id:"long",     label:"Long-term Potential",max:8,  hint:"Hints at ongoing work"},
    {id:"culture",  label:"Culture Fit",        max:8,  hint:"Tone, timezone, communication style"},
  ];
  const total = criteria.reduce((s,c)=>s+(scores[c.id]||0),0);
  const maxTotal = criteria.reduce((s,c)=>s+c.max,0);
  const pct = Math.round((total/maxTotal)*100);
  const verdict = pct>=80?"âœ… BID â€” Strong Fit":pct>=60?"âš ï¸ BID â€” Moderate Fit":pct>=40?"ðŸŸ¡ OPTIONAL â€” Low Priority":"ðŸ”´ SKIP â€” Poor Fit";
  const verdictColor = pct>=80?C.green:pct>=60?C.teal:pct>=40?C.amber:C.red;

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,${C.blue},${C.navy})`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸŽ¯ Job Evaluation Rubric â€” 100-Point Scoring</div>
        <div style={{ fontSize:12, color:C.blueL, marginTop:4 }}>Rate each criterion 0 to max. 80+ = Bid. 60-79 = Consider. Below 60 = Skip.</div>
      </Card>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12, marginBottom:16 }}>
        {criteria.map(c=>(
          <Card key={c.id} style={{ padding:"14px 16px", marginBottom:0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ fontWeight:700, fontSize:13, color:C.navy }}>{c.label}</span>
              <Badge label={`Max: ${c.max}`} />
            </div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>{c.hint}</div>
            <input type="range" min={0} max={c.max} value={scores[c.id]||0} onChange={e=>setScores(p=>({...p,[c.id]:+e.target.value}))}
              style={{ width:"100%", accentColor:C.blue }} />
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted, marginTop:2 }}>
              <span>0</span><span style={{ fontWeight:700, color:C.blue }}>{scores[c.id]||0} pts</span><span>{c.max}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ border:`2px solid ${verdictColor}`, background:verdictColor+"10" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontSize:24, fontWeight:800, color:verdictColor }}>{pct}%</div>
            <div style={{ fontSize:18, fontWeight:700, color:C.navy, marginTop:4 }}>{verdict}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:13, color:C.muted }}>Score: {total} / {maxTotal}</div>
            <button onClick={()=>setScores({})} style={{ marginTop:8, background:C.slate, color:C.white, border:"none", borderRadius:8, padding:"6px 16px", cursor:"pointer", fontSize:12 }}>Reset</button>
          </div>
        </div>
        <div style={{ marginTop:12, height:10, background:C.slateL, borderRadius:10, overflow:"hidden" }}>
          <div style={{ width:`${pct}%`, height:"100%", background:verdictColor, borderRadius:10, transition:"width .4s" }} />
        </div>
      </Card>

      <Section title="ðŸš© Automatic Red Flags â€” Skip Immediately" accent={C.red}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            "Unverified payment method","Budget under $50 total","50+ proposals already sent",
            "'Will pay after delivery'","Tests without payment","Vague scope + rushed timeline",
            "Negative past reviews","'Cheap and fast' in title",
          ].map(f=>(
            <div key={f} style={{ background:C.redS, border:`1px solid ${C.red}30`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.red, fontWeight:600 }}>ðŸš© {f}</div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// â”€â”€ 6. PROPOSALS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProposalsTab() {
  const [active, setActive] = useState(0);
  const templates = [
    { type:"AI Agent / LangGraph", template:`Hi [Name],

I noticed you need [specific AI agent capability]. This is exactly what I've been building in production.

Most recently: [specific relevant project] â€” [measurable outcome].

For your project, I'd approach it using:
â€¢ LangGraph for orchestration (handles complex state + tool-calling)
â€¢ [Specific tool] for [specific function]
â€¢ FastAPI backend with proper error handling and logging

I can deliver a working prototype within [X days], with source code + deployment guide.

Quick question before I estimate: Is the primary use case [A] or [B]? This affects the architecture significantly.

Saqib | AI Advocate` },
    { type:"RAG / Knowledge Base", template:`Hi [Name],

Your RAG project caught my attention â€” specifically the [pain point you mentioned].

I've built production RAG systems handling [scale] with sub-2-second response times. The key decisions that most implementations get wrong: [specific technical insight].

For your use case, I'd recommend [specific approach] over [common alternative] because [reason].

Deliverables I'd commit to:
âœ… Ingestion pipeline for [your document types]
âœ… Retrieval with [vector DB] + hybrid search
âœ… Evaluation suite (no black boxes)
âœ… Deployment-ready Docker container

Timeline: [X days]. What's your target response latency?

Saqib` },
    { type:"Full-Stack SaaS", template:`Hi [Name],

I build SaaS products that ship, not prototypes that get stuck in development.

What I see in your project: [specific observation]. My suggestion: start with [MVP scope] and expand â€” this gets you to first paying users 40% faster.

Tech stack I'd use: FastAPI + React + PostgreSQL + Docker. Hosted on [platform] with CI/CD from day one.

I've shipped [relevant example] with [metric]. Happy to share the GitHub or a live demo.

Can we jump on a 15-min call to confirm scope? That lets me give you an accurate fixed-price quote.

Saqib | AI Advocate` },
    { type:"n8n Automation", template:`Hi [Name],

Your automation workflow is something I can build in n8n â€” I've done [similar workflow] for [client type] and it saved them [X hours/week].

For your case: [specific workflow description].

The 3 nodes that do the heavy lifting:
1. [Trigger] â†’ 2. [Transform] â†’ 3. [Action/Output]

Delivery: working workflow + documentation + 30 min walkthrough call.

One question: Do you need this connected to [system A] or [system B]? I can handle either.

Timeline: [X days]. Fixed price: $[amount].

Jahanzaib | AI Advocate` },
  ];

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,#1E3A5F,${C.navy})`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>âœ‰ï¸ Proposal Templates & Strategy</div>
        <div style={{ fontSize:12, color:C.blueL, marginTop:4 }}>Never copy verbatim â€” customize every single proposal to the job. First 2 lines are everything.</div>
      </Card>

      <Section title="Proposal Anatomy â€” The 5-Part Formula" accent={C.blue}>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            ["1. HOOK (Lines 1-2)","Address their exact problem. NOT 'Hi I am a developer'. Show you READ the job.","ðŸ”´ Most Important"],
            ["2. PROOF","One specific past project with a measurable result. Link or screenshot.","âš ï¸ Critical"],
            ["3. APPROACH","How you'd solve their specific problem (not generic methodology).","âš ï¸ Critical"],
            ["4. TIMELINE + PRICE","Specific dates. Fixed price when possible. Shows confidence.","ðŸ“‹ Required"],
            ["5. QUESTION","One smart, specific question. Shows you're thinking, starts conversation.","ðŸ’¡ Power Move"],
          ].map(([title,desc,badge])=>(
            <div key={title} style={{ display:"flex", gap:12, alignItems:"flex-start", background:C.white, border:`1px solid ${C.slateL}`, borderRadius:8, padding:"12px 14px" }}>
              <div style={{ fontWeight:800, fontSize:13, color:C.navy, minWidth:140 }}>{title}</div>
              <div style={{ fontSize:13, color:C.muted, flex:1 }}>{desc}</div>
              <Badge label={badge} color={badge.includes("Most")?C.red:badge.includes("Critical")?C.amber:C.blue} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Templates Library" accent={C.teal}>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
          {templates.map((t,i)=>(
            <button key={i} onClick={()=>setActive(i)}
              style={{ padding:"8px 14px", borderRadius:8, border:`1px solid ${active===i?C.blue:C.slateL}`, background:active===i?C.blue:C.white, color:active===i?C.white:C.navy, fontWeight:600, fontSize:12, cursor:"pointer" }}>
              {t.type}
            </button>
          ))}
        </div>
        <Card>
          <div style={{ fontFamily:"monospace", fontSize:12, color:C.ink, whiteSpace:"pre-wrap", lineHeight:1.8, background:C.paper, borderRadius:8, padding:16 }}>{templates[active].template}</div>
          <button onClick={()=>navigator.clipboard?.writeText(templates[active].template)}
            style={{ marginTop:10, background:C.blue, color:C.white, border:"none", borderRadius:8, padding:"8px 20px", cursor:"pointer", fontWeight:700, fontSize:13 }}>
            ðŸ“‹ Copy Template
          </button>
        </Card>
      </Section>

      <Section title="ðŸš« 12 Proposal Killers â€” Never Do These" accent={C.red}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            "Starting with 'Hi, I am a...'","Copying the job description back","Generic AI-sounding language",
            "No specific results mentioned","'I can do this' without proof","Attaching irrelevant portfolio",
            "Spelling the client's name wrong","Over-promising on timeline","Asking about pay in first message",
            "Wall of text â€” no formatting","Bidding before reading the job","Using templates word for word",
          ].map(k=>(
            <div key={k} style={{ background:C.redS, border:`1px solid ${C.red}20`, borderRadius:8, padding:"8px 12px", fontSize:12, color:C.red }}>âŒ {k}</div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// â”€â”€ 7. CONNECTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ConnectsTab() {
  const [monthly, setMonthly] = useState(100);
  const [perJob, setPerJob] = useState(6);
  const proposals = Math.floor(monthly / perJob);
  const cost = (monthly * 0.15).toFixed(2);

  return (
    <div>
      <Section title="âš¡ Connects â€” Verified Facts (June 2026)" accent={C.amber}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
          {[
            {l:"Price per Connect",v:"$0.15",note:"Min purchase: 10 connects ($1.50)"},
            {l:"Standard Job Cost",v:"~6 Connects",note:"Range: 4â€“16, dynamic per job"},
            {l:"Competitive Job",v:"10 Connects",note:"$1.50 per proposal"},
            {l:"High-Demand Job",v:"16 Connects",note:"$2.40 per proposal"},
            {l:"Boosted Proposal",v:"25 Connects",note:"$3.75 â€” premium visibility"},
            {l:"Top-Boost Proposal",v:"40 Connects",note:"$6.00 â€” maximum visibility"},
            {l:"Basic Plan (Free)",v:"10/month",note:"Signup bonus: 40-50 extra"},
            {l:"Freelancer Plus",v:"100/month",note:"$19.99/web | $27/Apple"},
          ].map(({l,v,note})=>(
            <Card key={l} style={{ padding:"12px 14px", marginBottom:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ fontSize:12, color:C.muted }}>{l}</div>
                  <div style={{ fontSize:18, fontWeight:800, color:C.amber, marginTop:2 }}>{v}</div>
                </div>
              </div>
              <div style={{ fontSize:11, color:C.slate, marginTop:4 }}>{note}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="ðŸ“Š Budget Planner" accent={C.blue}>
        <Card>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Connects Available This Month</label>
              <input type="number" value={monthly} onChange={e=>setMonthly(+e.target.value)}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:15, fontWeight:700 }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Connects Per Proposal (avg)</label>
              <input type="number" value={perJob} onChange={e=>setPerJob(+e.target.value)} min={4} max={40}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:15, fontWeight:700 }} />
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            <Stat label="Max Proposals" value={proposals} color={C.blue} />
            <Stat label="Cost to Buy" value={`$${cost}`} color={C.amber} />
            <Stat label="Cost/Proposal" value={`$${(perJob*0.15).toFixed(2)}`} color={C.teal} />
          </div>
        </Card>
      </Section>

      <Section title="ðŸŽ¯ Connect Earning Bonuses (Free Connects)" accent={C.green}>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            ["Rising Talent Badge","30 bonus connects"],
            ["Top Rated Badge","30 bonus connects"],
            ["Top Rated Plus Badge","30 bonus connects"],
            ["Profile Activity Reward","18 connects (submit 3+ proposals spending 54+ connects, up to 2x/month)"],
            ["Interview Invitation","Connects refunded"],
            ["Signup Bonus (new accounts)","40â€“50 one-time bonus"],
          ].map(([source,amount])=>(
            <div key={source} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:C.greenS, border:`1px solid ${C.green}30`, borderRadius:8, padding:"10px 14px" }}>
              <span style={{ fontSize:13, color:C.ink }}>{source}</span>
              <Badge label={amount} color={C.green} bg={C.white} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// â”€â”€ 8. GROWTH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function GrowthTab() {
  const milestones = [
    { phase:"Phase 1: Launch (Now)", steps:["Complete profile (100%)", "Send 5 proposals/day", "Win first contract", "Get first 5â˜… review"], status:"ðŸ”´ Active", color:C.red },
    { phase:"Phase 2: Rising Talent (Target: 30 days)", steps:["5+ jobs completed", "JSS 90%+", "Rising Talent badge", "Raise rate to $65/hr"], status:"âš ï¸ Next", color:C.amber },
    { phase:"Phase 3: Top Rated (Target: 90 days)", steps:["$1K+ earned on platform", "90%+ JSS sustained", "10+ 5â˜… reviews", "Raise rate to $85/hr", "Enable Top Rated perks"], status:"ðŸŽ¯ Goal", color:C.blue },
    { phase:"Phase 4: Agency Growth (Target: 6 months)", steps:["5+ agency contracts", "Build team reputation", "Portfolio with case studies", "Raise agency rate to $100+/hr", "Target Fortune 500 clients"], status:"ðŸš€ Vision", color:C.purple },
  ];

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,${C.green},#14532D)`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸ“ˆ Rising Talent â†’ Top Rated Roadmap</div>
        <div style={{ fontSize:12, color:"#86EFAC", marginTop:4 }}>From 0 jobs to Top Rated badge â€” the definitive path forward</div>
      </Card>

      {milestones.map((m,i)=>(
        <Section key={i} title={m.phase} accent={m.color}>
          <Card style={{ borderLeft:`4px solid ${m.color}` }}>
            <Badge label={m.status} color={m.color} bg={m.color+"20"} />
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:12 }}>
              {m.steps.map(s=>(
                <div key={s} style={{ display:"flex", gap:8, alignItems:"center", fontSize:13 }}>
                  <span style={{ color:m.color, fontWeight:700 }}>â†’</span>
                  <span style={{ color:C.ink }}>{s}</span>
                </div>
              ))}
            </div>
          </Card>
        </Section>
      ))}

      <Section title="JSS (Job Success Score) â€” How to Protect It" accent={C.teal}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            {t:"âœ… Do",items:["Communicate within 2 hours","Deliver before deadline","Ask for feedback proactively","Close contracts promptly after delivery","Never ghost a client"]},
            {t:"âŒ Avoid",items:["Accepting jobs you can't deliver","Missing milestones without notice","Leaving contracts open too long","Negative feedback (even 1 hurts 90%)","Refund disputes"]},
          ].map(({t,items})=>(
            <Card key={t} style={{ borderTop:`3px solid ${t.includes("âœ…")?C.green:C.red}` }}>
              <div style={{ fontWeight:700, fontSize:14, color:t.includes("âœ…")?C.green:C.red, marginBottom:8 }}>{t}</div>
              {items.map(item=>(
                <div key={item} style={{ fontSize:12, color:C.ink, padding:"4px 0", borderBottom:`1px solid ${C.paper}` }}>{item}</div>
              ))}
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

// â”€â”€ 9. DAILY LOGS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DailyLogsTab() {
  const [log, setLog] = useState({ name:"", date:new Date().toISOString().slice(0,10), proposals:0, connects:0, interviews:0, notes:"" });
  const [logs, setLogs] = useState([]);
  const save = () => { if(!log.name) return; setLogs(p=>[{...log, id:Date.now()}, ...p]); setLog(p=>({...p, proposals:0, connects:0, interviews:0, notes:""})); };

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,#1E3A5F,${C.navy})`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸ“‹ Daily Activity Log</div>
        <div style={{ fontSize:12, color:C.blueL, marginTop:4 }}>Track every team member's daily output. Consistency = success.</div>
      </Card>

      <Section title="Log Today's Activity" accent={C.blue}>
        <Card>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Team Member</label>
              <select value={log.name} onChange={e=>setLog(p=>({...p,name:e.target.value}))}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:13 }}>
                <option value="">Select...</option>
                {["Usman","Sadia","Fiza","Hamza","Subhan","Jahanzaib","Kaleem"].map(n=><option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Date</label>
              <input type="date" value={log.date} onChange={e=>setLog(p=>({...p,date:e.target.value}))}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:13 }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Proposals Sent</label>
              <input type="number" value={log.proposals} min={0} onChange={e=>setLog(p=>({...p,proposals:+e.target.value}))}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:13 }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Connects Used</label>
              <input type="number" value={log.connects} min={0} onChange={e=>setLog(p=>({...p,connects:+e.target.value}))}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:13 }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Interviews</label>
              <input type="number" value={log.interviews} min={0} onChange={e=>setLog(p=>({...p,interviews:+e.target.value}))}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:13 }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Notes / Blockers</label>
              <input value={log.notes} onChange={e=>setLog(p=>({...p,notes:e.target.value}))} placeholder="Any issues or wins..."
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:13 }} />
            </div>
          </div>
          <button onClick={save} style={{ marginTop:16, background:C.blue, color:C.white, border:"none", borderRadius:8, padding:"10px 24px", cursor:"pointer", fontWeight:700, fontSize:14, width:"100%" }}>
            âœ… Save Today's Log
          </button>
        </Card>
      </Section>

      {logs.length > 0 && (
        <Section title="Recent Logs" accent={C.teal}>
          {logs.map(l=>(
            <Card key={l.id} style={{ padding:"12px 16px", marginBottom:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                <div>
                  <Badge label={l.name} color={C.navy} bg={C.blueSoft} />
                  <span style={{ fontSize:12, color:C.muted, marginLeft:8 }}>{l.date}</span>
                </div>
                <div style={{ display:"flex", gap:12 }}>
                  <span style={{ fontSize:12 }}>ðŸ“¤ <strong>{l.proposals}</strong> proposals</span>
                  <span style={{ fontSize:12 }}>âš¡ <strong>{l.connects}</strong> connects</span>
                  <span style={{ fontSize:12 }}>ðŸŽ¤ <strong>{l.interviews}</strong> interviews</span>
                </div>
              </div>
              {l.notes && <div style={{ fontSize:12, color:C.muted, marginTop:6 }}>{l.notes}</div>}
            </Card>
          ))}
        </Section>
      )}

      <Section title="Daily KPI Targets (Per Team Member)" accent={C.amber}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {[["Jobs Reviewed","10â€“15/day"],["Proposals Sent","2â€“3/day"],["Connects Budget","15â€“20/day"],["Response Rate","Target 20%+"]].map(([l,v])=>(
            <Stat key={l} label={l} value={v} color={C.amber} />
          ))}
        </div>
      </Section>
    </div>
  );
}

// â”€â”€ 10. COMMISSION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CommissionTab() {
  const [contract, setContract] = useState({ amount:500, fee:10, member:"" });
  const net = contract.amount * (1 - contract.fee/100);
  const tiers = [
    { name:"Tier 1", min:0, max:499, pct:10, color:C.slate },
    { name:"Tier 2", min:500, max:1499, pct:15, color:C.blue },
    { name:"Tier 3", min:1500, max:2999, pct:20, color:C.teal },
    { name:"Tier 4 (Leader)", min:3000, max:999999, pct:25, color:C.purple },
  ];

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,${C.purple},#4C1D95)`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸ’Ž Commission Calculator</div>
        <div style={{ fontSize:12, color:"#C4B5FD", marginTop:4 }}>4-tier commission model for AI Advocate team members</div>
      </Card>

      <Section title="Commission Tiers" accent={C.purple}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
          {tiers.map(t=>(
            <Card key={t.name} style={{ border:`2px solid ${t.color}`, marginBottom:0 }}>
              <div style={{ fontWeight:800, fontSize:15, color:t.color }}>{t.name} â€” {t.pct}%</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>Contract value: ${t.min.toLocaleString()} â€“ {t.max>99999?"Unlimited":"$"+t.max.toLocaleString()}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Commission Calculator" accent={C.blue}>
        <Card>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:16 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Contract Value ($)</label>
              <input type="number" value={contract.amount} onChange={e=>setContract(p=>({...p,amount:+e.target.value}))}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:15, fontWeight:700 }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Upwork Fee %</label>
              <input type="number" value={contract.fee} onChange={e=>setContract(p=>({...p,fee:+e.target.value}))} min={0} max={15}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:15, fontWeight:700 }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>Team Member</label>
              <select value={contract.member} onChange={e=>setContract(p=>({...p,member:e.target.value}))}
                style={{ width:"100%", marginTop:4, padding:"10px 12px", border:`1px solid ${C.slateL}`, borderRadius:8, fontSize:13 }}>
                <option value="">Select...</option>
                {["Sadia","Hamza","Fiza","Subhan","Jahanzaib"].map(n=><option key={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
            <Stat label="Contract" value={`$${contract.amount}`} color={C.navy} />
            <Stat label="Net (after Upwork)" value={`$${net.toFixed(0)}`} color={C.blue} />
            {tiers.map(t=>{
              const comm = net * t.pct/100;
              return <Stat key={t.name} label={`${t.name} (${t.pct}%)`} value={`$${comm.toFixed(0)}`} color={t.color} />;
            })}
          </div>
        </Card>
      </Section>
    </div>
  );
}

// â”€â”€ 11. PROJECTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProjectsTab() {
  const projects = [
    { assignee:"Subhan", title:"Claude Bot Executive Assistant", type:"Sir Saqib", date:"6/5/2026", status:"In Review", posted:false },
    { assignee:"Sadia", title:"B2B Lead Generation Specialist", type:"Personal", date:"6/6/2026", status:"Approved", posted:true },
    { assignee:"Hamza", title:"Full Stack AI Engineer | OpenAI Chatbot", type:"Personal", date:"6/6/2026", status:"Approved", posted:true },
    { assignee:"Usman", title:"Enterprise Quality Engineering Framework", type:"Personal", date:"6/7/2026", status:"Approved", posted:true },
    { assignee:"Fiza", title:"AutoLead AI System", type:"Personal", date:"6/6/2026", status:"Approved", posted:true },
    { assignee:"Subhan", title:"Quick Multi Agent AI System for E-Commerce", type:"Personal", date:"6/5/2026", status:"Approved", posted:true },
    { assignee:"Sadia", title:"AI Automation Specialist / AI Agent Developer", type:"Agency", date:"6/6/2026", status:"In Review", posted:false },
    { assignee:"Hamza", title:"AI-Powered HR & Recruitment SaaS Platform", type:"Agency", date:"6/6/2026", status:"In Review", posted:false },
    { assignee:"Fiza", title:"AI-Powered Customer Support SaaS Platform", type:"Agency", date:"6/6/2026", status:"In Review", posted:false },
    { assignee:"Usman", title:"AI Quality Engineering & Validation Framework", type:"Agency", date:"6/7/2026", status:"In Review", posted:false },
    { assignee:"Jahanzaib", title:"AI Automation & Operations Specialist", type:"Personal", date:"6/11/2026", status:"In Review", posted:false },
    { assignee:"Jahanzaib", title:"AI Operations Infrastructure & Technical Documentation", type:"Agency", date:"6/11/2026", status:"In Review", posted:false },
    { assignee:"Subhan", title:"Agency portfolio projects (finalizing)", type:"Agency", date:"6/12/2026", status:"Not Yet", posted:false },
  ];

  const statusColor = s => s==="Approved"?C.green:s==="In Review"?C.amber:C.red;

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,${C.teal},#0A4944)`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸ“‚ Project Proposals Tracker</div>
        <div style={{ display:"flex", gap:10, marginTop:12, flexWrap:"wrap" }}>
          {[["Total",projects.length],["Approved",projects.filter(p=>p.status==="Approved").length],["In Review",projects.filter(p=>p.status==="In Review").length],["Not Yet",projects.filter(p=>p.status==="Not Yet").length]].map(([l,v])=>(
            <div key={l} style={{ background:"rgba(255,255,255,.1)", borderRadius:8, padding:"8px 16px", textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:800 }}>{v}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.7)" }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ background:C.navy, color:C.white }}>
                {["Assignee","Project Title","Type","Date","Status","Posted"].map(h=>(
                  <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontWeight:600, fontSize:11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p,i)=>(
                <tr key={i} style={{ background:i%2===0?C.white:C.paper }}>
                  <td style={{ padding:"8px 12px", fontWeight:700, color:C.navy }}>{p.assignee}</td>
                  <td style={{ padding:"8px 12px", color:C.ink, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</td>
                  <td style={{ padding:"8px 12px" }}><Badge label={p.type} color={p.type==="Agency"?C.purple:C.blue} bg={p.type==="Agency"?C.purpleS:C.blueSoft} /></td>
                  <td style={{ padding:"8px 12px", color:C.muted }}>{p.date}</td>
                  <td style={{ padding:"8px 12px" }}><Badge label={p.status} color={statusColor(p.status)} bg={statusColor(p.status)+"20"} /></td>
                  <td style={{ padding:"8px 12px", textAlign:"center" }}>{p.posted?"âœ…":"âŒ"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Section title="Portfolio Case Studies â€” Ready to Add" accent={C.blue}>
        {[
          {t:"Real-Time Earnings Call Intelligence","d":"MarketPulse Live â€” audio-to-insight <90 seconds. OpenAI Whisper + NLP + WebSocket Next.js dashboard.","m":"90-sec turnaround | 10+ concurrent | 7-month engagement"},
          {t:"AI Billing Compliance Engine","d":"BillClear AI â€” legal AI platform flagging non-compliant billing entries in real time. FastAPI+PostgreSQL+Docker.","m":"15% revenue recovered | 80%+ manual review eliminated"},
          {t:"n8n US Tax Calculator","d":"23-node workflow: IRS-accurate federal+state taxes, delivered via WhatsApp+Email+PDF+Google Sheets.","m":"Zero manual steps | Multi-channel simultaneous delivery"},
          {t:"AI Deep Research System","d":"Autonomous research agent (LangChain+Tavily) â†’ 5-chapter structured report from a single topic input.","m":"Fully autonomous | Source-verified | Single prompt"},
          {t:"Upwork AI Operations Hub","d":"React/JSX ops hub (16 tabs) connected to Google Sheet via 3 live webhooks. Deployed on Vercel.","m":"6,761 lines | 3 live webhooks | Vercel CI/CD"},
          {t:"Enterprise Integration Testing â€” Healthcare","d":"Fortune 500 pharma â€” 7-phase integration testing: Copilot-assisted test authoring, pre-prod+prod execution.","m":"Zero production defects | Fortune 500 client"},
        ].map(({t,d,m})=>(
          <Card key={t} style={{ borderLeft:`4px solid ${C.blue}`, padding:"14px 16px", marginBottom:10 }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:4 }}>{t}</div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:6 }}>{d}</div>
            <Badge label={m} color={C.teal} bg={C.teal+"15"} />
          </Card>
        ))}
      </Section>
    </div>
  );
}

// â”€â”€ 12. ATTENDANCE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AttendanceTab() {
  const dates = ["6/8","6/9","6/10","6/11","6/12","6/13"];
  const data = [
    { name:"Usman",    records:["Joined","Joined","Joined","Joined","Joined","â€”"] },
    { name:"Sadia",    records:["Joined","Absent","Absent","Absent","Absent","â€”"] },
    { name:"Fiza",     records:["Joined","Joined","Joined","Joined","Joined","â€”"] },
    { name:"Hamza",    records:["Joined","Joined","Joined","Joined","Joined","â€”"] },
    { name:"Subhan",   records:["Joined","Absent","Absent","Late","Joined","â€”"] },
    { name:"Jahanzaib",records:["â€”","â€”","Late","Late","Joined","â€”"] },
    { name:"Kaleem",   records:["â€”","â€”","Late","Absent","Absent","â€”"] },
  ];
  const statusC = s => s==="Joined"?C.green:s==="Absent"?C.red:s==="Late"?C.amber:C.slateL;
  const statusBg = s => s==="Joined"?C.greenS:s==="Absent"?C.redS:s==="Late"?C.amberS:C.paper;

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,${C.navy},${C.navyD})`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>âœ… Team Attendance Tracker</div>
        <div style={{ fontSize:12, color:C.blueL, marginTop:4 }}>Week of June 8â€“13, 2026</div>
      </Card>
      <Card>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ background:C.navy, color:C.white }}>
                <th style={{ padding:"10px 12px", textAlign:"left" }}>Member</th>
                {dates.map(d=><th key={d} style={{ padding:"10px 12px", textAlign:"center" }}>{d}</th>)}
                <th style={{ padding:"10px 12px", textAlign:"center" }}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row,i)=>{
                const joined = row.records.filter(r=>r==="Joined").length;
                const total = row.records.filter(r=>r!=="â€”").length;
                const rate = total>0?Math.round(joined/total*100):0;
                return (
                  <tr key={row.name} style={{ background:i%2===0?C.white:C.paper }}>
                    <td style={{ padding:"9px 12px", fontWeight:700, color:C.navy }}>{row.name}</td>
                    {row.records.map((r,j)=>(
                      <td key={j} style={{ padding:"9px 12px", textAlign:"center" }}>
                        <span style={{ background:statusBg(r), color:statusC(r), borderRadius:12, padding:"2px 8px", fontSize:11, fontWeight:700 }}>{r}</span>
                      </td>
                    ))}
                    <td style={{ padding:"9px 12px", textAlign:"center" }}>
                      <Badge label={`${rate}%`} color={rate>=80?C.green:rate>=50?C.amber:C.red} bg={rate>=80?C.greenS:rate>=50?C.amberS:C.redS} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// â”€â”€ 13. TOP COMPANIES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CompaniesTab() {
  const [tab, setTab] = useState("research");
  const targets = [
    { company:"Thoughtworks", tier:"Enterprise", budget:"$100K+", fit:"AI/ML, Full Stack", status:"ðŸŽ¯ Target" },
    { company:"Turing", tier:"Mid", budget:"$10Kâ€“100K", fit:"AI Engineering, FastAPI", status:"ðŸŽ¯ Target" },
    { company:"Toptal", tier:"Elite Network", budget:"$50K+", fit:"AI, React, FastAPI", status:"ðŸ“‹ Research" },
    { company:"10x Genomics", tier:"Biotech", budget:"$50K+", fit:"Data Science, ML", status:"ðŸ“‹ Research" },
    { company:"OpenAI Partners", tier:"AI First", budget:"$100K+", fit:"LLM, Agentic AI", status:"ðŸ” Explore" },
    { company:"Hugging Face", tier:"AI Platform", budget:"$50K+", fit:"ML, Python, LLM", status:"ðŸ” Explore" },
    { company:"Databricks", tier:"Enterprise", budget:"$100K+", fit:"MLOps, Data Engineering", status:"ðŸ“‹ Research" },
    { company:"Scale AI", tier:"AI Data", budget:"$50K+", fit:"ML, Annotation, AI", status:"ðŸŽ¯ Target" },
  ];

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸ† Top Rated Company Research</div>
        <div style={{ fontSize:12, color:C.blueL, marginTop:4 }}>Target clients: $100K+ earned, Top Rated, AI/ML focus</div>
      </Card>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {["research","criteria","intel"].map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{ padding:"8px 18px", borderRadius:8, border:`1px solid ${tab===t?C.blue:C.slateL}`, background:tab===t?C.blue:C.white, color:tab===t?C.white:C.navy, fontWeight:600, fontSize:12, cursor:"pointer" }}>
            {t==="research"?"ðŸ” Research List":t==="criteria"?"âœ… Criteria":"ðŸ§  Intel"}
          </button>
        ))}
      </div>

      {tab==="research" && (
        <Card>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:C.navy, color:C.white }}>
                  {["Company","Tier","Budget","Best Fit","Status"].map(h=><th key={h} style={{ padding:"10px 12px", textAlign:"left", fontSize:12 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {targets.map((c,i)=>(
                  <tr key={c.company} style={{ background:i%2===0?C.white:C.paper }}>
                    <td style={{ padding:"9px 12px", fontWeight:700, color:C.navy }}>{c.company}</td>
                    <td style={{ padding:"9px 12px" }}><Badge label={c.tier} /></td>
                    <td style={{ padding:"9px 12px", color:C.green, fontWeight:700 }}>{c.budget}</td>
                    <td style={{ padding:"9px 12px", color:C.muted, fontSize:12 }}>{c.fit}</td>
                    <td style={{ padding:"9px 12px" }}>{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      {tab==="criteria" && (
        <Section title="Client Vetting Criteria (100-Point Gate)" accent={C.teal}>
          {[["Payment Verified",15],["Past Hires 5+",12],["JSS 90%+ clients",10],["Budget Match",15],["Skill Overlap 80%+",15],["Proposals Under 20",10],["Long-term Hint",8],["Response History",8],["Culture Fit",7]].map(([c,p])=>(
            <Row key={c} label={c} value={`${p} points`} />
          ))}
        </Section>
      )}
      {tab==="intel" && (
        <Section title="Market Intelligence" accent={C.purple}>
          <div style={{ fontSize:13, color:C.ink, lineHeight:1.8 }}>
            <p><strong>Hot categories in June 2026:</strong> LangGraph agentic systems, RAG pipelines, n8n automation, AI customer support, QA automation for LLM apps.</p>
            <p style={{marginTop:8}}><strong>Average budget (AI/ML):</strong> $2,000â€“$15,000 for agency contracts. $500â€“$3,000 personal.</p>
            <p style={{marginTop:8}}><strong>Most searched terms:</strong> LangGraph, RAG pipeline, AI agent, FastAPI, CrewAI, n8n automation.</p>
            <p style={{marginTop:8}}><strong>Tip:</strong> Clients with $100K+ earned and Top Rated Plus badge are the safest. Look for 10+ hires and 5â˜… average.</p>
          </div>
        </Section>
      )}
    </div>
  );
}

// â”€â”€ 14. STATUS DASHBOARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StatusTab() {
  const items = [
    { area:"Proposals Sent", status:"red", note:"0 jobs on agency profile â€” CRITICAL priority" },
    { area:"Saqib's Rate", status:"red", note:"$35/hr â†’ needs to be $55/hr TODAY" },
    { area:"Agency Size", status:"red", note:"Shows 11-50 â†’ change to 2-10 TODAY" },
    { area:"Zeb ID Verification", status:"red", note:"Unverified â†’ do TODAY on Upwork" },
    { area:"Agency Overview Bio", status:"amber", note:"Generic â†’ needs 700+ word rewrite" },
    { area:"LangGraph Skill", status:"amber", note:"Missing from Saqib's profile â€” add TODAY" },
    { area:"Portfolio Order", status:"amber", note:"First 3 must be AI/LLM/GenAI projects" },
    { area:"Agency Website URL", status:"amber", note:"Add vercel app URL to agency settings" },
    { area:"Year Founded", status:"amber", note:"Change 2026 â†’ 2010" },
    { area:"Subhan Attendance", status:"amber", note:"2 absents + 1 late this week" },
    { area:"Sadia Attendance", status:"red", note:"4 consecutive absents â€” follow up" },
    { area:"Agency Logo", status:"amber", note:"Sana finalizing â€” not yet posted" },
    { area:"Services (Agency)", status:"green", note:"All 6 services updated June 8 âœ…" },
    { area:"Hamza Attendance", status:"green", note:"100% attendance this week âœ…" },
    { area:"Fiza Attendance", status:"green", note:"100% attendance this week âœ…" },
    { area:"Usman Attendance", status:"green", note:"100% attendance this week âœ…" },
  ];
  const c = s => s==="red"?C.red:s==="amber"?C.amber:C.green;
  const bg = s => s==="red"?C.redS:s==="amber"?C.amberS:C.greenS;
  const emoji = s => s==="red"?"ðŸ”´":s==="amber"?"ðŸŸ¡":"ðŸŸ¢";

  const reds = items.filter(i=>i.status==="red").length;
  const ambers = items.filter(i=>i.status==="amber").length;
  const greens = items.filter(i=>i.status==="green").length;

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,#1E3A5F,${C.navy})`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸš¦ Agency Status Dashboard</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginTop:16 }}>
          {[["ðŸ”´ Critical",reds,C.red],["ðŸŸ¡ Action Needed",ambers,C.amber],["ðŸŸ¢ On Track",greens,C.green]].map(([l,v,col])=>(
            <div key={l} style={{ background:"rgba(255,255,255,.08)", borderRadius:10, padding:"12px", textAlign:"center" }}>
              <div style={{ fontSize:22, fontWeight:800, color:col }}>{v}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.7)", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {items.sort((a,b)=>["red","amber","green"].indexOf(a.status)-["red","amber","green"].indexOf(b.status)).map(item=>(
          <div key={item.area} style={{ display:"flex", gap:12, alignItems:"center", background:bg(item.status), border:`1px solid ${c(item.status)}30`, borderRadius:8, padding:"12px 16px" }}>
            <span style={{ fontSize:18 }}>{emoji(item.status)}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:13, color:c(item.status) }}>{item.area}</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{item.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// â”€â”€ 15. AI LEARNING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AILearnTab() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeLes, setActiveLes] = useState(null);

  const phases = [
    { id:1, title:"Python & ML Foundations", icon:"ðŸ", weeks:"Weeks 1-2", color:C.blue,
      lessons:[
        {t:"Python Essentials for AI",d:"Variables, loops, functions, list comprehensions, OOP basics â€” everything needed for ML code."},
        {t:"NumPy & Pandas Mastery",d:"Array operations, DataFrame manipulation, data cleaning â€” the foundation of every ML pipeline."},
        {t:"Data Visualization",d:"Matplotlib, Seaborn â€” plotting distributions, correlations, model evaluation graphs."},
        {t:"Intro to ML (Scikit-learn)",d:"Supervised learning, train/test splits, cross-validation, basic model evaluation."},
        {t:"Linear & Logistic Regression",d:"Math intuition + implementation. Loss functions, gradient descent, regularization."},
      ]},
    { id:2, title:"Deep Learning & Neural Networks", icon:"ðŸ§ ", weeks:"Weeks 3-4", color:C.purple,
      lessons:[
        {t:"Neural Network Architecture",d:"Layers, activations, backpropagation, weight initialization â€” understanding what's inside."},
        {t:"PyTorch Fundamentals",d:"Tensors, autograd, building custom models, DataLoader, training loops."},
        {t:"CNNs for Computer Vision",d:"Convolutional layers, pooling, ResNet, transfer learning with pretrained models."},
        {t:"Sequence Models (RNN/LSTM)",d:"Time series, text sequences, vanishing gradient problem, LSTM gates."},
        {t:"Transformers Architecture",d:"Attention mechanisms, self-attention, positional encoding â€” the foundation of all modern LLMs."},
      ]},
    { id:3, title:"LLM Engineering", icon:"ðŸ¤–", weeks:"Weeks 5-6", color:C.teal,
      lessons:[
        {t:"OpenAI API Mastery",d:"Chat completions, function calling, streaming, token management, cost optimization."},
        {t:"Claude API Integration",d:"Anthropic SDK, system prompts, multi-turn conversations, tool use, vision."},
        {t:"Prompt Engineering",d:"Few-shot, chain-of-thought, tree-of-thought, self-consistency, ReAct patterns."},
        {t:"LangChain Core",d:"Chains, prompts, output parsers, memory, document loaders, text splitters."},
        {t:"Advanced Prompting & Evals",d:"LLM-as-judge, golden datasets, hallucination detection, systematic eval frameworks."},
      ]},
    { id:4, title:"RAG Systems", icon:"ðŸ”", weeks:"Weeks 7-8", color:C.amber,
      lessons:[
        {t:"Vector Databases (Pinecone/Chroma)",d:"Embeddings, similarity search, ANN algorithms, namespace management."},
        {t:"Document Processing Pipeline",d:"Chunking strategies, overlap, metadata injection, multi-format loaders."},
        {t:"Hybrid Search (Dense + Sparse)",d:"Combining BM25 with vector search, re-ranking with cross-encoders."},
        {t:"Advanced RAG Patterns",d:"Contextual compression, self-querying, parent-child chunking, HyDE."},
        {t:"RAG Evaluation & Optimization",d:"Faithfulness, answer relevancy, context precision â€” RAGAS framework."},
      ]},
    { id:5, title:"Agentic AI (LangGraph)", icon:"âš¡", weeks:"Weeks 9-10", color:C.red,
      lessons:[
        {t:"LangGraph Architecture",d:"Nodes, edges, state machines, conditional routing â€” the future of AI agents."},
        {t:"Tool Use & Function Calling",d:"Defining tools, tool execution, error handling, tool selection strategies."},
        {t:"Multi-Agent Systems (CrewAI)",d:"Agent roles, task delegation, crew orchestration, parallel agent execution."},
        {t:"Memory & State Management",d:"Short-term (conversation), long-term (vector), procedural memory in agents."},
        {t:"Production Agent Deployment",d:"Error recovery, rate limiting, monitoring, cost control, human-in-the-loop."},
      ]},
    { id:6, title:"FastAPI & Backend", icon:"ðŸš€", weeks:"Weeks 11-12", color:C.green,
      lessons:[
        {t:"FastAPI Fundamentals",d:"Endpoints, Pydantic models, dependency injection, middleware, async routes."},
        {t:"Database Integration",d:"PostgreSQL + SQLAlchemy ORM, async queries, migrations with Alembic."},
        {t:"Authentication & Security",d:"JWT tokens, OAuth2, password hashing, rate limiting, CORS."},
        {t:"WebSockets & Streaming",d:"Real-time AI responses, SSE, WebSocket connections, connection management."},
        {t:"API Design Best Practices",d:"RESTful conventions, versioning, documentation with OpenAPI, error standards."},
      ]},
    { id:7, title:"MLOps & Production", icon:"ðŸ­", weeks:"Weeks 13-14", color:C.navy,
      lessons:[
        {t:"Docker & Containerization",d:"Dockerfiles, multi-stage builds, Docker Compose, container optimization."},
        {t:"CI/CD Pipelines",d:"GitHub Actions, automated testing, deployment pipelines, environment management."},
        {t:"MLflow & Experiment Tracking",d:"Logging metrics, artifact storage, model registry, experiment comparison."},
        {t:"Kubernetes for ML",d:"Pods, deployments, services, scaling ML workloads, resource management."},
        {t:"Monitoring & Observability",d:"Prometheus, Grafana, logging strategies, alerting, model drift detection."},
      ]},
    { id:8, title:"n8n Workflow Automation", icon:"ðŸ”„", weeks:"Weeks 15-16", color:C.cyan,
      lessons:[
        {t:"n8n Core Concepts",d:"Nodes, connections, data flow, expressions, credentials management."},
        {t:"AI Integration in n8n",d:"OpenAI nodes, LangChain integration, AI decision nodes, prompt templates."},
        {t:"API Integrations",d:"HTTP Request node, webhooks, authentication, data transformation."},
        {t:"Complex Workflow Patterns",d:"Error handling, conditional branches, loops, sub-workflows, timing."},
        {t:"Production n8n Deployment",d:"Self-hosted setup, environment variables, security, backup strategies."},
      ]},
    { id:9, title:"Upwork Client Work", icon:"ðŸ’¼", weeks:"Weeks 17-18", color:C.purple,
      lessons:[
        {t:"Discovery Call Framework",d:"30-min call structure, requirement extraction, scope clarification, red flag detection."},
        {t:"Technical Scoping",d:"Breaking projects into milestones, timeline estimation, risk assessment."},
        {t:"Proposal Writing Mastery",d:"Hook formulas, proof structure, pricing strategy, the question close."},
        {t:"Client Communication",d:"Progress updates, scope changes, difficult conversations, building long-term relationships."},
        {t:"Project Delivery & Reviews",d:"Handoff documentation, walkthrough calls, requesting 5â˜… reviews, repeat work."},
      ]},
    { id:10, title:"Capstone Projects", icon:"ðŸ†", weeks:"Weeks 19-20", color:C.amber,
      lessons:[
        {t:"End-to-End RAG Application",d:"Build a full production RAG system: ingestion â†’ retrieval â†’ generation â†’ evaluation â†’ deployment."},
        {t:"Multi-Agent System",d:"CrewAI + LangGraph: autonomous agents with tool use, memory, and human-in-the-loop oversight."},
        {t:"n8n Business Automation",d:"Complete business automation: lead capture â†’ qualification â†’ CRM update â†’ email â†’ reporting."},
        {t:"SaaS MVP",d:"FastAPI + React + PostgreSQL: authentication, payments, AI features, Docker deployment."},
        {t:"Portfolio & Positioning",d:"GitHub README, case studies, Upwork profile finalization, first 3 proposals sent."},
      ]},
  ];

  const ph = phases[activePhase];

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,#4C1D95,${C.purple})`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸŽ“ AI Engineering Curriculum â€” 20-Week Program</div>
        <div style={{ fontSize:12, color:"#C4B5FD", marginTop:4 }}>From Python basics â†’ Production AI systems â†’ Upwork revenue. 10 phases, 50 lessons.</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginTop:14 }}>
          {[["Phases","10"],["Lessons","50"],["Weeks","20"],["Goal","$55+/hr"]].map(([l,v])=>(
            <div key={l} style={{ background:"rgba(255,255,255,.1)", borderRadius:8, padding:"10px", textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:800, color:"#A78BFA" }}>{v}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,.7)", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
        {phases.map((p,i)=>(
          <button key={i} onClick={()=>{setActivePhase(i);setActiveLes(null);}}
            style={{ padding:"8px 12px", borderRadius:8, border:`2px solid ${activePhase===i?p.color:C.slateL}`, background:activePhase===i?p.color:C.white, color:activePhase===i?C.white:C.navy, fontWeight:700, fontSize:11, cursor:"pointer", whiteSpace:"nowrap" }}>
            {p.icon} {p.id}. {p.title.split(" ")[0]}
          </button>
        ))}
      </div>

      <Card style={{ borderTop:`4px solid ${ph.color}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8, marginBottom:14 }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:ph.color }}>{ph.icon} Phase {ph.id}: {ph.title}</div>
            <Badge label={ph.weeks} color={ph.color} bg={ph.color+"20"} />
          </div>
          <div style={{ fontSize:13, color:C.muted }}>{ph.lessons.length} lessons</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {ph.lessons.map((l,i)=>(
            <div key={i} onClick={()=>setActiveLes(activeLes===i?null:i)}
              style={{ background:activeLes===i?ph.color+"10":C.paper, border:`1px solid ${activeLes===i?ph.color:C.slateL}`, borderRadius:8, padding:"12px 14px", cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontWeight:700, fontSize:13, color:activeLes===i?ph.color:C.navy }}>
                  {i+1}. {l.t}
                </span>
                <span style={{ color:C.muted, fontSize:12 }}>{activeLes===i?"â–²":"â–¼"}</span>
              </div>
              {activeLes===i && (
                <div style={{ marginTop:10, fontSize:13, color:C.ink, lineHeight:1.7, borderTop:`1px solid ${ph.color}30`, paddingTop:10 }}>
                  {l.d}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// â”€â”€ 16. BRAND ASSETS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function BrandTab() {
  const [vote, setVote] = useState({});
  const doVote = (id,v) => setVote(p=>({...p,[id]:(p[id]||0)+v}));

  const assets = [
    { id:"logo1", type:"Logo", title:"Primary Logo â€” Navy/White", desc:"Clean navy background, white 'AI ADVOCATE' wordmark + circuit icon", status:"In Progress" },
    { id:"logo2", type:"Logo", title:"Icon Only â€” Minimalist", desc:"Circuit board 'A' mark â€” for profile picture / favicon", status:"Pending" },
    { id:"card1", type:"Business Card", title:"Digital Business Card", desc:"Saqib Shahzad â€” Principal AI/ML Engineer variant", status:"Pending" },
    { id:"hero1", type:"Banner", title:"Upwork Agency Hero Banner", desc:"Navy gradient, tagline: 'Production AI Systems That Ship'", status:"In Progress" },
    { id:"port1", type:"Portfolio", title:"Portfolio Slide Template", desc:"Case study slide: metrics prominent, dark navy theme", status:"Pending" },
    { id:"port2", type:"Portfolio", title:"MarketPulse Live Case Study", desc:"Earnings call intelligence â€” 90-sec turnaround, WebSocket dashboard", status:"Ready" },
    { id:"port3", type:"Portfolio", title:"BillClear AI Case Study", desc:"Legal billing compliance â€” 15% revenue recovery, FastAPI+Docker", status:"Ready" },
    { id:"social1", type:"Social", title:"LinkedIn Banner", desc:"AI Advocate branding, tagline + key skills stack", status:"Pending" },
  ];

  const colors = [
    { name:"Navy Primary", hex:"#0B1C3F", note:"Headers, backgrounds" },
    { name:"Blue Accent", hex:"#1D4ED8", note:"CTAs, links, highlights" },
    { name:"Cyan Tech", hex:"#06B6D4", note:"Tech elements, icons" },
    { name:"White", hex:"#FFFFFF", note:"Text on dark backgrounds" },
    { name:"Slate", hex:"#64748B", note:"Secondary text, borders" },
    { name:"Paper", hex:"#F8FAFC", note:"Light backgrounds" },
  ];

  return (
    <div>
      <Card style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, color:C.white, border:"none" }}>
        <div style={{ fontSize:16, fontWeight:800 }}>ðŸŽ¨ Brand Assets â€” AI Advocate Agency</div>
        <div style={{ fontSize:12, color:C.blueL, marginTop:4 }}>Brand palette, asset library, voting system. Sana handling logo finalization.</div>
      </Card>

      <Section title="Brand Color Palette" accent={C.blue}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {colors.map(c=>(
            <div key={c.name} style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${C.slateL}` }}>
              <div style={{ height:60, background:c.hex }} />
              <div style={{ padding:"10px 12px", background:C.white }}>
                <div style={{ fontWeight:700, fontSize:12, color:C.navy }}>{c.name}</div>
                <div style={{ fontFamily:"monospace", fontSize:11, color:C.muted }}>{c.hex}</div>
                <div style={{ fontSize:11, color:C.slate, marginTop:2 }}>{c.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Asset Library" accent={C.purple}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
          {assets.map(a=>(
            <Card key={a.id} style={{ marginBottom:0, padding:"14px 16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                <div>
                  <Badge label={a.type} color={C.purple} bg={C.purpleS} />
                  <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginTop:6 }}>{a.title}</div>
                </div>
                <Badge label={a.status} color={a.status==="Ready"?C.green:a.status==="In Progress"?C.amber:C.slate} bg={a.status==="Ready"?C.greenS:a.status==="In Progress"?C.amberS:C.paper} />
              </div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:10 }}>{a.desc}</div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <button onClick={()=>doVote(a.id,1)} style={{ background:C.greenS, color:C.green, border:`1px solid ${C.green}40`, borderRadius:6, padding:"4px 12px", cursor:"pointer", fontWeight:700, fontSize:12 }}>ðŸ‘ {(vote[a.id]||0)>0?vote[a.id]:0}</button>
                <button onClick={()=>doVote(a.id,-1)} style={{ background:C.redS, color:C.red, border:`1px solid ${C.red}40`, borderRadius:6, padding:"4px 12px", cursor:"pointer", fontWeight:700, fontSize:12 }}>ðŸ‘Ž</button>
                <span style={{ fontSize:11, color:C.muted }}>Vote on this asset</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Typography" accent={C.teal}>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            {role:"Display Headings",font:"Inter ExtraBold 800",ex:"AI ADVOCATE AGENCY"},
            {role:"Section Titles",font:"Inter Bold 700",ex:"Operations Hub Dashboard"},
            {role:"Body Text",font:"Inter Regular 400",ex:"Build production AI systems that ship and stay shipped."},
            {role:"Code / Data",font:"JetBrains Mono",ex:"LangGraph Â· FastAPI Â· PostgreSQL Â· Docker"},
          ].map(({role,font,ex})=>(
            <div key={role} style={{ background:C.paper, borderRadius:8, padding:"12px 16px", border:`1px solid ${C.slateL}` }}>
              <div style={{ fontSize:11, color:C.muted, fontWeight:600 }}>{role} â€” {font}</div>
              <div style={{ fontSize:16, color:C.navy, marginTop:4, fontFamily:font.includes("Mono")?"monospace":"inherit" }}>{ex}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MAIN APP
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch(activeTab) {
      case "overview":   return <OverviewTab />;
      case "profile":    return <ProfileTab />;
      case "agency":     return <AgencyTab />;
      case "fees":       return <FeesTab />;
      case "jobeval":    return <JobEvalTab />;
      case "proposals":  return <ProposalsTab />;
      case "connects":   return <ConnectsTab />;
      case "growth":     return <GrowthTab />;
      case "dailylogs":  return <DailyLogsTab />;
      case "commission": return <CommissionTab />;
      case "projects":   return <ProjectsTab />;
      case "attendance": return <AttendanceTab />;
      case "companies":  return <CompaniesTab />;
      case "status":     return <StatusTab />;
      case "ailearn":    return <AILearnTab />;
      case "brand":      return <BrandTab />;
      default:           return <OverviewTab />;
    }
  };

  const active = TABS.find(t=>t.id===activeTab);

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:C.paper, minHeight:"100vh", color:C.ink }}>
      {/* HEADER */}
      <div style={{ background:C.navy, color:C.white, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,.3)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, background:`linear-gradient(135deg,${C.blueL},${C.cyan})`, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:16, color:C.white }}>AI</div>
          <div>
            <div style={{ fontWeight:800, fontSize:14, letterSpacing:-.3 }}>AI ADVOCATE HUB</div>
            <div style={{ fontSize:10, color:C.blueL, letterSpacing:.5 }}>ULTIMATE OPERATIONS CENTER v5.0</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:11, color:"#94A3B8", background:"rgba(255,255,255,.05)", padding:"4px 10px", borderRadius:6 }}>
            {active?.icon} {active?.label}
          </div>
          <button onClick={()=>setSidebarOpen(!sidebarOpen)}
            style={{ background:"rgba(255,255,255,.1)", border:"none", color:C.white, borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:13, fontWeight:700 }}>
            â˜° Tabs
          </button>
        </div>
      </div>

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex" }}>
          <div onClick={()=>setSidebarOpen(false)} style={{ flex:1, background:"rgba(0,0,0,.5)" }} />
          <div style={{ width:260, background:C.white, overflowY:"auto", boxShadow:"-4px 0 20px rgba(0,0,0,.2)" }}>
            <div style={{ background:C.navy, color:C.white, padding:"16px 20px", fontWeight:800 }}>Navigation</div>
            {TABS.map(tab=>(
              <button key={tab.id} onClick={()=>{setActiveTab(tab.id);setSidebarOpen(false);}}
                style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"12px 20px", border:"none", background:activeTab===tab.id?C.blueSoft:C.white, color:activeTab===tab.id?C.blue:C.ink, fontWeight:activeTab===tab.id?700:400, fontSize:13, cursor:"pointer", textAlign:"left", borderBottom:`1px solid ${C.paper}` }}>
                <span style={{ fontSize:16 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB BAR â€” Horizontal Scroll */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.slateL}`, overflowX:"auto", display:"flex", gap:4, padding:"8px 16px" }}>
        {TABS.map(tab=>(
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
            style={{ whiteSpace:"nowrap", padding:"7px 14px", borderRadius:8, border:"none", background:activeTab===tab.id?C.blue:C.paper, color:activeTab===tab.id?C.white:C.muted, fontWeight:600, fontSize:12, cursor:"pointer", transition:"all .2s", flexShrink:0 }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"20px 16px 60px" }}>
        {renderTab()}
      </div>

      {/* FOOTER */}
      <div style={{ background:C.navy, color:"#64748B", textAlign:"center", padding:"12px", fontSize:11 }}>
        AI Advocate Hub v5.0 Â· June 13, 2026 Â· 16 Tabs Â· All fee data verified against official Upwork docs
      </div>
    </div>
  );
}
