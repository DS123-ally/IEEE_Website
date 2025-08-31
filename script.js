// Utility: debounce
function debounce(fn, delay) {
    let timerId;
    return function() {
        const ctx = this,
            args = arguments;
        clearTimeout(timerId);
        timerId = setTimeout(function() { fn.apply(ctx, args) }, delay)
    }
}

// Data and State
const GROUP_ORDER = [
    'chairperson',
    'vice_chair',
    'joint_secretary',
    'extra_curricular_secretary',
    'treasurer',
    'technical_secretary',
    'technical_heads',
    'content_heads',
    'external_relations_heads',
    'event_management_heads',
    'media_heads'
];

const GROUP_LABELS = {
    chairperson: 'Chairperson',
    vice_chair: 'Vice-Chair',
    joint_secretary: 'Joint Secretary',
    extra_curricular_secretary: 'Extra Curricular Secretary',
    treasurer: 'Treasurer',
    technical_secretary: 'Technical Secretary',
    technical_heads: 'Technical Heads',
    content_heads: 'Content Heads',
    external_relations_heads: 'External Relations Heads',
    event_management_heads: 'Event Management Heads',
    media_heads: 'Media Heads'
};

// Put your real members here
const MEMBERS = [
    { name: 'Arya Nirahi', role: 'Chairperson', group: 'chairperson', img: 'Chair copy.jpeg', tags: ['leadership', 'management', 'ieee'], bio: 'Leads strategy and cross-committee coordination.', links: { email: 'alex.johnson@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Mrunal Thakre', role: 'Vice-Chair', group: 'vice_chair', img: 'Vice-chair.jpeg', tags: ['leadership', 'hardware', 'research'], bio: 'Supports operations and hardware outreach.', links: { email: 'priya.sharma@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Rahul Gunjkar', role: 'Joint Secretary', group: 'joint_secretary', img: 'Joint-secretary.jpeg', tags: ['operations', 'documentation', 'coordination'], bio: 'Maintains records, schedules, and communications.', links: { email: 'omar.hassan@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Vaibhav Gawali', role: 'Extra Curricular Secretary', group: 'extra_curricular_secretary', img: 'Extra ciricular Secreatry.jpeg', tags: ['content', 'writing'], bio: 'Leads content strategy.', links: { email: 'sara.ahmed@example.com' } },
    { name: 'Aditya Satav', role: 'Treasurer', group: 'treasurer', img: 'Treasurer .jpg', tags: ['finance', 'budgeting', 'compliance'], bio: 'Oversees budgets and sponsorships.', links: { email: 'sofia.martinez@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Sharvil Nikam', role: 'Technical Secretary', group: 'technical_secretary', img: 'Technical Secreatary.jpeg ', tags: ['software', 'web', 'cloud'], bio: 'Coordinates web and software initiatives.', links: { email: 'mei.lin@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Mukti Pawar', role: 'Event Management Head', group: 'event_management_heads', img: 'Event Management Head.jpeg', tags: ['events', 'logistics', 'partnerships'], bio: 'Plans workshops and flagship events.', links: { email: 'daniel.kim@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Arjun Malwankar', role: 'Hospitality Head', group: 'event_management_heads', img: 'Hospitality.jpeg', tags: ['events', 'logistics', 'partnerships'], bio: 'Manages hospitality during events.', links: { email: 'daniel.kim@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Siddesh Shah', role: 'Media Head', group: 'media_heads', img: 'Media Head.jpeg', tags: ['communications', 'design', 'social'], bio: 'Crafts our voice and visual identity.', links: { email: 'aisha.noor@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Om Dhumal', role: 'Media Head (Photo Team)', group: 'media_heads', img: '', tags: ['communications', 'design', 'social'], bio: 'Leads photo team.', links: { email: 'aisha.noor@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Pranav Tathod', role: 'Media Head (Video Team)', group: 'media_heads', img: '', tags: ['communications', 'design', 'social'], bio: 'Leads video team.', links: { email: 'aisha.noor@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Yashovardhan Phadtare', role: 'Technical Head', group: 'technical_heads', img: 'Technical head.jpeg', tags: ['iot', 'ml'], bio: 'Focus on ML and IoT.', links: { email: 'ravi.patel@example.com' } },
    { name: 'Dinesh Seervi', role: 'Web Team Head', group: 'technical_heads', img: 'Web Team .jpeg', tags: ['web', 'frontend', 'ui/ux'], bio: 'Leads web development and UI/UX initiatives.', links: { email: 'priya.sharma@example.com', linkedin: 'https://www.linkedin.com' } },
    { name: 'Rashmi Kale', role: 'Content Head', group: 'content_heads', img: 'Content head.jpeg', tags: ['writing'], bio: 'Leads content strategy.', links: { email: 'sara.ahmed@example.com' } },
    { name: 'Arjun Malwankar', role: 'External Relations Head', group: 'external_relations_heads', img: '', tags: ['events', 'relations', 'sponsorships'], bio: 'Builds partnerships and manages external relations.', links: { email: 'daniel.kim@example.com', linkedin: 'https://www.linkedin.com' } }
];

const state = { query: "", group: "featured" };

// Elements
const searchInput = document.getElementById("member-search");
const clearBtn = document.getElementById("clear-search");
const chipButtons = Array.from(document.querySelectorAll('.chip'));
const root = document.getElementById('members-root');
const resultsEl = document.querySelector('.results-count');
const revealEls = Array.from(document.querySelectorAll('.reveal'));
const countdownEl = document.getElementById('countdown');
const carouselTrack = document.getElementById('carousel-track');
const themeToggle = document.getElementById('theme-toggle');

// Render helpers
function createEl(tag, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
}

function renderCard(member) {
    const card = createEl('article', 'card');
    card.setAttribute('tabindex', '0');
    const media = createEl('div', 'card-media');
    const img = new Image();
    img.src = member.img || 'default-profile.png';
    img.alt = 'Portrait of ' + member.name;
    media.appendChild(img);
    const body = createEl('div', 'card-body');
    const h3 = createEl('h3', 'card-title');
    h3.textContent = member.name;
    const sub = createEl('p', 'card-subtitle');
    sub.textContent = member.role;
    const p = createEl('p', 'card-text');
    p.textContent = member.bio || '';
    body.append(h3, sub, p);
    const footer = createEl('div', 'card-footer');
    if (member.links && member.links.email) {
        const a = document.createElement('a');
        a.href = 'mailto:' + member.links.email;
        a.textContent = 'Email';
        a.className = 'chip-link';
        footer.appendChild(a);
    }
    if (member.links && member.links.linkedin) {
        const a = document.createElement('a');
        a.href = member.links.linkedin;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'LinkedIn';
        a.className = 'chip-link';
        footer.appendChild(a);
    }
    card.append(media, body, footer);
    return card;
}

function matchesMember(member) {
    let groupOk = false;
    if (state.group === 'featured') {
        groupOk = (member.group === 'chairperson' || member.group === 'vice_chair');
    } else {
        groupOk = state.group === 'all' || member.group === state.group;
    }
    // allow search to override group filter
    if (state.query) groupOk = true;

    const hay = (member.name + ' ' + member.role + ' ' + (member.tags || []).join(' ')).toLowerCase();
    const textOk = state.query === '' || hay.indexOf(state.query) >= 0;
    return groupOk && textOk;
}

function render() {
    if (!root) return;
    root.innerHTML = '';
    let total = 0;
    document.body.classList.toggle('view-all', state.group === 'all');

    if (state.group === 'all') {
        const allMembers = MEMBERS.filter(m => matchesMember(m));
        total = allMembers.length;
        if (allMembers.length > 0) {
            const groupEl = createEl('section', 'group');
            const header = createEl('div', 'group-header');
            const title = createEl('h3', 'group-title');
            title.textContent = 'All Members';
            header.appendChild(title);
            const grid = createEl('div', 'group-grid');
            allMembers.forEach(m => grid.appendChild(renderCard(m)));
            groupEl.append(header, grid);
            root.appendChild(groupEl);
        }
    } else {
        GROUP_ORDER.forEach(function(groupKey) {
            const members = MEMBERS.filter(m => m.group === groupKey && matchesMember(m));
            total += members.length;
            if (members.length === 0) return;
            const groupEl = createEl('section', 'group');
            const header = createEl('div', 'group-header');
            const title = createEl('h3', 'group-title');
            title.textContent = GROUP_LABELS[groupKey] || groupKey;
            header.appendChild(title);
            const grid = createEl('div', 'group-grid');
            members.forEach(m => grid.appendChild(renderCard(m)));
            groupEl.append(header, grid);
            root.appendChild(groupEl);
        });
    }
    if (resultsEl) resultsEl.textContent = total + " member" + (total === 1 ? "" : "s");
}

const onSearch = debounce(function(ev) {
    state.query = (ev.target.value || '').trim().toLowerCase();
    render();
}, 120);

function onChipClick(ev) {
    const el = ev.currentTarget;
    const group = el.getAttribute('data-filter');
    state.group = group || 'all';
    chipButtons.forEach(function(btn) {
        const active = btn === el;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    render();
}

function clearSearch() {
    if (!searchInput) return;
    searchInput.value = '';
    state.query = '';
    render();
    searchInput.focus();
}

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Footer year
function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
}

// Scroll reveal
function setupReveal() {
    if (!('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-visible'));
        return;
    }
    const io = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
}

// Counters
function animateCounters() {
    const nums = Array.from(document.querySelectorAll('.stat .num'));
    nums.forEach(function(el) {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const tick = function() {
            current += step;
            if (current >= target) { el.textContent = String(target); return; }
            el.textContent = String(current);
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

// Countdown
function startCountdown() {
    if (!countdownEl) return;
    const targetDate = new Date("2025-12-31T23:59:59").getTime();

    function tick() {
        const now = Date.now();
        const diff = targetDate - now;
        if (diff <= 0) {
            countdownEl.textContent = "Event Started!";
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        countdownEl.textContent = `${days}d ${hrs}h ${mins}m ${secs}s`;
        requestAnimationFrame(tick);
    }
    tick();
}

// Simple carousel
function setupCarousel() {
    if (!carouselTrack) return;
    let index = 0;
    const slides = Array.from(carouselTrack.children);

    function showSlide(i) {
        slides.forEach((s, idx) => {
            s.style.transform = `translateX(${100 * (idx - i)}%)`;
        });
    }
    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 4000);
    showSlide(index);
}

// Init
function init() {
    if (searchInput) searchInput.addEventListener('input', onSearch);
    if (clearBtn) clearBtn.addEventListener('click', clearSearch);
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    chipButtons.forEach(btn => btn.addEventListener('click', onChipClick));
    initializeTheme();
    setYear();
    render();
    setupReveal();
    animateCounters();
    startCountdown();
    setupCarousel();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}