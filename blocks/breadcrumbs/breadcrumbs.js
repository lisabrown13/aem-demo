/**
 * EDS Block: Breadcrumbs
 * Decorator function for breadcrumbs block
 * 
 * XMP METADATA CONTEXT:
 * - Block Type: breadcrumbs (eds:blockType=breadcrumbs)
 * - JavaScript Complexity: Very Low (minimal JS needed)
 * - Typical Interactions: Truncation toggle, schema injection, dynamic generation
 * - Performance: Lightweight, minimal JavaScript
 * 
 * EXPECTED FUNCTIONALITY (based on XMP metadata):
 * - Usually minimal JavaScript needed (CSS handles most styling)
 * - Generate breadcrumbs from URL path (optional)
 * - Truncate long paths with expandable ellipsis (optional)
 * - Inject JSON-LD structured data for SEO (optional but recommended)
 * - Validate accessibility attributes
 * 
 * MOST COMMON: Very minimal JavaScript
 * Breadcrumbs are mostly static HTML + CSS
 * 
 * PERFORMANCE REQUIREMENTS:
 * - Keep interactions lightweight
 * - JSON-LD injection is synchronous and fast
 * - No heavy DOM manipulation needed
 * 
 * ACCESSIBILITY REQUIREMENTS (from XMP metadata):
 * - Ensure nav has aria-label="Breadcrumb"
 * - Ensure last item has aria-current="page"
 * - Ensure separators are aria-hidden
 * - Ensure no link on current page item
 */

/**
 * XMP Context: EDS Block Decorator Pattern
 * @param {Element} block - The breadcrumbs block element (.breadcrumbs.block)
 * @returns {Element} - The decorated block
 */
