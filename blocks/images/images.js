/**
 * EDS Block: Images
 * Decorator function that adds interactivity to the images block
 * 
 * XMP METADATA CONTEXT:
 * - Block Type: images (eds:blockType=images)
 * - JavaScript Complexity: Low to Medium
 * - Typical Interactions: Lazy loading, lightbox, fade-in animation, carousel
 * - Performance: Must use IntersectionObserver for lazy loading and animations
 * 
 * EXPECTED FUNCTIONALITY (based on XMP metadata):
 * - Lazy load images when they enter viewport (performance)
 * - Optional: Fade-in animation on scroll
 * - Optional: Lightbox for full-screen image viewing
 * - Optional: Carousel/slideshow functionality
 * - Optional: Image zoom on hover
 * 
 * PERFORMANCE REQUIREMENTS:
 * - Lazy load images (IntersectionObserver or native loading="lazy")
 * - Use IntersectionObserver for animations
 * - Debounce resize events if needed
 * - Respect prefers-reduced-motion
 * 
 * ACCESSIBILITY REQUIREMENTS (from XMP metadata):
 * - Ensure all images have alt text (validation)
 * - Lightbox must be keyboard accessible (Esc to close, arrow keys to navigate)
 * - Focus management for modals
 * - Announce loading states to screen readers
 */

/**
 * XMP Context: EDS Block Decorator Pattern
 * @param {Element} block - The images block element (.images.block)
 * @returns {Element} - The decorated block
 */
