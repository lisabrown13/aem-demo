/**
 * EDS Block: Buttons
 * Decorator function for buttons block
 * 
 * XMP METADATA CONTEXT:
 * - Block Type: button (eds:blockType=button)
 * - JavaScript Complexity: Very Low (minimal JS needed)
 * - Typical Interactions: Click tracking, ripple effects, loading states
 * - Performance: Lightweight, minimal JavaScript
 * 
 * EXPECTED FUNCTIONALITY (based on XMP metadata):
 * - Usually minimal JavaScript needed (CSS handles most styling)
 * - Optional: Ripple effect on click (Material Design style)
 * - Optional: Loading state for async actions
 * - Optional: Click tracking/analytics
 * - Ensure proper keyboard support (handled by HTML)
 * 
 * PERFORMANCE REQUIREMENTS:
 * - Keep interactions lightweight (CSS preferred)
 * - Debounce rapid clicks if needed
 * - Respect prefers-reduced-motion for animations
 * 
 * ACCESSIBILITY REQUIREMENTS (from XMP metadata):
 * - Ensure buttons are keyboard accessible (native elements)
 * - Maintain focus management
 * - Announce loading states to screen readers
 */

/**
 * XMP Context: EDS Block Decorator Pattern
 * @param {Element} block - The buttons block element (.buttons.block)
 * @returns {Element} - The decorated block
 * 
 * NOTE: Most buttons blocks need minimal JavaScript
 * Native HTML buttons are already interactive
 */
