import { useState, useRef } from "react";

const QUESTIONS = [
  {id:1,topic:"Programming for the Web",type:"MC",
   question:"What does the acronym PWA stand for in web development?",
   options:["Private Web Application","Progressive Web Application","Portable Web Architecture","Professional Web Application"],
   correct:[1],
   explanation:"PWA stands for Progressive Web Application — a web app that delivers native-app-like experiences using web technologies including service workers, a web manifest, and HTTPS."},
  {id:2,topic:"Programming for the Web",type:"TF",
   question:"A Service Worker runs on the main browser thread alongside the web page's JavaScript.",
   options:["True","False"],correct:[1],
   explanation:"False. Service Workers run on a separate background thread, independent of the main browser thread. This allows them to intercept network requests and cache assets without blocking the user interface."},
  {id:3,topic:"Programming for the Web",type:"MC",
   question:"Which of the following is NOT a required technical component for a web application to be classified as a Progressive Web App?",
   options:["A registered Service Worker","A Web Manifest file","Served over HTTPS","A SQL relational database"],
   correct:[3],
   explanation:"A PWA requires HTTPS, a Service Worker, and a Web Manifest. A SQL database is not a PWA requirement — the application may use any data storage approach or none at all."},
  {id:4,topic:"Programming for the Web",type:"MS",
   question:"Which of the following are valid responsibilities of a Service Worker? (Select ALL that apply)",
   options:["Intercepting and handling network requests","Caching assets to enable offline functionality","Rendering HTML elements directly to the DOM","Receiving and displaying push notifications"],
   correct:[0,1,3],
   explanation:"Service Workers intercept network requests, cache assets for offline use, and manage push notifications. They cannot access the DOM directly — DOM manipulation is handled by the main JavaScript thread."},
  {id:5,topic:"Programming for the Web",type:"TF",
   question:"HTTP communicates over port 443 by default.",
   options:["True","False"],correct:[1],
   explanation:"False. HTTP uses port 80 by default. Port 443 is reserved for HTTPS (HTTP Secure), which encrypts traffic using TLS."},
  {id:6,topic:"Programming for the Web",type:"MC",
   question:"Which system translates human-readable domain names (such as www.example.com) into numerical IP addresses?",
   options:["HTTPS","DNS (Domain Name System)","FTP (File Transfer Protocol)","TCP (Transmission Control Protocol)"],
   correct:[1],
   explanation:"The Domain Name System (DNS) is a hierarchical naming system that resolves domain names to IP addresses, enabling data to be routed correctly across the internet."},
  {id:7,topic:"Programming for the Web",type:"MC",
   question:"Which HTTP method is most appropriate when a web form submits new data to create a resource on the server?",
   options:["GET","DELETE","POST","PUT"],
   correct:[2],
   explanation:"POST is used to submit data and create a new resource on the server. GET retrieves data without modification, PUT updates an existing resource, and DELETE removes one."},
  {id:8,topic:"Programming for the Web",type:"TF",
   question:"CSS (Cascading Style Sheets) is responsible for controlling the visual presentation and layout of web content.",
   options:["True","False"],correct:[0],
   explanation:"True. CSS defines how HTML elements are displayed — including colour, font, spacing, and layout — completely separate from the document's content structure."},
  {id:9,topic:"Programming for the Web",type:"MC",
   question:"Cross-site scripting (XSS) attacks typically occur because:",
   options:["A server is overwhelmed with too many simultaneous requests","Unsanitised user input is rendered directly in the browser as HTML","A database is accessed without proper authentication credentials","An SSL certificate has expired on the web server"],
   correct:[1],
   explanation:"XSS occurs when user-supplied input (e.g. from a form field) is inserted into the page without sanitisation, allowing malicious scripts to execute in victims' browsers and potentially steal data or hijack sessions."},
  {id:10,topic:"Programming for the Web",type:"MS",
   question:"Which of the following HTTP status codes indicate a SUCCESSFUL response from a server? (Select ALL that apply)",
   options:["200 OK","404 Not Found","201 Created","500 Internal Server Error"],
   correct:[0,2],
   explanation:"200 (OK) and 201 (Created) are HTTP success codes. 404 is a client-side error (resource not found) and 500 is a server-side error."},
  {id:11,topic:"Programming for the Web",type:"TF",
   question:"Object-Relational Mapping (ORM) allows developers to interact with a relational database using programming language objects rather than writing raw SQL.",
   options:["True","False"],correct:[0],
   explanation:"True. ORM (e.g. SQLAlchemy in Python or Django ORM) maps class instances to database rows, abstracting SQL queries into method calls on objects and reducing the risk of SQL injection."},
  {id:12,topic:"Programming for the Web",type:"MC",
   question:"Which organisation is responsible for developing and maintaining international web standards and specifications?",
   options:["IETF (Internet Engineering Task Force)","W3C (World Wide Web Consortium)","IEEE (Institute of Electrical and Electronics Engineers)","ISO (International Organisation for Standardisation)"],
   correct:[1],
   explanation:"The W3C (World Wide Web Consortium) develops and publishes web standards including HTML, CSS, accessibility guidelines (WCAG), and web security specifications."},
  {id:13,topic:"Programming for the Web",type:"TF",
   question:"HTTPS communicates over port 443 by default.",
   options:["True","False"],correct:[0],
   explanation:"True. HTTPS (HTTP Secure) uses port 443 by default and encrypts traffic using TLS. Ordinary HTTP uses port 80."},
  {id:14,topic:"Programming for the Web",type:"MC",
   question:"In a three-tier web architecture, which layer is responsible for processing business logic and querying the database?",
   options:["The front-end (client-side) layer","The CSS stylesheet layer","The back-end (server-side) layer","The web manifest layer"],
   correct:[2],
   explanation:"The back-end (server-side) layer handles business logic, authentication, and database interactions. The front-end handles presentation in the user's browser."},
  {id:15,topic:"Programming for the Web",type:"MS",
   question:"Which of the following are defining features of a Progressive Web App? (Select ALL that apply)",
   options:["Installable to a device home screen without an app store","Capable of functioning offline or in low-connectivity conditions","Requires native iOS or Android SDK compilation to build","Able to send push notifications to users"],
   correct:[0,1,3],
   explanation:"PWAs are installable, offline-capable, and can send push notifications — all without requiring a native SDK. They are built entirely with web technologies (HTML, CSS, JavaScript)."},
  {id:16,topic:"Programming for the Web",type:"TF",
   question:"A Web Manifest is a JSON file that provides a browser with metadata about a PWA, including its name, icons, and start URL.",
   options:["True","False"],correct:[0],
   explanation:"True. The Web App Manifest (manifest.json) is required for PWA installation. It defines the app's name, icons, theme colour, display mode, and start URL."},
  {id:17,topic:"Programming for the Web",type:"MC",
   question:"Which CSS feature enables a web page layout to respond and adapt to different screen sizes and device types?",
   options:["CSS Variables (custom properties)","CSS Animations and transitions","CSS Media Queries","CSS Pseudo-elements"],
   correct:[2],
   explanation:"CSS Media Queries apply different style rules based on device characteristics such as screen width, enabling responsive layouts for mobile, tablet, and desktop devices."},
  {id:18,topic:"Programming for the Web",type:"MC",
   question:"What is the primary security purpose of using parameterised queries (prepared statements) when interacting with a database?",
   options:["To improve database read and write performance","To prevent SQL injection attacks by separating code from data","To enable multi-table joins across foreign keys","To automatically cache frequently executed queries"],
   correct:[1],
   explanation:"Parameterised queries treat user input as data, not executable SQL code. This prevents attackers from injecting malicious SQL by separating the query structure from its parameters at the database driver level."},
  {id:19,topic:"Programming for the Web",type:"TF",
   question:"Front-end web development refers to programming code that executes on the web server.",
   options:["True","False"],correct:[1],
   explanation:"False. Front-end (client-side) code — typically HTML, CSS, and JavaScript — executes in the user's browser. Back-end (server-side) code executes on the web server."},
  {id:20,topic:"Programming for the Web",type:"MS",
   question:"Which of the following are valid CSS selector types? (Select ALL that apply)",
   options:["Element type selector (e.g. p, h1, div)","Class selector (e.g. .container, .nav-link)","IP address selector","ID selector (e.g. #header, #main-content)"],
   correct:[0,1,3],
   explanation:"CSS supports element type, class (.), and ID (#) selectors, among others (attribute, pseudo-class, etc.). There is no such thing as an IP address selector in CSS."},
  {id:21,topic:"Programming for the Web",type:"TF",
   question:"An IPv4 address consists of four groups of numbers separated by colons (e.g. 2001:0db8:85a3:0000).",
   options:["True","False"],correct:[1],
   explanation:"False. IPv4 addresses use four groups of numbers (octets) separated by dots (e.g. 192.168.1.1). The colon-separated format is used in IPv6 addresses."},
  {id:22,topic:"Programming for the Web",type:"MC",
   question:"In the context of web development, what does 'DOM' stand for?",
   options:["Data Object Model","Document Object Model","Database Operations Manager","Dynamic Output Module"],
   correct:[1],
   explanation:"DOM stands for Document Object Model — the tree-structured, programmatic representation of an HTML document that JavaScript can read and manipulate in the browser."},
  {id:23,topic:"Programming for the Web",type:"MC",
   question:"According to the NSW HSC Software Engineering Course Specifications, what is expected of students regarding front-end frameworks?",
   options:["Students must demonstrate hands-on proficiency in React","Students must demonstrate hands-on proficiency in Angular","Students should understand why frameworks are useful; knowledge of a specific framework is not required","Front-end frameworks are entirely outside the scope of the HSC syllabus"],
   correct:[2],
   explanation:"The NSW HSC Course Specifications state that students should understand why front-end frameworks are useful. Students are not expected to have knowledge of, or code using, any specific framework."},
  {id:24,topic:"Programming for the Web",type:"TF",
   question:"The Web Accessibility Initiative (WAI) is a program of the W3C that develops guidelines to make web content accessible to people with disabilities.",
   options:["True","False"],correct:[0],
   explanation:"True. The WAI is part of the W3C and publishes the Web Content Accessibility Guidelines (WCAG), which are the internationally recognised standard for web accessibility."},
  {id:25,topic:"Programming for the Web",type:"MS",
   question:"Which of the following correctly describe the role of HTTPS in web development? (Select ALL that apply)",
   options:["Encrypts data transmitted between the client and server","Is a mandatory requirement for a web application to be classified as a PWA","Operates by default on port 80","Protects against eavesdropping and man-in-the-middle attacks"],
   correct:[0,1,3],
   explanation:"HTTPS encrypts data in transit, is required for PWAs, and protects against interception and tampering. It uses port 443, not port 80 (which is plain HTTP)."},
  {id:26,topic:"Software Engineering Project",type:"MC",
   question:"Which document formally establishes the scope, objectives, constraints, and deliverables of a software engineering project?",
   options:["System architecture diagram","Data flow diagram (DFD)","Project brief","Gantt chart"],
   correct:[2],
   explanation:"The project brief is the foundational planning document that defines what the project aims to achieve, its boundaries, constraints, required resources, and expected outcomes."},
  {id:27,topic:"Software Engineering Project",type:"TF",
   question:"In the Waterfall software development model, each phase must be fully completed and signed off before the next phase can begin.",
   options:["True","False"],correct:[0],
   explanation:"True. The Waterfall model is a sequential, linear process. Each phase (requirements, design, development, testing, deployment) must be complete before the next begins — returning to a prior phase is costly and disruptive."},
  {id:28,topic:"Software Engineering Project",type:"MC",
   question:"What is the primary purpose of implementing version control (such as Git) during a software engineering project?",
   options:["To automatically generate unit tests for all committed code","To track a history of all changes and enable reversion to previous versions","To deploy the finished application directly to a production web server","To produce auto-formatted documentation from source code comments"],
   correct:[1],
   explanation:"Version control records every change made to a codebase, enabling developers to revert to earlier states, collaborate without conflicts, and maintain a full audit trail of who changed what and when."},
  {id:29,topic:"Software Engineering Project",type:"MS",
   question:"Which of the following are recognised phases in the Waterfall software development model? (Select ALL that apply)",
   options:["Requirements Definition","Design","Sprint Planning and Sprint Review","Testing and Debugging"],
   correct:[0,1,3],
   explanation:"Requirements Definition, Design, Development, Testing, and Deployment are Waterfall phases. Sprint Planning and Sprint Review are Agile/Scrum ceremonies — not part of the Waterfall model."},
  {id:30,topic:"Software Engineering Project",type:"TF",
   question:"Agile methodology follows a strict sequential structure where requirements cannot be changed once the project has begun.",
   options:["True","False"],correct:[1],
   explanation:"False. Agile is specifically designed to accommodate changing requirements. It uses iterative sprints and regular stakeholder feedback to allow continuous refinement throughout the development lifecycle."},
  {id:31,topic:"Software Engineering Project",type:"MC",
   question:"Which type of software testing examines the correctness of an individual function or module in isolation from the rest of the system?",
   options:["Integration testing","Acceptance testing","Unit testing","Regression testing"],
   correct:[2],
   explanation:"Unit testing focuses on verifying that individual units of code (functions, methods, modules) produce the correct output for given inputs, tested in complete isolation from other system components."},
  {id:32,topic:"Software Engineering Project",type:"TF",
   question:"A Gantt chart is a project management tool that visually represents tasks, their durations, and their scheduling across a timeline.",
   options:["True","False"],correct:[0],
   explanation:"True. A Gantt chart uses horizontal bars to show tasks along a timeline, making it easy to visualise task sequences, dependencies, milestones, and overall project scheduling at a glance."},
  {id:33,topic:"Software Engineering Project",type:"MC",
   question:"A student encounters a critical bug two days before their project is due. Which of the following responses BEST reflects professional software engineering practice?",
   options:["Remove the entire module containing the bug to simplify the submission","Submit the project without addressing the bug","Document the bug, search online for a solution, and consult peers before implementing a fix","Switch to a different programming language to avoid the issue"],
   correct:[2],
   explanation:"Documenting the problem, researching solutions online, and seeking peer collaboration are professional debugging strategies explicitly identified in the NSW HSC Software Engineering syllabus."},
  {id:34,topic:"Software Engineering Project",type:"MS",
   question:"Which of the following are genuine benefits of using version control throughout a software engineering project? (Select ALL that apply)",
   options:["Maintains a complete history of all code changes with timestamps","Enables multiple developers to collaborate without overwriting each other's work","Automatically generates and executes all unit tests on each commit","Allows recovery from accidental deletions by reverting to a previous state"],
   correct:[0,1,3],
   explanation:"Version control provides change history, facilitates safe collaboration, and enables rollback. It does not automatically run tests — that requires a separate Continuous Integration (CI) pipeline."},
  {id:35,topic:"Software Engineering Project",type:"TF",
   question:"Integration testing verifies that individual program modules function correctly in complete isolation from all other parts of the system.",
   options:["True","False"],correct:[1],
   explanation:"False. That describes unit testing. Integration testing checks that separately developed modules function correctly when combined — verifying the interfaces and data flow between components work as intended."},
  {id:36,topic:"Software Engineering Project",type:"MC",
   question:"In project management, the 'critical path' refers to:",
   options:["The sequence of dependent tasks that determines the minimum project completion time","The most technically complex feature of the software application","The path that data takes as it flows through the application","The testing procedure applied to the highest-priority user requirements"],
   correct:[0],
   explanation:"The critical path is the longest sequence of dependent tasks through the project. Any delay on the critical path directly delays the entire project completion date — there is zero float on these tasks."},
  {id:37,topic:"Software Engineering Project",type:"TF",
   question:"A feasibility study assesses whether a proposed software project is technically and financially viable before development begins.",
   options:["True","False"],correct:[0],
   explanation:"True. A feasibility study examines technical, financial, legal, and scheduling viability — helping stakeholders make an informed decision about whether to proceed with the project."},
  {id:38,topic:"Software Engineering Project",type:"MC",
   question:"Which type of testing is performed by end users to confirm the completed system meets their specified requirements?",
   options:["Unit testing","Regression testing","Acceptance testing","White-box testing"],
   correct:[2],
   explanation:"Acceptance testing (User Acceptance Testing / UAT) is carried out by the client or end user to verify that the system meets agreed requirements and is fit for purpose before final sign-off."},
  {id:39,topic:"Software Engineering Project",type:"MS",
   question:"Which of the following are social or ethical issues that can arise from a software engineering project that collects user data? (Select ALL that apply)",
   options:["Privacy of individuals whose data is collected and stored","Data security and protection against unauthorised access","Improved processing speed of server hardware","Copyright and intellectual property rights"],
   correct:[0,1,3],
   explanation:"Privacy, data security, and intellectual property are key social, ethical, and legal issues in software development. Processing speed is a performance consideration, not a social or ethical issue."},
  {id:40,topic:"Software Engineering Project",type:"TF",
   question:"The Privacy Act 1988 is Australian federal legislation that governs how organisations must collect, store, and use personal information.",
   options:["True","False"],correct:[0],
   explanation:"True. The Privacy Act 1988 (Cth), along with its Australian Privacy Principles (APPs), is the primary Australian law regulating how personal data must be handled by government agencies and many private organisations."},
  {id:41,topic:"Software Engineering Project",type:"MC",
   question:"Which software development methodology organises work into short, iterative cycles with regular reviews and the flexibility to adjust requirements throughout development?",
   options:["Waterfall","Agile","Critical Path Method (CPM)","Structured Systems Analysis and Design Method (SSADM)"],
   correct:[1],
   explanation:"Agile methodology uses sprints (typically 1–4 weeks), daily stand-ups, retrospectives, and continuous stakeholder feedback to allow flexible, iterative delivery of working software."},
  {id:42,topic:"Software Engineering Project",type:"TF",
   question:"Outsourcing a specific technical challenge to a specialist is a valid strategy for responding to difficulties encountered during software project development.",
   options:["True","False"],correct:[0],
   explanation:"True. The NSW HSC syllabus explicitly identifies outsourcing as one of three valid strategies for responding to development difficulties, alongside searching online for solutions and collaborating with peers."},
  {id:43,topic:"Software Engineering Project",type:"MS",
   question:"Which of the following would typically be included in a software engineering project brief? (Select ALL that apply)",
   options:["Project objectives and scope","Functional and performance requirements","Detailed CSS class names and stylesheet rules","Constraints, boundaries, and identified risks"],
   correct:[0,1,3],
   explanation:"A project brief documents objectives, scope, requirements (both functional and performance), constraints, and boundaries. Detailed CSS implementation belongs in the design phase, not the project brief."},
  {id:44,topic:"Software Engineering Project",type:"MC",
   question:"What does regression testing involve in the software development lifecycle?",
   options:["Testing an isolated module before it is merged into the main codebase","Re-running previously passed tests to confirm new changes have not broken existing functionality","Measuring application response time under simulated heavy user load","Manually reviewing source code structure without executing it"],
   correct:[1],
   explanation:"Regression testing re-executes an existing test suite after code changes to ensure that new features or bug fixes have not inadvertently broken previously working functionality."},
  {id:45,topic:"Software Engineering Project",type:"TF",
   question:"A skills analysis in a project plan identifies the technical skills required and highlights any capability gaps the developer needs to address before or during development.",
   options:["True","False"],correct:[0],
   explanation:"True. A skills analysis is part of the identifying and defining phase, helping the developer plan for any learning or upskilling required before development of specific project components can proceed."},
  {id:46,topic:"Software Engineering Project",type:"MC",
   question:"Which of the following is an example of a FUNCTIONAL requirement in a software engineering project?",
   options:["The application must load within two seconds on a standard broadband connection","The application must allow users to register using an email address and password","The system must maintain 99.9% uptime across all calendar months","The application interface must use a minimum font size of 14 points"],
   correct:[1],
   explanation:"Functional requirements describe what a system must DO — its features and behaviours. Load time, uptime, and font size describe performance and design requirements, not functional ones."},
  {id:47,topic:"Software Engineering Project",type:"TF",
   question:"Performance requirements describe what a system must DO (its features), while functional requirements describe how well it must perform those functions.",
   options:["True","False"],correct:[1],
   explanation:"False — this is reversed. Functional requirements define WHAT the system does (its features and behaviours). Performance requirements define HOW WELL it does it (speed, reliability, availability)."},
  {id:48,topic:"Software Engineering Project",type:"MS",
   question:"Which of the following demonstrate safe and secure development practices in a software engineering project? (Select ALL that apply)",
   options:["Implementing version control and scheduling regular automated backups","Validating and sanitising all user input before processing or storing it","Storing user passwords as plain text in the database for easy retrieval","Using HTTPS to encrypt all data transmitted between the client and server"],
   correct:[0,1,3],
   explanation:"Version control/backups, input validation, and HTTPS are all secure practices. Storing passwords as plain text is a critical vulnerability — passwords must always be hashed using a secure algorithm such as bcrypt."},
  {id:49,topic:"Software Engineering Project",type:"MC",
   question:"Which of the following would NOT typically be included in a software engineering project folio?",
   options:["UI wireframes and design mockups","Testing results, evaluation, and reflection on the development process","The complete source code of competitor applications not developed by the student","Documentation of key development decisions and problem-solving strategies"],
   correct:[2],
   explanation:"A project folio documents the student's own design, decisions, testing, and evaluation. Including competitor source code would raise serious intellectual property and copyright concerns and is not appropriate."},
  {id:50,topic:"Software Engineering Project",type:"TF",
   question:"Digital disruption refers to the transformation caused by emerging digital technologies that displaces or fundamentally alters established products, services, or business processes.",
   options:["True","False"],correct:[0],
   explanation:"True. Digital disruption — such as streaming services disrupting physical media or ride-share apps disrupting taxis — is a key social and economic implication that software engineers must consider when developing new products."}
];

