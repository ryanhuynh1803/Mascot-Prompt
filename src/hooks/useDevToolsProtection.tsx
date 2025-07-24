import { useEffect } from 'react';

const DEVTOOLS_REDIRECT_URL = 'https://www.facebook.com/tu.huynh1803/';
const DETECTION_INTERVAL = 500; // Check every 500ms, faster than before
const DEVTOOLS_OPEN_THRESHOLD = 160; // Standard threshold for resize detection

export const useDevToolsProtection = () => {
  useEffect(() => {
    const redirectToUrl = () => {
      // Prevent redirect loops if the target URL is the same
      if (window.location.href !== DEVTOOLS_REDIRECT_URL) {
        window.location.href = DEVTOOLS_REDIRECT_URL;
      }
    };

    // --- Method 1: Interval-based debugger check (faster interval) ---
    const intervalId = setInterval(() => {
      const startTime = new Date().getTime();
      // eslint-disable-next-line no-debugger
      debugger;
      const endTime = new Date().getTime();

      if (endTime - startTime > 100) { // A tight threshold for the debugger check
        redirectToUrl();
      }
    }, DETECTION_INTERVAL);

    // --- Method 2: Window resize check (for docked DevTools) ---
    const checkDevToolsOnResize = () => {
      if (
        window.outerWidth - window.innerWidth > DEVTOOLS_OPEN_THRESHOLD ||
        window.outerHeight - window.innerHeight > DEVTOOLS_OPEN_THRESHOLD
      ) {
        redirectToUrl();
      }
    };
    window.addEventListener('resize', checkDevToolsOnResize);
    // Initial check on mount
    checkDevToolsOnResize();

    // --- Method 3: Disable context menu and keyboard shortcuts (with immediate redirect) ---
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    const handleKeyDown = (e: KeyboardEvent) => {
      const isDevToolsShortcut =
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'));

      if (isDevToolsShortcut) {
        e.preventDefault();
        redirectToUrl(); // Redirect immediately on shortcut attempt
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove all listeners
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', checkDevToolsOnResize);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};