/**
 * EDS Block: Headings
 * Decorator function for headings block
 * 
 * XMP METADATA CONTEXT:
 * - Block Type: headings (eds:blockType=headings)
 * - JavaScript Complexity: Very Low (minimal or no JS needed)
 * - Typical Interactions: Optional fade-in, optional scroll anchor links
 * - Performance: Lightweight, no heavy operations
 * 
 * EXPECTED FUNCTIONALITY (based on XMP metadata):
 * - Usually NO JavaScript needed (pure CSS block)
 * - Optional: Fade-in animation on scroll
 * - Optional: Generate anchor links for headings (table of contents)
 * - Optional: Smooth scroll to heading from navigation
 * 
 * MOST COMMON: This file may be minimal or even export an empty decorator
 * because headings blocks rarely need JavaScript functionality
 * 
 * PERFORMANCE REQUIREMENTS:
 * - No JavaScript is the best performance
 * - If animations needed, use CSS transitions (not JS)
 * - If anchor links needed, keep it simple (no heavy libraries)
 * 
 * ACCESSIBILITY REQUIREMENTS (from XMP metadata):
 * - Heading hierarchy must be semantic (handled in HTML, not JS)
 * - If generating anchor links, ensure they're keyboard accessible
 * - Focus management for smooth scroll
 */

/**
 * XMP Context: EDS Block Decorator Pattern
 * @param {Element} block - The headings block element (.headings.block)
 * @returns {Element} - The decorated block
 * 
 * NOTE: Most headings blocks need NO JavaScript
 * This decorator exists for consistency and optional enhancements
 */
export default function decorate(block) {
  /**
   * XMP Context: Check if JavaScript is actually needed
   * Most headings blocks are purely CSS and don't need JS decoration
   */
  
  // XMP: Get all headings in the block
  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  // XMP: If no headings, return early (nothing to decorate)
  if (headings.length === 0) {
    return block;
  }
  
  /**
   * XMP Optional: Fade-In Animation on Scroll
   * Only uncomment if Figma frame shows animation
   * Most headings blocks do NOT need this
   */
  /*
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    // XMP: Set initial state (invisible)
    headings.forEach(heading => {
      heading.style.opacity = '0';
      heading.style.transform = 'translateY(10px)';
    });
    
    // XMP Performance: Observe when headings enter viewport
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // XMP Animation: Fade in smoothly
          entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // XMP Performance: Stop observing once animated
          headingObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });
    
    // XMP: Observe all headings
    headings.forEach(heading => headingObserver.observe(heading));
  }
  */
  
  /**
   * XMP Optional: Generate Anchor Links for Headings
   * Creates clickable links for table of contents or deep linking
   * Only uncomment if Figma frame shows this functionality
   */
  /*
  headings.forEach((heading) => {
    // XMP: Skip if heading already has an ID
    if (heading.id) return;
    
    // XMP: Generate ID from heading text (kebab-case)
    const headingText = heading.textContent.trim();
    const headingId = headingText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    // XMP: Set ID on heading
    heading.id = headingId;
    
    // XMP Accessibility: Make heading focusable for deep linking
    heading.setAttribute('tabindex', '-1');
    
    // XMP Optional: Add link icon for copying deep link
    const linkIcon = document.createElement('a');
    linkIcon.href = `#${headingId}`;
    linkIcon.className = 'heading-link';
    linkIcon.setAttribute('aria-label', `Link to ${headingText}`);
    linkIcon.innerHTML = '🔗'; // Or use an SVG icon
    
    // XMP: Append link icon to heading
    heading.appendChild(linkIcon);
    
    // XMP: Click handler for smooth scroll
    linkIcon.addEventListener('click', (e) => {
      e.preventDefault();
      
      // XMP Accessibility: Respect reduced motion preference
      const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
      
      heading.scrollIntoView({
        behavior: scrollBehavior,
        block: 'start'
      });
      
      // XMP: Update URL hash
      window.history.pushState(null, '', `#${headingId}`);
      
      // XMP Accessibility: Focus on heading
      heading.focus({ preventScroll: true });
    });
  });
  */
  
  /**
   * XMP Optional: Auto-scroll to Heading on Page Load
   * If URL contains hash, scroll to that heading
   */
  /*
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetHeading = block.querySelector(`#${targetId}`);
    
    if (targetHeading) {
      // XMP: Wait for page to load before scrolling
      window.addEventListener('load', () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
        
        targetHeading.scrollIntoView({
          behavior: scrollBehavior,
          block: 'start'
        });
        
        // XMP Accessibility: Focus on heading
        targetHeading.focus({ preventScroll: true });
      });
    }
  }
  */
  
  /**
   * XMP Optional: Sticky Heading (keeps heading visible while scrolling)
   * Only uncomment if Figma frame shows sticky behavior
   */
  /*
  const stickyHeading = block.querySelector('h1, h2'); // First major heading
  
  if (stickyHeading) {
    // XMP: Add sticky class when scrolling past heading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stickyHeading.classList.add('is-sticky');
        } else {
          stickyHeading.classList.remove('is-sticky');
        }
      },
      { threshold: 0 }
    );
    
    observer.observe(stickyHeading);
  }
  */
  
  // XMP Pattern: Always return the decorated block (EDS requirement)
  // Even if no JavaScript was added, we still return the block
  return block;
}

