/**
 * EDS Block: Text
 * Decorator function for text block
 * 
 * XMP METADATA CONTEXT:
 * - Block Type: text (eds:blockType=text)
 * - JavaScript Complexity: Very Low (usually NO JS needed)
 * - Typical Interactions: Optional reading time estimate, optional copy code button
 * - Performance: Lightweight, minimal or no JavaScript
 * 
 * EXPECTED FUNCTIONALITY (based on XMP metadata):
 * - Usually NO JavaScript needed (pure CSS block)
 * - Optional: Reading time estimate
 * - Optional: Copy button for code blocks
 * - Optional: Smooth scroll for anchor links
 * - Optional: Table of contents generation from headings
 * 
 * MOST COMMON: This file is minimal or empty
 * Text blocks are semantic HTML that rarely need JavaScript
 * 
 * PERFORMANCE REQUIREMENTS:
 * - No JavaScript is the best performance
 * - If features needed, keep them lightweight
 * - Don't manipulate text content unnecessarily
 * 
 * ACCESSIBILITY REQUIREMENTS (from XMP metadata):
 * - Text structure must be semantic (handled in HTML)
 * - Maintain focus management for interactive elements
 * - Ensure added features are keyboard accessible
 */

/**
 * XMP Context: EDS Block Decorator Pattern
 * @param {Element} block - The text block element (.text.block)
 * @returns {Element} - The decorated block
 * 
 * NOTE: Most text blocks need NO JavaScript
 * This decorator exists for consistency and optional enhancements
 */