const TYPE_LABELS = {MC:"Multiple Choice",TF:"True / False",MS:"Multi-Select"};
const TYPE_COLORS = {
  MC:{bg:"#1F3864",text:"#fff",light:"#dce6f0",border:"#1F3864"},
  TF:{bg:"#1F7A8C",text:"#fff",light:"#d6eaf8",border:"#1F7A8C"},
  MS:{bg:"#7B5E2A",text:"#fff",light:"#f5edd6",border:"#7B5E2A"}
};

function getBand(pct){
  if(pct>=90)return{band:"Band 6",color:"#1F7A8C",msg:"Outstanding — you demonstrate exceptional understanding across both focus areas."};
  if(pct>=80)return{band:"Band 5",color:"#2980b9",msg:"Strong — solid knowledge with minor gaps to review."};
  if(pct>=70)return{band:"Band 4",color:"#27ae60",msg:"Sound — core concepts understood; refine specific areas identified below."};
  if(pct>=60)return{band:"Band 3",color:"#d4a017",msg:"Developing — review key syllabus dot points and revisit all incorrect answers."};
  if(pct>=50)return{band:"Band 2",color:"#e67e22",msg:"Emerging — significant revision required across both topics."};
  return{band:"Band 1",color:"#e74c3c",msg:"Foundation — thorough revision of both topics is strongly recommended."};
}

