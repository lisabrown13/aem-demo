/**
 * EDS Block: Links
 * Decorator function for links block
 * 
 * XMP METADATA CONTEXT:
 * - Block Type: links (eds:blockType=links)
 * - JavaScript Complexity: Very Low (minimal JS needed)
 * - Typical Interactions: Smooth scroll for anchor links, external link handling
 * - Performance: Lightweight, minimal JavaScript
 * 
 * EXPECTED FUNCTIONALITY (based on XMP metadata):
 * - Usually minimal JavaScript needed (CSS handles most styling)
 * - Smooth scroll for anchor links (#hash)
 * - Add external link attributes (target, rel)
 * - Optional: Click tracking/analytics
 * - Optional: Tooltip for link descriptions
 * 
 * PERFORMANCE REQUIREMENTS:
 * - Keep interactions lightweight
 * - Don't manipulate links unnecessarily
 * - Respect prefers-reduced-motion for smooth scroll
 * 
 * ACCESSIBILITY REQUIREMENTS (from XMP metadata):
 * - Ensure links are keyboard accessible (native <a> elements)
 * - External links should announce they open in new tab
 * - Maintain focus management
 */

/**
 * XMP Context: EDS Block Decorator Pattern
 * @param {Element} block - The links block element (.links.block)
 * @returns {Element} - The decorated block
 * 
 * NOTE: Most links blocks need minimal JavaScript
 * Native HTML links are already interactive
 */
export default function decorate(block) {
  /**
   * XMP Context: Get all links in the block
   */
  const links = block.querySelectorAll('a');
  
  // XMP: If no links, return early
  if (links.length === 0) {
    return block;
  }
  
  /**
   * XMP Functionality: Handle External Links
   * Add target="_blank" and rel attributes to external links
   * Ensure security and accessibility
   */
  const currentDomain = window.location.hostname;
  
  links.forEach((link) => {
    try {
      const url = new URL(link.href);
      const linkDomain = url.hostname;
      
      // XMP: Check if link is external
      if (linkDomain && linkDomain !== currentDomain) {
        // XMP: Open in new tab
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank');
        }
        
        // XMP Security: Prevent window.opener access
        if (!link.hasAttribute('rel')) {
          link.setAttribute('rel', 'noopener noreferrer');
        } else {
          // XMP: Append to existing rel
          const rel = link.getAttribute('rel');
          if (!rel.includes('noopener')) {
            link.setAttribute('rel', `${rel} noopener noreferrer`);
          }
        }
        
        // XMP Accessibility: Add class for styling (external icon)
        link.classList.add('external');
        
        // XMP Accessibility: Update aria-label if not present
        if (!link.hasAttribute('aria-label')) {
          const linkText = link.textContent.trim();
          link.setAttribute('aria-label', `${linkText} (opens in new tab)`);
        }
      }
    } catch (error) {
      // XMP: Invalid URL or relative link, skip
      console.debug('Could not parse link URL:', link.href);
    }
  });
  
  /**
   * XMP Functionality: Smooth Scroll for Anchor Links
   * If links point to anchors on same page, add smooth scroll
   */
  const anchorLinks = block.querySelectorAll('a[href^="#"]');
  
  if (anchorLinks.length > 0) {
    // XMP Accessibility: Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    anchorLinks.forEach((link) => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // XMP Accessibility: Respect reduced motion
          const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
          
          // XMP: Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: scrollBehavior,
            block: 'start'
          });
          
          // XMP Accessibility: Set focus on target
          targetElement.focus({ preventScroll: true });
          
          // XMP: Update URL hash
          window.history.pushState(null, '', `#${targetId}`);
        }
      });
    });
  }
  
  /**
   * XMP Optional: Click Tracking / Analytics
   * Track link clicks for analytics
   * Only uncomment if analytics are needed
   */
  /*
  links.forEach((link) => {
    link.addEventListener('click', function() {
      // XMP: Get link details for tracking
      const linkText = this.textContent.trim();
      const linkUrl = this.href;
      const isExternal = this.classList.contains('external');
      
      // XMP: Track event (replace with actual analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'link_click', {
          link_text: linkText,
          link_url: linkUrl,
          link_type: isExternal ? 'external' : 'internal',
          block_type: 'links'
        });
      }
      
      console.log('Link clicked:', {
        text: linkText,
        url: linkUrl,
        external: isExternal
      });
    });
  });
  */
  
  /**
   * XMP Optional: Tooltip for Link Descriptions
   * Show tooltip on hover with link description
   * Only uncomment if Figma shows tooltip functionality
   */
  /*
  const linksWithDesc = block.querySelectorAll('.link-item.with-description');
  
  linksWithDesc.forEach((linkItem) => {
    const link = linkItem.querySelector('a');
    const description = linkItem.querySelector('.link-description');
    
    if (link && description) {
      // XMP: Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'link-tooltip';
      tooltip.textContent = description.textContent;
      tooltip.style.display = 'none';
      
      linkItem.appendChild(tooltip);
      
      // XMP: Show tooltip on hover
      link.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
      });
      
      link.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
    }
  });
  
  // XMP: Add CSS for tooltip
  const style = document.createElement('style');
  style.textContent = `
    .link-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      white-space: nowrap;
      margin-bottom: 0.5rem;
      z-index: 10;
    }
    .link-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 6px solid transparent;
      border-top-color: rgba(0, 0, 0, 0.9);
    }
  `;
  document.head.appendChild(style);
  */
  
  /**
   * XMP Optional: Download Link Handling
   * Add file type and size indicators to download links
   * Only uncomment if Figma shows download link metadata
   */
  /*
  const downloadLinks = block.querySelectorAll('a[download], a[href$=".pdf"], a[href$=".zip"], a[href$=".doc"], a[href$=".docx"]');
  
  downloadLinks.forEach((link) => {
    // XMP: Get file extension
    const href = link.getAttribute('href');
    const extension = href.split('.').pop().toUpperCase();
    
    // XMP: Add file type indicator
    if (!link.querySelector('.file-type')) {
      const fileType = document.createElement('span');
      fileType.className = 'file-type';
      fileType.textContent = ` (${extension})`;
      link.appendChild(fileType);
    }
    
    // XMP: Add download icon
    link.classList.add('download-link');
    
    // XMP Accessibility: Update aria-label
    const linkText = link.textContent.trim();
    link.setAttribute('aria-label', `Download ${linkText}`);
  });
  */
  
  /**
   * XMP Optional: Broken Link Checker (Development Only)
   * Check for broken links and log warnings
   * Only use in development, not production
   */
  /*
  if (window.location.hostname === 'localhost') {
    links.forEach(async (link) => {
      const href = link.getAttribute('href');
      
      // Skip anchor links and external links
      if (href.startsWith('#') || href.startsWith('http')) {
        return;
      }
      
      try {
        const response = await fetch(href, { method: 'HEAD' });
        
        if (!response.ok) {
          console.warn('Broken link detected:', href, 'Status:', response.status);
          link.style.color = 'red';
          link.setAttribute('title', `Broken link (${response.status})`);
        }
      } catch (error) {
        console.warn('Could not check link:', href, error);
      }
    });
  }
  */
  
  // XMP Pattern: Always return the decorated block (EDS requirement)
  return block;
}