export default function decorate(block) {
  /**
   * XMP Context: Get all buttons in the block
   */
  const buttons = block.querySelectorAll('.button');
  
  // XMP: If no buttons, return early
  if (buttons.length === 0) {
    return block;
  }
  
  /**
   * XMP Functionality: Ensure Proper Button Semantics
   * Make sure buttons have correct ARIA attributes
   */
  buttons.forEach((button) => {
    // XMP Accessibility: Check if button has accessible text
    const hasText = button.textContent.trim().length > 0;
    const hasAriaLabel = button.hasAttribute('aria-label');
    const hasTitle = button.hasAttribute('title');
    
    // XMP: Icon-only buttons must have aria-label
    if (!hasText && !hasAriaLabel && !hasTitle) {
      console.warn('Button has no accessible text:', button);
    }
    
    // XMP Accessibility: Ensure buttons are keyboard focusable
    // (Native buttons and links already are, but check just in case)
    if (button.tagName !== 'BUTTON' && button.tagName !== 'A') {
      // XMP: Non-semantic button needs role and tabindex
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
      
      // XMP: Add keyboard support (Enter and Space)
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    }
  });
  
  /**
   * XMP Optional: Ripple Effect on Click
   * Material Design-style ripple animation
   * Only uncomment if Figma frame shows this effect
   */
  /*
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    buttons.forEach((button) => {
      // XMP: Skip if button is disabled
      if (button.disabled || button.classList.contains('disabled')) {
        return;
      }
      
      button.addEventListener('click', function(e) {
        // XMP: Create ripple element
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        // XMP: Position ripple at click point
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // XMP: Add ripple to button
        button.appendChild(ripple);
        
        // XMP: Remove ripple after animation (600ms)
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // XMP: Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
      .button {
        position: relative;
        overflow: hidden;
      }
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 600ms ease-out;
        pointer-events: none;
      }
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  */
  
  /**
   * XMP Optional: Loading State for Async Buttons
   * Show spinner and disable button during async operations
   * Only uncomment if Figma shows loading states
   */
  /*
  buttons.forEach((button) => {
    // XMP: Check if button triggers async action (data-loading attribute)
    if (button.dataset.loading === 'true') {
      
      button.addEventListener('click', async function(e) {
        // XMP: Prevent default if it's a link
        if (button.tagName === 'A') {
          e.preventDefault();
        }
        
        // XMP: Save original button content
        const originalContent = button.innerHTML;
        
        // XMP: Set loading state
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
        
        // XMP: Show spinner
        button.innerHTML = `
          <span class="spinner" aria-hidden="true"></span>
          <span class="sr-only">Loading...</span>
        `;
        
        try {
          // XMP: Simulate async action (replace with actual logic)
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // XMP: Success - could show checkmark briefly
          button.innerHTML = '✓ Success';
          
          setTimeout(() => {
            // XMP: Restore original content
            button.innerHTML = originalContent;
            button.disabled = false;
            button.removeAttribute('aria-busy');
          }, 1000);
          
        } catch (error) {
          // XMP: Error state
          button.innerHTML = '✗ Error';
          
          setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
            button.removeAttribute('aria-busy');
          }, 2000);
        }
      });
    }
  });
  */
  
  /**
   * XMP Optional: Click Tracking / Analytics
   * Track button clicks for analytics
   * Only uncomment if analytics are needed
   */
  /*
  buttons.forEach((button) => {
    button.addEventListener('click', function() {
      // XMP: Get button label for tracking
      const label = button.getAttribute('aria-label') || 
                    button.textContent.trim() || 
                    'Unknown button';
      
      // XMP: Get button type for categorization
      const type = button.classList.contains('primary') ? 'primary' :
                   button.classList.contains('secondary') ? 'secondary' :
                   button.classList.contains('tertiary') ? 'tertiary' : 'default';
      
      // XMP: Track event (replace with actual analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'button_click', {
          button_label: label,
          button_type: type,
          button_location: block.dataset.blockName || 'unknown'
        });
      }
      
      console.log('Button clicked:', {
        label,
        type,
        element: button
      });
    });
  });
  */
  
  /**
   * XMP Optional: Prevent Double-Click
   * Debounce rapid button clicks
   * Only uncomment if double-click is a problem
   */
  /*
  buttons.forEach((button) => {
    let isClicked = false;
    
    button.addEventListener('click', function(e) {
      // XMP: Prevent rapid double-clicks
      if (isClicked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // XMP: Set clicked flag
      isClicked = true;
      
      // XMP: Reset after 500ms
      setTimeout(() => {
        isClicked = false;
      }, 500);
    });
  });
  */
  
  /**
   * XMP Optional: Smooth Scroll for Anchor Links
   * If buttons link to anchors on same page, add smooth scroll
   */
  const anchorButtons = block.querySelectorAll('a.button[href^="#"]');
  
  if (anchorButtons.length > 0) {
    anchorButtons.forEach((button) => {
      button.addEventListener('click', function(e) {
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
  
  // XMP Pattern: Always return the decorated block (EDS requirement)
  return block;
}

/*
 * XMP METADATA SUMMARY FOR AI AGENTS:
 * 
 * This JavaScript file provides:
 * - Accessibility checks (ensure buttons have labels)
 * - Keyboard support for non-semantic buttons
 * - Smooth scroll for anchor link buttons (default behavior)
 * - Optional: Ripple effect on click (commented out)
 * - Optional: Loading state for async actions (commented out)
 * - Optional: Click tracking/analytics (commented out)
 * - Optional: Double-click prevention (commented out)
 * 
 * IMPORTANT: Most buttons blocks need minimal JavaScript
 * Native HTML <button> and <a> elements handle most interactions
 * 
 * If the Figma frame requires JavaScript:
 * - Check if buttons show ripple effect → Uncomment ripple code
 * - Check if buttons have loading states → Uncomment loading code
 * - Check if analytics tracking needed → Uncomment tracking code
 * - Check if double-click is a concern → Uncomment debounce code
 * - Check if buttons trigger modals/overlays → Add custom handlers
 * 
 * Common gaps to look for:
 * - Figma shows ripple on click → Uncomment ripple effect
 * - Figma shows spinner during loading → Uncomment loading state
 * - Figma shows success/error states → Uncomment async handling
 * - Buttons link to anchors → Smooth scroll already implemented
 * - Buttons open modals → Add modal trigger logic
 * 
 * 90% of the time, buttons need only:
 * - Proper HTML (semantic <button> or <a>)
 * - CSS for styling (in buttons.css)
 * - Minimal JS for smooth scroll (already included)
 * 
 * Performance best practices:
 * - Use CSS for hover/active states (not JS)
 * - Use native button elements (built-in accessibility)
 * - Debounce rapid clicks if needed
 * - Always check prefers-reduced-motion for animations
 * - Keep click handlers lightweight
 * 
 * Accessibility best practices:
 * - Use <button> for actions, <a> for navigation
 * - Ensure all buttons have accessible text (textContent or aria-label)
 * - Maintain visible focus indicators (CSS handles this)
 * - Announce loading states with aria-busy
 * - Don't disable buttons unnecessarily (affects keyboard users)
 * - Icon-only buttons MUST have aria-label
 * - Ensure 44x44px minimum touch target (CSS handles this)
 * 
 * Button states to handle:
 * - Default: Normal appearance
 * - Hover: Visual feedback (CSS)
 * - Focus: Visible outline (CSS)
 * - Active: Pressed appearance (CSS)
 * - Disabled: Reduced opacity, no interactions
 * - Loading: Spinner, aria-busy="true" (optional)
 * 
 * When to use JavaScript:
 * - Form submission with validation
 * - Async actions (API calls, file uploads)
 * - Analytics/tracking
 * - Opening modals/dialogs
 * - Complex interactions (multi-step forms)
 * 
 * When NOT to use JavaScript:
 * - Simple navigation (use <a> href)
 * - Visual styling (use CSS)
 * - Hover effects (use CSS :hover)
 * - Focus states (use CSS :focus)
 */
```

---

## How These Buttons Annotations Help Claude:

### **1. Button Variant Recognition:**
Claude can identify which button style to use:
- "Figma shows filled blue button → Gap: Apply .button.primary class"
- "Figma shows outline button → Gap: Apply .button.secondary class"
- "Figma shows text-only link → Gap: Apply .button.tertiary class"
- "Figma shows white outline on dark bg → Gap: Apply .button.ghost class"

### **2. Size Detection:**
Claude can identify size variants:
- "Figma shows larger button (taller, wider) → Gap: Apply .button.large class"
- "Figma shows compact button → Gap: Apply .button.small class"

### **3. Icon Integration:**
Claude can detect icon placement:
- "Figma shows icon before text → Gap: Add .icon element (default left position)"
- "Figma shows icon after text → Gap: Add .icon element + .icon-right class"
- "Figma shows icon-only button → Gap: Apply .button.icon-only class"

### **4. Layout Patterns:**
Claude can identify button grouping:
- "Figma shows two buttons side-by-side → Gap: Wrap in .button-group"
- "Figma shows stacked buttons on mobile → Gap: Apply .button-group.stacked"

### **5. Minimal JavaScript Recognition:**
Claude knows when NOT to add JavaScript:
- "Figma shows static buttons → Gap: Minimal JS needed (smooth scroll only)"
- "Figma shows ripple effect → Gap: Uncomment ripple code"
- "Figma shows loading spinner → Gap: Uncomment loading state code"

---

## Update Claude Explains Scoring Agent Prompt:

Add Buttons to the reference patterns:
```
REFERENCE CODE PATTERNS AVAILABLE:

You have access to annotated boilerplate code for these block types:
1. **Hero Block** (hero.css, hero.js)
2. **Cards Block** (cards.css, cards.js)
3. **Headings Block** (headings.css, headings.js)
4. **Icons Block** (icons.css, icons.js)
5. **Lists Block** (lists.css, lists.js)
6. **Buttons Block** (buttons.css, buttons.js)
   - Variants: primary (filled), secondary (outline), tertiary (text), ghost (transparent)
   - Sizes: small, default, large
   - Icon support: left, right, icon-only
   - Minimal JavaScript needed (native HTML handles most)
   - Default padding: 0.875rem/1.75rem → 1.125rem/2.25rem (mobile → desktop)

When comparing Figma to matched block (e.g., button-none-900.png):
- Check button variant (primary, secondary, tertiary, ghost)
- Check button size (small, default, large)
- Check if icons present (left, right, or icon-only)
- Check padding and border-radius
- Check hover/focus states
- Check if JavaScript features needed (ripple, loading, etc.)

Example for Buttons:
"The matched block (button-none-900.png) follows standard button patterns:
- Primary button style with filled background (from CSS annotations)
- Default size: 1.125rem/2.25rem padding at desktop (from CSS)
- 0.25rem border-radius (from CSS)
- Smooth scroll for anchor links (from JS)

The Figma frame shows:
- Outline button style → Gap: Apply .button.secondary class
- Larger size → Gap: Apply .button.large class
- Icon after text → Gap: Add .icon element with .icon-right class
- Ripple effect on click → Gap: Uncomment ripple code in JS

These differences suggest..."