# 🫧 BubbleUp (aka The 23:50 Epiphany)

## How Dopamine Wrote an App
It was exactly 23:50 on a Saturday night. I was sitting there, completely paralyzed and deeply overwhelmed by a mountain of tasks. Standard calendars? Utter failures. Traditional corporate task-tracking apps? Monolithic guilt engines that exist solely to make neurodivergent brains feel terrible about themselves.

So, naturally, being fundamentally addicted to dopamine and lacking any sense of self-preservation at midnight, I got up and decided this MVP had to be shipped immediately. I needed to see if a soft, safe, and protective task ecosystem could even exist.

Was there a massive amount of AI assistance involved? Absolutely. Lol. We fought layout layer wars, survived white-screen-of-death rendering crashes, and argued until 2:00 AM. But we shipped it. Welcome to BubbleUp—productivity software for people who just want a soft day.

### Live Demo
This application was built purely for my own personal use and is heavily personalized for me, my exact routine, and my specific cognitive pacing needs. While anyone is welcome to clone it, tweak it, or draw inspiration from it, its design choices, affirmations, and workflows are completely tailored to safeguard my own space.

Experience the app live in production here: **[Live App on Vercel](here)

---

## Key Core Frameworks
BubbleUp rejects the cold, industrial anxiety of traditional task trackers in favor of dopamine-balanced, protective features:

*   **Next Tiny Step Focus Card:** No terrifying laundry lists. The app locks onto one single item at a time. You don't have to look at the rest of your day until you choose to.
*   **"I Want to Do This" Countdown Engine:** We replaced the threatening "Complete this task now" prompt. Instead, tasks hold a customizable duration limit. Clicking the trigger starts a gentle, backward-counting focus clock to break executive dysfunction paralysis.
*   **The Gamified Bubble Break Intermission:** A built-in, 5-minute maximum procrastination sanctuary. Colorful pastel bubbles (Pink, Blue, Purple, Green) float serenely up the screen. The HUD instructs you which color to track and pop every 30 seconds. Popping the correct color releases a burst of matching sensory particles and cycles through one of 30 deeply comforting, neurodivergent-friendly affirmations.
*   **Time-Horizon Energy Analytics:** Standard apps scream "You completed 0 tasks today, you failure!" BubbleUp measures progress based on energy states:
    *   **Daily:** A soft overview of today's gentle steps forward.
    *   **Weekly:** A smooth visual graph tracking daily milestones over the last 7 days.
    *   **Monthly:** A minimalist 28-day grid color-coded by pacing thresholds (*Rest State*, *Pacing Day*, or *Flow State*) to normalize natural energy fluctuations.

---

## 🛠️ The Technical Blueprint
Underneath the comforting pastel aesthetic is a highly performant, lightning-fast React implementation:

### Technical Stack & Dependencies
*   **Frontend Interface Engine:** React 18+ (Vite Bundler)
*   **Style Layer Framework:** Tailwind CSS (Custom extended pastel palettes, hardware-accelerated fluid floating animations)
*   **Icon Asset Library:** Lucide React
*   **State & Storage Persistence:** Browser LocalStorage API with programmatic timezone offset corrections (`getLocalDateString`)

---

## Local Installation & Deployment

To launch the development server locally on your machine, drop these commands into your terminal:

```bash
# 1. Clone the repository to your workspace
git clone https://github.com/khatisani/bubbleup.git

# 2. Step into the project folder root
cd bubbleup

# 3. Pull down the package dependencies securely
npm install

# 4. Fire up the local Vite hot-reloading development server
npm run dev