export default function App(){
  const [phase,setPhase]=useState("start");
  const [cur,setCur]=useState(0);
  const [answers,setAnswers]=useState({});
  const [showExpl,setShowExpl]=useState({});
  const [reviewFilter,setReviewFilter]=useState("all");
  const topRef=useRef(null);

  const q=QUESTIONS[cur];
  const isMS=q.type==="MS";
  const sel=answers[q.id]||[];
  const answeredCount=Object.keys(answers).length;
  const allAnswered=answeredCount===QUESTIONS.length;

  function toggleOpt(idx){
    const prev=answers[q.id]||[];
    if(isMS){
      setAnswers(a=>({...a,[q.id]:prev.includes(idx)?prev.filter(x=>x!==idx):[...prev,idx]}));
    }else{
      setAnswers(a=>({...a,[q.id]:[idx]}));
    }
  }

  function isCorrect(qid){
    const q2=QUESTIONS.find(x=>x.id===qid);
    const s=answers[qid]||[];
    return s.length===q2.correct.length&&s.every(v=>q2.correct.includes(v));
  }

  const score=QUESTIONS.reduce((a,x)=>a+(isCorrect(x.id)?1:0),0);
  const pct=Math.round(score/QUESTIONS.length*100);
  const band=getBand(pct);

  function submit(){setPhase("results");setTimeout(()=>topRef.current?.scrollIntoView({behavior:"smooth"}),50);}
  function restart(){setAnswers({});setCur(0);setPhase("start");setShowExpl({});setReviewFilter("all");}

  const reviewList=QUESTIONS.filter(q2=>{
    if(reviewFilter==="correct")return isCorrect(q2.id);
    if(reviewFilter==="incorrect")return !isCorrect(q2.id);
    if(reviewFilter==="web")return q2.topic==="Programming for the Web";
    if(reviewFilter==="project")return q2.topic==="Software Engineering Project";
    return true;
  });

  // ── START ──────────────────────────────────────────────────────────────────
  if(phase==="start") return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0e1e40 0%,#1a3a6b 50%,#1F7A8C 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 16px",fontFamily:"Arial,sans-serif"}}>
      <div style={{maxWidth:640,width:"100%",background:"#fff",borderRadius:18,overflow:"hidden",boxShadow:"0 40px 100px rgba(0,0,0,0.4)"}}>
        <div style={{background:"linear-gradient(135deg,#1F3864,#1F7A8C)",padding:"44px 48px 36px",color:"#fff"}}>
          <div style={{fontSize:10,letterSpacing:4,textTransform:"uppercase",opacity:0.6,marginBottom:14}}>NSW Higher School Certificate</div>
          <h1 style={{margin:0,fontSize:30,fontWeight:"bold",lineHeight:1.25,marginBottom:10,fontFamily:"Georgia,serif"}}>Software Engineering<br/>Electronic Practice Quiz</h1>
          <p style={{margin:0,opacity:0.8,fontSize:15}}>Programming for the Web &amp; Software Engineering Project</p>
        </div>
        <div style={{padding:"36px 48px 40px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:28}}>
            {[["50","Questions"],["Auto","Marked"],["Band","Descriptor"]].map(([v,l])=>(
              <div key={l} style={{background:"#f4f7fb",borderRadius:10,padding:"18px 10px",textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:"bold",color:"#1F3864"}}>{v}</div>
                <div style={{fontSize:12,color:"#777",marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#f8f9fa",borderRadius:10,padding:"16px 20px",marginBottom:24,fontSize:14,color:"#444",lineHeight:1.7}}>
            <strong style={{color:"#1F3864"}}>Instructions:</strong> Answer all 50 questions. For <strong>Multiple Choice</strong> and <strong>True / False</strong>, select one answer. For <strong>Multi-Select</strong>, choose <em>all</em> correct answers. Submit when complete for automatic marking with explanations.
          </div>
          <div style={{display:"flex",gap:12,marginBottom:28,flexWrap:"wrap"}}>
            {Object.entries(TYPE_LABELS).map(([k,v])=>(
              <span key={k} style={{display:"flex",alignItems:"center",gap:6,fontSize:13}}>
                <span style={{width:10,height:10,borderRadius:2,background:TYPE_COLORS[k].bg,display:"inline-block"}}/>
                <span style={{color:"#555"}}>{v}</span>
              </span>
            ))}
          </div>
          <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#1F3864,#1F7A8C)",color:"#fff",border:"none",borderRadius:10,fontSize:17,fontWeight:"bold",cursor:"pointer",letterSpacing:0.5}}>
            Begin Quiz →
          </button>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if(phase==="quiz"){
    const tc=TYPE_COLORS[q.type];
    const topicColor=q.topic==="Programming for the Web"?"#1F7A8C":"#1F3864";
    const progress=Math.round(answeredCount/QUESTIONS.length*100);

    return(
      <div style={{minHeight:"100vh",background:"#eef2f7",fontFamily:"Arial,sans-serif"}}>
        {/* Sticky header */}
        <div style={{position:"sticky",top:0,zIndex:100,background:"#1F3864",color:"#fff",height:52,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",boxShadow:"0 2px 10px rgba(0,0,0,0.25)"}}>
          <span style={{fontSize:14,fontWeight:"bold",opacity:0.9}}>HSC Software Engineering Quiz</span>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:13,opacity:0.8}}>
              <strong style={{color:"#C9A84C"}}>{answeredCount}</strong>/50 answered
            </span>
            <div style={{width:100,height:5,background:"rgba(255,255,255,0.15)",borderRadius:3,overflow:"hidden"}}>
              <div style={{width:`${progress}%`,height:"100%",background:"#C9A84C",borderRadius:3,transition:"width 0.3s"}}/>
            </div>
          </div>
        </div>

        <div style={{maxWidth:760,margin:"0 auto",padding:"24px 16px 140px"}}>
          {/* Question header */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:4,height:36,background:topicColor,borderRadius:2,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:"#999",letterSpacing:1,textTransform:"uppercase"}}>Question {cur+1} of 50</div>
              <div style={{fontSize:13,color:topicColor,fontWeight:"bold"}}>{q.topic}</div>
            </div>
            <span style={{background:tc.bg,color:tc.text,fontSize:11,fontWeight:"bold",padding:"4px 12px",borderRadius:20,flexShrink:0}}>{TYPE_LABELS[q.type]}</span>
          </div>

          {/* Question card */}
          <div style={{background:"#fff",borderRadius:14,boxShadow:"0 4px 20px rgba(0,0,0,0.09)",overflow:"hidden",marginBottom:20}}>
            <div style={{padding:"28px 30px 20px"}}>
              <p style={{margin:0,fontSize:17,lineHeight:1.7,color:"#111",fontFamily:"Georgia,serif"}}>{q.question}</p>
              {isMS&&<p style={{margin:"10px 0 0",fontSize:13,color:tc.bg,fontWeight:"bold"}}>Select ALL answers that apply.</p>}
            </div>
            <div style={{padding:"0 22px 26px",display:"flex",flexDirection:"column",gap:10}}>
              {q.options.map((opt,idx)=>{
                const chosen=sel.includes(idx);
                return(
                  <button key={idx} onClick={()=>toggleOpt(idx)} style={{
                    display:"flex",alignItems:"center",gap:12,
                    padding:"14px 18px",borderRadius:9,cursor:"pointer",
                    border:`2px solid ${chosen?tc.border:"#e0e5ec"}`,
                    background:chosen?tc.light:"#fafbfc",
                    color:chosen?tc.bg:"#333",
                    fontWeight:chosen?"bold":"normal",
                    fontSize:15,fontFamily:"Arial",
                    transition:"all 0.15s",outline:"none",textAlign:"left"
                  }}>
                    <span style={{
                      display:"inline-flex",alignItems:"center",justifyContent:"center",
                      width:28,height:28,borderRadius:isMS?5:"50%",flexShrink:0,
                      border:`2px solid ${chosen?tc.bg:"#c8d0dc"}`,
                      background:chosen?tc.bg:"transparent",
                      color:"#fff",fontSize:11,fontWeight:"bold"
                    }}>
                      {isMS?(chosen?"✓":""):(["A","B","C","D"][idx])}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
            <button onClick={()=>setCur(c=>Math.max(0,c-1))} disabled={cur===0} style={{
              padding:"12px 22px",borderRadius:8,border:"2px solid #d0d8e8",
              background:cur===0?"#f5f5f5":"#fff",color:cur===0?"#bbb":"#444",
              cursor:cur===0?"default":"pointer",fontWeight:"bold",fontSize:14,fontFamily:"Arial"
            }}>← Prev</button>

            {/* Question dots */}
            <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",flex:1,maxWidth:460}}>
              {QUESTIONS.map((_,i)=>{
                const ans=answers[QUESTIONS[i].id]!==undefined;
                const active=i===cur;
                return(
                  <button key={i} onClick={()=>setCur(i)} title={`Q${i+1}`} style={{
                    width:22,height:22,borderRadius:4,padding:0,cursor:"pointer",
                    border:active?"2px solid #1F3864":"none",
                    background:active?"#1F3864":ans?"#1F7A8C":"#d8e0ec",
                    color:active||ans?"#fff":"#888",
                    fontSize:9,fontWeight:"bold",fontFamily:"Arial"
                  }}>{i+1}</button>
                );
              })}
            </div>

            {cur<QUESTIONS.length-1?(
              <button onClick={()=>setCur(c=>c+1)} style={{
                padding:"12px 22px",borderRadius:8,border:"none",
                background:"#1F3864",color:"#fff",cursor:"pointer",
                fontWeight:"bold",fontSize:14,fontFamily:"Arial"
              }}>Next →</button>
            ):(
              <button onClick={submit} disabled={!allAnswered} style={{
                padding:"12px 22px",borderRadius:8,border:"none",
                background:allAnswered?"#C9A84C":"#aaa",
                color:"#fff",cursor:allAnswered?"pointer":"default",
                fontWeight:"bold",fontSize:14,fontFamily:"Arial",
                whiteSpace:"nowrap"
              }}>{allAnswered?"Submit & Mark ✓":`${QUESTIONS.length-answeredCount} left`}</button>
            )}
          </div>

          {!allAnswered&&cur===QUESTIONS.length-1&&(
            <p style={{textAlign:"center",marginTop:14,color:"#e67e22",fontSize:13}}>
              {QUESTIONS.length-answeredCount} unanswered — use the dots above to navigate back.
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── RESULTS ────────────────────────────────────────────────────────────────
  const webQs=QUESTIONS.filter(x=>x.topic==="Programming for the Web");
  const projQs=QUESTIONS.filter(x=>x.topic==="Software Engineering Project");
  const webScore=webQs.reduce((a,x)=>a+(isCorrect(x.id)?1:0),0);
  const projScore=projQs.reduce((a,x)=>a+(isCorrect(x.id)?1:0),0);
  const incorrect=QUESTIONS.filter(x=>!isCorrect(x.id)).length;

  return(
    <div ref={topRef} style={{minHeight:"100vh",background:"#eef2f7",fontFamily:"Arial,sans-serif"}}>
      {/* Results banner */}
      <div style={{background:"linear-gradient(135deg,#1F3864,#1F7A8C)",color:"#fff",padding:"52px 24px 44px",textAlign:"center"}}>
        <div style={{fontSize:10,letterSpacing:4,textTransform:"uppercase",opacity:0.6,marginBottom:18}}>Results — Automatically Marked</div>
        <div style={{fontSize:80,fontWeight:"bold",lineHeight:1,fontFamily:"Georgia,serif",marginBottom:6}}>
          {score}<span style={{fontSize:34,opacity:0.55}}>/50</span>
        </div>
        <div style={{fontSize:32,fontWeight:"bold",marginBottom:14}}>{pct}%</div>
        <div style={{display:"inline-block",background:band.color,padding:"6px 22px",borderRadius:24,fontSize:16,fontWeight:"bold",marginBottom:16,letterSpacing:0.5}}>{band.band}</div>
        <p style={{margin:0,opacity:0.85,fontSize:15,maxWidth:500,marginLeft:"auto",marginRight:"auto",lineHeight:1.6}}>{band.msg}</p>
      </div>

      <div style={{maxWidth:880,margin:"0 auto",padding:"28px 16px 60px"}}>
        {/* Topic breakdown */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          {[["Programming for the Web",webScore,webQs.length,"#1F7A8C"],["Software Engineering Project",projScore,projQs.length,"#1F3864"]].map(([topic,sc,tot,col])=>(
            <div key={topic} style={{background:"#fff",borderRadius:12,padding:"22px 26px",boxShadow:"0 2px 10px rgba(0,0,0,0.07)"}}>
              <div style={{fontSize:13,color:col,fontWeight:"bold",marginBottom:12}}>{topic}</div>
              <div style={{fontSize:32,fontWeight:"bold",color:"#111",marginBottom:10}}>
                {sc}<span style={{fontSize:18,color:"#aaa"}}>/{tot}</span>
                <span style={{fontSize:16,color:col,marginLeft:10}}>{Math.round(sc/tot*100)}%</span>
              </div>
              <div style={{height:8,background:"#eee",borderRadius:4,overflow:"hidden"}}>
                <div style={{width:`${Math.round(sc/tot*100)}%`,height:"100%",background:col,borderRadius:4,transition:"width 0.8s"}}/>
              </div>
            </div>
          ))}
        </div>

        {/* Type breakdown */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:24}}>
          {Object.entries(TYPE_LABELS).map(([t,label])=>{
            const qs=QUESTIONS.filter(x=>x.type===t);
            const sc=qs.reduce((a,x)=>a+(isCorrect(x.id)?1:0),0);
            const tc=TYPE_COLORS[t];
            return(
              <div key={t} style={{background:"#fff",borderRadius:10,padding:"18px 14px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",textAlign:"center"}}>
                <div style={{display:"inline-block",background:tc.bg,color:tc.text,fontSize:10,fontWeight:"bold",padding:"3px 10px",borderRadius:12,marginBottom:10,letterSpacing:0.5}}>{label}</div>
                <div style={{fontSize:26,fontWeight:"bold",color:"#111"}}>{sc}<span style={{fontSize:14,color:"#aaa"}}>/{qs.length}</span></div>
              </div>
            );
          })}
        </div>

        {/* Tally */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
          <div style={{background:"#d5f5e3",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:28,fontWeight:"bold",color:"#1e8449"}}>✓ {score}</span>
            <span style={{fontSize:14,color:"#1a5c2e"}}>Correct answers</span>
          </div>
          <div style={{background:"#fde8e8",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:28,fontWeight:"bold",color:"#c0392b"}}>✗ {incorrect}</span>
            <span style={{fontSize:14,color:"#7b1c1c"}}>Incorrect answers</span>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          <span style={{fontSize:13,color:"#777",marginRight:4}}>Filter:</span>
          {[["all","All 50"],["incorrect",`Incorrect (${incorrect})`],["correct",`Correct (${score})`],["web","Web Programming"],["project","SE Project"]].map(([v,l])=>(
            <button key={v} onClick={()=>setReviewFilter(v)} style={{
              padding:"7px 15px",borderRadius:20,fontSize:13,cursor:"pointer",
              border:reviewFilter===v?"none":"1px solid #d0d8e8",
              background:reviewFilter===v?"#1F3864":"#fff",
              color:reviewFilter===v?"#fff":"#555",
              fontWeight:reviewFilter===v?"bold":"normal",fontFamily:"Arial"
            }}>{l}</button>
          ))}
        </div>

        {/* Review questions */}
        {reviewList.map(q2=>{
          const correct=isCorrect(q2.id);
          const s=answers[q2.id]||[];
          const tc=TYPE_COLORS[q2.type];
          const explOpen=showExpl[q2.id];

          return(
            <div key={q2.id} style={{background:"#fff",borderRadius:12,marginBottom:14,overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,0.07)",borderLeft:`5px solid ${correct?"#27ae60":"#e74c3c"}`}}>
              <div style={{padding:"20px 22px 14px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
                  <strong style={{color:"#1F3864",fontSize:14}}>Q{q2.id}</strong>
                  <span style={{background:tc.bg,color:tc.text,fontSize:10,fontWeight:"bold",padding:"2px 8px",borderRadius:10}}>{TYPE_LABELS[q2.type]}</span>
                  <span style={{fontSize:11,color:"#999"}}>{q2.topic}</span>
                  <span style={{marginLeft:"auto",fontWeight:"bold",fontSize:14,color:correct?"#27ae60":"#e74c3c"}}>{correct?"✓ Correct":"✗ Incorrect"}</span>
                </div>
                <p style={{margin:"0 0 14px",fontSize:15,lineHeight:1.65,color:"#111",fontFamily:"Georgia,serif"}}>{q2.question}</p>
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {q2.options.map((opt,idx)=>{
                    const isCorr=q2.correct.includes(idx);
                    const wasSel=s.includes(idx);
                    let bg="#f8f9fa",border="1.5px solid #e8ecf0",clr="#333",fw="normal",tag=null;
                    if(isCorr&&wasSel){bg="#d5f5e3";border="1.5px solid #27ae60";clr="#1a5c2e";fw="bold";tag="Your answer ✓";}
                    else if(isCorr){bg="#d5f5e3";border="1.5px solid #27ae60";clr="#1a5c2e";fw="bold";tag="Correct answer";}
                    else if(wasSel){bg="#fde8e8";border="1.5px solid #e74c3c";clr="#7b1c1c";tag="Your answer ✗";}
                    return(
                      <div key={idx} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:7,background:bg,border,color:clr,fontWeight:fw,fontSize:14}}>
                        <span style={{fontSize:10,minWidth:14,color:isCorr?"#27ae60":(wasSel?"#e74c3c":"transparent")}}>{isCorr?"●":(wasSel?"●":"")}</span>
                        <span style={{minWidth:22,fontWeight:"bold",fontSize:12,color:"#aaa"}}>{["A","B","C","D"][idx]}</span>
                        <span style={{flex:1}}>{opt}</span>
                        {tag&&<span style={{fontSize:11,fontStyle:"italic",whiteSpace:"nowrap",opacity:0.85}}>{tag}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{borderTop:"1px solid #f0f0f0"}}>
                <button onClick={()=>setShowExpl(s2=>({...s2,[q2.id]:!s2[q2.id]}))} style={{display:"block",width:"100%",padding:"11px 22px",background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#1F7A8C",fontWeight:"bold",textAlign:"left",fontFamily:"Arial"}}>
                  {explOpen?"▲ Hide explanation":"▼ Show explanation"}
                </button>
                {explOpen&&(
                  <div style={{padding:"4px 22px 16px"}}>
                    <div style={{background:"#f0f8fb",borderRadius:8,padding:"14px 16px",fontSize:14,color:"#333",lineHeight:1.7,borderLeft:"3px solid #1F7A8C"}}>
                      <strong style={{color:"#1F7A8C"}}>Explanation: </strong>{q2.explanation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div style={{textAlign:"center",marginTop:36}}>
          <button onClick={restart} style={{padding:"16px 44px",background:"linear-gradient(135deg,#1F3864,#1F7A8C)",color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:"bold",cursor:"pointer",letterSpacing:0.5}}>
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