export default function decorate(block) {
  /**
   * XMP Context: Check if JavaScript is actually needed
   * Most text blocks are purely CSS and don't need JS decoration
   */
  
  // XMP: Get text content
  const textContent = block.querySelector('.text-content');
  
  // XMP: If no content, return early
  if (!textContent) {
    return block;
  }
  
  /**
   * XMP Optional: Reading Time Estimate
   * Calculate and display estimated reading time
   * Only uncomment if Figma frame shows this feature
   */
  /*
  const wordsPerMinute = 200; // Average reading speed
  const text = textContent.textContent || textContent.innerText;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // XMP: Create reading time indicator
  const readingTimeEl = document.createElement('div');
  readingTimeEl.className = 'reading-time';
  readingTimeEl.textContent = `${readingTime} min read`;
  readingTimeEl.setAttribute('aria-label', `Estimated reading time: ${readingTime} minutes`);
  
  // XMP: Insert at top of block
  block.insertBefore(readingTimeEl, block.firstChild);
  
  // XMP: Add CSS for reading time
  const style = document.createElement('style');
  style.textContent = `
    .reading-time {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
  */
  
  /**
   * XMP Optional: Copy Button for Code Blocks
   * Add "Copy" button to <pre><code> blocks
   * Only uncomment if Figma frame shows this feature
   */
  /*
  const codeBlocks = block.querySelectorAll('pre code');
  
  codeBlocks.forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    
    // XMP: Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    // XMP: Position button in top-right of code block
    pre.style.position = 'relative';
    pre.appendChild(copyButton);
    
    // XMP: Click handler to copy code
    copyButton.addEventListener('click', async () => {
      try {
        // XMP: Copy code to clipboard
        await navigator.clipboard.writeText(codeBlock.textContent);
        
        // XMP: Show success feedback
        copyButton.textContent = '✓ Copied';
        
        // XMP: Reset button after 2 seconds
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
        
      } catch (error) {
        console.error('Failed to copy code:', error);
        copyButton.textContent = '✗ Failed';
        
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      }
    });
  });
  
  // XMP: Add CSS for copy button
  const style = document.createElement('style');
  style.textContent = `
    .copy-code-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.25rem 0.75rem;
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--text-inverse);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.25rem;
      font-size: 0.75rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .copy-code-button:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  `;
  document.head.appendChild(style);
  */
  
  /**
   * XMP Optional: Smooth Scroll for Anchor Links
   * If text contains links to anchors on same page, add smooth scroll
   */
  const anchorLinks = block.querySelectorAll('a[href^="#"]');
  
  if (anchorLinks.length > 0) {
    anchorLinks.forEach((link) => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // XMP Accessibility: Respect reduced motion preference
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
          
          // XMP: Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: scrollBehavior,
            block: 'start'
          });
          
          // XMP Accessibility: Set focus on target
          targetElement.focus({ preventScroll: true });
        }
      });
    });
  }
  
  /**
   * XMP Optional: External Link Icon
   * Add icon to external links (links to other domains)
   * Only uncomment if Figma shows external link indicators
   */
  /*
  const links = block.querySelectorAll('a[href^="http"]');
  const currentDomain = window.location.hostname;
  
  links.forEach((link) => {
    try {
      const linkDomain = new URL(link.href).hostname;
      
      // XMP: Check if link is external
      if (linkDomain !== currentDomain) {
        // XMP: Add external link indicator
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        // XMP: Add icon after link text
        const icon = document.createElement('span');
        icon.className = 'external-link-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = ' ↗';
        link.appendChild(icon);
        
        // XMP Accessibility: Update aria-label
        const originalLabel = link.getAttribute('aria-label') || link.textContent;
        link.setAttribute('aria-label', `${originalLabel} (opens in new tab)`);
      }
    } catch (error) {
      // Invalid URL, skip
    }
  });
  */
  
  /**
   * XMP Optional: Table of Contents Generation
   * Extract headings from text and create table of contents
   * Only uncomment if Figma shows ToC functionality
   */
  /*
  const headings = textContent.querySelectorAll('h2, h3');
  
  if (headings.length > 2) { // Only create ToC if 3+ headings
    // XMP: Create ToC container
    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.setAttribute('aria-label', 'Table of Contents');
    
    // XMP: Create ToC title
    const tocTitle = document.createElement('h2');
    tocTitle.textContent = 'Table of Contents';
    toc.appendChild(tocTitle);
    
    // XMP: Create ToC list
    const tocList = document.createElement('ol');
    
    headings.forEach((heading, index) => {
      // XMP: Generate ID for heading if it doesn't have one
      if (!heading.id) {
        const headingText = heading.textContent.trim();
        heading.id = headingText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      
      // XMP: Create ToC item
      const tocItem = document.createElement('li');
      const tocLink = document.createElement('a');
      tocLink.href = `#${heading.id}`;
      tocLink.textContent = heading.textContent;
      
      // XMP: Indent h3 items
      if (heading.tagName === 'H3') {
        tocItem.style.marginLeft = '1.5rem';
      }
      
      tocItem.appendChild(tocLink);
      tocList.appendChild(tocItem);
    });
    
    toc.appendChild(tocList);
    
    // XMP: Insert ToC at top of text content
    textContent.insertBefore(toc, textContent.firstChild);
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
 * - Minimal or NO JavaScript (text is pure HTML/CSS)
 * - Smooth scroll for anchor links (default behavior)
 * - Optional: Reading time estimate (commented out)
 * - Optional: Copy button for code blocks (commented out)
 * - Optional: External link icons (commented out)
 * - Optional: Table of contents generation (commented out)
 * 
 * IMPORTANT: 98% of text blocks DO NOT need JavaScript
 * This file exists for:
 * 1. Consistency with EDS decorator pattern
 * 2. Optional enhancements if Figma shows them
 * 3. Edge cases where text needs interactivity
 * 
 * If the Figma frame requires JavaScript:
 * - Check if reading time is displayed → Uncomment reading time code
 * - Check if code blocks have copy button → Uncomment copy button code
 * - Check if external links have icons → Uncomment external link code
 * - Check if table of contents is present → Uncomment ToC code
 * - Check if text has interactive elements → Add custom handlers
 * 
 * Common gaps to look for:
 * - Figma shows reading time → Uncomment reading time estimate
 * - Figma shows copy button on code → Uncomment copy code button
 * - Figma shows external link icons → Uncomment external link code
 * - Figma shows table of contents → Uncomment ToC generation
 * - Figma shows footnotes/references → Add footnote logic
 * 
 * 99% of the time, the correct code for text.js is:
 * 
 * export default function decorate(block) {
 *   // Smooth scroll for anchor links (minimal enhancement)
 *   const anchorLinks = block.querySelectorAll('a[href^="#"]');
 *   // ... smooth scroll code ...
 *   return block;
 * }
 * 
 * Only add JavaScript if Figma explicitly shows interactive features.
 * 
 * Performance best practices:
 * - Default to NO JavaScript (best performance)
 * - Use CSS for styling (not JS)
 * - Don't manipulate text content unnecessarily
 * - If reading time needed, calculate once (don't recalculate)
 * - If copying code, use Clipboard API (modern browsers)
 * - Always check prefers-reduced-motion for scroll animations
 * 
 * Accessibility reminders:
 * - Use semantic HTML (<p>, <strong>, <em>, <blockquote>)
 * - Links must be underlined (handled in CSS)
 * - External links should open in new tab (target="_blank")
 * - Add rel="noopener noreferrer" to external links
 * - Ensure code blocks have proper contrast
 * - If adding ToC, use <nav> with aria-label
 * - If adding copy button, include aria-label
 * - Maintain heading hierarchy (h1 → h2 → h3)
 * 
 * When to add JavaScript:
 * - Reading time indicator requested
 * - Copy code button requested
 * - Table of contents requested
 * - Interactive footnotes/references
 * - Text highlighting/annotation
 * 
 * When NOT to add JavaScript:
 * - Simple text formatting (use HTML/CSS)
 * - Links (use <a> href)
 * - Emphasis (use <strong>, <em>)
 * - Quotes (use <blockquote>)
 * - Code (use <code>, <pre>)
 */
