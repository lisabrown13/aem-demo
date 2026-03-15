/**
 * EDS Block: Lists
 * Decorator function for lists block
 * 
 * XMP METADATA CONTEXT:
 * - Block Type: lists (eds:blockType=lists)
 * - JavaScript Complexity: Very Low (usually NO JS needed)
 * - Typical Interactions: Optional fade-in, optional item animation
 * - Performance: Lightweight, minimal or no JavaScript
 * 
 * EXPECTED FUNCTIONALITY (based on XMP metadata):
 * - Usually NO JavaScript needed (pure CSS block)
 * - Optional: Fade-in animation for list items on scroll
 * - Optional: Animated counter for ordered lists
 * - Optional: Expand/collapse for long lists
 * 
 * MOST COMMON: This file is minimal or empty
 * Lists are semantic HTML elements that rarely need JavaScript
 * 
 * PERFORMANCE REQUIREMENTS:
 * - No JavaScript is the best performance
 * - If animations needed, use CSS transitions (not JS)
 * - If expand/collapse needed, keep it simple
 * 
 * ACCESSIBILITY REQUIREMENTS (from XMP metadata):
 * - List structure must be semantic (handled in HTML)
 * - If adding expand/collapse, ensure keyboard accessible
 * - Maintain focus management
 */

/**
 * XMP Context: EDS Block Decorator Pattern
 * @param {Element} block - The lists block element (.lists.block)
 * @returns {Element} - The decorated block
 * 
 * NOTE: Most lists blocks need NO JavaScript
 * This decorator exists for consistency and optional enhancements
 */
