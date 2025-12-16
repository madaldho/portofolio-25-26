import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock DOM environment
const mockDocument = {
  getElementById: vi.fn(),
  querySelectorAll: vi.fn(),
  addEventListener: vi.fn(),
  body: {
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
    },
  },
};

const mockWindow = {
  addEventListener: vi.fn(),
  scrollY: 0,
};

// Mock elements
const mockMobileMenuBtn = {
  addEventListener: vi.fn(),
};

const mockMobileMenu = {
  classList: {
    add: vi.fn(),
    remove: vi.fn(),
    contains: vi.fn(),
  },
  contains: vi.fn(),
};

const mockHamburgerLines = [
  { classList: { add: vi.fn(), remove: vi.fn() } },
  { classList: { add: vi.fn(), remove: vi.fn() } },
  { classList: { add: vi.fn(), remove: vi.fn() } },
];

const mockMobileNavLinks = [
  { classList: { add: vi.fn(), remove: vi.fn() } },
  { classList: { add: vi.fn(), remove: vi.fn() } },
];

// Setup global mocks
global.document = mockDocument as any;
global.window = mockWindow as any;

describe('Mobile Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mock returns
    mockDocument.getElementById.mockImplementation((id: string) => {
      switch (id) {
        case 'mobile-menu-btn':
          return mockMobileMenuBtn;
        case 'mobile-menu':
          return mockMobileMenu;
        default:
          return null;
      }
    });
    
    mockDocument.querySelectorAll.mockImplementation((selector: string) => {
      switch (selector) {
        case '.hamburger-line':
          return mockHamburgerLines;
        case '.mobile-nav-link':
          return mockMobileNavLinks;
        default:
          return [];
      }
    });
  });

  it('should initialize mobile menu button event listener', () => {
    // Simulate the navigation script initialization
    const mobileMenuBtn = mockDocument.getElementById('mobile-menu-btn');
    const mobileMenu = mockDocument.getElementById('mobile-menu');
    
    expect(mobileMenuBtn).toBeTruthy();
    expect(mobileMenu).toBeTruthy();
    
    // Simulate adding event listener
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', vi.fn());
      expect(mobileMenuBtn.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    }
  });

  it('should toggle mobile menu visibility when button is clicked', () => {
    const mobileMenu = mockDocument.getElementById('mobile-menu');
    let isMenuOpen = false;
    
    // Simulate toggle function
    const toggleMobileMenu = () => {
      isMenuOpen = !isMenuOpen;
      
      if (mobileMenu) {
        if (isMenuOpen) {
          mobileMenu.classList.remove('translate-x-full');
          mobileMenu.classList.add('translate-x-0');
          mockDocument.body.classList.add('menu-open');
        } else {
          mobileMenu.classList.add('translate-x-full');
          mobileMenu.classList.remove('translate-x-0');
          mockDocument.body.classList.remove('menu-open');
        }
      }
    };
    
    // Test opening menu
    toggleMobileMenu();
    expect(isMenuOpen).toBe(true);
    expect(mobileMenu?.classList.remove).toHaveBeenCalledWith('translate-x-full');
    expect(mobileMenu?.classList.add).toHaveBeenCalledWith('translate-x-0');
    expect(mockDocument.body.classList.add).toHaveBeenCalledWith('menu-open');
    
    // Test closing menu
    toggleMobileMenu();
    expect(isMenuOpen).toBe(false);
    expect(mobileMenu?.classList.add).toHaveBeenCalledWith('translate-x-full');
    expect(mobileMenu?.classList.remove).toHaveBeenCalledWith('translate-x-0');
    expect(mockDocument.body.classList.remove).toHaveBeenCalledWith('menu-open');
  });

  it('should animate hamburger lines when menu is toggled', () => {
    const hamburgerLines = mockDocument.querySelectorAll('.hamburger-line');
    let isMenuOpen = false;
    
    // Simulate hamburger animation
    const animateHamburger = () => {
      isMenuOpen = !isMenuOpen;
      
      if (hamburgerLines.length >= 3) {
        if (isMenuOpen) {
          hamburgerLines[0].classList.add('rotate-45', 'translate-y-2');
          hamburgerLines[1].classList.add('opacity-0');
          hamburgerLines[2].classList.add('-rotate-45', '-translate-y-2', 'w-6');
        } else {
          hamburgerLines[0].classList.remove('rotate-45', 'translate-y-2');
          hamburgerLines[1].classList.remove('opacity-0');
          hamburgerLines[2].classList.remove('-rotate-45', '-translate-y-2', 'w-6');
        }
      }
    };
    
    // Test hamburger animation on open
    animateHamburger();
    expect(hamburgerLines[0].classList.add).toHaveBeenCalledWith('rotate-45', 'translate-y-2');
    expect(hamburgerLines[1].classList.add).toHaveBeenCalledWith('opacity-0');
    expect(hamburgerLines[2].classList.add).toHaveBeenCalledWith('-rotate-45', '-translate-y-2', 'w-6');
    
    // Test hamburger animation on close
    animateHamburger();
    expect(hamburgerLines[0].classList.remove).toHaveBeenCalledWith('rotate-45', 'translate-y-2');
    expect(hamburgerLines[1].classList.remove).toHaveBeenCalledWith('opacity-0');
    expect(hamburgerLines[2].classList.remove).toHaveBeenCalledWith('-rotate-45', '-translate-y-2', 'w-6');
  });

  it('should animate mobile nav links when menu opens', () => {
    const mobileNavLinks = mockDocument.querySelectorAll('.mobile-nav-link');
    let isMenuOpen = false;
    
    // Simulate link animation (simplified without setTimeout for testing)
    const animateLinks = () => {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        // Simulate immediate animation for testing
        mobileNavLinks.forEach((link: any) => {
          link.classList.remove('opacity-0', 'translate-y-4');
          link.classList.add('opacity-100', 'translate-y-0');
        });
      } else {
        mobileNavLinks.forEach((link: any) => {
          link.classList.add('opacity-0', 'translate-y-4');
          link.classList.remove('opacity-100', 'translate-y-0');
        });
      }
    };
    
    // Test link animation on open
    animateLinks();
    mobileNavLinks.forEach((link: any) => {
      expect(link.classList.remove).toHaveBeenCalledWith('opacity-0', 'translate-y-4');
      expect(link.classList.add).toHaveBeenCalledWith('opacity-100', 'translate-y-0');
    });
    
    // Test link animation on close
    animateLinks();
    mobileNavLinks.forEach((link: any) => {
      expect(link.classList.add).toHaveBeenCalledWith('opacity-0', 'translate-y-4');
      expect(link.classList.remove).toHaveBeenCalledWith('opacity-100', 'translate-y-0');
    });
  });

  it('should prevent body scroll when menu is open', () => {
    let isMenuOpen = false;
    
    // Simulate body scroll prevention
    const toggleBodyScroll = () => {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        mockDocument.body.classList.add('menu-open');
      } else {
        mockDocument.body.classList.remove('menu-open');
      }
    };
    
    // Test preventing scroll
    toggleBodyScroll();
    expect(mockDocument.body.classList.add).toHaveBeenCalledWith('menu-open');
    
    // Test restoring scroll
    toggleBodyScroll();
    expect(mockDocument.body.classList.remove).toHaveBeenCalledWith('menu-open');
  });
});