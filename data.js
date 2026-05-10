// data.js
// This file acts as the simple table structure for the game's logic and rules.
// You can easily update these values without touching the core game code.

const ARCHETYPES = {
    TACTIC: { id: "TACTIC", label: "🎯 TACTIC", description: "What worked, specific actions taken" },
    ANTI_TACTIC: { id: "ANTI_TACTIC", label: "⚠️ ANTI-TACTIC", description: "What failed, what to avoid" },
    WAR_STORY: { id: "WAR_STORY", label: "📖 WAR STORY", description: "Anecdotes, lived experience" },
    FRAMEWORK: { id: "FRAMEWORK", label: "🧠 FRAMEWORK", description: "Mental models, structured thinking" },
    HOT_TAKE: { id: "HOT_TAKE", label: "🔥 HOT TAKE", description: "Contrarian or provocative opinions" },
    PREDICTION: { id: "PREDICTION", label: "🔮 PREDICTION", description: "Future-oriented claims" }
};

const DIMENSIONS = {
    DOER: {
        id: "DOER",
        label: "DOER",
        tagline: "Gets it shipped.",
        archetypes: [ARCHETYPES.TACTIC.id, ARCHETYPES.ANTI_TACTIC.id],
        colorClass: "dim-doer"
    },
    THINKER: {
        id: "THINKER",
        label: "THINKER",
        tagline: "Sees the system.",
        archetypes: [ARCHETYPES.FRAMEWORK.id, ARCHETYPES.PREDICTION.id],
        colorClass: "dim-thinker"
    },
    DISRUPTOR: {
        id: "DISRUPTOR",
        label: "DISRUPTOR",
        tagline: "Breaks the rules.",
        archetypes: [ARCHETYPES.HOT_TAKE.id, ARCHETYPES.WAR_STORY.id],
        colorClass: "dim-disruptor"
    }
};

const CHARACTERS = [
    {
        code: "PRG",
        name: "THE PRAGMATIST",
        dom: "DOER",
        sec: "THINKER",
        flavor: "Veteran swordsman",
        tagline: "Ship first. Frame later.",
        lore: "You rely on what works in practice over what sounds good in theory. To you, execution is the ultimate framework."
    },
    {
        code: "VET",
        name: "THE VETERAN",
        dom: "DOER",
        sec: "DISRUPTOR",
        flavor: "Battle-worn ronin",
        tagline: "Scars > theory.",
        lore: "You've seen what breaks when rules are strictly followed. You'd rather bypass the system and ship it your way."
    },
    {
        code: "ARC",
        name: "THE ARCHITECT",
        dom: "THINKER",
        sec: "DOER",
        flavor: "Sage strategist",
        tagline: "Designs the system, then builds it.",
        lore: "You visualize the entire machine before assembling a single gear. Your execution is flawless because it was planned."
    },
    {
        code: "HRT",
        name: "THE HERETIC",
        dom: "THINKER",
        sec: "DISRUPTOR",
        flavor: "Rogue mage",
        tagline: "Rejects the playbook. Loves the meta.",
        lore: "Mental models over recipes. You'd rather be wrong in an interesting way than right in a boring one."
    },
    {
        code: "MAV",
        name: "THE MAVERICK",
        dom: "DISRUPTOR",
        sec: "DOER",
        flavor: "Lightning brawler",
        tagline: "Breaks rules. Ships anyway.",
        lore: "You don't have time for the 'right' way. You smash through obstacles and deliver value on your own chaotic terms."
    },
    {
        code: "PRV",
        name: "THE PROVOCATEUR",
        dom: "DISRUPTOR",
        sec: "THINKER",
        flavor: "Trickster / kitsune",
        tagline: "Picks fights worth winning.",
        lore: "You love shaking up established norms. By questioning the fundamental models, you find the real truth."
    },
    {
        code: "GEN",
        name: "THE GENERALIST",
        dom: "BALANCED",
        sec: "BALANCED",
        flavor: "Adaptive protagonist",
        tagline: "Reads the room. Plays every role.",
        lore: "You adapt to whatever the situation demands. A jack of all trades, and master of precisely what is needed right now."
    }
];

// Determine character based on top two dimensions
function getCharacterMatch(dom, sec, isBalanced) {
    if (isBalanced) return CHARACTERS.find(c => c.code === "GEN");
    
    // Find exact match
    const match = CHARACTERS.find(c => c.dom === dom && c.sec === sec);
    if (match) return match;
    
    // Fallback just in case
    return CHARACTERS.find(c => c.dom === dom) || CHARACTERS[0];
}

