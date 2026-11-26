/**
 * Portfolio Content Configuration
 * ---------------------------------------------------------------------------
 * Personal profile, projects, capabilities, research inquiries, and
 * background based strictly on Maria Kevin's documented repositories and
 * public details.
 */
window.PORTFOLIO_DATA = {
  profile: {
    name: 'Maria Kevin',
    role: 'Software Developer',
    description:
      'Maria Kevin — MCA student in Chennai building applied machine learning, thoughtful products, and native systems.',
    status: 'MCA student · building applied AI and native systems',
    headlinePrefix: 'I make intelligence useful and ',
    headlineAccent: 'systems understandable.',
    subtitle:
      "I'm an MCA student in Chennai building at the intersection of machine learning, thoughtful products, and the systems that support them.",
    focus: 'MCA · SRM Valliammai Engineering College, Chennai',
    location: 'Chennai, India',
    timezone: 'Asia/Kolkata',
    cvUrl: '',
    email: 'mariakevin0504@gmail.com',
    bioTitle: 'Software that shows its work.',
    bioParagraphs: [
      'Most of my work connects machine learning, thoughtful product design, and systems engineering. I enjoy finding out what becomes possible when those layers are designed together.',
      'The projects here focus on inspectable decisions: evidence behind a match, uncertainty behind a prediction, or native software shaped by its platform.'
    ],
    socials: [
      { label: 'GitHub', url: 'https://github.com/Mariakevin' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mariakevin/' },
      { label: 'Email', url: 'mailto:mariakevin0504@gmail.com' }
    ]
  },

  education: {
    kicker: 'Academic Program',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'SRM Valliammai Engineering College · Chennai, India',
    period: '2025 – 2027',
    points: [
      'SRM Valliammai Engineering College · Chennai, India',
      'Exploring applied machine learning, explainable product workflows, and platform-native desktop software through independent repositories.',
      'Documenting system boundaries, failure handling, and open limitations alongside every build.'
    ]
  },

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
      group: 'Web products',
      items: [
        { name: 'React', projects: ['jobmatch', 'finai'] },
        { name: 'TypeScript', projects: ['jobmatch', 'finai'] },
        { name: 'Vite', projects: ['jobmatch', 'finai'] },
        { name: 'Tailwind CSS', projects: ['finai'] },
        { name: 'Supabase', projects: ['finai'] }
      ]
    },
    {
      group: 'Backend & data',
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
      group: 'Quality & delivery',
      items: [
        { name: 'Docker', projects: ['fundusnet'] },
        { name: 'GitHub Actions', projects: [], note: 'CI workflow automation practice' },
        { name: 'Ruff', projects: [], note: 'Python linting and formatting practice' },
        { name: 'pre-commit', projects: [], note: 'Automated pre-commit check practice' },
        { name: 'unittest', projects: [], note: 'Python unit testing practice' }
      ]
    }
  ],

  projects: [
    {
      id: 'fundusnet',
      title: 'FundusNet — Retinal Screening',
      category: 'Applied ML',
      status: 'Ongoing research prototype',
      statusKey: 'research',
      year: '2026',
      role: 'Research prototype · applied ML',
      researchId: 'fundus-transfer',
      summary:
        'A retinal-image screening research prototype that combines a five-model ensemble with uncertainty-aware inference and visual explanations.',
      impact:
        'Keeps uncertainty visible and uses Grad-CAM heatmaps to show image regions that influenced a prediction; uncertain cases are referred for specialist review.',
      stack: ['Python', 'PyTorch', 'Django', 'OpenCV', 'ONNX Runtime', 'Docker'],
      demoUrl: '',
      repoUrl: 'https://github.com/Mariakevin/FundusNet',
      problem:
        'A screening model should make its limits visible. FundusNet explores how to pair a retinal-image prediction with uncertainty signals and an explanation that can be reviewed.',
      architecture: [
        'Fundus Image Validation',
        'Image Quality Check',
        'Five-Model Ensemble',
        'Uncertainty-Aware Inference',
        'Grad-CAM Explanation'
      ],
      stageNotes: [
        'Rejects non-fundus uploads upfront rather than forcing unrelated images through the retinal classifier.',
        'Screens input quality before classification so degraded scans are flagged prior to prediction.',
        'Combines five distinct model architectures with test-time augmentation to observe prediction stability.',
        'Measures prediction uncertainty and routes high-uncertainty cases to specialist review instead of emitting a forced label.',
        'Generates Grad-CAM visual heatmaps highlighting image regions that contributed to the four screening classes.'
      ],
      tradeoffs: [
        'Uses multiple model architectures and test-time augmentation to explore prediction stability instead of relying on a single model output.',
        'Treats high uncertainty as a reason for specialist review rather than forcing a confident label.'
      ],
      outcomes: [
        'Produces four screening classes: healthy, cataract, glaucoma, and retinal disease.',
        'Pairs predictions with confidence information and visual heatmaps for inspection.'
      ],
      failureModes: [
        'Non-fundus uploads are rejected by image validation instead of being passed through as retinal scans.',
        'High-uncertainty predictions are withheld for specialist review rather than forced into a class.'
      ],
      limitations: [
        'This is a research prototype, not a clinically validated medical device.',
        'The documented training set is a public dataset; performance on new cameras, populations, and clinical settings still needs independent evaluation.'
      ],
      artifacts: [
        { label: 'Paper draft', url: 'https://github.com/Mariakevin/FundusNet/blob/main/docs/PAPER_DRAFT.md' },
        { label: 'Source repository', url: 'https://github.com/Mariakevin/FundusNet' }
      ]
    },
    {
      id: 'jobmatch',
      title: 'JobMatch AI — Evidence-Backed Matching',
      category: 'AI / Product',
      status: 'Ongoing prototype',
      statusKey: 'active',
      year: '2026',
      role: 'Product design & implementation',
      researchId: 'evidence-extraction',
      summary:
        'A student-side internship assistant that explains eligibility, skill evidence, practical fit, and listing warnings instead of returning an opaque match percentage.',
      impact:
        'Separates deterministic eligibility from fit scoring and preserves unknown or incomplete evidence for the student to review.',
      stack: ['Python', 'FastAPI', 'Pydantic', 'React', 'TypeScript', 'Vite'],
      demoUrl: '',
      repoUrl: 'https://github.com/Mariakevin/JobMatchAI',
      problem:
        'Students need to know whether an internship fits their circumstances and what evidence supports that conclusion, without mistaking a score for a hiring prediction.',
      architecture: [
        'Resume & Listing Extraction',
        'Deterministic Eligibility Rules',
        'Skill Evidence Audit',
        'Practical Constraints Check',
        'Explainable Results Board'
      ],
      stageNotes: [
        'Parses resume and internship listing text as untrusted input, guarding against prompt-injection attempts.',
        'Evaluates hard eligibility requirements deterministically so a high fit score never masks disqualifying criteria.',
        'Audits matched and missing skills against explicit evidence rather than collapsing everything into one opaque number.',
        'Checks practical circumstances while keeping unknown or conflicting facts visible for student confirmation.',
        'Presents inspectable, editable facts and quoted listing warnings without claiming to predict hiring selection.'
      ],
      tradeoffs: [
        'Keeps hard eligibility rules separate from the fit score, so a high score cannot override ineligibility.',
        'Labels unknown facts and incomplete scores explicitly rather than silently treating missing information as a failure.'
      ],
      outcomes: [
        'Students can inspect and correct extracted facts, compare practical constraints, and see evidence for each assessment.',
        'Listing warnings quote the text that triggered them, while the tool avoids claiming to predict selection.'
      ],
      failureModes: [
        'Resume and listing text are treated as untrusted input, including against prompt-injection attempts.',
        'Unknown or conflicting eligibility facts stay visible and lead to confirmation instead of a silent rejection.'
      ],
      limitations: [
        'It does not predict hiring outcomes, guarantee interviews, or verify an employer’s legal status.',
        'Resume and listing extraction can be incomplete or uncertain, so students need to review and correct the evidence.'
      ],
      artifacts: [
        { label: 'Design research', url: 'https://github.com/Mariakevin/JobMatchAI/blob/main/docs/design-research.md' },
        { label: 'Source repository', url: 'https://github.com/Mariakevin/JobMatchAI' }
      ]
    },
    {
      id: 'finai',
      title: 'FinAI — Personal Finance',
      category: 'Product',
      status: 'Completed prototype',
      statusKey: 'completed',
      year: '2025',
      role: 'Full-stack product',
      researchId: null,
      summary:
        'A personal-finance app for transaction tracking, budgets, dashboards, charts, and spending insights generated with Google Gemini.',
      impact:
        'Brings account activity, budget progress, and AI-generated spending insights into one finance dashboard.',
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Gemini'],
      demoUrl: '',
      repoUrl: 'https://github.com/Mariakevin/FinAI',
      problem:
        'Personal finance data can be difficult to turn into a clear view of spending and budget progress.',
      architecture: [
        'React & TypeScript Interface',
        'Transaction and Budget Views',
        'Supabase Authentication',
        'PostgreSQL Storage',
        'Gemini Insights via Edge Function'
      ],
      stageNotes: [
        'Client application built with React, TypeScript, Vite, and Tailwind CSS for responsive account navigation.',
        'Structured views and charts tracking income, expenses, budgets, and spending patterns.',
        'User authentication and session management handled through Supabase Auth.',
        'Persistent relational storage of transactions and budgets backed by PostgreSQL.',
        'Routes Google Gemini requests through a Supabase Edge Function so the browser never calls the model service directly.'
      ],
      tradeoffs: [
        'Uses Supabase for authentication and PostgreSQL-backed storage instead of maintaining a separate backend service.',
        'Routes Gemini requests through a Supabase Edge Function so the client does not call the model service directly.'
      ],
      outcomes: [
        'Provides a dashboard for income, expenses, budgets, and spending patterns.',
        'Adds AI-generated recommendations alongside the underlying financial views.'
      ],
      failureModes: [
        'Model requests are isolated behind a Supabase Edge Function rather than exposing client-side model calls.'
      ],
      limitations: [
        'AI spending insights depend on the Gemini service and the transaction data available to the app.',
        'The repository documents app features, but does not publish a measured evaluation of insight accuracy.'
      ],
      artifacts: [
        { label: 'Source repository', url: 'https://github.com/Mariakevin/FinAI' }
      ]
    },
    {
      id: 'ledgepill',
      title: 'LedgePill — Native Desktop Island',
      category: 'Native systems',
      status: 'Ongoing platform beta',
      statusKey: 'beta',
      year: '2026',
      role: 'Cross-platform native software',
      researchId: 'native-consistency',
      summary:
        'A Dynamic Island-style interface for Linux, Windows, and Android, built with native platform technologies and no web runtime.',
      impact:
        'Explores one shared visual language across GTK4, WPF, and Kotlin applications without Electron or embedded web views.',
      stack: ['Linux', 'GTK4', 'D-Bus', 'WPF / .NET', 'Kotlin'],
      demoUrl: 'https://mariakevin.github.io/LedgePill/demo.html',
      repoUrl: 'https://github.com/Mariakevin/LedgePill',
      problem:
        'A compact, animated desktop companion should respond to native media and system events while still feeling at home on each platform.',
      architecture: [
        'Linux · GTK4 & D-Bus',
        'Windows · WPF',
        'Android · Kotlin',
        'Platform-Native Events',
        'Shared Visual Language'
      ],
      stageNotes: [
        'Flagship Linux implementation using GTK4 for rendering and D-Bus for native system event hooks.',
        'Windows companion built natively in WPF / .NET without bundling an embedded browser runtime.',
        'Android companion implemented in Kotlin to explore mobile notification and media integration.',
        'Connects directly to each OS for media playback, volume, notifications, and Bluetooth state.',
        'Maintains consistent pill geometry and transition behavior across otherwise distinct native toolkits.'
      ],
      tradeoffs: [
        'Builds separate native applications for each platform rather than sharing a web-based runtime.',
        'Keeps platform integrations close to their native APIs while carrying the same visual language across them.'
      ],
      outcomes: [
        'Responds to media, volume, notifications, Bluetooth, and other system activity.',
        'Includes an interactive web demo alongside the native applications.'
      ],
      failureModes: [
        'Platform capabilities degrade per target OS rather than relying on lowest-common-denominator cross-platform wrappers.'
      ],
      limitations: [
        'Linux is the flagship implementation; the Windows and Android companions are marked beta and are less battle-tested.',
        'Features and system integrations differ by platform because each app uses native APIs.'
      ],
      artifacts: [
        { label: 'Interactive demo', url: 'https://mariakevin.github.io/LedgePill/demo.html' },
        { label: 'Source repository', url: 'https://github.com/Mariakevin/LedgePill' }
      ]
    }
  ],

  research: [
    {
      id: 'fundus-transfer',
      index: 'A',
      project: 'FundusNet',
      projectId: 'fundusnet',
      status: 'Open inquiry',
      question: 'Does ensemble uncertainty remain useful across different cameras, populations, and clinical settings?',
      method: 'Compare documented model behavior against independent, unseen retinal-image distributions.',
      evidence: 'Public training data and Grad-CAM are documented; external clinical validation is not.',
      contextNote:
        'FundusNet intentionally refers high-uncertainty scans for specialist review instead of emitting a forced class, making cross-camera calibration the primary gap before clinical relevance.',
      link: 'https://github.com/Mariakevin/FundusNet'
    },
    {
      id: 'evidence-extraction',
      index: 'B',
      project: 'JobMatch AI',
      projectId: 'jobmatch',
      status: 'Open inquiry',
      question: 'How can incomplete resume and listing evidence stay visible without degrading the decision?',
      method: 'Separate deterministic eligibility, skill evidence, and practical constraints instead of merging them into one score.',
      evidence: 'Design research and implementation details are available in the repository.',
      contextNote:
        'Because extraction can miss nuances in unstructured resumes or job posts, JobMatch AI surfaces unverified fields as editable confirmations and guards inputs against prompt injection.',
      link: 'https://github.com/Mariakevin/JobMatchAI/blob/main/docs/design-research.md'
    },
    {
      id: 'native-consistency',
      index: 'C',
      project: 'LedgePill',
      projectId: 'ledgepill',
      status: 'Open inquiry',
      question: 'What is the minimum shared design language across otherwise distinct native platforms?',
      method: 'Compare one island interaction across GTK4, WPF, and Kotlin without a shared web runtime.',
      evidence: 'The Linux implementation is the most developed; platform integrations remain uneven.',
      contextNote:
        'Sharing zero runtime code across GTK4, WPF, and Kotlin keeps footprint minimal and OS integration native, at the cost of feature parity between Linux and beta Windows/Android targets.',
      link: 'https://github.com/Mariakevin/LedgePill'
    }
  ],

  experience: [
    {
      role: 'Co-Founder',
      organization: 'Aestric',
      period: 'Jul 2026 – Present',
      bullets: [
        'Building Aestric alongside my MCA studies and independent engineering projects.'
      ]
    },
    {
      role: 'Bachelor of Computer Applications (BCA)',
      organization: 'Apollo Arts & Science College',
      period: '2022 – 2025',
      bullets: ['Undergraduate degree completed before beginning the MCA program.']
    },
    {
      role: 'Make uncertainty visible',
      organization: 'FundusNet · Applied ML',
      period: 'Principle 01',
      bullets: [
        'Pair screening predictions with uncertainty signals and Grad-CAM heatmaps that can be inspected.',
        'Treat the project honestly as a research prototype, not a validated medical device.'
      ]
    },
    {
      role: 'Make decisions explainable',
      organization: 'JobMatch AI · Student tool',
      period: 'Principle 02',
      bullets: [
        'Keep deterministic eligibility rules, skill evidence, practical constraints, and listing warnings visible to the user.',
        'Treat unknown information as unknown instead of hiding it inside a single score.'
      ]
    },
    {
      role: 'Respect platform boundaries',
      organization: 'LedgePill & FinAI · Systems & Product',
      period: 'Principle 03',
      bullets: [
        'Keep system integrations native (GTK4/D-Bus, WPF, Kotlin) when latency and OS integration matter.',
        'Isolate model API access behind edge boundaries (Supabase Edge Functions) rather than exposing direct client calls.'
      ]
    }
  ]
};
