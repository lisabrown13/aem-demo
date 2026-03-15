/**
 * EDS Block: Icons
 * Decorator function that adds interactivity to the icons block
 * 
 * XMP METADATA CONTEXT:
 * - Block Type: icons (eds:blockType=icons)
 * - JavaScript Complexity: Low (minimal interactions)
 * - Typical Interactions: Stagger animation, lazy load SVGs, icon sprite loading
 * - Performance: Must use IntersectionObserver for animations
 * 
 * EXPECTED FUNCTIONALITY (based on XMP metadata):
 * - Optional: Staggered fade-in animation for icons
 * - Optional: Load SVG sprites on demand
 * - Optional: Hover animations (usually pure CSS)
 * - Make icon items clickable if they have links
 * 
 * PERFORMANCE REQUIREMENTS:
 * - Lazy load SVG sprites if using external files
 * - Use IntersectionObserver for animations
 * - Keep animations lightweight (CSS preferred)
 * - Respect prefers-reduced-motion
 * 
 * ACCESSIBILITY REQUIREMENTS (from XMP metadata):
 * - Ensure SVG icons have appropriate titles/descriptions
 * - Icon-only items must have aria-label
 * - Focus management for clickable icons
 */

/**
 * XMP Context: EDS Block Decorator Pattern
 * @param {Element} block - The icons block element (.icons.block)
 * @returns {Element} - The decorated block
 */