/*
 * XMP METADATA SUMMARY FOR AI AGENTS:
 * 
 * This JavaScript file provides:
 * - Minimal or NO JavaScript (headings are usually pure CSS)
 * - Optional: Fade-in animation on scroll (commented out by default)
 * - Optional: Anchor link generation for table of contents (commented out)
 * - Optional: Smooth scroll to heading from URL hash (commented out)
 * - Optional: Sticky heading behavior (commented out)
 * 
 * IMPORTANT: Most headings blocks DO NOT need JavaScript
 * This file exists for:
 * 1. Consistency with EDS decorator pattern
 * 2. Optional enhancements if Figma shows them
 * 3. Edge cases where headings need interactivity
 * 
 * If the Figma frame requires JavaScript:
 * - Check if headings animate on scroll → Uncomment fade-in code
 * - Check if there's a table of contents → Uncomment anchor link generation
 * - Check if headings are sticky → Uncomment sticky behavior
 * - Check if headings have click interactions → Add custom handlers
 * 
 * Common gaps to look for:
 * - Figma shows animation → Uncomment fade-in animation code
 * - Figma shows # link icons on headings → Uncomment anchor link code
 * - Figma shows sticky heading → Uncomment sticky observer code
 * - Figma shows interactive headings → Add click/hover handlers
 * 
 * 99% of the time, the correct code for headings.js is:
 * 
 * export default function decorate(block) {
 *   // No JavaScript needed for headings block
 *   return block;
 * }
 * 
 * Only add JavaScript if Figma explicitly shows interactive behavior.
 * 
 * Performance best practices:
 * - Default to NO JavaScript (best performance)
 * - Use CSS for animations when possible (not JS)
 * - If anchor links needed, use lightweight vanilla JS (no libraries)
 * - Always check prefers-reduced-motion for animations
 * - Always use IntersectionObserver (not scroll events)
 * 
 * Accessibility reminders:
 * - Heading hierarchy is semantic (HTML, not JS)
 * - If adding anchor links, ensure keyboard accessible
 * - If smooth scrolling, respect prefers-reduced-motion
 * - If making headings focusable, add tabindex="-1"
 * - Don't break heading semantics with JavaScript
 */
```

---

## How These Headings Annotations Help Claude:

### **1. Typography Scale Recognition:**
Claude can identify font size differences:
- "Figma shows h1 at 72px (4.5rem), code shows 64px (4rem) at desktop → Gap: +8px larger"
- "Figma shows h2 at 40px, code shows 48px → Gap: -8px smaller"

### **2. Minimal JavaScript Detection:**
Claude can recognize when NO JavaScript is needed:
- "Figma shows static headings with no animation → Gap: No JavaScript needed (correct)"
- "Figma shows fade-in effect → Gap: Uncomment fade-in animation code"

### **3. Hierarchy Validation:**
Claude can check semantic structure:
- "Figma shows h3 before h2 → Gap: Fix heading hierarchy (skip levels)"
- "Figma shows two h1 elements → Gap: Only one h1 allowed per page"

### **4. Theme and Alignment:**
Claude can identify variants:
- "Figma shows left-aligned headings → Gap: Add .left-aligned class"
- "Figma shows accent color on h1 → Gap: Apply .highlight theme"

---

## Update Claude Explains Scoring Agent Prompt:

Add Headings to the reference patterns:
```
REFERENCE CODE PATTERNS AVAILABLE:

You have access to annotated boilerplate code for these block types:
1. **Hero Block** (hero.css, hero.js)
2. **Cards Block** (cards.css, cards.js)  
3. **Headings Block** (headings.css, headings.js)
   - Semantic heading hierarchy (h1-h6)
   - Mobile-first responsive typography
   - Usually NO JavaScript needed (pure CSS)
   - Typical sizes: h1: 40→64px, h2: 32→48px, h3: 24→32px

When comparing Figma to matched block (e.g., headings-light-900.png):
- Check font sizes against typography scale in comments
- Check heading hierarchy (h1 → h2 → h3, no skipping)
- Check alignment (left, center, right)
- Check if JavaScript is actually needed (usually NOT for headings)

Example for Headings:
"The matched block (headings-none-900.png) follows standard heading styles:
- h1 at 4rem (64px) desktop (from CSS annotations)
- h2 at 3rem (48px) desktop (from CSS)
- Center-aligned by default (from CSS)
- No JavaScript needed (from JS - returns block only)

The Figma frame shows:
- h1 at 4.5rem (72px) → Gap: +0.5rem larger heading
- Left-aligned text → Gap: Add .left-aligned class
- No animations → Gap: No JavaScript needed (correct)

These differences suggest..."