export default function decorate(block) {
  /**
   * XMP Context: Get all images in the block
   */
  const images = block.querySelectorAll('img');
  
  // XMP: If no images, return early
  if (images.length === 0) {
    return block;
  }
  
  /**
   * XMP Functionality: Validate Alt Text
   * Ensure all images have alt attributes (accessibility)
   */
  images.forEach((img) => {
    // XMP Accessibility: Check if image has alt text
    if (!img.hasAttribute('alt')) {
      console.warn('Image missing alt text:', img.src);
      
      // XMP: Add empty alt for decorative images (better than nothing)
      img.setAttribute('alt', '');
    }
  });
  
  /**
   * XMP Functionality: Lazy Load Images
   * Load images when they enter the viewport (performance)
   * Modern browsers support loading="lazy", but we provide fallback
   */
  const lazyImages = block.querySelectorAll('img[data-src]');
  
  if (lazyImages.length > 0) {
    // XMP: Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
      /**
       * XMP Performance: Observe when images enter viewport
       * rootMargin: Start loading 200px before image is visible
       */
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // XMP: Load image from data-src attribute
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              
              // XMP: Load srcset if present
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
                img.removeAttribute('data-srcset');
              }
              
              // XMP: Add loaded class for CSS transitions
              img.classList.add('loaded');
            }
            
            // XMP Performance: Stop observing once loaded
            imageObserver.unobserve(img);
          }
        });
      }, {
        // XMP: Start loading when image is 10% visible
        threshold: 0.1,
        // XMP Performance: Start loading 200px before entering viewport
        rootMargin: '200px'
      });
      
      // XMP: Observe all lazy images
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // XMP Fallback: Load all images immediately if IntersectionObserver not supported
      lazyImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }
      });
    }
  }
  
  /**
   * XMP Optional: Fade-In Animation
   * Images fade in when they enter viewport
   * Only uncomment if Figma frame shows this effect
   */
  /*
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    const figures = block.querySelectorAll('figure');
    
    // XMP: Set initial state (invisible)
    figures.forEach(figure => {
      figure.style.opacity = '0';
      figure.style.transform = 'translateY(20px)';
    });
    
    // XMP Performance: Observe when images enter viewport
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const figure = entry.target;
          
          // XMP Animation: Fade in smoothly
          figure.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          figure.style.opacity = '1';
          figure.style.transform = 'translateY(0)';
          
          // XMP Performance: Stop observing once animated
          fadeObserver.unobserve(figure);
        }
      });
    }, {
      threshold: 0.2
    });
    
    // XMP: Observe all figures
    figures.forEach(figure => fadeObserver.observe(figure));
  }
  */
  
  /**
   * XMP Optional: Lightbox Functionality
   * Click image to view full-screen
   * Only uncomment if Figma shows clickable/zoomable images
   */
  /*
  if (block.classList.contains('lightbox')) {
    const figures = block.querySelectorAll('figure');
    
    figures.forEach((figure) => {
      const img = figure.querySelector('img');
      
      if (!img) return;
      
      // XMP: Make figure clickable
      figure.style.cursor = 'pointer';
      figure.setAttribute('tabindex', '0');
      figure.setAttribute('role', 'button');
      figure.setAttribute('aria-label', 'View full-size image');
      
      // XMP: Click handler to open lightbox
      const openLightbox = () => {
        // XMP: Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        
        // XMP: Create lightbox content
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        // XMP: Clone image for lightbox
        const lightboxImg = img.cloneNode(true);
        lightboxImg.style.maxWidth = '90vw';
        lightboxImg.style.maxHeight = '90vh';
        lightboxContent.appendChild(lightboxImg);
        
        // XMP: Add caption if present
        const caption = figure.querySelector('figcaption');
        if (caption) {
          const lightboxCaption = caption.cloneNode(true);
          lightboxContent.appendChild(lightboxCaption);
        }
        
        // XMP: Close button
        const closeButton = document.createElement('button');
        closeButton.className = 'lightbox-close';
        closeButton.textContent = '×';
        closeButton.setAttribute('aria-label', 'Close lightbox');
        lightboxContent.appendChild(closeButton);
        
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);
        
        // XMP Accessibility: Focus on close button
        closeButton.focus();
        
        // XMP: Close handlers
        const closeLightbox = () => {
          lightbox.remove();
          figure.focus(); // Return focus to trigger element
        };
        
        closeButton.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) closeLightbox();
        });
        
        // XMP Accessibility: Keyboard support (Esc to close)
        document.addEventListener('keydown', function escHandler(e) {
          if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escHandler);
          }
        });
      };
      
      // XMP: Click and keyboard support
      figure.addEventListener('click', openLightbox);
      figure.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox();
        }
      });
    });
    
    // XMP: Add CSS for lightbox
    const style = document.createElement('style');
    style.textContent = `
      .lightbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .lightbox-content {
        position: relative;
        text-align: center;
      }
      .lightbox-close {
        position: absolute;
        top: -2rem;
        right: -2rem;
        font-size: 3rem;
        color: white;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;
      }
      .lightbox-close:hover {
        color: #ccc;
      }
    `;
    document.head.appendChild(style);
  }
  */
  
  /**
   * XMP Optional: Image Zoom on Hover
   * Scale image slightly on hover (subtle effect)
   * Only uncomment if Figma shows this interaction
   */
  /*
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    images.forEach((img) => {
      img.style.transition = 'transform 0.3s ease';
      
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    });
  }
  */
  
  /**
   * XMP Optional: Carousel/Slideshow
   * Horizontal scrolling gallery with navigation
   * Only uncomment if Figma shows carousel functionality
   */
  /*
  if (block.classList.contains('carousel')) {
    const wrapper = block.querySelector('.images-wrapper');
    const figures = Array.from(wrapper.querySelectorAll('figure'));
    
    if (figures.length > 1) {
      // XMP: Set up carousel container
      wrapper.style.display = 'flex';
      wrapper.style.overflowX = 'auto';
      wrapper.style.scrollSnapType = 'x mandatory';
      wrapper.style.scrollBehavior = 'smooth';
      
      figures.forEach(figure => {
        figure.style.flexShrink = '0';
        figure.style.width = '100%';
        figure.style.scrollSnapAlign = 'start';
      });
      
      // XMP: Add navigation buttons
      const prevButton = document.createElement('button');
      prevButton.textContent = '‹';
      prevButton.className = 'carousel-prev';
      prevButton.setAttribute('aria-label', 'Previous image');
      
      const nextButton = document.createElement('button');
      nextButton.textContent = '›';
      nextButton.className = 'carousel-next';
      nextButton.setAttribute('aria-label', 'Next image');
      
      block.appendChild(prevButton);
      block.appendChild(nextButton);
      
      // XMP: Navigation handlers
      let currentIndex = 0;
      
      const scrollToIndex = (index) => {
        const targetFigure = figures[index];
        wrapper.scrollLeft = targetFigure.offsetLeft;
      };
      
      prevButton.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        scrollToIndex(currentIndex);
      });
      
      nextButton.addEventListener('click', () => {
        currentIndex = Math.min(figures.length - 1, currentIndex + 1);
        scrollToIndex(currentIndex);
      });
      
      // XMP Accessibility: Keyboard navigation (arrow keys)
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          prevButton.click();
        } else if (e.key === 'ArrowRight') {
          nextButton.click();
        }
      });
    }
  }
  */
  
  // XMP Pattern: Always return the decorated block (EDS requirement)
  return block;
}