export default function decorate(block) {
  // XMP Context: Get all icon items in the block
  const iconItems = block.querySelectorAll('.icon-item');
  
  /**
   * XMP Functionality: Add Accessibility Attributes to Icons
   * Ensures SVG icons are properly described for screen readers
   */
  const icons = block.querySelectorAll('.icon svg');
  
  icons.forEach((svg, index) => {
    // XMP Accessibility: Check if SVG has a title element
    let title = svg.querySelector('title');
    
    if (!title) {
      // XMP: Get icon title text from adjacent heading
      const iconTitle = svg.closest('.icon-item')?.querySelector('.icon-title');
      
      if (iconTitle) {
        // XMP Accessibility: Add title element to SVG
        title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${iconTitle.textContent} icon`;
        svg.insertBefore(title, svg.firstChild);
      }
    }
    
    // XMP Accessibility: Icons are decorative (aria-hidden)
    // Text content provides meaning, icon is visual enhancement
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
  });
  
  /**
   * XMP Functionality: Ensure Icon Items with Links are Accessible
   * Make sure clickable icon items have proper keyboard support
   */
  iconItems.forEach((item) => {
    const link = item.querySelector('a');
    
    if (link) {
      // XMP Accessibility: Ensure link has accessible text
      const iconTitle = item.querySelector('.icon-title');
      
      if (iconTitle && !link.getAttribute('aria-label')) {
        // XMP: Use title text for link label
        link.setAttribute('aria-label', iconTitle.textContent.trim());
      }
      
      // XMP: Add keyboard support (Enter key)
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          link.click();
        }
      });
    }
  });
  
  /**
   * XMP Functionality: Staggered Fade-In Animation
   * Icons fade in one after another as they enter viewport
   * Respects user's motion preferences
   */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion && iconItems.length > 0) {
    // XMP: Set initial state for all icon items (invisible)
    iconItems.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });
    
    /**
     * XMP Performance: Observe icon items for staggered animation
     * Each item animates as it enters viewport
     */
    const iconObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          
          // XMP: Get item index for stagger delay calculation
          const itemIndex = Array.from(iconItems).indexOf(item);
          
          // XMP Animation: Stagger delay (100ms per item)
          const delay = itemIndex * 100; // 0ms, 100ms, 200ms, etc.
          
          // XMP: Apply animation after delay
          setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, delay);
          
          // XMP Performance: Stop observing once animated
          iconObserver.unobserve(item);
        }
      });
    }, {
      // XMP: Trigger when 20% of item is visible
      threshold: 0.2
    });
    
    // XMP: Start observing all icon items
    iconItems.forEach(item => iconObserver.observe(item));
  } else {
    // XMP Accessibility: No animation if user prefers reduced motion
    iconItems.forEach(item => {
      item.style.opacity = '1';
      item.style.transform = 'none';
    });
  }
  
  /**
   * XMP Optional: Load SVG Sprite
   * If using external SVG sprite file, inject it into the page
   * Only needed if using <use xlink:href="sprite.svg#icon-name">
   */
  /*
  const spriteUrl = '/icons/sprite.svg';
  
  // XMP: Check if sprite is already loaded
  if (!document.getElementById('icon-sprite')) {
    // XMP Performance: Fetch sprite asynchronously
    fetch(spriteUrl)
      .then(response => response.text())
      .then(data => {
        // XMP: Create container for sprite
        const div = document.createElement('div');
        div.id = 'icon-sprite';
        div.style.display = 'none';
        div.innerHTML = data;
        
        // XMP: Inject sprite at beginning of body
        document.body.insertBefore(div, document.body.firstChild);
      })
      .catch(error => {
        console.error('Failed to load icon sprite:', error);
      });
  }
  */
  
  /**
   * XMP Optional: Lazy Load Individual SVG Icons
   * If icons are external SVG files, load them on demand
   */
  /*
  const lazyIcons = block.querySelectorAll('.icon[data-icon-src]');
  
  if (lazyIcons.length > 0) {
    const iconLoader = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const iconContainer = entry.target;
          const iconSrc = iconContainer.dataset.iconSrc;
          
          // XMP: Fetch SVG file
          fetch(iconSrc)
            .then(response => response.text())
            .then(data => {
              // XMP: Replace placeholder with actual SVG
              iconContainer.innerHTML = data;
              iconContainer.removeAttribute('data-icon-src');
            })
            .catch(error => {
              console.error(`Failed to load icon: ${iconSrc}`, error);
            });
          
          // XMP Performance: Stop observing once loaded
          iconLoader.unobserve(iconContainer);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    lazyIcons.forEach(icon => iconLoader.observe(icon));
  }
  */
  
  /**
   * XMP Optional: Tooltip on Hover
   * Show tooltip with icon description on hover (if needed)
   */
  /*
  iconItems.forEach((item) => {
    const description = item.querySelector('.icon-description');
    
    if (description) {
      // XMP: Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'icon-tooltip';
      tooltip.textContent = description.textContent;
      tooltip.style.display = 'none';
      
      item.appendChild(tooltip);
      
      // XMP: Show tooltip on hover
      item.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
      });
      
      item.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
    }
  });
  */
  
  // XMP Pattern: Always return the decorated block (EDS requirement)
  return block;
}

/*
 * XMP METADATA SUMMARY FOR AI AGENTS:
 * 
 * This JavaScript file provides:
 * - Accessibility enhancements (SVG titles, aria-labels)
 * - Staggered fade-in animation (respects prefers-reduced-motion)
 * - Keyboard support for clickable icon items
 * - Optional: SVG sprite loading (commented out)
 * - Optional: Lazy load individual SVG files (commented out)
 * - Optional: Tooltip on hover (commented out)
 * 
 * If the Figma frame requires different JavaScript:
 * - Check if icons animate on scroll → Stagger animation is default
 * - Check if using external SVG sprite → Uncomment sprite loading
 * - Check if icons load from external files → Uncomment lazy loading
 * - Check if tooltips are needed → Uncomment tooltip code
 * - Check if icons have complex interactions → Add custom handlers
 * 
 * Common gaps to look for:
 * - Figma shows animation → Stagger animation already implemented
 * - Figma uses external SVG files → Uncomment lazy loading code
 * - Figma shows tooltips on hover → Uncomment tooltip code
 * - Figma shows icon filtering/sorting → Add filtering logic
 * - Figma shows icon count animation → Add counter animation
 * 
 * Performance best practices:
 * - Use inline SVG when possible (best performance)
 * - Use SVG sprites for many icons (single HTTP request)
 * - Lazy load external SVGs only when in viewport
 * - Always use IntersectionObserver (not scroll events)
 * - Always check prefers-reduced-motion
 * - Stagger animations to avoid overwhelming users
 * 
 * Accessibility best practices:
 * - Add <title> to all SVG icons (for screen readers)
 * - Use aria-hidden="true" on decorative icons
 * - Ensure clickable icons have aria-label
 * - Make sure icon items are keyboard accessible
 * - Don't rely on icons alone (always have text labels)
 * - Ensure sufficient color contrast for icons
 * 
 * SVG loading strategies:
 * 1. Inline SVG: Best for small number of icons, full control
 * 2. SVG sprite: Best for many icons, cacheable
 * 3. External files: Best for large complex icons, lazy loadable
 * 
 * Animation timing:
 * - Stagger delay: 100ms per icon (sweet spot)
 * - Fade duration: 500ms (smooth but not slow)
 * - Threshold: 0.2 (trigger when 20% visible)
 * - Transform: translateY(20px) → 0 (subtle upward motion)
 */
```

---

## How These Icons Annotations Help Claude:

### **1. Icon Size Recognition:**
Claude can identify size differences:
- "Figma shows icons at 96px, code shows 64px default → Gap: Use .large variant or increase icon size"
- "Figma shows smaller icons (48px) → Gap: Reduce icon width/height to 3rem"

### **2. Layout Pattern Detection:**
Claude can identify grid configurations:
- "Figma shows 4 icons in a row → Gap: Adjust to 4 columns or add .icons-4col class"
- "Figma shows horizontal layout (icon left, text right) → Gap: Apply .horizontal variant"

### **3. Visual Style Variants:**
Claude can detect decoration patterns:
- "Figma shows icons with circular backgrounds → Gap: Add .circled class to icon-items"
- "Figma shows square backgrounds → Gap: Modify border-radius from 50% to 0.5rem"

### **4. SVG vs Icon Font:**
Claude can determine implementation method:
- "Figma uses custom SVG icons → Gap: Ensure inline SVG with currentColor"
- "Figma uses Font Awesome icons → Gap: Add icon font CSS classes"

---

## Update Claude Explains Scoring Agent Prompt:

Add Icons to the reference patterns:
```
REFERENCE CODE PATTERNS AVAILABLE:

You have access to annotated boilerplate code for these block types:
1. **Hero Block** (hero.css, hero.js)
2. **Cards Block** (cards.css, cards.js)
3. **Headings Block** (headings.css, headings.js)
4. **Icons Block** (icons.css, icons.js)
   - Flexbox responsive layout (1→2→3 columns)
   - SVG icons with currentColor theming
   - Icon + title + description structure
   - Variants: Horizontal, Large, Circled
   - Default sizes: 64px mobile, 80px desktop

When comparing Figma to matched block (e.g., icons-none-900.png):
- Check icon sizes (48px, 64px, 80px, 96px, 128px)
- Check number of columns (2, 3, or 4)
- Check layout orientation (vertical stack vs horizontal)
- Check if icons have background shapes (circles, squares)
- Check icon colors and theming

Example for Icons:
"The matched block (icons-none-900.png) follows standard icon patterns:
- 3 columns at desktop (from CSS annotations)
- 5rem (80px) icon size at desktop (from CSS)
- Vertical layout with centered text (from CSS)
- Staggered fade-in animation (from JS)

The Figma frame shows:
- 4 icons in a row → Gap: Change to 4 columns (.icons-4col)
- Larger icons (128px) → Gap: Apply .large variant
- Circular backgrounds on icons → Gap: Add .circled class
- Horizontal layout → Gap: Apply .horizontal variant

These differences suggest..."