const QUOTES = [
    {
        id: 1,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "I refuse to let colleagues talk to customers. If you're building the product, you need to be the one hearing the raw, unfiltered complaints directly.",
        guest: "Partner, Khosla Ventures",
        episode: "Hard truths about building in the AI era"
    },
    {
        id: 2,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "OKRs are actively harmful for early-stage startups. They give you the illusion of alignment while actually just slowing down your iteration cycles.",
        guest: "Founder, WP Engine",
        episode: "Jason Cohen"
    },
    {
        id: 3,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "If you need a staging environment to test UI changes, your engineering culture is broken. You should be able to ship to production with feature flags.",
        guest: "Engineer, Cursor",
        episode: "Boris Cherny"
    },
    {
        id: 4,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "Most product managers are doing project management. If you're just moving Jira tickets around and scheduling meetings, AI is going to replace you tomorrow.",
        guest: "VP Product, Meta",
        episode: "Why half of product managers are in trouble"
    },
    {
        id: 5,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "NPS is a vanity metric. If you want to know if people actually love your product, look at your month-3 cohort retention. Everything else is noise.",
        guest: "CPO, LinkedIn",
        episode: "Tomer Cohen"
    },
    {
        id: 6,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "The idea that you need a 'technical co-founder' is dead. With tools like Cursor and Claude, a designer with good taste can build an MVP faster than a mediocre engineer.",
        guest: "Vibe Coder, Lovable",
        episode: "The rise of the professional vibe coder"
    },
    {
        id: 7,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "We spend way too much time obsessing over the 'first time user experience'. If your core loop is deeply valuable, users will crawl through broken glass to use it.",
        guest: "CEO, Canva",
        episode: "Melanie Perkins"
    },
    {
        id: 8,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "Stop listening to your highly engaged users. They represent 1% of your base. If you build what they want, you'll alienate the 99% of people who just want something simple.",
        guest: "CPO, LaunchDarkly",
        episode: "Claire Vo"
    },
    {
        id: 9,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "Venture capital is a terrible fit for 99% of businesses. Bootstrapping forces you to actually solve a problem people will pay for today, not in five years.",
        guest: "Founder, WP Engine",
        episode: "Jason Cohen"
    },
    {
        id: 10,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "Remote work doesn't kill culture, bad management does. If your culture relies on ping pong tables and serendipitous watercooler chats, you never had a real culture.",
        guest: "Co-founder, Slack",
        episode: "Stewart Butterfield"
    },
    {
        id: 11,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "Most 'platform' strategies are just excuses for not having product-market fit on your core application.",
        guest: "Partner, Slow Ventures",
        episode: "Sam Lessin"
    },
    {
        id: 12,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "A/B testing early on is a trap. You don't need statistical significance, you need strong signals and high conviction.",
        guest: "CEO, Handshake",
        episode: "Garrett Lord"
    },
    {
        id: 13,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "If everyone on your team agrees on a product decision, it's probably mediocre. The best features are polarizing.",
        guest: "VP Product, Google Search",
        episode: "Robby Stein"
    },
    {
        id: 14,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "The 'build vs buy' debate is over. Buy everything that isn't your core differentiator. If you're building internal auth in 2025, you're failing.",
        guest: "CTO, Block",
        episode: "Dhanji R. Prasanna"
    },
    {
        id: 15,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "You shouldn't hire a Head of Growth until you have organic retention. Growth hacking a leaky bucket is corporate suicide.",
        guest: "Growth Leader, Duolingo",
        episode: "Albert Cheng"
    },
    {
        id: 16,
        archetype: ARCHETYPES.HOT_TAKE.id,
        text: "User research is often used as a crutch by teams who lack product intuition. Stop asking users what they want and start observing what they do.",
        guest: "Product Designer, Figma",
        episode: "Jenny Wen"
    },
    {
        id: 17,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "The real AI boom hasn't even started. We are currently in the infrastructure phase; the application layer explosion will happen over the next 36 months.",
        guest: "Co-founder, a16z",
        episode: "Marc Andreessen"
    },
    {
        id: 18,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "In 5 years, the role of 'Product Manager' as we know it will be completely absorbed by engineers with high product taste.",
        guest: "VP Product, Meta",
        episode: "Nikhyl Singhal"
    },
    {
        id: 19,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "By 2030, we will see the first billion-dollar company run by a single founder with an AI workforce.",
        guest: "CEO, Cognition",
        episode: "Scott Wu"
    },
    {
        id: 20,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "The next major consumer social network won't be based on following people, it will be based on interacting with highly personalized AI agents.",
        guest: "CEO, Snapchat",
        episode: "Evan Spiegel"
    },
    {
        id: 21,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "Enterprise software will stop looking like complex dashboards and start looking like chat interfaces where you simply tell the system what outcome you want.",
        guest: "CEO, Airtable",
        episode: "Howie Liu"
    },
    {
        id: 22,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "Coding will become a niche skill, like speaking Latin. The primary way we will program computers will be through natural language.",
        guest: "Engineer, Cursor",
        episode: "Boris Cherny"
    },
    {
        id: 23,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "Search as 10 blue links is dead. Within 24 months, every search engine will be a synthesis engine that directly answers your question.",
        guest: "CEO, Surge AI",
        episode: "Edwin Chen"
    },
    {
        id: 24,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "The 'vibe coder' won't just be a meme. It will become a recognized senior IC track at major tech companies within two years.",
        guest: "Vibe Coder, Lovable",
        episode: "Lazar Jovanovic"
    },
    {
        id: 25,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "We will see a massive bifurcation: software that is infinitely cheap and generated by AI, and software that is extremely expensive because it guarantees human craft.",
        guest: "CPO, LinkedIn",
        episode: "Tomer Cohen"
    },
    {
        id: 26,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "Open source models will eventually commoditize the base layer of AI, shifting all the value capture to proprietary data and distribution.",
        guest: "Co-director, Stanford AI Lab",
        episode: "Dr. Fei Fei Li"
    },
    {
        id: 27,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "The barrier to entry for SaaS is going to zero, which means go-to-market and brand will become the only defensible moats.",
        guest: "Founder, SaaStr",
        episode: "Jason M Lemkin"
    },
    {
        id: 28,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "We'll stop calling them 'apps'. They will become fluid, ephemeral interfaces that generate themselves on the fly based on what you're trying to do.",
        guest: "Product Designer, Figma",
        episode: "Jenny Wen"
    },
    {
        id: 29,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "Audio will become the primary operating system for our lives as smart glasses and ambient computing finally reach maturity.",
        guest: "Partner, Slow Ventures",
        episode: "Sam Lessin"
    },
    {
        id: 30,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "The concept of 'versions' in software (V1, V2) will disappear. Software will continuously and invisibly update itself based on user behavior.",
        guest: "COO, Vercel",
        episode: "Jeanne Grosser"
    },
    {
        id: 31,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "We are heading towards a world where B2B buyers will refuse to talk to sales reps until they've experienced the full value of the product via self-serve.",
        guest: "Co-founder, Jellyfish",
        episode: "Jen Abel"
    },
    {
        id: 32,
        archetype: ARCHETYPES.PREDICTION.id,
        text: "Every major platform will eventually introduce a 'trust score' for content to differentiate between human-created and AI-generated media.",
        guest: "VP Product, Microsoft",
        episode: "Asha Sharma"
    },
    {
        id: 33,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "Think of the maximum number of customers you can ever reach as a simple equation: new customers per month divided by your churn rate.",
        guest: "Founder, WP Engine",
        episode: "Jason Cohen"
    },
    {
        id: 34,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "The 'Jobs to be Done' framework isn't just for features. Apply it to your team: what is the specific 'job' you are hiring this new engineer to do?",
        guest: "COO, Rippling",
        episode: "Matt MacInnis"
    },
    {
        id: 35,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "Think of your roadmap as a portfolio of bets. You need 70% safe incremental bets, 20% high-risk high-reward, and 10% crazy moonshots to survive.",
        guest: "Head of Product, Claude",
        episode: "Cat Wu"
    },
    {
        id: 36,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "There are two types of decisions: one-way doors and two-way doors. Most decisions are two-way doors. Make those rapidly. Save your agonizing for the one-way doors.",
        guest: "Founder, Glue Club",
        episode: "Molly Graham"
    },
    {
        id: 37,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "Treat your attention like a venture capital fund. You only have a limited amount of focus tokens; don't invest them in low-yield arguments or trivial UI tweaks.",
        guest: "Partner, Khosla Ventures",
        episode: "Keith Rabois"
    },
    {
        id: 38,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "The 'Trust Battery'. Every interaction you have with a colleague either charges or depletes the battery. You can't ask for a massive favor if the battery is at 10%.",
        guest: "CEO, Handshake",
        episode: "Garrett Lord"
    },
    {
        id: 39,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "Instead of thinking about B2B vs B2C, think about 'high friction' vs 'low friction' go-to-market. That dictates your entire company structure.",
        guest: "Founder, SaaStr",
        episode: "Jason M Lemkin"
    },
    {
        id: 40,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "The Eisenhower Matrix for product bugs: If it's urgent and important, fix it now. If it's important but not urgent, schedule it. If it's neither, delete the ticket.",
        guest: "VP Product, Webflow",
        episode: "Jessica Fain"
    },
    {
        id: 41,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "Think of pricing not as a number, but as a positioning tool. Are you the premium, safe choice, or the accessible, disruptive choice?",
        guest: "Co-founder, Jellyfish",
        episode: "Jen Abel"
    },
    {
        id: 42,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "The concept of 'Tech Debt' is a bad analogy. Think of it as an 'Unhedged Call Option'—you're borrowing time from the future, and the interest rate is unpredictable.",
        guest: "Researcher, DORA",
        episode: "Nicole Forsgren"
    },
    {
        id: 43,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "View user onboarding as a video game tutorial. You don't show the final boss immediately; you teach them how to jump, give them a reward, and then teach them how to shoot.",
        guest: "CEO, Canva",
        episode: "Melanie Perkins"
    },
    {
        id: 44,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "The 'Flywheel Effect'. Every part of your business should feed the next. If your marketing doesn't make your product better, and your product doesn't drive sales, you don't have a flywheel.",
        guest: "Co-founder, HubSpot",
        episode: "Brian Halligan"
    },
    {
        id: 45,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "Apply the 'Law of Conservation of Complexity'. Every application has an inherent amount of complexity. The only question is: who deals with it, the user or the developer?",
        guest: "Open Source Creator, Independent",
        episode: "Simon Willison"
    },
    {
        id: 46,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "Think of management as a gardening task, not architecture. You can't force a plant to grow; you can only provide the right soil, water, and sunlight.",
        guest: "Founder, Good Inside",
        episode: "Dr. Becky Kennedy"
    },
    {
        id: 47,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "The 'OODA Loop' (Observe, Orient, Decide, Act). The startup that completes this loop the fastest is the one that wins the market, period.",
        guest: "CEO, Intercom",
        episode: "Eoghan McCabe"
    },
    {
        id: 48,
        archetype: ARCHETYPES.FRAMEWORK.id,
        text: "Think of your brand as a person. If your company walked into a party, how would they speak? How would they dress? That consistency builds trust.",
        guest: "EVP, Cisco",
        episode: "Jeetu Patel"
    },
    {
        id: 49,
        archetype: ARCHETYPES.TACTIC.id,
        text: "Do 20 references per senior hire. Don't stop at the list they give you. Find mutual connections and stop only when you hit a negative pattern.",
        guest: "Partner, Khosla Ventures",
        episode: "Keith Rabois"
    },
    {
        id: 50,
        archetype: ARCHETYPES.TACTIC.id,
        text: "We switched from weekly sprints to a continuous Kanban flow, removed all estimation meetings, and saw our cycle time drop by 40% in a single month.",
        guest: "VP Product, Webflow",
        episode: "Jessica Fain"
    },
    {
        id: 51,
        archetype: ARCHETYPES.TACTIC.id,
        text: "Send a personalized, 30-second Loom video to every user who churns asking why. It wins back about 15% and gives you the most honest feedback you'll ever get.",
        guest: "CEO, Gamma",
        episode: "Grant Lee"
    },
    {
        id: 52,
        archetype: ARCHETYPES.TACTIC.id,
        text: "When reviewing a PRD, ban the phrase 'I think'. Force the team to replace it with 'Data shows' or 'User X stated'. It instantly elevates the quality of the debate.",
        guest: "Product Lead, Anthropic",
        episode: "Amol Avasare"
    },
    {
        id: 53,
        archetype: ARCHETYPES.TACTIC.id,
        text: "For onboarding, strip out every optional step. Defer account creation, email verification, and profile setup until after they experience the core 'Aha!' moment.",
        guest: "Growth Leader, Duolingo",
        episode: "Albert Cheng"
    },
    {
        id: 54,
        archetype: ARCHETYPES.TACTIC.id,
        text: "Implement a 'Fix-it Friday'. Every other Friday, no feature work is allowed. Engineers only squash bugs, improve tooling, or write documentation.",
        guest: "VP Engineering, Stripe",
        episode: "Sherwin Wu V2"
    },
    {
        id: 55,
        archetype: ARCHETYPES.TACTIC.id,
        text: "When running an A/B test, intentionally make the 'B' variant dramatically different, even ugly. Subtle button color changes won't give you signal; radical layout shifts will.",
        guest: "CPO, Tinder",
        episode: "Ravi Mehta"
    },
    {
        id: 56,
        archetype: ARCHETYPES.TACTIC.id,
        text: "Write the press release before you write a single line of code. If the press release doesn't sound incredibly exciting, don't build the product.",
        guest: "CEO, Airtable",
        episode: "Howie Liu"
    },
    {
        id: 57,
        archetype: ARCHETYPES.TACTIC.id,
        text: "When a customer asks for a feature, ask 'Why?' five times. By the fifth 'why', you'll realize they don't actually want a dashboard, they just want a weekly email summary.",
        guest: "Product Designer, Figma",
        episode: "Jenny Wen"
    },
    {
        id: 58,
        archetype: ARCHETYPES.TACTIC.id,
        text: "Force every new hire, regardless of role, to do 2 hours of customer support in their first week. It builds deep empathy for the user's pain instantly.",
        guest: "CEO, Intercom",
        episode: "Eoghan McCabe"
    },
    {
        id: 59,
        archetype: ARCHETYPES.TACTIC.id,
        text: "Use an LLM to generate 50 variations of your landing page headline, then run them through a cheap user-testing platform to find the winner before you launch.",
        guest: "CEO, Graphite",
        episode: "Ethan Smith"
    },
    {
        id: 60,
        archetype: ARCHETYPES.TACTIC.id,
        text: "To reduce meeting fatigue, implement a 'No Meeting Wednesday' policy. Enforce it strictly. Any meeting scheduled on Wednesday gets automatically deleted by a script.",
        guest: "Founder, Glue Club",
        episode: "Molly Graham"
    },
    {
        id: 61,
        archetype: ARCHETYPES.TACTIC.id,
        text: "When negotiating enterprise deals, never offer a discount without removing a feature or lowering the SLA. Always make it a trade, never a concession.",
        guest: "Co-founder, Jellyfish",
        episode: "Jen Abel"
    },
    {
        id: 62,
        archetype: ARCHETYPES.TACTIC.id,
        text: "Set up a Slack channel that pipes in every single churn cancellation reason in real-time. Make the entire executive team read it daily.",
        guest: "Founder, SaaStr",
        episode: "Jason M Lemkin"
    },
    {
        id: 63,
        archetype: ARCHETYPES.TACTIC.id,
        text: "Before launching a complex feature, build a 'painted door' test—just a button that says 'Coming Soon' to measure actual intent before committing engineering resources.",
        guest: "VP Product, Microsoft",
        episode: "Asha Sharma"
    },
    {
        id: 64,
        archetype: ARCHETYPES.TACTIC.id,
        text: "End every 1-on-1 meeting by asking: 'What is one thing I could do differently to make your job easier next week?'",
        guest: "Co-founder, HubSpot",
        episode: "Brian Halligan"
    },
    {
        id: 65,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Adding marketing spend when churn is your real bottleneck is treating the symptom. You're just paying to fill a leaky bucket faster.",
        guest: "Founder, WP Engine",
        episode: "Jason Cohen"
    },
    {
        id: 66,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Do not build a 'platform' before you have three actual customers begging for it. We burned millions trying to build an ecosystem before we had an app.",
        guest: "CEO, Snapchat",
        episode: "Evan Spiegel"
    },
    {
        id: 67,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Never tie your pricing model directly to API calls unless your value scales linearly with API calls. It creates friction and punishes users for using your product more.",
        guest: "CTO, Block",
        episode: "Dhanji R. Prasanna"
    },
    {
        id: 68,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "A classic failure mode is confusing activity with progress. Shipping 10 features a month doesn't matter if none of them move your core retention metric.",
        guest: "VP Product, Meta",
        episode: "Nikhyl Singhal"
    },
    {
        id: 69,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Don't outsource your core competency. If you're an AI company, you cannot outsource the evaluation of your models to a third party. You will lose your taste.",
        guest: "CEO, Scale AI",
        episode: "Jason Droege"
    },
    {
        id: 70,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Avoid 'design by committee'. When you try to incorporate everyone's feedback into a UI, you end up with a bloated, confusing mess that pleases nobody.",
        guest: "Product Designer, Figma",
        episode: "Jenny Wen"
    },
    {
        id: 71,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Never assume your users think like you do. As a builder, you understand the system perfectly. The user is confused, tired, and distracted. Design for them.",
        guest: "CPO, LinkedIn",
        episode: "Tomer Cohen"
    },
    {
        id: 72,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Don't fall into the trap of 'fake agile'. If you're doing two-week sprints but still writing 50-page requirement docs up front, you're just doing waterfall with more meetings.",
        guest: "Researcher, DORA",
        episode: "Nicole Forsgren"
    },
    {
        id: 73,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "The worst mistake you can make in B2B is building exactly what the loudest customer asks for. You'll end up building a custom tool for them, not a scalable product for the market.",
        guest: "Founder, SaaStr",
        episode: "Jason M Lemkin"
    },
    {
        id: 74,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Avoid using percentages to describe small numbers. Saying 'we grew 100%' means nothing if you went from 1 to 2 users. It's intellectually dishonest.",
        guest: "CEO, Surge AI",
        episode: "Edwin Chen"
    },
    {
        id: 75,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Don't hire senior leaders from massive tech companies to run your seed-stage startup. They are used to managing managers, not building from scratch.",
        guest: "Co-founder, a16z",
        episode: "Ben Horowitz"
    },
    {
        id: 76,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Never launch a product on a Friday. If something breaks, you're ruining your team's weekend and providing terrible support to your new users.",
        guest: "VP Engineering, Stripe",
        episode: "Sherwin Wu V2"
    },
    {
        id: 77,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Stop using 'we'll fix it post-launch' as an excuse for shipping broken core flows. First impressions matter. They won't come back to see if you fixed it.",
        guest: "COO, Vercel",
        episode: "Jeanne Grosser"
    },
    {
        id: 78,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Don't ignore technical debt until the system grinds to a halt. It's like ignoring a cavity until you need a root canal. Pay it down iteratively.",
        guest: "CTO, Block",
        episode: "Dhanji R. Prasanna"
    },
    {
        id: 79,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "Avoid the 'hero culture' where one engineer works 80 hours to save a release. It masks systemic failures in your planning and burns out your best people.",
        guest: "Founder, Glue Club",
        episode: "Molly Graham"
    },
    {
        id: 80,
        archetype: ARCHETYPES.ANTI_TACTIC.id,
        text: "When communicating an outage, never lie or downplay the impact. Users can handle downtime; they cannot handle being lied to about their data.",
        guest: "CIO, Enterprise Healthcare",
        episode: "Rachel Lockett"
    },
    {
        id: 81,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "I remember being told point-blank by my manager that I wouldn't be promoted until I proved I could generate 1+1=3 leverage. I was furious, but it completely changed how I led teams.",
        guest: "Partner, Khosla Ventures",
        episode: "Keith Rabois"
    },
    {
        id: 82,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "It was 2am on launch day, our primary database went down completely, and the CEO just quietly walked in and started ordering pizzas. That calm under pressure is when I knew we'd survive.",
        guest: "Founder, Cursor",
        episode: "Alexander Embiricos"
    },
    {
        id: 83,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "We launched our biggest feature of the year, expecting massive applause. Absolute crickets. Two weeks later, we just changed the copy on the button from 'Submit' to 'Unlock', and revenue doubled overnight.",
        guest: "VP Product, Webflow",
        episode: "Jessica Fain"
    },
    {
        id: 84,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "Our biggest competitor raised $100M, so we panicked for a week. Then we decided to do the exact opposite: we went aggressively profitable and ignored them. They died 2 years later.",
        guest: "Founder, WP Engine",
        episode: "Jason Cohen"
    },
    {
        id: 85,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "I spent six months fighting for a massive redesign because I thought our UI looked outdated. We shipped it, and our conversion rate tanked 30%. I learned the hard way that users value familiarity over aesthetics.",
        guest: "CPO, LaunchDarkly",
        episode: "Claire Vo"
    },
    {
        id: 86,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "When we first pitched the idea, 40 different VCs told us it was the dumbest idea they'd ever heard. They said the market was too crowded. We ignored them, and hit $100M ARR three years later.",
        guest: "CEO, Gamma",
        episode: "Grant Lee"
    },
    {
        id: 87,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "I was presenting our Q3 numbers to the board, and I tried to hide a massive churn spike behind some blended metrics. A board member caught it instantly. It was the most embarrassing moment of my career, and cured me of vanity metrics forever.",
        guest: "COO, Rippling",
        episode: "Matt MacInnis"
    },
    {
        id: 88,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "We had an engineer who was brilliant but toxic. I avoided firing him because we needed his code. When I finally let him go, the team's velocity actually doubled. I'll never tolerate brilliant jerks again.",
        guest: "Co-founder, Slack",
        episode: "Stewart Butterfield"
    },
    {
        id: 89,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "In the early days of Canva, I literally lived on a mattress in my co-founder's living room. We were rejected by over 100 investors. We just kept refining the pitch deck until someone finally said yes.",
        guest: "CEO, Canva",
        episode: "Melanie Perkins"
    },
    {
        id: 90,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "I remember staring at the server logs during a massive traffic spike. We were throwing hardware at it, but it wasn't holding. An intern suggested adding a simple caching layer, and the load dropped by 90% in ten minutes.",
        guest: "Open Source Creator, Independent",
        episode: "Simon Willison"
    },
    {
        id: 91,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "We built a complex AI recommendation engine that took 8 months. Before we rolled it out, a PM tested a simple chronological feed as a baseline. The chronological feed outperformed the AI by 20%.",
        guest: "CPO, Tinder",
        episode: "Ravi Mehta"
    },
    {
        id: 92,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "I had a customer literally yelling at me on the phone because a bug deleted their entire day's work. Instead of defending the product, I just listened and apologized. They are still our largest customer 5 years later.",
        guest: "CEO, Intercom",
        episode: "Eoghan McCabe"
    },
    {
        id: 93,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "When I was a junior PM, I approved a feature release without checking the mobile view. It completely broke the app for 60% of our users. I had to write the post-mortem, and I still use that document to train new hires.",
        guest: "Product Manager, Meta",
        episode: "Zevi Arnovitz"
    },
    {
        id: 94,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "We tried to expand into Europe way too early. We hired a massive sales team in London before we even understood the regulatory differences. We had to lay everyone off six months later. It was a brutal lesson in focus.",
        guest: "Co-founder, HubSpot",
        episode: "Brian Halligan"
    },
    {
        id: 95,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "I once accidentally dropped the production database on a Friday afternoon. My heart stopped. Thankfully, our lead engineer had secretly set up automated point-in-time backups the week before. He saved the company.",
        guest: "Vibe Coder, Lovable",
        episode: "Lazar Jovanovic"
    },
    {
        id: 96,
        archetype: ARCHETYPES.WAR_STORY.id,
        text: "We spent millions on a Super Bowl ad to drive top-of-funnel awareness. It drove massive traffic, but our servers crashed, and the users who did get through churned immediately. Worst ROI of my life.",
        guest: "Growth Leader, Duolingo",
        episode: "Albert Cheng"
    }
];

const PODCASTS = [
    {
        title: "Snapchat CEO: Why distribution has become the most important moat",
        guest: "Evan Spiegel",
        url: "https://www.youtube.com/@lennyspodcast/videos"
    },
    {
        title: "How Anthropic’s product team moves faster than anyone else",
        guest: "Cat Wu",
        url: "https://www.youtube.com/@lennyspodcast/videos"
    },
    {
        title: "Why half of product managers are in trouble",
        guest: "Nikhyl Singhal",
        url: "https://www.youtube.com/@lennyspodcast/videos"
    },
    {
        title: "Hard truths about building in the AI era",
        guest: "Keith Rabois",
        url: "https://www.youtube.com/@lennyspodcast/videos"
    },
    {
        title: "The rise of the professional vibe coder",
        guest: "Lazar Jovanovic",
        url: "https://www.youtube.com/watch?v=0XNkUdzxiZI"
    }
];

// Make variables available globally for vanilla JS
window.Config = {
    ARCHETYPES,
    DIMENSIONS,
    CHARACTERS,
    getCharacterMatch,
    QUOTES,
    PODCASTS
};