/*
 * XMP METADATA SUMMARY FOR AI AGENTS:
 * 
 * This JavaScript file provides:
 * - Alt text validation (ensures accessibility)
 * - Lazy loading for images (IntersectionObserver)
 * - Optional: Fade-in animation on scroll (commented out)
 * - Optional: Lightbox for full-screen viewing (commented out)
 * - Optional: Image zoom on hover (commented out)
 * - Optional: Carousel/slideshow functionality (commented out)
 * 
 * If the Figma frame requires JavaScript:
 * - Check if images animate on scroll → Uncomment fade-in code
 * - Check if images are clickable/zoomable → Uncomment lightbox code
 * - Check if images zoom on hover → Uncomment zoom code
 * - Check if carousel/slideshow present → Uncomment carousel code
 * - Check if image comparison slider → Add custom slider logic
 * 
 * Common gaps to look for:
 * - Figma shows fade-in effect → Uncomment fade-in animation
 * - Figma shows clickable images → Uncomment lightbox
 * - Figma shows image carousel → Uncomment carousel code
 * - Figma shows zoom on hover → Uncomment zoom code
 * - Figma shows before/after slider → Add comparison slider
 * 
 * Default behavior (always included):
 * - Alt text validation (warns if missing)
 * - Lazy loading support (data-src images)
 * - Native lazy loading attribute support (loading="lazy")
 * 
 * Performance best practices:
 * - Always use IntersectionObserver (not scroll events)
 * - Lazy load images below the fold
 * - Use loading="lazy" attribute for native support
 * - Use srcset for responsive images (1x, 2x, 3x)
 * - Use <picture> for art direction
 * - Start loading 200px before viewport (rootMargin)
 * - Always check prefers-reduced-motion for animations
 * 
 * Accessibility best practices:
 * - ALL images must have alt text (even if alt="")
 * - Alt text should describe image meaningfully
 * - Decorative images: alt=""
 * - Complex images: detailed description in caption or adjacent text
 * - Lightbox must be keyboard accessible (Esc, Tab, Enter)
 * - Focus management: Return focus when closing modals
 * - Carousel must support arrow keys
 * - Announce loading states with aria-live (if needed)
 * 
 * Lightbox requirements (if used):
 * - Click image to open full-screen view
 * - Esc key to close
 * - Click outside image to close
 * - Focus on close button when opened
 * - Return focus to trigger when closed
 * - Display caption if present
 * - Trap focus within lightbox (don't tab to background)
 * 
 * Carousel requirements (if used):
 * - Horizontal scroll with snap points
 * - Previous/Next buttons
 * - Arrow key navigation
 * - Touch swipe support (native)
 * - Smooth scroll behavior
 * - Indicate current position (optional dots)
 * 
 * When to add JavaScript:
 * - Lazy loading needed (performance)
 * - Lightbox/modal viewing
 * - Carousel/slideshow
 * - Image zoom/pan
 * - Before/after comparison slider
 * - Masonry layout (if not CSS grid)
 * 
 * When NOT to add JavaScript:
 * - Simple static images (use HTML/CSS only)
 * - Image borders/shadows (use CSS)
 * - Rounded corners (use CSS)
 * - Captions (use <figcaption>)
 * - Responsive sizing (use CSS)
 */
```

---

## How These Images Annotations Help Claude:

### **1. Layout Pattern Recognition:**
Claude can identify grid configurations:
- "Figma shows 4-column gallery → Gap: Apply .gallery.four-columns class"
- "Figma shows 2 images side-by-side → Gap: Apply .side-by-side class"
- "Figma shows single centered image → Gap: Apply .single-image class"

### **2. Image Treatment Detection:**
Claude can identify visual styles:
- "Figma shows images with borders → Gap: Apply .bordered class"
- "Figma shows circular images → Gap: Apply .rounded class"
- "Figma shows drop shadows → Gap: Apply .shadow class"
- "Figma shows equal height grid → Gap: Apply .equal-height class with object-fit: cover"

### **3. Caption Position Recognition:**
Claude can identify caption placement:
- "Figma shows caption overlaid on image → Gap: Apply .caption-overlay class"
- "Figma shows left-aligned captions → Gap: Apply .caption-left class"

### **4. Interactive Features Detection:**
Claude can identify JavaScript needs:
- "Figma shows clickable images with zoom → Gap: Uncomment lightbox code"
- "Figma shows carousel navigation → Gap: Uncomment carousel code"
- "Figma shows fade-in animation → Gap: Uncomment fade-in code"

### **5. Aspect Ratio Recognition:**
Claude can identify image proportions:
- "Figma shows square images (1:1) → Gap: Add aspect-ratio: 1/1 or .aspect-1-1 class"
- "Figma shows 16:9 images → Gap: Add .aspect-16-9 class"

---

## Update Claude Explains Scoring Agent Prompt:

Add Images to the reference patterns:
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
   - Layouts: single, gallery (2-4 columns), side-by-side, carousel
   - Treatments: bordered, shadow, rounded (circular), equal-height grid
   - Captions: below (default), overlay, left/right aligned
   - Default: 1→2→3 columns (mobile→tablet→desktop), 1.5-2.5rem gap
   - JavaScript: lazy loading (default), optional lightbox/carousel

When comparing Figma to matched block (e.g., images-none-900.png):
- Check layout pattern (single, gallery, carousel)
- Check number of columns (2, 3, 4)
- Check image styling (borders, shadows, rounded corners)
- Check aspect ratio (16:9, 4:3, 1:1, auto)
- Check caption position (below, overlay, left, right)
- Check if clickable/interactive (lightbox, zoom)
- Check gap between images

Example for Images:
"The matched block (images-none-900.png) follows standard image patterns:
- 3-column gallery grid at desktop (from CSS annotations)
- 2rem gap between images (from CSS)
- Responsive aspect ratio with auto height (from CSS)
- Captions below images, centered (from CSS)
- Lazy loading enabled (from JS)

The Figma frame shows:
- 4-column grid → Gap: Apply .gallery.four-columns class
- Equal height images → Gap: Apply .equal-height class with object-fit: cover
- Circular images → Gap: Apply .rounded class (border-radius: 50%)
- Caption overlaid on images → Gap: Apply .caption-overlay class
- Clickable images with zoom icon → Gap: Uncomment lightbox code in JS

These differences suggest..."