```

---

## How These Text Annotations Help Claude:

### **1. Typography Scale Recognition:**
Claude can identify font size differences:
- "Figma shows 20px body text, code shows 18px desktop → Gap: Increase font-size to 1.25rem"
- "Figma shows tighter line height (1.4), code shows 1.8 → Gap: Adjust line-height"

### **2. Content Width Detection:**
Claude can identify max-width constraints:
- "Figma shows narrower content (40rem), code shows 60rem → Gap: Reduce max-width for tighter reading column"
- "Figma shows full-width text → Gap: Remove max-width constraint"

### **3. Rich Text Element Recognition:**
Claude can detect formatting elements:
- "Figma shows quoted text → Gap: Use <blockquote> element with border accent"
- "Figma shows code snippets → Gap: Use <code> for inline or <pre> for blocks"
- "Figma shows highlighted text → Gap: Use <mark> element"

### **4. Minimal JavaScript Detection:**
Claude knows when NOT to add JavaScript:
- "Figma shows static text → Gap: No JavaScript needed (smooth scroll for anchors only)"
- "Figma shows reading time indicator → Gap: Uncomment reading time code"
- "Figma shows copy button on code → Gap: Uncomment copy button code"

### **5. Theme and Alignment:**
Claude can identify text presentation:
- "Figma shows centered text → Gap: Add .text-center class"
- "Figma shows dark background → Gap: Apply .dark theme"
- "Figma shows drop cap on first letter → Gap: Add .drop-cap class to first paragraph"

---

## Update Claude Explains Scoring Agent Prompt:

Add Text to the reference patterns:
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
   - Optimal reading typography (16px → 18px, line-height 1.6-1.8)
   - Constrained width (50-60rem for readability)
   - Rich text support (blockquotes, code, links, emphasis)
   - Usually NO JavaScript needed (pure CSS)
   - Default: left-aligned, max 960px width

When comparing Figma to matched block (e.g., text-none-900.png):
- Check text size (16px, 17px, 18px at different breakpoints)
- Check line height (should be 1.6-1.8 for readability)
- Check max width (50-60rem for optimal line length)
- Check paragraph spacing (1.25-1.5rem between paragraphs)
- Check if rich text elements present (blockquotes, code, etc.)
- Check alignment (left, center, right)
- Check if JavaScript features needed (usually NOT)

Example for Text:
"The matched block (text-none-900.png) follows standard text patterns:
- 18px body text at desktop (from CSS annotations)
- 1.8 line height for readability (from CSS)
- 60rem max width (from CSS)
- Left-aligned by default (from CSS)
- Smooth scroll for anchor links (from JS - minimal)

The Figma frame shows:
- Larger text (20px) → Gap: Increase font-size to 1.25rem
- Tighter line height (1.5) → Gap: Adjust to 1.5 (ensure readability)
- Centered text → Gap: Add .text-center class
- Blockquote with left border → Gap: Ensure blockquote styles applied
- No JavaScript features → Gap: No JavaScript needed (correct)

These differences suggest..."