/*
 * XMP METADATA SUMMARY FOR AI AGENTS:
 * 
 * This JavaScript file provides:
 * - External link handling (target="_blank", rel="noopener noreferrer")
 * - Smooth scroll for anchor links (default behavior)
 * - External link accessibility (aria-label updates)
 * - Optional: Click tracking/analytics (commented out)
 * - Optional: Tooltip for descriptions (commented out)
 * - Optional: Download link indicators (commented out)
 * - Optional: Broken link checker for dev (commented out)
 * 
 * IMPORTANT: Most links blocks need minimal JavaScript
 * Native HTML <a> elements handle most interactions
 * 
 * Default behavior (always included):
 * - External links get target="_blank" + rel="noopener noreferrer"
 * - External links get .external class for CSS styling
 * - External links get aria-label with "(opens in new tab)"
 * - Anchor links (#hash) get smooth scroll
 * 
 * If the Figma frame requires JavaScript:
 * - Check if analytics tracking needed → Uncomment tracking code
 * - Check if tooltips shown → Uncomment tooltip code
 * - Check if download metadata shown → Uncomment download code
 * - Check if custom link interactions → Add custom handlers
 * 
 * Common gaps to look for:
 * - Figma shows external link icons → CSS handles this (.external class)
 * - Figma shows tooltips → Uncomment tooltip code
 * - Figma shows file type indicators → Uncomment download code
 * - Links to anchors → Smooth scroll already implemented
 * - Analytics needed → Uncomment tracking code
 * 
 * 95% of the time, links need only:
 * - Proper HTML (<a href="...">)
 * - CSS for styling (in links.css)
 * - Minimal JS for external links + smooth scroll (already included)
 * 
 * Performance best practices:
 * - Use native <a> elements (built-in accessibility)
 * - Don't intercept link clicks unnecessarily
 * - Use CSS for hover/active states (not JS)
 * - Respect prefers-reduced-motion for smooth scroll
 * - Keep click handlers lightweight
 * 
 * Accessibility best practices:
 * - Use <a> for navigation (not <button> or <div>)
 * - All links must have accessible text (textContent or aria-label)
 * - External links should announce they open in new tab
 * - Maintain visible focus indicators (CSS handles this)
 * - Don't remove underlines (primary link affordance)
 * - Use descriptive link text (not "click here")
 * - Skip links for keyboard navigation to main content
 * - Ensure 44x44px minimum touch target (CSS handles this)
 * 
 * Link types and handling:
 * - Internal links: Standard navigation
 * - External links: target="_blank" + rel="noopener noreferrer"
 * - Anchor links: Smooth scroll to target
 * - Download links: Add download attribute, file type indicator
 * - Email links: <a href="mailto:...">
 * - Phone links: <a href="tel:...">
 * 
 * Security considerations:
 * - External links MUST have rel="noopener noreferrer"
 * - Prevents window.opener attacks (tabnabbing)
 * - Always validate/sanitize user-generated links
 * 
 * When to add JavaScript:
 * - Analytics/tracking
 * - Tooltips or popovers
 * - Download metadata (file type, size)
 * - Complex navigation (mega menus)
 * - Lazy loading of link targets
 * 
 * When NOT to add JavaScript:
 * - Simple navigation (use <a> href)
 * - Visual styling (use CSS)
 * - Hover effects (use CSS :hover)
 * - Focus states (use CSS :focus)
 * - External link icons (use CSS ::after)
 */
