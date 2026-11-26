/**
 * Portfolio Content Configuration
 * ---------------------------------------------------------------------------
 * Profile, projects, capabilities, research notes, and background based on
 * Maria Kevin's documented repositories and public details.
 */
window.PORTFOLIO_DATA = {
  profile: {
    name: 'Maria Kevin',
    role: 'Software developer',
    description:
      'Maria Kevin is an MCA student in Chennai building applied machine learning, student tools, and native desktop software.',
    status: 'MCA student in Chennai building applied AI and native systems',
    timezone: 'Asia/Kolkata',
    cvUrl: 'assets/maria-kevin-resume.pdf',
    headline: 'I make machine intelligence useful and software systems understandable.',
    subtitle:
      'My work connects machine learning, thoughtful product design, and native systems engineering so decisions stay inspectable rather than hidden behind scores.',
    focus: 'MCA student at SRM Valliammai Engineering College',
    location: 'Chennai, India',
    email: 'mariakevin0504@gmail.com',
    bioTitle: 'Software that shows its work',
    bioParagraphs: [
      'Most of my projects sit where machine learning, interface design, and operating-system APIs meet. Building across those layers makes it easier to see how one boundary affects another.',
      'Across these repositories, the goal is consistent: keep uncertainty visible in predictions, separate hard eligibility rules from matching scores, and respect native platform conventions.'
    ],
    socials: [
      { label: 'GitHub', url: 'https://github.com/Mariakevin' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mariakevin/' },
      { label: 'Email', url: 'mailto:mariakevin0504@gmail.com' }
    ]
  },

  education: {
    label: 'Academic program',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'SRM Valliammai Engineering College, Chennai',
    status: 'In progress',
    period: '2025 – 2027',
    points: [
      'Bachelor of Computer Applications (BCA), Apollo Arts & Science College (2022 – 2025).',
      'Developing independent projects spanning medical imaging ensembles, explainable student tools, and cross-platform native companions.',
      'Documenting architecture boundaries, failure cases, and unresolved evaluation gaps alongside source code.'
    ]
  },

  experience: [
    {
      role: 'Co-Founder',
      organization: 'Aestric',
      period: 'Jul 2026 – Present',
      bullets: ['Building Aestric alongside MCA studies and independent software projects.']
    }
  ],

  skills: [
    {
      group: 'Applied ML',
      items: [
        { name: 'Python', projects: ['fundusnet', 'jobmatch'] },
        { name: 'PyTorch', projects: ['fundusnet'] },
        { name: 'OpenCV', projects: ['fundusnet'] },
        { name: 'ONNX Runtime', projects: ['fundusnet'] },
        { name: 'Grad-CAM', projects: ['fundusnet'] }
      ]
    },
    {
      group: 'Web interfaces',
      items: [
        { name: 'React', projects: ['jobmatch', 'finai'] },
        { name: 'TypeScript', projects: ['jobmatch', 'finai'] },
        { name: 'Vite', projects: ['jobmatch', 'finai'] },
        { name: 'Tailwind CSS', projects: ['finai'] },
        { name: 'Supabase', projects: ['finai'] }
      ]
    },
    {
      group: 'APIs and storage',
      items: [
        { name: 'FastAPI', projects: ['jobmatch'] },
        { name: 'Django', projects: ['fundusnet'] },
        { name: 'Pydantic', projects: ['jobmatch'] },
        { name: 'PostgreSQL', projects: ['finai'] },
        { name: 'REST APIs', projects: ['jobmatch', 'finai'] }
      ]
    },
    {
      group: 'Native systems',
      items: [
        { name: 'Linux', projects: ['ledgepill'] },
        { name: 'GTK4', projects: ['ledgepill'] },
        { name: 'D-Bus', projects: ['ledgepill'] },
        { name: 'WPF / .NET', projects: ['ledgepill'] },
        { name: 'Kotlin', projects: ['ledgepill'] }
      ]
    },
    {
      group: 'Quality and tooling',
      items: [
        { name: 'Docker', projects: ['fundusnet'] },
        { name: 'GitHub Actions', projects: [], note: 'Continuous integration workflows across repositories' },
        { name: 'Ruff', projects: [], note: 'Python linting and formatting workflows' },
        { name: 'pre-commit', projects: [], note: 'Automated pre-commit checks' },
        { name: 'unittest', projects: [], note: 'Python unit test suites' }
      ]
    }
  ],

  projects: [
    {
      id: 'fundusnet',
      title: 'FundusNet',
      tagline: 'Retinal screening research prototype',
      category: 'Applied ML',
      year: '2026',
      status: 'Ongoing research prototype',
      statusKey: 'research',
      role: 'Applied ML research prototype',
      researchId: 'fundus-transfer',
      summary:
        'A retinal-image screening prototype combining a five-model ensemble with uncertainty-aware inference and Grad-CAM visual explanations.',
      impact:
        'Refers high-uncertainty scans for specialist review and pairs each prediction with heatmaps showing which retinal regions drove the output.',
      stack: ['Python', 'PyTorch', 'Django', 'OpenCV', 'ONNX Runtime', 'Docker'],
      demoUrl: '',
      repoUrl: 'https://github.com/Mariakevin/FundusNet',
      problem:
        'A screening model should make its limits visible. FundusNet explores how to pair a retinal-image prediction with uncertainty signals and a visual explanation a reviewer can inspect.',
      architecture: [
        'Fundus image check',
        'Image quality screen',
        'Five-model ensemble',
        'Uncertainty referral',
        'Grad-CAM explanation'
      ],
      stageNotes: [
        'Rejects non-fundus uploads upfront so unrelated images are not forced through the retinal classifier.',
        'Checks image quality ahead of inference so degraded scans are flagged before classification.',
        'Combines five model architectures with test-time augmentation to observe prediction stability.',
        'Measures uncertainty and refers borderline cases for specialist review rather than forcing a confident label.',
        'Produces Grad-CAM heatmaps indicating which image regions contributed to healthy, cataract, glaucoma, or retinal disease outputs.'
      ],
      tradeoffs: [
        'Uses five model architectures and test-time augmentation to examine stability instead of relying on a single network.',
        'Treats high uncertainty as a trigger for human review rather than emitting a low-confidence class.'
      ],
      outcomes: [
        'Classifies scans across four categories: healthy, cataract, glaucoma, and retinal disease.',
        'Outputs confidence signals and visual heatmaps alongside every screening result.'
      ],
      failureModes: [
        'Non-fundus uploads are rejected during input validation instead of being treated as eye scans.',
        'Uncertain predictions are withheld for specialist inspection rather than forced into a category.'
      ],
      limitations: [
        'This is a research prototype, not a clinically validated medical device.',
        'Training used a public dataset; generalization across unseen cameras, populations, and clinical settings remains untested.'
      ],
      artifacts: [
        { label: 'Read paper draft', url: 'https://github.com/Mariakevin/FundusNet/blob/main/docs/PAPER_DRAFT.md' },
        { label: 'View repository', url: 'https://github.com/Mariakevin/FundusNet' }
      ]
    },
    {
      id: 'jobmatch',
      title: 'JobMatch AI',
      year: '2026',
      tagline: 'Evidence-backed internship matching',
      category: 'Student tools',
      status: 'Ongoing prototype',
      statusKey: 'active',
      role: 'Product design and implementation',
      researchId: 'evidence-extraction',
      summary:
        'A student-facing internship assistant that explains eligibility rules, skill evidence, practical constraints, and listing warnings instead of hiding behind an opaque score.',
      impact:
        'Keeps deterministic eligibility separate from fit scoring and leaves incomplete or conflicting facts visible for the student to review.',
      stack: ['Python', 'FastAPI', 'Pydantic', 'React', 'TypeScript', 'Vite'],
      demoUrl: '',
      repoUrl: 'https://github.com/Mariakevin/JobMatchAI',
      problem:
        'Students need to understand why an internship fits or fails their requirements without mistaking an automated match score for a hiring prediction.',
      architecture: [
        'Untrusted text extraction',
        'Deterministic eligibility',
        'Skill evidence audit',
        'Practical constraint check',
        'Reviewable results board'
      ],
      stageNotes: [
        'Parses resume and job-listing text as untrusted input, guarding against prompt-injection attempts.',
        'Evaluates hard requirements with deterministic rules so a high fit score never masks disqualifying criteria.',
        'Links each matched or missing skill to concrete evidence from the student profile.',
        'Evaluates practical constraints while keeping unknown or conflicting details open for confirmation.',
        'Displays editable extracted facts and quoted listing warnings without claiming to forecast interview odds.'
      ],
      tradeoffs: [
        'Separates hard eligibility rules from fit scoring so missing a mandatory criterion cannot be hidden by keyword overlap.',
        'Marks missing data as unknown instead of silently treating incomplete profiles as rejections.'
      ],
      outcomes: [
        'Lets students inspect and correct extracted facts before relying on an assessment.',
        'Quotes exact listing phrases whenever triggering a warning.'
      ],
      failureModes: [
        'Resume and listing text are handled as untrusted strings, including defenses against prompt injection.',
        'Conflicting or uncertain eligibility fields pause for confirmation rather than failing silently.'
      ],
      limitations: [
        'Does not predict hiring decisions, guarantee interviews, or verify an employer’s legal status.',
        'Automated extraction can miss context, so students need to verify extracted facts.'
      ],
      artifacts: [
        { label: 'Read design research', url: 'https://github.com/Mariakevin/JobMatchAI/blob/main/docs/design-research.md' },
        { label: 'View repository', url: 'https://github.com/Mariakevin/JobMatchAI' }
      ]
    },
    {
      id: 'finai',
      title: 'FinAI',
      year: '2025',
      tagline: 'Personal finance and budgeting',
      category: 'Product',
      status: 'Completed prototype',
      statusKey: 'completed',
      role: 'Full-stack product',
      researchId: null,
      summary:
        'A personal-finance web application for transaction tracking, category budgets, spending charts, and recommendations powered by Google Gemini.',
      impact:
        'Combines budget progress and spending trends in one dashboard while keeping model calls isolated behind a server-side edge function.',
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Gemini'],
      demoUrl: '',
      repoUrl: 'https://github.com/Mariakevin/FinAI',
      problem:
        'Raw transaction lists rarely give a clear picture of recurring expenses or budget headroom without manual spreadsheet cleanup.',
      architecture: [
        'React TypeScript client',
        'Budget and chart views',
        'Supabase authentication',
        'PostgreSQL ledger',
        'Edge function proxy'
      ],
      stageNotes: [
        'Client interface built in React, TypeScript, Vite, and Tailwind CSS for responsive transaction review.',
        'Organizes income, expenses, and category budgets into charts and progress summaries.',
        'Handles sign-in and session state through Supabase Auth.',
        'Persists transaction and budget records in Supabase-backed PostgreSQL.',
        'Routes Google Gemini requests through a Supabase Edge Function so the browser never calls the model API directly.'
      ],
      tradeoffs: [
        'Adopted Supabase Auth and PostgreSQL rather than maintaining a custom authentication and storage service.',
        'Placed Gemini inference behind a Supabase Edge Function instead of calling model endpoints from client code.'
      ],
      outcomes: [
        'Unifies income, expense tracking, and budget progress into one workspace.',
        'Presents AI-generated spending observations alongside underlying financial tables.'
      ],
      failureModes: [
        'Model credentials and prompts remain isolated inside the Edge Function boundary.'
      ],
      limitations: [
        'Insight quality depends on the Gemini service and the completeness of logged transactions.',
        'The repository documents application features without publishing a formal evaluation of recommendation accuracy.'
      ],
      artifacts: [
        { label: 'View repository', url: 'https://github.com/Mariakevin/FinAI' }
      ]
    },
    {
      id: 'ledgepill',
      title: 'LedgePill',
      year: '2026',
      tagline: 'Native desktop and mobile island',
      category: 'Native systems',
      status: 'Ongoing platform beta',
      statusKey: 'beta',
      role: 'Cross-platform native software',
      researchId: 'native-consistency',
      summary:
        'A compact Dynamic Island companion built natively for Linux (GTK4 and D-Bus), Windows (WPF), and Android (Kotlin) without a shared web runtime.',
      impact:
        'Shares one calm interaction language across three native toolkits without shipping Electron or embedded browser views.',
      stack: ['Linux', 'GTK4', 'D-Bus', 'WPF / .NET', 'Kotlin'],
      demoUrl: 'https://mariakevin.github.io/LedgePill/demo.html',
      repoUrl: 'https://github.com/Mariakevin/LedgePill',
      problem:
        'A compact desktop companion should react to media, volume, notifications, and Bluetooth events cleanly while feeling native to each operating system.',
      architecture: [
        'Linux GTK4 and D-Bus',
        'Windows WPF companion',
        'Android Kotlin app',
        'Native OS event hooks',
        'Shared visual grammar'
      ],
      stageNotes: [
        'Flagship Linux implementation rendering via GTK4 and subscribing to system events over D-Bus.',
        'Windows companion built natively with WPF and .NET without bundling a web runtime.',
        'Android companion written in Kotlin to connect directly with mobile media and notification APIs.',
        'Listens to live playback, volume, notifications, Bluetooth, and device status signals on each OS.',
        'Preserves consistent geometry and expansion motion across separate native UI toolkits.'
      ],
      tradeoffs: [
        'Writes dedicated native apps per platform instead of maintaining one Electron or WebView codebase.',
        'Prioritizes direct OS event integration over identical feature parity across platforms.'
      ],
      outcomes: [
        'Responds to media controls, volume changes, notifications, and Bluetooth activity natively on Linux.',
        'Includes an interactive browser preview alongside the native codebases.'
      ],
      failureModes: [
        'Platform features degrade gracefully per OS rather than relying on fragile cross-platform shims.'
      ],
      limitations: [
        'Linux is the primary mature target; Windows and Android implementations are marked beta and less tested.',
        'Available system integrations vary across operating systems because each relies on platform APIs.'
      ],
      artifacts: [
        { label: 'Open interactive demo', url: 'https://mariakevin.github.io/LedgePill/demo.html' },
        { label: 'View repository', url: 'https://github.com/Mariakevin/LedgePill' }
      ]
    }
  ],

  research: [
    {
      id: 'fundus-transfer',
      index: 'Question A',
      project: 'FundusNet',
      projectId: 'fundusnet',
      status: 'Open inquiry',
      question: 'Does ensemble uncertainty remain calibrated across unseen cameras, populations, and clinical settings?',
      method: 'Evaluate documented ensemble uncertainty outputs against independent, external retinal-image distributions.',
      evidence: 'Public dataset training and Grad-CAM heatmaps are documented; external clinical validation is not yet performed.',
      contextNote:
        'FundusNet refers uncertain predictions for specialist review instead of emitting forced labels, making out-of-distribution calibration the key gap before clinical use.',
      link: 'https://github.com/Mariakevin/FundusNet'
    },
    {
      id: 'evidence-extraction',
      index: 'Question B',
      project: 'JobMatch AI',
      projectId: 'jobmatch',
      status: 'Open inquiry',
      question: 'How can incomplete resume and listing evidence remain visible without degrading usability?',
      method: 'Separate hard eligibility rules, skill evidence, and practical constraints instead of merging them into a single match score.',
      evidence: 'Design research notes and implementation architecture are documented in the repository.',
      contextNote:
        'Automated text extraction can miss nuance in unstructured job descriptions, so unknown fields stay visible as editable confirmations while treating all input text as untrusted.',
      link: 'https://github.com/Mariakevin/JobMatchAI/blob/main/docs/design-research.md'
    },
    {
      id: 'native-consistency',
      index: 'Question C',
      project: 'LedgePill',
      projectId: 'ledgepill',
      status: 'Open inquiry',
      question: 'What is the smallest shared visual grammar across genuinely separate native toolkits?',
      method: 'Implement one compact island interaction independently across GTK4, WPF, and Kotlin with zero shared web runtime.',
      evidence: 'The Linux GTK4 client is the flagship build; Windows and Android companions remain in beta.',
      contextNote:
        'Avoiding a shared web runtime keeps memory overhead low and system hooks native, at the cost of maintaining separate platform implementations.',
      link: 'https://github.com/Mariakevin/LedgePill'
    }
  ],

  principles: [
    {
      title: 'Make uncertainty visible',
      context: 'Applied in FundusNet',
      points: [
        'Pair screening predictions with uncertainty signals and Grad-CAM heatmaps that reviewers can inspect.',
        'State clearly that research prototypes are not clinically validated medical devices.'
      ]
    },
    {
      title: 'Keep decisions explainable',
      context: 'Applied in JobMatch AI',
      points: [
        'Separate hard eligibility rules from preference scoring and quote warning sources verbatim.',
        'Show missing or conflicting facts openly instead of burying them inside an opaque percentage.'
      ]
    },
    {
      title: 'Respect system boundaries',
      context: 'Applied in LedgePill and FinAI',
      points: [
        'Use native toolkits such as GTK4, WPF, and Kotlin when tight OS event integration matters.',
        'Isolate external model calls behind server-side edge functions rather than exposing keys or prompts in client code.'
      ]
    }
  ]
};
