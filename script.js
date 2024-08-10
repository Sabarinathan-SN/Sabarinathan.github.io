let currentSection = 0;
let isScrolling = false;

document.addEventListener('wheel', (event) => {
    if (isScrolling) return;
    isScrolling = true;

    const sections = document.querySelectorAll('.section');
    const direction = event.deltaY > 0 ? 1 : -1;
    const nextSection = currentSection + direction;

    if (nextSection >= 0 && nextSection < sections.length) {
        // Reset previous section classes
        sections[currentSection].classList.remove('tearing', 'rejoining');
        sections[nextSection].classList.remove('tearing', 'rejoining');

        // Apply transition classes based on scroll direction
        if (direction > 0) {
            sections[currentSection].classList.add('tearing');
            sections[nextSection].classList.add('rejoining');
        } else {
            sections[currentSection].classList.add('rejoining');
            sections[nextSection].classList.add('tearing');
        }

        // Delay before showing the next section
        setTimeout(() => {
            sections[currentSection].style.display = 'none';  // Hide the current section
            sections[nextSection].style.display = 'flex';     // Show the next section

            // After showing the next section, reset the opacity and classes
            setTimeout(() => {
                sections[nextSection].style.opacity = 1;  // Ensure the next section is fully visible
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
