// app.js

const ACTION_ICONS = {
    'HOT_TAKE': { reject: '🧢', love: '🔥', reject_label: 'Bullshit', love_label: 'Agree' },
    'PREDICTION': { reject: '🛑', love: '🔮', reject_label: 'Doubt', love_label: 'Believe' },
    'FRAMEWORK': { reject: '🗑️', love: '🧠', reject_label: 'Pass', love_label: 'Genius' },
    'TACTIC': { reject: '👎', love: '🎯', reject_label: 'Pass', love_label: 'Will Use' },
    'ANTI_TACTIC': { reject: '🤷', love: '⚠️', reject_label: 'Pass', love_label: 'Warning' },
    'WAR_STORY': { reject: '🥱', love: '🍿', reject_label: 'Boring', love_label: 'Epic' }
};

document.addEventListener("DOMContentLoaded", () => {
    // --- State ---
    let quotesToPlay = [];
    let currentIndex = 0;
    let currentCardPage = 0;
    
    // Track scores for archetypes
    let archScores = {
        TACTIC: 0, ANTI_TACTIC: 0, 
        WAR_STORY: 0, FRAMEWORK: 0, 
        HOT_TAKE: 0, PREDICTION: 0
    };
    
    let totalSwipesCount = {
        love: 0, reject: 0
    };
    let isAnimating = false;

    // --- DOM Elements ---
    const screens = {
        intro: document.getElementById('screen-intro'),
        quote: document.getElementById('screen-quote'),
        results: document.getElementById('screen-results')
    };

    const quoteCardElement = document.getElementById('quote-card-element');
    const progressFill = document.getElementById('progress-fill');
    
    // Quote UI
    const uiQuoteText = document.getElementById('quote-text');
    const uiQuoteTag = document.getElementById('quote-archetype-label');
    const uiQuoteGuest = document.getElementById('quote-guest');
    const uiQuoteEpisode = document.getElementById('quote-episode');
    const uiQuoteCounter = document.getElementById('quote-counter');
    
    // Pages
    const pages = [
        document.getElementById('page-quote'),
        document.getElementById('page-speaker'),
        document.getElementById('page-context')
    ];

    // Init
    function initGame() {
        quotesToPlay = [...window.Config.QUOTES].sort(() => 0.5 - Math.random()).slice(0, 15);
        currentIndex = 0;
        isAnimating = false;
        Object.keys(archScores).forEach(k => archScores[k] = 0);
        totalSwipesCount = { love: 0, reject: 0 };
        
        showScreen('quote');
        loadQuote();
    }

    // --- UI Flow ---
    function showScreen(screenKey) {
        Object.values(screens).forEach(s => {
            if (s) s.classList.add('hidden');
        });
        if (screens[screenKey]) {
            screens[screenKey].classList.remove('hidden');
        }
    }

    function loadQuote() {
        if (currentIndex >= quotesToPlay.length) {
            calculateResults();
            return;
        }

        currentCardPage = 0;
        const quote = quotesToPlay[currentIndex];
        const arch = window.Config.ARCHETYPES[quote.archetype];

        uiQuoteText.textContent = `"${quote.text}"`;
        uiQuoteTag.textContent = arch ? arch.label : "QUOTE";
        uiQuoteGuest.textContent = quote.guest;
        uiQuoteEpisode.textContent = quote.episode || "Unknown Episode";
        
        // Remove previous tag classes
        uiQuoteTag.className = 'quote-tag font-mono';
        if (arch) {
            let colorId = arch.id.toLowerCase().split('_')[0]; 
            uiQuoteTag.classList.add(`tag-${colorId}`);
            
            if (ACTION_ICONS[arch.id]) {
                document.getElementById('btn-reject').textContent = ACTION_ICONS[arch.id].reject;
                document.getElementById('label-reject').textContent = ACTION_ICONS[arch.id].reject_label;
                document.getElementById('btn-love').textContent = ACTION_ICONS[arch.id].love;
                document.getElementById('label-love').textContent = ACTION_ICONS[arch.id].love_label;
            }
        }

        uiQuoteCounter.textContent = `${currentIndex + 1}/${quotesToPlay.length}`;
        progressFill.style.width = `${((currentIndex + 1) / quotesToPlay.length) * 100}%`;

        // Reset Card animation
        quoteCardElement.className = 'quote-card';
        quoteCardElement.style.transform = '';
        quoteCardElement.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';
        
        renderCardPage();
    }

    function renderCardPage() {
        // Render dots
        const indicators = document.getElementById('card-indicators').children;
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].className = i === currentCardPage ? 'indicator active' : 'indicator';
        }
        
        // Render pages
        pages.forEach((p, index) => {
            if (p) p.className = index === currentCardPage ? 'card-page' : 'card-page hidden';
        });
    }

    function handleSwipe(direction) { // 'love', 'reject'
        if (isAnimating) return;
        isAnimating = true;
        const quote = quotesToPlay[currentIndex];
        
        // Scoring: Love +2, Reject -1
        if (direction === 'love') {
            archScores[quote.archetype] += 2;
            totalSwipesCount.love++;
            quoteCardElement.classList.add('swipe-right');
        } else if (direction === 'reject') {
            archScores[quote.archetype] -= 1;
            totalSwipesCount.reject++;
            quoteCardElement.classList.add('swipe-left');
        }

        // Wait for the 400ms CSS fly-out transition to complete before loading next
        setTimeout(() => {
            nextQuote();
        }, 420);
    }

    function nextQuote() {
        isAnimating = false;
        currentIndex++;
        loadQuote();
    }

    // --- Core Logic ---
    function calculateResults() {
        // 1. Map to Dimensions
        const { DIMENSIONS, getCharacterMatch } = window.Config;
        
        let dims = { DOER: 0, THINKER: 0, DISRUPTOR: 0 };
        
        dims.DOER = archScores.TACTIC + archScores.ANTI_TACTIC;
        dims.THINKER = archScores.FRAMEWORK + archScores.PREDICTION;
        dims.DISRUPTOR = archScores.HOT_TAKE + archScores.WAR_STORY;

        // Normalize to 0-100 logic (Find max, scale proportionally, or just flat math)
        // Simple map: max possible per dim is roughly 10 (if 5 quotes of that dim, all loved)
        // Let's use a base formula: scale relative to max score.
        let maxDimVal = Math.max(dims.DOER, dims.THINKER, dims.DISRUPTOR, 1);
        
        // Convert to percentage base 50-99 for aesthetics
        const norm = (val) => Math.min(99, Math.max(10, Math.round((val / maxDimVal) * 90) + 10));
        
        const doerNorm = norm(dims.DOER);
        const thinkerNorm = norm(dims.THINKER);
        const disruptorNorm = norm(dims.DISRUPTOR);

        // Find Top 2 Dimensions
        const dimArr = [
            { id: 'DOER', val: doerNorm },
            { id: 'THINKER', val: thinkerNorm },
            { id: 'DISRUPTOR', val: disruptorNorm }
        ].sort((a, b) => b.val - a.val);

        const dom = dimArr[0].id;
        const sec = dimArr[1].id;
        const isBalanced = (dimArr[0].val - dimArr[2].val) < 15; // If all close, generalist

        const character = getCharacterMatch(dom, sec, isBalanced);

        // Power Level calculation: Decisiveness
        const decisiveness = totalSwipesCount.love + totalSwipesCount.reject;
        const powerLevel = 50 + Math.round((decisiveness / quotesToPlay.length) * 49);

        renderResults(character, dom, powerLevel, {DOER: doerNorm, THINKER: thinkerNorm, DISRUPTOR: disruptorNorm});
        showScreen('results');
    }

    function renderResults(character, dom, power, normalizedDims) {
        // UI Updates
        document.getElementById('result-name').textContent = character.name;
        document.getElementById('result-tagline').textContent = `"${character.tagline}"`;
        document.getElementById('result-lore').textContent = character.lore;
        document.getElementById('result-code-footer').textContent = character.code;
        document.getElementById('art-code').textContent = character.code;
        
        document.getElementById('val-power').textContent = power;

        // Color coding art background
        const artSlot = document.getElementById('card-art');
        artSlot.className = 'art-slot ' + window.Config.DIMENSIONS[dom].colorClass;

        // Orbs & Bars
        ['doer', 'thinker', 'disruptor'].forEach(key => {
            const val = normalizedDims[key.toUpperCase()];
            document.getElementById(`val-${key}`).textContent = val;
            document.getElementById(`bar-val-${key}`).textContent = val;
            document.getElementById(`bar-${key}`).style.width = `${val}%`;
            
            // Highlight dom
            const orb = document.getElementById(`orb-${key}`);
            const valOrb = orb.querySelector('.val');
            if (key.toUpperCase() === dom) {
                valOrb.classList.add('bg-highlight', 'border-highlight');
            } else {
                valOrb.classList.remove('bg-highlight', 'border-highlight');
            }
        });

        // 6 Archetype subscores
        const m = {
            tac: archScores.TACTIC, anti: archScores.ANTI_TACTIC,
            frm: archScores.FRAMEWORK, prd: archScores.PREDICTION,
            hot: archScores.HOT_TAKE, war: archScores.WAR_STORY
        };
        Object.keys(m).forEach(k => {
            const el = document.getElementById(`val-${k}`);
            if (el) el.textContent = Math.max(0, m[k]);
        });

        // Render Playlist
        renderPlaylist();
    }

    function renderPlaylist() {
        const container = document.getElementById('playlist-container');
        container.innerHTML = '';
        
        if (window.Config.PODCASTS && window.Config.PODCASTS.length > 0) {
            window.Config.PODCASTS.forEach(pod => {
                const a = document.createElement('a');
                a.className = 'playlist-item';
                a.href = pod.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';

                const icon = document.createElement('div');
                icon.className = 'p-icon';
                icon.textContent = '🎧';

                const details = document.createElement('div');
                details.className = 'p-details';

                const title = document.createElement('span');
                title.className = 'p-title';
                title.textContent = pod.title;

                const guest = document.createElement('span');
                guest.className = 'p-guest';
                guest.textContent = pod.guest;

                details.appendChild(title);
                details.appendChild(guest);
                a.appendChild(icon);
                a.appendChild(details);
                container.appendChild(a);
            });
        } else {
            container.innerHTML = '<p class="text-faint text-sm">No podcasts configured yet.</p>';
        }
    }

    // --- Drag/Swipe Mechanics ---
    let startX = 0, currentX = 0, startY = 0, currentY = 0;
    let isDragging = false;
    let dragDist = 0;

    quoteCardElement.addEventListener('touchstart', dragStart, {passive: true});
    quoteCardElement.addEventListener('touchmove', dragMove, {passive: true});
    quoteCardElement.addEventListener('touchend', dragEnd);

    quoteCardElement.addEventListener('mousedown', (e) => {
        dragStart(e);
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', function onUp(e) {
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', onUp);
            dragEnd(e);
        });
    });

    // Tap handling
    function handleTap(direction) {
        if (direction === 'left' && currentCardPage > 0) {
            currentCardPage--;
            renderCardPage();
        } else if (direction === 'right' && currentCardPage < 2) {
            currentCardPage++;
            renderCardPage();
        }
    }

    function dragStart(e) {
        isDragging = true;
        dragDist = 0;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        quoteCardElement.style.transition = 'none';
    }

    function dragMove(e) {
        if (!isDragging) return;
        currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        dragDist = Math.max(dragDist, Math.abs(deltaX), Math.abs(deltaY));
        
        const rotation = deltaX * 0.05;

        quoteCardElement.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        quoteCardElement.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';

        if (deltaX > 100) { handleSwipe('love'); }
        else if (deltaX < -100) { handleSwipe('reject'); }
        else {
            // Snap back
            quoteCardElement.style.transform = '';
            
            // Check for tap if drag distance was small
            if (dragDist < 10 && e) {
                // Determine left or right side of the card
                const clientX = e.type.includes('mouse') ? e.clientX : (e.changedTouches ? e.changedTouches[0].clientX : startX);
                const rect = quoteCardElement.getBoundingClientRect();
                const tapX = clientX - rect.left;
                
                if (tapX < rect.width / 2) {
                    handleTap('left');
                } else {
                    handleTap('right');
                }
            }
        }
        
        startX = 0; currentX = 0; startY = 0; currentY = 0;
    }

    // --- Event Listeners ---
    document.getElementById('btn-start').addEventListener('click', initGame);
    document.getElementById('btn-quit').addEventListener('click', () => { isAnimating = false; showScreen('intro'); });
    document.getElementById('btn-restart').addEventListener('click', () => showScreen('intro'));

    // Buttons manual trigger
    document.getElementById('btn-love').addEventListener('click', () => handleSwipe('love'));
    document.getElementById('btn-reject').addEventListener('click', () => handleSwipe('reject'));

    // Share Image
    document.getElementById('btn-share').addEventListener('click', async () => {
        const card = document.getElementById('character-card-capture');
        const originalTransform = card.style.transform;
        card.style.transform = 'none'; // reset any scaling for clean canvas
        
        try {
            const canvas = await html2canvas(card, {
                scale: 2, 
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true
            });
            
            const imageStr = canvas.toDataURL("image/png");
            
            // Trigger download
            const a = document.createElement('a');
            a.href = imageStr;
            a.download = `lenny_match_card_${Date.now()}.png`;
            a.click();
            
        } catch (error) {
            console.error("Error generating share card", error);
            alert("Could not generate image. Please try again.");
        } finally {
            card.style.transform = originalTransform;
        }
    });

});