export default function decorate(block) {
  /**
   * XMP Context: Get breadcrumb elements
   */
  const nav = block.querySelector('nav');
  const list = block.querySelector('.breadcrumb-list');
  const items = block.querySelectorAll('.breadcrumb-item');
  
  // XMP: If no list, return early
  if (!list || items.length === 0) {
    return block;
  }
  
  /**
   * XMP Functionality: Validate and Fix Accessibility Attributes
   * Ensure all required ARIA attributes are present
   */
  
  // XMP Accessibility: Ensure nav has aria-label
  if (nav && !nav.hasAttribute('aria-label')) {
    nav.setAttribute('aria-label', 'Breadcrumb');
  }
  
  // XMP Accessibility: Ensure last item has aria-current="page"
  const lastItem = items[items.length - 1];
  const lastLink = lastItem?.querySelector('a');
  const lastCurrent = lastItem?.querySelector('.breadcrumb-current');
  
  if (lastLink) {
    // XMP: Last item should not be a link - convert to span
    console.warn('Last breadcrumb item should not be a link:', lastLink.href);
    
    const span = document.createElement('span');
    span.className = 'breadcrumb-current';
    span.textContent = lastLink.textContent;
    span.setAttribute('aria-current', 'page');
    lastLink.parentNode.replaceChild(span, lastLink);
    
  } else if (lastCurrent && !lastCurrent.hasAttribute('aria-current')) {
    // XMP: Add aria-current if missing
    lastCurrent.setAttribute('aria-current', 'page');
  }
  
  // XMP Accessibility: Ensure separator pseudo-elements are aria-hidden
  // This is handled in CSS (separators not in HTML)
  // But if someone adds separators in HTML, hide them
  const htmlSeparators = block.querySelectorAll('.breadcrumb-separator');
  htmlSeparators.forEach(sep => {
    sep.setAttribute('aria-hidden', 'true');
  });
  
  /**
   * XMP Functionality: JSON-LD Structured Data for SEO
   * Inject BreadcrumbList schema for Google rich results
   * Recommended for all breadcrumb implementations
   */
  const breadcrumbLinks = block.querySelectorAll('.breadcrumb-link');
  const currentPage = block.querySelector('.breadcrumb-current');
  
  if (breadcrumbLinks.length > 0) {
    // XMP: Build schema items array
    const schemaItems = [];
    
    // XMP: Add linked items
    breadcrumbLinks.forEach((link, index) => {
      schemaItems.push({
        '@type': 'ListItem',
        position: index + 1,
        name: link.textContent.trim(),
        item: link.href
      });
    });
    
    // XMP: Add current page (no URL - it's the current page)
    if (currentPage) {
      schemaItems.push({
        '@type': 'ListItem',
        position: schemaItems.length + 1,
        name: currentPage.textContent.trim()
      });
    }
    
    // XMP: Create JSON-LD script tag
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: schemaItems
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    
    // XMP: Append to document head
    document.head.appendChild(script);
  }
  
  /**
   * XMP Optional: Truncate Long Breadcrumb Paths
   * Collapse middle items when path is long (4+ items)
   * Only uncomment if Figma shows truncated breadcrumbs
   */
  /*
  const MAX_VISIBLE_ITEMS = 3; // Show first, ellipsis, last
  
  if (items.length > MAX_VISIBLE_ITEMS + 1) {
    // XMP: Get middle items to hide
    const middleItems = Array.from(items).slice(1, items.length - 1);
    
    // XMP: Hide middle items initially
    middleItems.forEach(item => {
      item.classList.add('hidden');
    });
    
    // XMP: Create ellipsis item
    const ellipsisItem = document.createElement('li');
    ellipsisItem.className = 'breadcrumb-item breadcrumb-ellipsis';
    
    const ellipsisButton = document.createElement('button');
    ellipsisButton.textContent = '…';
    ellipsisButton.setAttribute('aria-label', 'Show full path');
    ellipsisButton.setAttribute('aria-expanded', 'false');
    
    ellipsisItem.appendChild(ellipsisButton);
    
    // XMP: Insert ellipsis after first item
    items[0].after(ellipsisItem);
    
    // XMP: Click handler to expand
    ellipsisButton.addEventListener('click', () => {
      // XMP: Show all hidden items
      middleItems.forEach(item => {
        item.classList.remove('hidden');
      });
      
      // XMP: Remove ellipsis
      ellipsisItem.remove();
      
      // XMP Accessibility: Update aria-expanded
      ellipsisButton.setAttribute('aria-expanded', 'true');
    });
  }
  */
  
  /**
   * XMP Optional: Generate Breadcrumbs from URL
   * Auto-generate breadcrumb trail from current URL path
   * Only uncomment if breadcrumbs should be generated dynamically
   */
  /*
  const generateFromUrl = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    // XMP: Clear existing list
    list.innerHTML = '';
    
    // XMP: Always add home as first item
    const homeItem = document.createElement('li');
    homeItem.className = 'breadcrumb-item';
    const homeLink = document.createElement('a');
    homeLink.className = 'breadcrumb-link';
    homeLink.href = '/';
    homeLink.textContent = 'Home';
    homeItem.appendChild(homeLink);
    list.appendChild(homeItem);
    
    // XMP: Add path segments
    let cumulativePath = '';
    
    segments.forEach((segment, index) => {
      cumulativePath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      // XMP: Format segment for display
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
      
      const item = document.createElement('li');
      item.className = 'breadcrumb-item';
      
      if (isLast) {
        // XMP: Current page (not a link)
        const current = document.createElement('span');
        current.className = 'breadcrumb-current';
        current.textContent = label;
        current.setAttribute('aria-current', 'page');
        item.appendChild(current);
      } else {
        // XMP: Linked item
        const link = document.createElement('a');
        link.className = 'breadcrumb-link';
        link.href = cumulativePath;
        link.textContent = label;
        item.appendChild(link);
      }
      
      list.appendChild(item);
    });
  };
  
  // XMP: Only generate if list is empty
  if (items.length === 0) {
    generateFromUrl();
  }
  */
  
  /**
   * XMP Optional: Highlight Current Section
   * Add visual indicator to the item matching current URL
   * Only uncomment if section highlighting needed
   */
  /*
  const currentPath = window.location.pathname;
  
  breadcrumbLinks.forEach(link => {
    try {
      const linkPath = new URL(link.href).pathname;
      
      if (currentPath.startsWith(linkPath) && linkPath !== '/') {
        link.classList.add('breadcrumb-link-active');
      }
    } catch (e) {
      // Invalid URL, skip
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
 * - ARIA validation (aria-label on nav, aria-current on last item)
 * - Automatic fix: converts last <a> to <span> if incorrectly linked
 * - JSON-LD structured data injection (BreadcrumbList schema for SEO)
 * - aria-hidden on any HTML separators (accessibility cleanup)
 * - Optional: Truncation with expandable ellipsis (commented out)
 * - Optional: Auto-generate from URL (commented out)
 * - Optional: Active section highlighting (commented out)
 * 
 * DEFAULT BEHAVIOR (always included):
 * - Validates nav has aria-label="Breadcrumb"
 * - Ensures last item has aria-current="page"
 * - Converts last item from <a> to <span> if incorrectly marked up
 * - Injects JSON-LD BreadcrumbList schema for SEO
 * 
 * If the Figma frame requires JavaScript changes:
 * - Check if path is truncated (ellipsis) → Uncomment truncation code
 * - Check if breadcrumbs are auto-generated → Uncomment URL generation
 * - Check if active section highlighted → Uncomment highlighting code
 * 
 * Common gaps to look for:
 * - Figma shows truncated path with ellipsis → Uncomment truncation code
 * - Figma shows dynamic breadcrumbs → Uncomment URL generation
 * - Figma shows active section highlighting → Uncomment that code
 * - Missing aria attributes → JS fixes automatically
 * - Last item is incorrectly a link → JS fixes automatically
 * 
 * 90% of the time, breadcrumbs need only:
 * - Proper semantic HTML
 * - CSS for styling
 * - Minimal JS for ARIA validation + JSON-LD schema
 * 
 * CRITICAL HTML RULES:
 * - <nav aria-label="Breadcrumb"> wrapper
 * - <ol> ordered list (NOT <ul>)
 * - <li class="breadcrumb-item"> for each item
 * - <a class="breadcrumb-link"> for linked items
 * - <span class="breadcrumb-current" aria-current="page"> for current page
 * - NEVER put separators in HTML (use CSS ::after)
 * - NEVER make current page a link
 * 
 * JSON-LD Schema structure:
 * {
 *   "@context": "https://schema.org",
 *   "@type": "BreadcrumbList",
 *   "itemListElement": [
 *     { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
 *     { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://example.com/products" },
 *     { "@type": "ListItem", "position": 3, "name": "Current Page" } // No "item" for current page
 *   ]
 * }
 * 
 * SEO best practices:
 * - Always inject JSON-LD schema (helps Google rich results)
 * - Schema must match visible breadcrumbs exactly
 * - Current page in schema should have no "item" property
 * - Use canonical URLs in schema (not relative paths)
 * 
 * Accessibility best practices:
 * - <nav aria-label="Breadcrumb"> (not aria-label="breadcrumb navigation")
 * - aria-current="page" on current item (not aria-current="true")
 * - Separators MUST be CSS-only or aria-hidden="true"
 * - Use <ol> (ordered) not <ul> (unordered)
 * - Current page is NOT a link (it's where you are)
 * - Ensure 4.5:1 contrast for link text
 * - Minimum 44px touch targets on mobile
 * 
 * When to add JavaScript:
 * - ARIA validation/fixing
 * - JSON-LD schema injection (SEO)
 * - Path truncation for long breadcrumbs
 * - Auto-generation from URL
 * - Analytics tracking
 * 
 * When NOT to add JavaScript:
 * - Visual styling (use CSS)
 * - Separator characters (use CSS ::after)
 * - Hover effects (use CSS :hover)
 * - Responsive layout (use CSS flexbox)
 * - Basic link behavior (use native <a>)
 */
```

---

## How These Breadcrumbs Annotations Help Claude:

### **1. Separator Style Recognition:**
Claude can identify which separator to apply:
- "Figma shows › chevron separator → Gap: Apply .separator-chevron class"
- "Figma shows → arrow separator → Gap: Apply .separator-arrow class"
- "Figma shows • dot separator → Gap: Apply .separator-dot class"
- "Figma shows | pipe separator → Gap: Apply .separator-pipe class"

### **2. Variant Detection:**
Claude can identify breadcrumb styling:
- "Figma shows pill/tag backgrounds → Gap: Apply .pill class"
- "Figma shows compact small breadcrumbs → Gap: Apply .compact class"
- "Figma shows bold current page → Gap: Apply .bold-current class"
- "Figma shows truncated path with … → Gap: Apply .truncated class + uncomment truncation JS"

### **3. Markup Validation Recognition:**
Claude knows the critical HTML rules:
- "HTML uses <ul> not <ol> → Gap: Change to <ol> (order is semantically significant)"
- "Current page item is a link → Gap: JS automatically fixes, but HTML should use <span>"
- "Separators are in HTML markup → Gap: Remove from HTML, use CSS ::after instead"

### **4. SEO Feature Awareness:**
Claude knows JSON-LD is always needed:
- "No structured data → Gap: JS automatically injects BreadcrumbList schema"
- "Schema must match visual breadcrumbs → Gap: JS generates from actual DOM links"

### **5. Minimal JavaScript Recognition:**
Claude knows the scope of JS needed:
- "Figma shows static breadcrumbs → Gap: Minimal JS (ARIA + schema only)"
- "Figma shows 5+ item path with ellipsis → Gap: Uncomment truncation code"
- "Figma shows breadcrumbs updating dynamically → Gap: Uncomment URL generation"

---

## Update Claude Explains Scoring Agent Prompt:

Add Breadcrumbs to the reference patterns:
```
REFERENCE CODE PATTERNS AVAILABLE:

You have access to annotated boilerplate code for these block types:
1.  **Hero Block** (hero.css, hero.js)
2.  **Cards Block** (cards.css, cards.js)
3.  **Headings Block** (headings.css, headings.js)
4.  **Icons Block** (icons.css, icons.js)
5.  **Lists Block** (lists.css, lists.js)
6.  **Buttons Block** (buttons.css, buttons.js)
7.  **Text Block** (text.css, text.js)
8.  **Images Block** (images.css, images.js)
9.  **Links Block** (links.css, links.js)
10. **Columns Block** (columns.css, columns.js)
11. **Table Block** (table.css, table.js)
12. **Video Block** (video.css, video.js)
13. **Accordion Block** (accordion.css, accordion.js)
14. **Breadcrumbs Block** (breadcrumbs.css, breadcrumbs.js)
    - Separators: slash / (default), chevron ›, arrow →, dot •, pipe |
    - Variants: default, pill (background on each item), compact, large, bold-current
    - CRITICAL markup: <nav aria-label="Breadcrumb"> + <ol> + aria-current="page"
    - CRITICAL: Separators in CSS only (NOT in HTML)
    - CRITICAL: Current page is <span> NOT <a>
    - JavaScript: ARIA validation + JSON-LD schema (always), truncation (optional)

When comparing Figma to matched block (e.g., breadcrumbs-none-900.png):
- Check separator style (/, ›, →, •, |, none)
- Check variant (default, pill, compact, large)
- Check if current page is bold
- Check if long path is truncated with ellipsis
- Check text size (12px compact, 14-16px default, 16px+ large)
- Check if pill backgrounds present on items
- Check spacing between items

Example for Breadcrumbs:
"The matched block (breadcrumbs-none-900.png) follows standard breadcrumb patterns:
- Forward slash separator (from CSS annotations - default)
- Default size (14px mobile → 16px desktop, from CSS)
- Plain text links, muted current page (from CSS)
- No pill backgrounds (from CSS)
- ARIA + JSON-LD schema (from JS - always)

The Figma frame shows:
- Chevron › separator → Gap: Apply .separator-chevron class
- Pill style with backgrounds → Gap: Apply .pill class
- Bold current page → Gap: Apply .bold-current class
- Long path with ellipsis → Gap: Apply .truncated class + uncomment truncation JS
- Compact size → Gap: Apply .compact class

These differences suggest..."