export default function decorate(block) {
  /**
   * XMP Context: Check if JavaScript is actually needed
   * Most lists blocks are purely CSS and don't need JS decoration
   */
  
  // XMP: Get all list items in the block
  const listItems = block.querySelectorAll('li');
  
  // XMP: If no list items, return early
  if (listItems.length === 0) {
    return block;
  }
  
  /**
   * XMP Optional: Fade-In Animation for List Items
   * Staggered animation as list items enter viewport
   * Only uncomment if Figma frame shows animation
   */
  /*
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    // XMP: Set initial state (invisible)
    listItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-10px)';
    });
    
    // XMP Performance: Observe when list items enter viewport
    const listObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          
          // XMP: Get item index for stagger delay
          const itemIndex = Array.from(listItems).indexOf(item);
          
          // XMP Animation: Stagger delay (50ms per item - faster than cards)
          const delay = itemIndex * 50;
          
          // XMP: Apply animation after delay
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, delay);
          
          // XMP Performance: Stop observing once animated
          listObserver.unobserve(item);
        }
      });
    }, {
      threshold: 0.3
    });
    
    // XMP: Observe all list items
    listItems.forEach(item => listObserver.observe(item));
  }
  */
  
  /**
   * XMP Optional: Animated Counter for Ordered Lists
   * Counts up from 0 to final number when list enters viewport
   * Only uncomment if Figma frame shows this effect
   */
  /*
  const orderedLists = block.querySelectorAll('ol');
  
  orderedLists.forEach((list) => {
    const items = list.querySelectorAll('li');
    
    // XMP: Create observer for the list
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // XMP: Animate counter for each list item
          items.forEach((item, index) => {
            const targetNumber = index + 1;
            let currentNumber = 0;
            
            // XMP Animation: Count up over 800ms
            const duration = 800;
            const increment = targetNumber / (duration / 16); // 60fps
            
            const counter = setInterval(() => {
              currentNumber += increment;
              
              if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counter);
              }
              
              // XMP: Update the marker (using CSS counter would be better)
              // This is a simplified example
            }, 16);
          });
          
          counterObserver.unobserve(list);
        }
      });
    }, {
      threshold: 0.5
    });
    
    counterObserver.observe(list);
  });
  */
  
  /**
   * XMP Optional: Expand/Collapse for Long Lists
   * Show only first N items, add "Show More" button
   * Only uncomment if Figma frame shows this functionality
   */
  /*
  const maxItems = 5; // Show first 5 items by default
  
  const lists = block.querySelectorAll('ul, ol');
  
  lists.forEach((list) => {
    const items = list.querySelectorAll('li');
    
    // XMP: Only add expand/collapse if list is longer than max
    if (items.length > maxItems) {
      // XMP: Hide items beyond maxItems
      items.forEach((item, index) => {
        if (index >= maxItems) {
          item.style.display = 'none';
          item.classList.add('hidden-item');
        }
      });
      
      // XMP: Create "Show More" button
      const toggleButton = document.createElement('button');
      toggleButton.textContent = `Show ${items.length - maxItems} more`;
      toggleButton.className = 'list-toggle-button';
      toggleButton.setAttribute('aria-expanded', 'false');
      
      // XMP: Insert button after list
      list.parentNode.insertBefore(toggleButton, list.nextSibling);
      
      // XMP: Toggle handler
      let isExpanded = false;
      
      toggleButton.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        // XMP: Show/hide hidden items
        items.forEach((item, index) => {
          if (index >= maxItems) {
            item.style.display = isExpanded ? 'list-item' : 'none';
          }
        });
        
        // XMP: Update button text and ARIA
        toggleButton.textContent = isExpanded 
          ? 'Show less' 
          : `Show ${items.length - maxItems} more`;
        toggleButton.setAttribute('aria-expanded', isExpanded.toString());
      });
    }
  });
  */
  
  /**
   * XMP Optional: Checklist Item Toggle
   * Allow users to check/uncheck items (interactive checklist)
   * Only uncomment if Figma shows interactive checklist
   */
  /*
  const checklistItems = block.querySelectorAll('ul.checklist li');
  
  checklistItems.forEach((item) => {
    // XMP: Make item clickable
    item.style.cursor = 'pointer';
    item.setAttribute('role', 'checkbox');
    item.setAttribute('aria-checked', 'false');
    
    // XMP: Click handler to toggle checked state
    item.addEventListener('click', () => {
      const isChecked = item.getAttribute('aria-checked') === 'true';
      
      // XMP: Toggle checked state
      item.setAttribute('aria-checked', (!isChecked).toString());
      
      // XMP: Add/remove checked class for CSS styling
      item.classList.toggle('checked');
      
      // XMP: Optional: Store state in localStorage
      // localStorage.setItem(`checklist-${item.textContent}`, !isChecked);
    });
    
    // XMP Accessibility: Keyboard support (Space to toggle)
    item.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        item.click();
      }
    });
  });
  */
  
  // XMP Pattern: Always return the decorated block (EDS requirement)
  // Even if no JavaScript was added, we still return the block
  return block;
}

/*
 * XMP METADATA SUMMARY FOR AI AGENTS:
 * 
 * This JavaScript file provides:
 * - Minimal or NO JavaScript (lists are usually pure CSS/HTML)
 * - Optional: Fade-in animation for list items (commented out)
 * - Optional: Animated counter for ordered lists (commented out)
 * - Optional: Expand/collapse for long lists (commented out)
 * - Optional: Interactive checklist (commented out)
 * 
 * IMPORTANT: 95% of lists blocks DO NOT need JavaScript
 * This file exists for:
 * 1. Consistency with EDS decorator pattern
 * 2. Optional enhancements if Figma shows them
 * 3. Edge cases where lists need interactivity
 * 
 * If the Figma frame requires JavaScript:
 * - Check if list items animate on scroll → Uncomment fade-in code
 * - Check if ordered list has counter animation → Uncomment counter code
 * - Check if there's a "Show More" button → Uncomment expand/collapse code
 * - Check if checklist is interactive → Uncomment toggle code
 * - Check if list has filtering → Add custom filter logic
 * 
 * Common gaps to look for:
 * - Figma shows animation → Uncomment staggered fade-in
 * - Figma shows "Show More" → Uncomment expand/collapse
 * - Figma shows interactive checkboxes → Uncomment toggle code
 * - Figma shows filtered list → Add filtering logic
 * - Figma shows sortable list → Add sorting logic
 * 
 * 98% of the time, the correct code for lists.js is:
 * 
 * export default function decorate(block) {
 *   // No JavaScript needed for lists block
 *   return block;
 * }
 * 
 * Only add JavaScript if Figma explicitly shows interactive behavior.
 * 
 * Performance best practices:
 * - Default to NO JavaScript (best performance)
 * - Use CSS for styling (not JS)
 * - If expand/collapse needed, use details/summary HTML elements
 * - Always check prefers-reduced-motion for animations
 * - Always use IntersectionObserver (not scroll events)
 * 
 * Accessibility reminders:
 * - Use semantic <ul> and <ol> (not divs)
 * - Ordered lists start with <ol>, unordered with <ul>
 * - Each item is a <li> element
 * - If making lists interactive, add proper ARIA attributes
 * - If adding expand/collapse, use aria-expanded
 * - If making checklist interactive, use role="checkbox" and aria-checked
 * - Ensure keyboard navigation works (Space/Enter to toggle)
 * - Don't break semantic list structure with JavaScript
 */
