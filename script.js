class Manga {
    constructor(title, genre, description) {
        this.title = title;
        this.genre = genre;
        this.description = description;
    }
}

class MangaManager {
    constructor() {
        this.mangas = this.loadMangas();
    }

    loadMangas() {
        return JSON.parse(localStorage.getItem('mangas')) || [];
    }

    saveMangas() {
        localStorage.setItem('mangas', JSON.stringify(this.mangas));
    }

    addManga(manga) {
        this.mangas.push(manga);
        this.saveMangas();
    }

    searchManga(keyword) {
        return this.mangas.filter(manga => manga.title.toLowerCase().includes(keyword.toLowerCase()));
    }

    filterByGenre(genre) {
        return this.mangas.filter(manga => manga.genre === genre);
    }

    displayMangas(mangaList) {
        const container = document.getElementById('manga-container');
        container.innerHTML = '';
        mangaList.forEach(manga => {
            const mangaEl = document.createElement('div');
            mangaEl.innerHTML = `<h3>${manga.title}</h3><p>${manga.description}</p>`;
            container.appendChild(mangaEl);
        });
    }
}

// Initialize MangaManager and set up event listeners for adding and searching manga
const mangaManager = new MangaManager();
document.getElementById('add-manga-btn').addEventListener('click', () => {
    const title = document.getElementById('manga-title').value;
    const genre = document.getElementById('manga-genre').value;
    const description = document.getElementById('manga-description').value;
    const newManga = new Manga(title, genre, description);
    mangaManager.addManga(newManga);
});

document.getElementById('search-btn').addEventListener('click', () => {
    const keyword = document.getElementById('search-input').value;
    const result = mangaManager.searchManga(keyword);
    mangaManager.displayMangas(result);
});
