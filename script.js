let currentSection = 0;
let isScrolling = false;

document.addEventListener('wheel', (event) => {
    if (isScrolling) return;
    isScrolling = true;

    const sections = document.querySelectorAll('.section');
    const direction = event.deltaY > 0 ? 1 : -1;
    const nextSection = currentSection + direction;

    if (nextSection >= 0 && nextSection < sections.length) {
        // Reset previous section
        sections[currentSection].classList.remove('tearing', 'rejoining');
        sections[nextSection].classList.remove('tearing', 'rejoining');
        
        // Apply transition classes
        if (direction > 0) {
            // Scrolling down
            sections[currentSection].classList.add('tearing');
            sections[nextSection].classList.add('rejoining');
        } else {
            // Scrolling up
            sections[currentSection].classList.add('rejoining');
            sections[nextSection].classList.add('tearing');
        }

        // Hide the current section and set opacity to 0
        sections[currentSection].style.opacity = 0;
        
        // Delay before showing the next section
        setTimeout(() => {
            sections[currentSection].style.display = 'none';  // Ensure the old section is hidden
            sections[nextSection].style.display = 'flex';     // Ensure the new section is visible
            sections[nextSection].style.opacity = 1;           // Ensure opacity transition

            // Clean up after transition
            setTimeout(() => {
                sections[currentSection].style.opacity = 0;  // Ensure opacity transition
                sections[currentSection].classList.remove('tearing', 'rejoining');
                sections[nextSection].classList.remove('tearing', 'rejoining');
                currentSection = nextSection;
                isScrolling = false;
            }, 200); 
        }, 600); 
    } else {
        isScrolling = false;
    }
});

window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if (index !== 0) {
            section.style.display = 'none';
        }
    });
});