```

---

## How These Lists Annotations Help Claude:

### **1. List Type Recognition:**
Claude can identify which list style to use:
- "Figma shows checkmarks (✓) → Gap: Apply .checklist class to ul"
- "Figma shows custom icons before text → Gap: Apply .feature-list class"
- "Figma shows no bullets → Gap: Apply .clean class"

### **2. Marker Style Detection:**
Claude can identify numbering systems:
- "Figma shows roman numerals (i, ii, iii) → Gap: Apply .roman class to ol"
- "Figma shows letters (a, b, c) → Gap: Apply .alpha class"
- "Figma shows green checkmarks → Gap: Update var(--list-checkmark-color)"

### **3. Layout Pattern Recognition:**
Claude can detect column layouts:
- "Figma shows list in 2 columns → Gap: Apply .two-column class"
- "Figma shows alternating row backgrounds → Gap: Apply .striped theme"

### **4. Minimal JavaScript Detection:**
Claude can recognize when NO JavaScript is needed:
- "Figma shows static list → Gap: No JavaScript needed (correct)"
- "Figma shows 'Show More' button → Gap: Uncomment expand/collapse code"

---

## Update Claude Explains Scoring Agent Prompt:

Add Lists to the reference patterns:
```
REFERENCE CODE PATTERNS AVAILABLE:

You have access to annotated boilerplate code for these block types:
1. **Hero Block** (hero.css, hero.js)
2. **Cards Block** (cards.css, cards.js)
3. **Headings Block** (headings.css, headings.js)
4. **Icons Block** (icons.css, icons.js)
5. **Lists Block** (lists.css, lists.js)
   - Semantic ul/ol with proper HTML structure
   - Variants: checklist (✓), feature-list (icons), clean (no bullets), two-column
   - Themes: None, Light, Dark, Striped
   - Usually NO JavaScript needed (pure CSS)
   - Different numbering: decimal, roman, alpha

When comparing Figma to matched block (e.g., lists-striped-900.png):
- Check list type (bullets, numbers, checkmarks, icons, none)
- Check if nested lists are present
- Check bullet/number color and style
- Check spacing between items (0.75rem default, 1rem desktop)
- Check if two-column layout
- Check if striped background
- Check if JavaScript is needed (usually NOT)

Example for Lists:
"The matched block (lists-none-900.png) follows standard list patterns:
- Unordered list with disc bullets (from CSS annotations)
- Single column layout (from CSS)
- 1rem spacing between items at desktop (from CSS)
- No JavaScript needed (from JS - returns block only)

The Figma frame shows:
- Checkmarks instead of bullets → Gap: Apply .checklist class
- Two columns at desktop → Gap: Apply .two-column class
- Green checkmarks → Gap: Update var(--list-checkmark-color)
- No animations → Gap: No JavaScript needed (correct)

These differences suggest..."