```

---

## How These Links Annotations Help Claude:

### **1. Link Variant Recognition:**
Claude can identify which link style to use:
- "Figma shows arrow after links → Gap: Apply .arrow-links class"
- "Figma shows links styled as cards → Gap: Apply .card-links class"
- "Figma shows links styled as buttons → Gap: Apply .button-links class"
- "Figma shows breadcrumb navigation → Gap: Apply .breadcrumb class"

### **2. Layout Pattern Detection:**
Claude can identify link arrangements:
- "Figma shows links in horizontal row → Gap: Apply .horizontal class"
- "Figma shows links in 3-column grid → Gap: Apply .grid class"
- "Figma shows dividers between links → Gap: Apply .dividers class"

### **3. Additional Elements Recognition:**
Claude can detect extra components:
- "Figma shows description text below links → Gap: Add .link-description elements with .with-description class"
- "Figma shows icons before links → Gap: Add .link-icon elements with SVG"
- "Figma shows external link indicators → Gap: JavaScript adds automatically, CSS styles with ::after"

### **4. Minimal JavaScript Recognition:**
Claude knows the default behavior:
- "Figma shows static links → Gap: Minimal JS needed (external link handling + smooth scroll)"
- "Figma shows tooltips on hover → Gap: Uncomment tooltip code"
- "Figma shows file type indicators → Gap: Uncomment download code"

---

## Update Claude Explains Scoring Agent Prompt:

Add Links to the reference patterns:
```
REFERENCE CODE PATTERNS AVAILABLE:

You have access to annotated boilerplate code for these block types:
1. **Hero Block** (hero.css, hero.js)
2. **Cards Block** (cards.css, cards.js)
3. **Headings Block** (headings.css, headings.js)
4. **Icons Block** (icons.css, icons.js)
5. **Lists Block** (lists.css, lists.js)
6. **Buttons Block** (buttons.css, buttons.js)
7. **Text Block** (text.css, text.js)
8. **Images Block** (images.css, images.js)
9. **Links Block** (links.css, links.js)
   - Layouts: vertical list (default), horizontal row, grid (2-3 columns), breadcrumb
   - Styles: plain (underlined), arrow (→), icon, card, button, divider
   - Descriptions: Optional subtitle/description below link
   - Default: 1rem spacing between links, underlined, brand color
   - JavaScript: external link handling (target="_blank"), smooth scroll for anchors

When comparing Figma to matched block (e.g., links-none-900.png):
- Check layout (vertical, horizontal, grid, breadcrumb)
- Check link style (plain, arrow, icon, card, button)
- Check if descriptions present (subtitle below link)
- Check if external link icons shown (↗)
- Check spacing between links (1-1.5rem)
- Check if dividers between links
- Check number of columns in grid layout

Example for Links:
"The matched block (links-none-900.png) follows standard link patterns:
- Vertical list layout (from CSS annotations)
- Plain underlined links (from CSS)
- Brand color with hover state (from CSS)
- 1rem spacing between links (from CSS)
- External link handling + smooth scroll (from JS)

The Figma frame shows:
- Horizontal layout → Gap: Apply .horizontal class
- Arrow after each link → Gap: Apply .arrow-links class
- Description text below links → Gap: Add .link-description elements with .with-description class
- Card-style with backgrounds → Gap: Apply .card-links class
- 3-column grid → Gap: Apply .grid class

These differences suggest..."